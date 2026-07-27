import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Input from "../components/Input";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      toast.success("Registration successful. Please sign in.");
      navigate("/login");
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR DATA:", error.response?.data);
      setErrorMessage("We couldn't create your account. Please try again in a moment.");
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join JobTracker and keep every opportunity organized."
      accentTitle="Start your job journey."
      accentBody="Create your account to keep applications, interviews, and next steps in one place."
      bulletPoints={[
        "Track applications with ease",
        "Manage your career progress",
        "Grow professionally with more clarity",
      ]}
    >
      <form onSubmit={handleRegister} className="space-y-5">
        <Input
          label="Name"
          type="text"
          icon={<User size={18} />}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          icon={<Mail size={18} />}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          type="password"
          icon={<Lock size={18} />}
          placeholder="Create password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          autoComplete="new-password"
          required
        />

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[#6E8B74] transition hover:text-[#5E7964]">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;