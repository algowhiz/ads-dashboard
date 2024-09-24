// components/Navbar.jsx
import Link from 'next/link'; // Next.js built-in Link
import { Button } from './ui/button';
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-3 px-8 bg-white shadow-xl">
      {/* Left side: Logo */}
      <Link href={'/'}>
        <div className=" text-nowrap md:text-xl text-black truncate font-bold">
          APP LOGO
        </div>
      </Link>

      {/* Right side: Navigation links */}
      <div className="flex space-x-8 text-gray-700">
        <Link href="/" className="hover:text-black md:text-lg text-sm truncate transition-colors">
          DASHBOARD
        </Link>
        <Link href="/create-ads" className="hover:text-black  md:text-lg  text-sm truncate transition-colors">
          CREATE ADS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
