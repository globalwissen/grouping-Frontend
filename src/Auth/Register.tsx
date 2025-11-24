/* eslint-disable @typescript-eslint/no-explicit-any */
/* Register.tsx */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlus } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    university: "",
    department: "",
    category: "",
    personalityTypes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        personalityTypes: form.personalityTypes.split(",").map((p) => p.trim()),
      };

      await axios.post("http://localhost:5000/api/student/register", payload);

      alert("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
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
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-[#003058] px-4 py-2"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-[#003058] px-4 py-2"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full border-2 border-[#003058] px-4 py-2"
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
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <select
            className="w-full border-2 border-[#003058] px-4 py-2"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="techpreneur">Techpreneur</option>
            <option value="intrapreneur">Intrapreneur</option>
          </select>

          <input
            placeholder="Personality Types (comma separated)"
            className="w-full border-2 border-[#003058] px-4 py-2"
            onChange={(e) =>
              setForm({ ...form, personalityTypes: e.target.value })
            }
          />

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
