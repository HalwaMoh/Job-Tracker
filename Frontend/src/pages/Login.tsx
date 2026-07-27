import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Input from "../components/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error: any) {
      console.log("LOGIN ERROR DATA:", error.response?.data);
      console.log("LOGIN ERROR STATUS:", error.response?.status);
      console.log("FULL ERROR:", error);
      setErrorMessage("We couldn't sign you in. Please check your email and password and try again.");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue your journey with a calm, organized dashboard."
      accentTitle="Track every opportunity."
      accentBody="Organize applications, track interviews, and keep your next move in sight."
      bulletPoints={[
        "Keep applications organized",
        "Track interview progress",
        "Stay focused on your next opportunity",
      ]}
    >
      <form onSubmit={handleLogin} className="space-y-5">
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          autoComplete="current-password"
          required
        />

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Continue to dashboard"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-[#6E8B74] transition hover:text-[#5E7964]">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;