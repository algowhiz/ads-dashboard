import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdCards = () => {
  const [ads, setAds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedAds = JSON.parse(localStorage.getItem('adData')) || [];
    setAds(storedAds);
  }, []);

  const handleCardClick = (index) => {
    router.push(`/ads/${index}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {ads.map((ad, index) => (
        <div
          key={index}
          className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
          onClick={() => handleCardClick(index)}
        >
          <h2 className="text-2xl font-bold mb-2">{ad.heading1}</h2>
          <p className="text-sm text-gray-500">{ad.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AdCards;
