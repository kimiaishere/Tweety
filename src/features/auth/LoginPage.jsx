import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSchema } from "./loginSchema";
import { login } from "./authSlice";
import { findUser } from "./api";

const DEMO_ACCOUNTS = [
  { email: "admin@test.com", password: "123456", label: "مدیر" },
  { email: "user@test.com", password: "123456", label: "کاربر" },
];

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        navigate("/", { replace: true });
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const users = await findUser(data.email, data.password);

      if (users.length === 0) {
        toast.error("ایمیل یا رمز عبور اشتباه است.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(users[0]));
      dispatch(login(users[0]));
      toast.success(`خوش آمدید، ${users[0].name}! 👋`);
      navigate("/");
    } catch {
      toast.error("خطا در برقراری ارتباط با سرور.");
    }
  };

  const fillDemo = (account) => {
    setValue("email", account.email);
    setValue("password", account.password);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-5xl mb-3">🕊️</div>
          <h1 className="text-3xl font-bold bg-gradient-to-l from-brand-600 to-violet-600 bg-clip-text text-transparent">
            توییتی
          </h1>
          <p className="text-gray-500 mt-2 text-sm">به شبکه اجتماعی خود خوش آمدید</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl border border-gray-200/60 p-7 space-y-5 animate-slide-up"
        >
          <h2 className="text-xl font-bold text-gray-800 text-center">ورود به حساب</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ایمیل
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              رمز عبور
            </label>
            <input
              type="password"
              placeholder="••••••"
              {...register("password")}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-bold rounded-full p-3.5 transition-all shadow-md shadow-blue-200/50 active:scale-[0.98]"
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className="mt-5 bg-white/70 backdrop-blur rounded-2xl border border-gray-200/60 p-4 animate-fade-in">
          <p className="text-xs text-gray-500 text-center mb-3">حساب‌های آزمایشی</p>
          <div className="flex gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => fillDemo(acc)}
                className="flex-1 text-xs py-2 px-3 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-600 hover:text-brand-600 transition-colors font-medium"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}