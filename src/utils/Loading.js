import React from 'react';

const Loading = () => {
  return (
    <div className="bg-white h-screen font-serif w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className=" text-black text">Loading...</p>
        <p className="text-lg m-0 p-0  text-gray-700">Please wait while the page is loading</p>
      </div>
    </div>
  );
};

export default Loading;
