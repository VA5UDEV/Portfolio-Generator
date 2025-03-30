import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center" style={{ width }}>
      {/* Logo icon */}
      <div className="mr-2 text-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M14 9l3 3-3 3" />
        </svg>
      </div>

      {/* Logo text */}
      <div className="font-bold text-xl text-gray-900">
        Portfolio<span className="text-blue-600">Gen</span>
      </div>
    </div>
  );
}

export default Logo;
