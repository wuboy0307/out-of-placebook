import merge from 'lodash/merge';

export const selectPosts = ({ posts }) => {
  let newPosts = merge({}, posts);
  if (newPosts['sharedPosts']) delete newPosts['sharedPosts'];
  if (newPosts) {
    return Object.keys(newPosts).map(post => newPosts[post]).reverse();
  } else {
    return [];
  }
};

export const selectNewsfeed = ({ newsfeed }) => {
  let newPosts = merge({}, newsfeed);
  if (newPosts['sharedPosts']) delete newPosts['sharedPosts'];
  if (newPosts) {
    return Object.keys(newPosts).map(post => newPosts[post]).reverse();
  } else {
    return [];
  }
};

export const selectSearchResults = ({ search }) => {
  search = search.navbarSearch;
  if (search) {
    return Object.keys(search).map(key => search[key]);
  } else {
    return [];
  }
};
export const selectChatSearchResults = ({ search }) => {
  search = search.chatbarSearch;
  if (search) {
    return Object.keys(search).map(key => search[key]);
  } else {
    return [];
  }
};

export const selectFriendRequests = ({ friends }) => {
  let incomingFriends = friends.incomingFriends;
  if (incomingFriends) {
    return Object.keys(incomingFriends).map(key => incomingFriends[key]);
  } else {
    return [];
  }
};

export const selectFriends = ({ friends }) => {
  let currentFriends = friends.friends;
  if (currentFriends) {
    return Object.keys(currentFriends).map(key => parseInt(key));
  } else {
    return [];
  }
};

export const selectFriendDetails = ({ friends }) => {
  let currentFriends = friends.friends;
  if (currentFriends) {
    return Object.keys(currentFriends).map(key => currentFriends[key]);
  } else {
    return [];
  }
};

// export const selectNewsfeedPosts = ({ newsfeed }) => {
//   if (!newsfeed) return [];
//   const posts = newsfeed.posts;
//   if (posts) {
//     return Object.keys(posts).map(post => posts[post]).reverse();
//   } else {
//     return [];
//   }
// };

export const selectComments = (comments) => {
  if (comments) {
   return Object.keys(comments).map(comment => comments[comment]);
 } else {
   return [];
 }
};
