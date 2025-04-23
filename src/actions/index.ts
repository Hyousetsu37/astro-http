import { getPostLikes } from "./posts/get-posts-likes.actions";
import { updatePostLikes } from "./posts/update-likes.action";

export const server = {
  getPostLikes,
  updatePostLikes,
};
