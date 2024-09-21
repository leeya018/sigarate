import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">Cigarette Tracker</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Main
            </Link>
          </li>
          <li>
            <Link href="/settings" className="hover:underline">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
