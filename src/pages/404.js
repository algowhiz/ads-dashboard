// pages/404.js
import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <h1 className="text-[96px] text2 font-serif text-black">Page 404</h1>
      <p className="text-lg mt-2  text-gray-700">The page you are looking for does not exist!</p>
      <Link href="/" className="mt-4 text-blue-600 ">
        Go back to Home
      </Link>
    </div>
  );
};

export default Custom404;
