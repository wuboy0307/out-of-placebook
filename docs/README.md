##Summary

Out of Placebook is a social-networking site inspired by [Facebook][facebook]
[facebook]: https://www.facebook.com

Out of Placebook allows users to:
  - Easily share posts, links and photos with their friends.
  - Keep in touch via real-time chat.
  - See their friends' recent activity all in one place on their newsfeed.

##Structure
###Back End
Out of Placebook is built using Ruby on Rails with a PostgreSQL database. Data requests are handled by AJAX requests and responses are in JSON format, built with Jbuilder.

###Front End
Out of Placebook is a single page app built using React and Redux on the frontend. It utilises WebSockets via Pusher to implement real-time updates.

##Features

###Authentication
  * Session authentication is handled on the backend and enforced with session tokens.
  * Automatic redirection to the login/signup page occurs when not logged in.

###Real-Time Fetching of Activities
* Real-time updates of new posts and editing/deletion of posts, without having to refresh the page.

Whenever posts, comments or likes are created/edited/deleted, the relevant controller sends out messages
to the corresponding `wall` and `newsfeed` channels. Users subscribe to these channels when they visit another user's wall or their own newsfeed.
Users receive messages on these channels which then trigger appropriate actions (such as requesting an updated version of a post via AJAX). This allows for users to see the most up-to-date activities in real-time.

<!-- Add in gif showing real time post updates -->

###Real-Time Notifications

I use a join table which is polymorphic on both sides to track users' activities. This allows for the tracking of different types of source events (such as comments/likes) on different types of parents (such as posts/comments). This means a `Post` on a `Wall` can be tracked in the same table as a `Like` on a `Comment`. To facilitate fast lookup, this `Activites` table is indexed on both `[user_id, created_at]` which allows for fast collation of newsfeed-related items, and `[parent_id, parent_type, source_type, created_at]` which allows for fast collation of notification-related items.

Generating notifications for a user presented two main challenges:

1. Only the most recent activity should show up for each parent. For example, if five users `liked` the same post, only one notification should be generated (for the most recent like).

2. Identifying the reason for the notification. e.g. `Someone commented on your post` or `Someone posted on your wall`.

###Real-time messaging between users.
Messaging is implemented via `messages` which belong to `channels`. Users are subscribed to `channels` via the `channel_subs` join table. When the 'Message' button is clicked on a user's profile, the server first looks to see if there is a channel with two participants where one is the current user and the other is the user they are trying to message. If there is, it will fetch all the chat messages from this channel, otherwise it will create a new channel and subscribe both users to it. This is achieved via a self-join on the channels table:

```sql
SELECT DISTINCT *
FROM channels
INNER JOIN
  (SELECT COUNT(users.id), channels.id
  FROM channels
  INNER JOIN channel_subs
    ON channels.id = channel_subs.channel_id
  INNER JOIN users
    ON channel_subs.participant_id = users.id
  GROUP BY channels.id
  HAVING COUNT(users) = 2) direct_channels
ON channels.id = direct_channels.id
INNER JOIN channel_subs csone
  ON direct_channels.id = csone.channel_id
INNER JOIN users uone
  ON csone.participant_id = uone.id
INNER JOIN channel_subs cstwo
  ON direct_channels.id = cstwo.channel_id
INNER JOIN users utwo
  ON cstwo.participant_id = utwo.id
WHERE
  (uone.id = user_one and utwo.id = user_two) OR (uone.id = user_two and utwo.id = user_one)
LIMIT 1
```

###Photo upload with automatic image resizing.
Uploaded images are automatically cropped using the `Paperclip` gem and stored on AWS in a variety of different sizes. This allows for pages to always display images of the correct size and aspect ratio.

###Automatic parsing of links in posts and appropriate thumbnail display.
When users include URLs in their post the link is automatically parsed and meta-data is fetched using the Open Graph protocol.
A thumbnail and description of the URL is then displayed in the `Post` next to what was originally typed.

<!--- gif showing link posting --->

###Sharing of posts.
Users can share each other's posts, including links and images. When sharing a post which is itself sharing another post, the original post is shared. This functionality allows for viral posts to be shared effortlessly between users as they only need to click 'Share' on any one of the posts which share the original post, or the original post itself.

###User search box.
I use `pgSearch` and Postgres's `trigram` module to allow for fuzzy searching. Since some names can be difficult to spell this implementation allows users to find each other even if they misspelled 'Matthew' as 'Mathew' or 'Mark' as 'Mork'.

To prevent multiple hits to the server, a search is only performed once the user has stopped typing for 300ms. This is achieved by setting a timeout every time the user presses a key (and clearing any old ones that may exist), where the callback is the appropriate AJAX search request.

###Newsfeed showing activity of all friends.
Users have a newsfeed which displays recent activities by all of their friends.

###Posts
Posts have a polymorphic `content` column which allows for other content to be displayed in addition to the post body.
This allows for posts to display an attached picture, a preview of a URL, or another post inside of them.

<!-- Three separate images of post showing picture, url and shared post -->
