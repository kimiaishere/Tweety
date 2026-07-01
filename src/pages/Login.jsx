import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        const user = JSON.parse(storedUser);
        navigate("/", { replace: true });
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`
      );
  
      const users = await res.json();
      console.log("Users:", users);
  
      if (users.length === 0) {
        toast.error("ایمیل یا رمز عبور اشتباه است.");
        return;
      }
  
      localStorage.setItem("user", JSON.stringify(users[0]));
  
      toast.success("ورود موفقیت‌آمیز بود.");
  
      navigate("/");
    } catch (error) {
      toast.error("خطا در برقراری ارتباط با سرور.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[400px] rounded-xl shadow-lg p-8 space-y-6"
      >

        <h1 className="text-2xl font-bold text-center">
          ورود
        </h1>

        <div>

          <input
            type="email"
            placeholder="ایمیل"
            {...register("email")}
            className="w-full border rounded-lg p-3 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email.message}
            </p>
          )}

        </div>

        <div>

          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password")}
            className="w-full border rounded-lg p-3 outline-none"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}

        </div>

        <button
          className="w-full bg-blue-500 text-white rounded-lg p-3 cursor-pointer"
        >
          ورود
        </button>

      </form>

    </div>
  );
}