/* Login.tsx */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosconfig";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/students/login", form);
      toast.success("Login successful!");
      console.log(res.data);
      localStorage.setItem("studentId", res.data.student._id);
      setForm({
        email: "",
        password: "",
      });
      navigate("/dashboard"); // optional
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        toast.error(msg);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md border-2 border-[#003058] p-8">
        <div className="flex items-center gap-3 mb-6">
          <LogIn size={28} />
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-[#003058] px-4 py-2"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border-2 border-[#003058] px-4 py-2"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#003058] text-white py-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p
            className="text-sm text-center text-[#003058] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Register
          </p>
        </form>
      </div>
    </div>
  );
}
