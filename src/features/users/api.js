import { request } from "../../app/http";

export const getUsers = () => request("/users");