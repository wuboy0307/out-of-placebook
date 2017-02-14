```js
{
  auth: {
    loggedIn: false,
    currentUserId: null
  },

  profiles: {
    currentProfileId: 1,

    profileList: {
      1: {
        id: 1,
        username: 'naz',
        fname: 'Naz',
        lname: 'Ahmed',
        intro: 'Learning how to code',
        email: 'test@email.com',
        home: 'New York, NY',
        work: 'App Academy',
        description: 'Student in NYC learning how to code at AA.',
        friendIds: [2, 43, 12],
      },
      2: { ... }
    },
  },

  posts: {
    1: {
      targetId: 1,
      type: 'link',
      timestamp: #{Date in UTC Format},
      authorId: 1,
      body "Check out this website",
      url: "http://google.com",
      parentId: null
    },
    2: {
      targetId: 1,
      type: 'status',
      timestamp: #{Date in UTC Format},
      authorId: 2,
      url: null,
      body "Check out this website",
      parentId: null
    },
    3: {
      targetId: 1,
      type: 'image',
      timestamp: #{Date in UTC Format},
      authorId: 3,
      url: "http://google.com/image",
      body: "Check out this image",
      parentId: null
    }
  },

  comments: {
    1: {
      author_id: 1,
      post_id: 23,
      body: "love this post!",
      parent_id: null
    },
    2: { ... }
  },

  likes: {
    1: {
      content_id: 4,
      content_type: 'post',
      author_id: 1
    },
    2: {
      content_id: 4,
      content_type: 'comment',
      author_id: 1
    },
  }

  notifications: {
    1: {
      authorId: 5,
      type: text,
      text: "Sarah liked John's recent post",
      authorImgSrc: '/sarah.jpg',
      triggerURL: '/john',
      seen: true
    },
    2: {
      authorId: 7,
      type: friendRequest,
      authorImgSrc: '/john.jpg',
      triggerURL: '/friendrequests',
      seen: false
    }
  },

  friendRequests: {
    requestsSent: [54,33,29],

    incomingRequests: {
      1 : {
        friend_id: 5,
        pending: true
      }
    }
  }

  ui: {
    popupActive: false
  }

  errors: {
    signInFormErrors: {
      username: [],
      fname: [],
      lname: [],
      email: [],
      password: []
    }
  }
}
