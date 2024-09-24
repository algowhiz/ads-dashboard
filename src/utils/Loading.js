import React, { useEffect } from 'react';

const Loading = () => {

  useEffect(() => {
    // Lock the scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Unlock the scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="bg-white h-screen font-serif overflow-hidden w-full flex flex-col  justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className=" text-black text">Loading...</p>
        <p className="text-lg m-0 p-0  text-gray-700">Please wait while the page is loading</p>
      </div>
    </div>
  );
};

export default Loading;
