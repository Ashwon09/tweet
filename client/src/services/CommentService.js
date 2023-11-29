import { secureAPI } from "./SecureAPIClient";
import { generalAPI } from "./GeneralAPIClient";

export function deleteCommentService(commentId) {
  return secureAPI.defaults(`/comments/${commentId}`);
}

export function addCommentService(body) {
  return secureAPI.post("/comments", body);
}

export function getCommentsForPost(id) {
  return generalAPI.get(`/comments/${id}`);
}
