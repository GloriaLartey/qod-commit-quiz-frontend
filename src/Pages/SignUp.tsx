import Logo from "../Components/Header/logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signup } from "../api/auth";

export default function SignUp() {
  const navigate = useNavigate();

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= PASSWORD STRENGTH =================
  const getStrength = (pwd: string) => {
    let score = 0;

    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1)
      return { label: "Weak", color: "text-red-500", bar: "bg-red-500 w-1/3" };

    if (score === 2 || score === 3)
      return {
        label: "Medium",
        color: "text-yellow-500",
        bar: "bg-yellow-500 w-2/3",
      };

    return {
      label: "Strong",
      color: "text-green-500",
      bar: "bg-green-500 w-full",
    };
  };

  const strength = getStrength(password);

  // ================= VALIDATION =================
  const isValid =
    username.trim() &&
    email.trim() &&
    password.trim() &&
    confirmPassword.trim() &&
    password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      setLoading(true);

      const res = await signup({ username, email, password });
      setMessage(res.message || "Account created!");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* MOBILE + TABLET IMAGE (SMALL HEIGHT) */}
      <div className="w-full lg:hidden h-30 sm:h-20 md:h-24">
        <img src="/side-img1.png" className="w-full h-full object-cover" />
      </div>

      {/* DESKTOP IMAGE */}
      <div className="hidden lg:block lg:w-1/2">
        <img src="/side-img1.png" className="w-full h-full object-cover" />
      </div>

      {/* FORM */}
      <div className="flex flex-1 bg-white justify-center px-4 sm:px-10 md:px-14 lg:px-20">
        <div className="w-full max-w-md flex flex-col">
          {/* LOGO */}
          <div className="pt-2 w-full">
            <Logo />
          </div>

          {/* CENTERED FORM */}
          <div className="flex flex-1 items-center justify-center py-4 sm:py-6">
            <div className="w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-center">
                Create Account
              </h1>

              <p className="text-center text-lg sm:text-xl text-blue-900 font-bold">
                Welcome, Genius!
              </p>

              <p className="text-center text-sm sm:text-base text-gray-500 mb-3 sm:mb-6">
                Enter your details to sign up..
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:gap-4"
              >
                {/* USERNAME */}
                <div>
                  <label className="text-sm font-semibold">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                    placeholder="Enter username"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="border w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                    placeholder="Enter email"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-sm font-semibold">Password</label>

                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={viewPassword ? "text" : "password"}
                      className="border w-full px-3 sm:px-4 py-2 rounded-lg pr-10 text-sm sm:text-base"
                      placeholder="Enter password"
                    />

                    <button
                      type="button"
                      onClick={() => setViewPassword(!viewPassword)}
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      {viewPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>

                  {/* PASSWORD STRENGTH */}
                  {password && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded">
                        <div className={`h-2 ${strength.bar}`} />
                      </div>
                      <p className={`text-sm ${strength.color}`}>
                        {strength.label} password
                      </p>
                    </div>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="text-sm font-semibold">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={viewConfirmPassword ? "text" : "password"}
                      className="border w-full px-3 sm:px-4 py-2 rounded-lg pr-10 text-sm sm:text-base"
                      placeholder="Confirm password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setViewConfirmPassword(!viewConfirmPassword)
                      }
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      {viewConfirmPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>

                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-sm">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  disabled={!isValid || loading}
                  className={`w-full py-2 rounded-lg text-white font-bold text-sm sm:text-base transition
                    ${
                      !isValid || loading
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                  {loading ? "Creating..." : "Sign Up"}
                </button>

                {message && <p className="text-center text-sm">{message}</p>}

                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
