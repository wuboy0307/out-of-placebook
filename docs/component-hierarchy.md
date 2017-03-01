## Component Hierarchy

**App**
  - Modal
  - NavBar
  - Newsfeed
  - Home
  - SinglePost
    - PostItem
  - Chatbox
  - ClickListener

**SignUpForm**
  - SignupHeader
  - SignupForm

**Home**
  - ProfileNavBar
  - Timeline

**ProfileNavBar**
  - CoverPhoto
  - ProfileLinkBar
    - Link (timeline)
    - Link (about)
    - Link (friends)
    - Link (photos)
    - Link (edit profile)

**Timeline**
  - TimelineSideBar
  - TimelineMain
    - CreatePost
    - PostItem
      - PostItem2

**Newsfeed**
  - Sidebar
  - Posts

**NavBar**
  - Search

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
