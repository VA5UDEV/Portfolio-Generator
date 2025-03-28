import React from "react";

export default function Footer() {
  return (
    <footer className="h-4 bg-transparent text-gray-600 text-center py-4 ">
      <p>© {new Date().getFullYear()} Portfolio Generator. All rights reserved.</p>
    </footer>
  );
}
