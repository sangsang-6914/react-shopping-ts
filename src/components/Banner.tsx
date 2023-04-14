import React from 'react';

function Banner() {
  return (
    <div className="relative h-96 bg-yellow-700">
      <img
        className="h-full w-full opacity-80"
        src={'./image/banner.jpg'}
        alt="banner"
      />
      <div className="font-bold text-center absolute w-full top-32 text-white drop-shadow-2xl">
        <p className="text-5xl">Shop with US</p>
        <p className="text-xl">Best Products, High Quality</p>
      </div>
    </div>
  );
}

export default Banner;
