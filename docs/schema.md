## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
fname           | string    | not null
lname           | string    | not null
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
session_token   | string    | not null, indexed, unique
password_digest | string    | not null
home            | text      | null
work            | text      | null
from            | text      | null
intro           | text      | null
description     | text      | null
profile_url     | string    | null
cover_url       | string    | null

##friendships
column name  | data type | details
-------------|-----------|---------------
id           | integer   | not null, primary key
user_id      | integer   | not null, indexed, foreign key of user initiating request
friend_id    | integer   | not null, indexed, foreign key of user accepting request
completed    | boolean   | default: false

##posts
column name  | data type | details
-------------|-----------|---------------
id           | integer   | not null, primary key
author_id    | integer   | not null, indexed, foreign key references users
type         | string    | not null
body         | text      | null if type is 'status'
url          | string    | not null if type is 'link'
parent_id    | integer   | indexed, foreign key self-references posts

##comments
column name  | data type | details
-------------|-----------|---------------
id           | integer   | not null, primary key
author_id    | integer   | not null, indexed, foreign key references users
post_id      | integer   | not null, indexed, foreign key references posts
parent_id    | integer   | not null, indexed, foreign key self-references comments

##likes
column name  | data type | details
-------------|-----------|---------------
id           | integer   | not null, primary key
liker_id     | integer   | not null, indexed, foreign key of person who liked status
content_id   | integer   | not null, indexed, foreign key of post/comment liked
content_type | string    | not null, content type (post/comment)

##subscriptions
column name  | data type | details
--------------|-----------|---------------
id            | integer   | not null, primary key
post_id       | integer   | not null, indexed, foreign key references posts
author_id     | integer   | not null, indexed, foreign key references users
subscriber_id | integer   | not null, indexed, foreign key references users
seen          | boolean   | default: false
trigger_url   | string    | not null
