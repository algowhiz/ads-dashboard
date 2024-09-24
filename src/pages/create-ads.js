import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import Link from 'next/link';

const CreateAds = () => {
  const [selectedAd, setSelectedAd] = useState(); // Default to no ad selected
  const isAdSelected = selectedAd !== undefined; // Check if an ad is selected

  const handleAdSelect = (adType) => {
    if (selectedAd === adType) {
      setSelectedAd(undefined); // Uncheck if the same ad is clicked
    } else {
      setSelectedAd(adType); // Set selected ad
    }
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className='animate-slide-in-left h-screen flex mt-36 md:mt-0 mb-20 justify-center items-center p-4'>
        <Card className='w-full h-auto lg:h-screen  md:mt-10 '>
          <CardHeader>
            <CardTitle className="text-xl md:text-xl  font-extralight ">Create Ads</CardTitle>
          </CardHeader>

          <div className="flex justify-center items-center gap-10 mt-4">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-[793px] gap-10">
              {/* Text Ad Card */}
              <div
                className={`border rounded-md p-4 w-[37%] min-w-[250px] h-auto md:h-auto lg:h-auto cursor-pointer ${selectedAd === 'text' ? ' shadow-2xl' : 'border-gray-300 shadow-md'}`}
                onClick={() => handleAdSelect('text')}
              >
                <div className="p-2 flex justify-start items-start">
                  <input
                    type="checkbox"
                    className="transform scale-150"
                    checked={selectedAd === 'text'}
                    readOnly
                  />
                </div>
                <div className="mt-5 w-full h-auto sm:h-auto flex justify-center items-center">
                  <img src="/text_img.png" alt="Text Ad" className="max-h-60  max-w-full" />
                </div>
                <p className="text-center mt-2 text-gray-400">Create</p>
                <p className="text-center mt-2 text-black text-xl font-bold">Text Ad</p>
              </div>

              {/* Media Ad Card */}
              <div
                className={`border rounded-md p-4 w-[37%] min-w-[250px] h-auto md:h-auto lg:h-auto cursor-pointer ${selectedAd === 'media' ? 'shadow-2xl' : 'border-gray-300 shadow-md'}`}
                onClick={() => handleAdSelect('media')}
              >
                <div className="p-2 flex justify-start items-start">
                  <input
                    type="checkbox"
                    className="transform scale-150"
                    checked={selectedAd === 'media'}
                    readOnly
                  />
                </div>
                <div className="mt-5 w-full h-auto sm:h-auto flex justify-center items-center">
                  <img src="/media_img.png" alt="Media Ad" className="max-h-60 max-w-full" />
                </div>
                <p className="text-center mt-2 text-gray-400">Create</p>
                <p className="text-center mt-2 text-black text-xl font-bold">Media Ad</p>
              </div>
            </div>
          </div>

          <CardFooter className="flex justify-end mt-4">
            <Link href={`${selectedAd == 'media' ? '/create-ad-form/media': '/create-ad-form/text'}`}>
              <button
                className={`px-10 text-xs sm:text-sm py-3 ${isAdSelected ? 'bg-[#0096FF] text-white' : 'bg-[#E0E0E0] cursor-not-allowed text-[#B9B9B9]'}`}
                disabled={!isAdSelected}
              >
                NEXT
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateAds;
