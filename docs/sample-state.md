```js
{
  auth: {
    loggedIn: false,
    currentUserId: null,
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

  posts: [
    {
      id: 1,
      wallId: 1,
      authorId: 1,
      authorFullName: 'Mark Zuckerberg',
      createdAt: #{Date in UTC Format},
      body "Check out this website",
      parentId: null,
      content: {
        id: 5
        type: url,
        title: 'Welcome to Google'.
        description: 'Superfast search engine',
        image: 'http://google.com/image.png'
      },
      comments: [
        {
          id: 6,
          authorId: 1,
          postId: 1,
          authorFullName: 'Bill Gates',
          body: 'My least favourite site!',
          comments: [
            {
              id: 12,
              authorId: 2,
              postId: 1,
              authorFullName: 'Steve Jobs',
              body: 'So bad...',
            }
          ]
        }
      ]
    },
    { ... }
  ],

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


}
