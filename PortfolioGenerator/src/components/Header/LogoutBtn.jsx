import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authslice";

function LogoutBtn({ isMobile, closeMenu }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      if (closeMenu) closeMenu(); // Close mobile menu after logout
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isMobile
          ? "w-full text-left text-gray-700 hover:bg-blue-50"
          : "text-gray-700 hover:bg-blue-50"
      }`}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
