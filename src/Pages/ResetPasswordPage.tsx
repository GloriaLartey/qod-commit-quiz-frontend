import Logo from "../Components/Header/logo";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  const { mutate: resetUserPassword, isPending } = useResetPassword();

  // 🔥 PASSWORD STRENGTH LOGIC
  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      return {
        label: "Weak",
        color: "text-red-500",
        bar: "bg-red-500 w-1/3",
      };

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

  const strength = getPasswordStrength(password);

  // ✅ VALIDATION
  const isFormValid =
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

  const handleReset = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    resetUserPassword(
      { token: token!, password },
      {
        onSuccess: (data) => {
          setMessage(data.message);

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (err: any) => {
          setMessage(err?.response?.data?.message || "Reset failed");
        },
      },
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* IMAGE */}
      {/* IMAGE */}
      <div className="w-full lg:hidden h-30 sm:h-24 md:h-28">
        <img src="/side-img1.png" className="w-full h-full object-cover" />
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <img src="/side-img1.png" className="w-full h-full object-cover" />
      </div>

      {/* FORM */}
      <div className="flex flex-1 bg-white justify-center px-4 sm:px-10 md:px-14 lg:px-20">
        <div className="w-full max-w-md flex flex-col">
          <div className="pt-2">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            <div className="w-full">
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                  Reset Password
                </h1>

                <p className="text-blue-900 text-lg md:text-xl lg:text-2xl font-bold text-center">
                  Create a new password
                </p>

                <p className="text-gray-500 text-sm text-center mb-6">
                  Enter your new password below..
                </p>
              </div>

              <form onSubmit={handleReset} className="flex flex-col gap-4">
                {/* PASSWORD */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      type={viewPassword ? "text" : "password"}
                      placeholder="Enter new password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                    />

                    <button
                      type="button"
                      onClick={() => setViewPassword(!viewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {viewPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>

                  {/* STRENGTH */}
                  {password && (
                    <div className="mt-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${strength.bar}`}></div>
                      </div>
                      <p
                        className={`text-sm mt-1 font-semibold ${strength.color}`}
                      >
                        {strength.label} password
                      </p>
                    </div>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={viewConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setViewConfirmPassword(!viewConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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

                {/* BUTTON (CENTERED ONLY CHANGE) */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isPending || !isFormValid}
                    className={`
                      w-full bg-green-500 text-white font-bold py-2 rounded-lg transition
                      ${
                        isPending || !isFormValid
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-600"
                      }
                    `}
                  >
                    {isPending ? "Resetting..." : "Reset Password"}
                  </button>
                </div>

                {/* MESSAGE */}
                {message && (
                  <p className="text-center text-sm text-gray-700">{message}</p>
                )}

                {/* LOGIN LINK */}
                <p className="text-center text-sm mt-3">
                  Remember your password?{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Login
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
