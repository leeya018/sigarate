import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    // Get the current path on mount
    setActivePath(window.location.pathname);
  }, []);

  const isActive = (pathname: string) => {
    return activePath === pathname ? "underline" : "";
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">Cigarette Tracker</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={`hover:underline ${isActive("/")}`}>
              Main
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`hover:underline ${isActive("/settings")}`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
