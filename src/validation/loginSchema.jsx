import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("ایمیل معتبر وارد کنید"),

  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});