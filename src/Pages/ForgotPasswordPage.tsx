import Logo from "../Components/Header/logo";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const { mutate: sendResetEmail, isPending } = useForgotPassword();

  const isValid = email.trim() !== "";

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid || cooldown > 0) return;

    sendResetEmail(email, {
      onSuccess: (data) => {
        setMessage(data.message);
        setSuccess(true);
        setCooldown(60);
      },
      onError: (err: any) => {
        setMessage(err?.response?.data?.message || "Error occurred");
      },
    });
  };

  const buttonDisabled = isPending || !isValid || cooldown > 0;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* MOBILE / TABLET IMAGE (SMALL HEIGHT like reset page) */}
      <div className="w-full lg:hidden h-30 sm:h-24 md:h-28">
        <img src="/side.jpg" className="w-full h-full object-cover" />
      </div>

      {/* DESKTOP IMAGE */}
      <div className="hidden lg:block lg:w-1/2">
        <img src="/side.jpg" className="w-full h-full object-cover" />
      </div>

      {/* FORM SECTION */}
      <div className="flex flex-1 bg-white justify-center px-4 sm:px-10 md:px-14 lg:px-20">
        <div className="w-full max-w-md flex flex-col">
          {/* LOGO */}
          <div className="pt-2 w-full">
            <Logo />
          </div>

          {/* CENTERED FORM */}
          <div className="flex flex-1 items-center justify-center py-4">
            <div className="w-full">
              {success ? (
                <div className="text-center w-full">
                  <h1 className="text-2xl font-bold text-green-600 mb-2">
                    Check your email 📩
                  </h1>

                  <p className="text-gray-600 mb-2">Reset link sent to:</p>

                  <p className="font-semibold text-blue-900 mb-6">{email}</p>

                  <button
                    onClick={() => sendResetEmail(email)}
                    disabled={cooldown > 0}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      cooldown > 0
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Email"}
                  </button>

                  <p className="mt-4 text-sm">
                    Back to{" "}
                    <Link className="text-blue-500 underline" to="/Login">
                      Login
                    </Link>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4"
                >
                  <div className="flex flex-col">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">
                      Forgot Password
                    </h1>

                    <p className="text-center text-blue-900 font-bold text-lg sm:text-xl">
                      Reset your password
                    </p>

                    <p className="text-center text-gray-500 mb-4 text-sm sm:text-base ">
                      Enter your email to receive reset link...
                    </p>
                  </div>

                  {/* LABEL */}
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  {/* INPUT */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                  />

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={buttonDisabled}
                    className={`w-full py-2 rounded-lg font-bold text-white text-sm sm:text-base transition ${
                      buttonDisabled
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {isPending
                      ? "Sending..."
                      : cooldown > 0
                        ? `Wait ${cooldown}s`
                        : "Send Reset Link"}
                  </button>

                  {message && (
                    <p className="text-center text-sm px-2">{message}</p>
                  )}

                  <p className="text-center text-sm">
                    Remember password?{" "}
                    <Link className="text-blue-500 underline" to="/Login">
                      Login
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
