import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdDetails = () => {
  const [adDetails, setAdDetails] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      const storedAds = JSON.parse(localStorage.getItem('adData')) || [];
      const ad = storedAds[id];
      setAdDetails(ad);
    }
  }, [id]);

  if (!adDetails) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{adDetails.heading1}</h1>
      <h2 className="text-3xl mb-2">{adDetails.heading2}</h2>
      <p className="mb-4 text-gray-700">{adDetails.description}</p>

      {/*  Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {adDetails.landscapeImage && <img src={adDetails.landscapeImage} alt="Landscape" className="w-full rounded" />}
        {adDetails.portraitImage && <img src={adDetails.portraitImage} alt="Portrait" className="w-full rounded" />}
        {adDetails.squareImage && <img src={adDetails.squareImage} alt="Square" className="w-full rounded" />}
      </div>

      {/* Video */}
      {adDetails.videoUrl && (
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Video</h3>
          <iframe
            className="w-full h-64"
            src={adDetails.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Business Name */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Business Name</h3>
        <p className="text-lg">{adDetails.businessName}</p>
      </div>

      {/* Button Label and Website */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Website</h3>
        <a
          href={adDetails.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {adDetails.buttonLabel}
        </a>
      </div>
    </div>
  );
};

export default AdDetails;

