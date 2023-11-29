const { default: axios } = require("axios");
const API = require("../configs");

const getPosts = async () => {
  const response = await axios.get(`${API}/posts`);
  return response.data;
};

const getPostById = async (id) => {
  const response = await axios.get(`${API}/posts/${id}`);
  return response.data;
};

const postByUser = async (userId) => {
  const response = await axios.get(`${API}/posts/user/${userId}`);
  return response.data;
};
const commentByPost = async (postId) => {
  const response = await axios.get(`${API}/comments/${postId}`);
  return response.data;
};

const createPostService = async (body, headers) => {
  const accessToken = headers.accesstoken;
  const response = await axios.post(`${API}/posts`, body.input, {
    headers: { accessToken: accessToken },
  });
  console.log(response);
  return response.data;
};
module.exports = {
  getPosts,
  getPostById,
  postByUser,
  commentByPost,
  createPostService,
};
