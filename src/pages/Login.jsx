import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
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