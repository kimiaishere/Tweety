import { request } from "../../app/http";

export const getPosts = () => request("/posts");

export const createPost = (data) =>
  request("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updatePost = (id, data) =>
  request(`/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deletePost = (id) =>
  request(`/posts/${id}`, { method: "DELETE" });

export const searchPosts = (query) =>
  request(`/posts?title_like=${encodeURIComponent(query)}`);