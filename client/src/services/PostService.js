import { generalAPI } from "./GeneralAPIClient";
import { secureAPI } from "./SecureAPIClient";

export function creatPostService(data) {
  return secureAPI.post(`/posts`, data);
}

export function getPostbyUser(id) {
  return generalAPI.get(`posts/user/${id}`);
}

export function getAllPosts() {
  return generalAPI.get("/posts");
}

export function likePostService(data) {
  return secureAPI.post("/likes", data);
}

export function deletePostService(postId) {
  return secureAPI.delete(`/posts/${postId}`);
}

export function editTitleService(id, body) {
  return secureAPI.patch(`/posts/title/${id}`, body);
}

export function editBodyService(id, body) {
  return secureAPI.patch(`/posts/body/${id}`, body);
}

export function getPostById(id) {
  return generalAPI.get(`/posts/${id}`);
}
