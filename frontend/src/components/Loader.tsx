import "./../assets/Loader.css";

function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-700 opacity-70">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default Loader;
