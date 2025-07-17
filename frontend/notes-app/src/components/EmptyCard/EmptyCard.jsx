import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-white">
      <img src={imgSrc} alt="No notes" className="w-48 opacity-20 mb-6" />
      <p className="w-2/3 text-sm font-light text-center leading-6">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;