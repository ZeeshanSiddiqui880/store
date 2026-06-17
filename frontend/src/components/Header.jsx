import React from "react";
import { MdMenu } from "react-icons/md";
import { useLocation } from "react-router-dom";
function Header({ setSidebarOpen, role }) {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/users": "Users",
    "/admin/stores": "Stores",
  };
  console.log(role);
  const name = localStorage.getItem("username");
  

  const title = pageTitles[location.pathname];
  return (
    <>
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <MdMenu className="text-2xl" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-md hidden sm:block">
            Welcome back, {role.toUpperCase()}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
