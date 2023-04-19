function Banner() {
  return (
    <div className="relative h-96 bg-yellow-700">
      <img
        className="h-full w-full opacity-80"
        src={'./image/banner.jpg'}
        alt="banner"
      />
      <div className="absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl">
        <p className="text-6xl">Shop with US</p>
        <p className="text-xl">Best Products, High Quality</p>
      </div>
    </div>
  );
}

export default Banner;
