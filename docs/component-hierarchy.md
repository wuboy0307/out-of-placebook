
## Component Hierarchy

**App**
  - NavBar
  - Home
  - Newsfeed
  - ClickCapture

**Home**
  - ProfileNavBar
  - Profile
  - About
  - Friends
  - Photos
  - LikeOverlay

**ProfileNavBar**
  - CoverImage
  - ProfileImage
  - Link to username
  - ProfileLinkBar
    - LinkItem (timeline)
    - LinkItem (about)
    - LinkItem (friends)
    - LinkItem (photos)
    - LinkItem (edit profile)

**Profile**
  - Timeline
    - Sidebar
      - IntroBox
      - FriendsBox
        - CardItem
      - PhotosBox
        - CardItem
    - CreatePost
    - Posts
      - PostHeader
      - PostContent
      - CommentBox
        - CommentItem

**Newsfeed**
  - Sidebar
  - Posts

**NavBar**
  - SearchForm
    - FriendItem
  - NavLink (to current user profile)
  - NavLink (to home)
  - NotificationsBar
    - Notifications (friends)
    - Notifications (messages)
    - Notifications (notifications)

**Friends**
  - FriendItem
  - FriendButton

**Photos**
  - PhotoItem

**AddPhoto**
  - PhotoForm

**LikeOverlay**
  - FriendItem
  - FriendButton

**SessionFormContainer**
  - SessionForm
    - LoginForm
    - SignUpForm

## Routes

|Path   | Component   |
|-------|-------------|
| "/login" | "SessionFormContainer" |
| "/" | "App => Newsfeed" |
| "/:username" | "App => Home" |
| "/:username/photos" | "Profile => Photos" |
| "/:username/about" | "Profile => About" |
| "/:username/friends" | "Profile => Friends" |
| "/edit-profile" | "EditProfile" |
| "/add-photo" | "AddPhoto" |
| "/messages" | "Messages (tbd)" |
