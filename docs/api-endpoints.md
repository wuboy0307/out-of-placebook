
# API Endpoints

## HTML API

### Root

- `GET /` - loads React

## JSON API

### Users

- `POST /api/users`
  - creates new users
- `PATCH /api/users/:id`
  - edits user
- `GET /api/users`
  - accepts search query and searches users
- `GET /api/users/:id`
  - gets an individual user's data
- `POST /api/users/:id/friend-request`
  - creates pending friend request for current user to friend with :id
- `POST /api/users/:id/block`
  - blocks user


### Profiles
- `GET /api/profiles/:id`
  - gets profile and posts of :id

### Session

- `POST /api/session`
- login user
- `DELETE /api/session`
- logout user

### Friendships

- `POST /api/friends`
  - send friend request
- `DELETE /api/friends`
  - remove friend
- `PUT /api/friends`
  - accept/reject friend request
- `GET /api/friends`
  - get friend requests


### Newsfeed

- `GET /api/newsfeed`
  - gets post and comment data for user and their friends

### Timeline

- `GET /api/timeline`
  - gets post and comment data for user and their friends

### Notifications

- `GET /api/notifications`
  - gets notifications for current user

### Posts

- `PATCH /api/posts/:id`
  - edit post
- `POST /api/posts/`
  - create post
- `DELETE /api/posts/:id`
  - delete post

### Photos

- `GET /api/photo/:id`
  - get a single photo
- `GET /api/users/:id/photos`
  - get all of a user's photos
- `DELETE /api/photos/:id`
  - delete a single photo

### Comments
- `POST /api/comments`
  - create comment
- `PATCH /api/comments/:id`
  - edit comment
- `DELETE /api/comments/:id`
  - delete comment
