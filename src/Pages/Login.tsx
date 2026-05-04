import Logo from "../Components/Header/logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [viewPassword, setViewPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isValid = identifier.trim() && password.trim();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await login({ identifier, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.user.username);

      navigate("/select-quiz");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* MOBILE + TABLET IMAGE (SMALL HEIGHT LIKE RESET PAGE) */}
      <div className="w-full lg:hidden h-30 sm:h-20 md:h-24">
        <img src="/side.jpg" className="w-full h-full object-cover" />
      </div>

      {/* DESKTOP IMAGE */}
      <div className="hidden lg:block lg:w-1/2">
        <img src="/side.jpg" className="w-full h-full object-cover" />
      </div>

      {/* FORM */}
      <div className="flex flex-1 bg-white justify-center px-4 sm:px-10 md:px-14 lg:px-20">
        <div className="w-full max-w-md flex flex-col">
          {/* LOGO */}
          <div className="pt-2 w-full">
            <Logo />
          </div>

          {/* CENTER FORM (BALANCED, NOT TOO LOW / NOT TOO HIGH) */}
          <div className="flex flex-1 items-center justify-center py-4 sm:py-6">
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col gap-2 sm:gap-4"
            >
              {/* TITLE */}
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                  Login
                </h1>

                <p className="text-center text-lg sm:text-xl text-blue-900 font-bold">
                  Welcome Back!
                </p>

                <p className="text-center text-sm sm:text-base text-gray-500 mb-3 sm:mb-6">
                  Provide your details below to login..
                </p>
              </div>

              {/* USERNAME */}
              <div>
                <label className="text-sm font-semibold">
                  Username or Email
                </label>
                <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="border w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
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
                  />

                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute right-3 top-2 text-gray-500"
                  >
                    {viewPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>

              <Link to="/forgot-password">
                <p className="underline font-semibold text-xs sm:text-sm text-gray-700 hover:text-blue-500">
                  Forgot Password?
                </p>
              </Link>

              <button
                disabled={!isValid || loading}
                className={`py-3 rounded-lg text-white font-bold text-sm sm:text-base
                  ${
                    !isValid || loading
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {loading ? "..." : "Login"}
              </button>

              {message && (
                <p className="text-center text-xs sm:text-sm text-red-500 px-2">
                  {message}
                </p>
              )}

              <p className="text-center text-xs sm:text-sm px-2">
                Don’t have an account?{" "}
                <Link to="/signUp" className="text-blue-500 underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
