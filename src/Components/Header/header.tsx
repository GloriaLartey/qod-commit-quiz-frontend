import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { FiUser, FiMoreVertical } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "";

  const isLoggedIn = !!token;

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const [image, setImage] = useState<string | null>(
    localStorage.getItem("profileImage"),
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const firstNameRaw = username ? username.split(" ")[0] : "";
  const firstName =
    firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1);

  const initials = username
    ? username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);
      localStorage.setItem("profileImage", base64);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    localStorage.removeItem("profileImage");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  const HelpModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">How to use QodCommit</h2>

        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li>
            Click "Get Started" to sign up or "Login" if you already have an
            account.
          </li>
          <li>Select a quiz of your choice.</li>
          <li>Use the QR code or click "Start Quiz".</li>
          <li>Click "View Scores" to see your performance.</li>
        </ol>

        <button
          onClick={() => setHelpOpen(false)}
          className="mt-5 bg-purple-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="flex justify-between items-center px-3 md:px-4 py-3 relative flex-wrap gap-2">
        {/* LOGO */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* NOT LOGGED IN */}
        {!isLoggedIn && (
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/login">
              <button className="text-sm md:text-base bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-green-500 transition">
                Login
              </button>
            </Link>

            <button onClick={() => setHelpOpen(true)}>
              <img
                src="help.png"
                className="h-5 w-5 md:h-7 md:w-7 object-contain bg-blue-400 pl-1.5 rounded-full"
              />
            </button>
          </div>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <div className="flex items-center gap-2 md:gap-3 relative h-10">
            {/* USERNAME */}
            <span className="text-white font-semibold text-xs md:text-sm truncate max-w-[80px] md:max-w-none">
              {firstName || "User"}
            </span>

            {/* PROFILE */}
            <div ref={profileRef} className="relative flex items-center">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {image ? (
                  <img src={image} className="w-full h-full object-cover" />
                ) : initials ? (
                  <span className="font-bold text-purple-700 text-xs md:text-sm">
                    {initials}
                  </span>
                ) : (
                  <FiUser size={16} />
                )}
              </div>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50">
                  <label className="cursor-pointer text-sm hover:text-purple-600">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={removeImage}
                    className="text-left text-sm text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* MENU */}
            <div ref={menuRef} className="relative flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <FiMoreVertical size={20} className="text-white" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50">
                  <button
                    onClick={() => setHelpOpen(true)}
                    className="text-left text-sm hover:text-purple-600"
                  >
                    Help
                  </button>

                  <button
                    onClick={handleLogout}
                    className="text-left text-sm text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {helpOpen && <HelpModal />}
    </>
  );
}
