##Summary

Out of Placebook is a social-networking site inspired by [Facebook][facebook]
[facebook]: https://www.facebook.com

Out of Placebook allows users to:
  - Easily share posts, links and photos with their friends.
  - Keep in touch via real-time chat.
  - See their friends recent activity all in one place on their newsfeed.

##Structure
###Back End
Out of Placebook is built using Ruby on Rails with a PostgreSQL database. Data requests are handled by AJAX requests and responses are in JSON format, built with Jbuilder.

###Front End
Out of Placebook is a single page app built using React and Redux on the frontend. It utilises Pusher/Actioncable for real-time updates.

##Features

* Authentication
  * Session authentication is handled on the backend and enforced with session tokens.
  * Automatic redirection to the login/signup page occurs when not logged in.
* Real-time updates of new posts and editing/deletion of posts, without having to refresh the page.

Whenever posts, comments or likes are created/edited/deleted, the relevant controller sends out messages
to the corresponding `wall` and `newsfeed` channels. Users subscribe to these channels when they visit another user's wall or their own newsfeed.
Users receive messages on these channels which then trigger appropriate actions (such as requesting an updated version of a post via AJAX). This allows for users to see the most up-to-date activities in real-time.

<!-- Add in gif showing real time post updates -->

* Real-time notification updates.

A polymorphic join table that is polymorphic on both sides allows for the tracking of

* Real-time messaging between users.
* Photo upload with automatic image resizing.
* Automatic parsing of links in posts and appropriate thumbnail display.
* Sharing of posts.
Users can share each other's posts. When sharing a post which is itself sharing another post, the original post is shared. This functionality allows for viral posts to be shared effortlessly between users as they only need to click 'Share' on any one of the posts which share the original post, or the original post itself.

* User search box.
I use `pgSearch` and Postgres's `trigram` module to allow for fuzzy searching. Since some names can be difficult to spell this implementation allows users to find each other even if they misspelled 'Matthew' as 'Mathew' or 'Mark' as 'Mork'.

* Newsfeed showing activity of all friends.

* Posts
Posts have a polymorphic `content` column which allows for other content to be displayed in addition to the post body.
This allows for posts to display an attached picture, a preview of a URL, or another post inside of them.

<!-- Three separate images of post showing picture, url and shared post -->
