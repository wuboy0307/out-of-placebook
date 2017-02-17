export const selectPosts = ({ posts }) => {
  if (posts) {
    return Object.keys(posts).map(post => posts[post]).reverse();
  } else {
    return [];
  }
};

export const selectComments = (comments) => {
  if (comments) {
   return Object.keys(comments).map(comment => comments[comment]);
 } else {
   return [];
 }
};

window.selectPosts = selectPosts;
