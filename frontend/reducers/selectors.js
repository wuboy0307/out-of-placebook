export const selectPosts = ({ posts }) => (Object.keys(posts).map(post => posts[post]).reverse());

window.selectPosts = selectPosts;
