/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosconfig";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

export default function Register() {
  const navigate = useNavigate();

  const categoryOptions = ["entrepreneur", "techpreneur", "intrapreneur"];
  const personalityOptions: Record<string, string[]> = {
    entrepreneur: ["ENTJ", "ENTP", "ESTP", "ESFP", "ESTJ"],
    techpreneur: ["INTJ", "INTP", "ISTP", "ISFP", "ISTJ"],
    intrapreneur: ["ENFJ", "ENFP", "INFJ", "INFP", "ISFJ"],
  };

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    university: "",
    department: "",
    category: "",
    personalityTypes: [] as string[],
  });

  const [showPassword, setShowPassword] = useState(false);

  const [availablePersonalities, setAvailablePersonalities] = useState<
    string[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update personality options when category changes
    if (form.category) {
      setAvailablePersonalities(personalityOptions[form.category]);
      setForm({ ...form, personalityTypes: [] }); // reset selected personalities
    } else {
      setAvailablePersonalities([]);
    }
  }, [form.category]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.university ||
      !form.department ||
      !form.category ||
      form.personalityTypes.length === 0
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await axios.post("students/register", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Registration Succcessful...");
      navigate("/login");
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
          <UserPlus size={28} />
          <h1 className="text-2xl font-bold">Register</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full border-2 border-[#003058] px-4 py-2"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-[#003058] px-4 py-2"
            value={form.email}
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
          <select
            className="w-full border-2 border-[#003058] px-4 py-2"
            value={form.university}
            onChange={(e) => setForm({ ...form, university: e.target.value })}
          >
            <option value="">Select University</option>
            <option value="cosmopolitan">Cosmopolitan</option>
            <option value="prime">Prime</option>
            <option value="trinity">Trinity</option>
          </select>

          <input
            placeholder="Department"
            className="w-full border-2 border-[#003058] px-4 py-2"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <select
            className="w-full border-2 border-[#003058] px-4 py-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {availablePersonalities.length > 0 && (
            <div className="border-2 border-[#003058] p-2 flex flex-wrap gap-2">
              {availablePersonalities.map((p) => (
                <label key={p} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={p}
                    checked={form.personalityTypes.includes(p)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          personalityTypes: [...form.personalityTypes, p],
                        });
                      } else {
                        setForm({
                          ...form,
                          personalityTypes: form.personalityTypes.filter(
                            (pt) => pt !== p
                          ),
                        });
                      }
                    }}
                  />
                  {p}
                </label>
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#003058] text-white py-3"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p
            className="text-sm text-center text-[#003058] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
}
