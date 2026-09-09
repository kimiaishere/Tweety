import { request } from "../../app/http";

export const findUser = (email, password) =>
  request(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );