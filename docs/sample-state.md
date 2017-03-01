```js
{

  auth: {
    currentUser: {
      id: 1,
      fname: "Mark",
      lname: "Jones",
      email: "mark@gmail.com",
      avatarHeader: "image.jpg",
      avatarXS: "image.jpg",
      avatarXXS: "image.jpg",
      avatarXXXS: "image.jpg"
    },
    errors: {
      signUpFormErrors: {
        username: [],
        fname: [],
        lname: [],
        email: [],
        password_digest: []
      },
      logInFormErrors: []
    }
  },

  profile: {
    id: 17,
    avatarHeader: "image.jpg",
    avatarXS: "image.jpg",
    avatarXXS: "image.jpg",
    avatarXXXS: "image.jpg",
    description: null,
    fname: "Todd",
    lname: "Portman",
    home: "New York",
    intro: "Software dev living in NYC",
    photos: [
      id: 4,
      imageUrlOriginal: "photoFullSize.jpg",
      thumbUrl: "imageThumb.jpg"
    ],
    friendIds: [2,44,72],
    friends : {
      id: 2
      fullName: "Jane Doe",
      avatarUrlOriginal: "avatarFullSize.jpg",
      thumbUrl: "avatarSmall.jpg",
    },
    { ... }
  },

  posts: {
    27: {
      id: 27,
      wallId: 4,
      authorId: 2,
      authorFullName: "Jane Doe",
      authorAvatarUrl: "avatar.jpg",
      createdAt: "10 minutes",
      body: "Congratulations!"
      wallIdFullName: "Mark Johnson",
      contentType: null,
      content: null,
      numLikes: 2,
      userLikesPost: true,
      likeText: "You and Jane Doe like this."
      comments: {
        52: {
          id: 52,
          authorId: 3
          postId: 27
          authorFullName: "David Lu",
          authorAvatarUrl: "avatar.jpg",
          userLikesComment: false,
          body: "Well done!"
          createdAt: "2 minutes"
          numLikes: 1
          childComments: { ... }
        }
      }
    },
    32: { ... }
  },

  friends: {
    incomingFriends: {
      2: {
        id: 2,
        fullName: "Jane Doe",
        avatar: "avatar.jpg",
        friendIds: [4,7,11,23]
      },
      6: {
        id: 6,
        fullName: "Bill Johnson",
        avatar: "avatar.jpg",
        friendIds: [9,44,54]
      }
    },
    outgoingFriends: {
      7: { ... }
    },
    friends: {
      9: { ... },
      11: { ... },
      12: { ... },
    },
    notificationCount: 2
  },

  messages: {
    chats: [
      {
        channelId: 4,
        channelText: "Tim Jones",
        lastMessage: "Where are you?",
        lastMessageAvatar: "avatar.jpg",
        lastMessageFullName: "Mark Jones",
        lastMessageTime: "2 days",
        numUnseenMessages: 0
      },
      { ... }
    ],
    currentChat: {
      channelId: 2,
      channelText: 'Group Chat with 2 Others',
      numUnseenChats: 0,
      messages: [
        {
          senderFirstName: "Taylor",
          body: "Hey",
          authorId: 7,
          authorAvatar: "avatar.jpg",
          timestamp: "2017-02-27T19:38:37.785Z"
        },
        { ... }
      ]
    }
  },

  notifications: {
    count: 12,
    list: [
      ... ,
      ...
    ]
  },

  search: {
    2: {
      id: 2,
      avatarUrl: "avatar.jpg",
      fullName: "Jane Doe",
      mutualFriends: 2
    },
    3: { ... }
  },

  flyout: {
    flyout: 'notifications',
    data: null
  }
  
}
