import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-br from-color1 to-color2 relative overflow-hidden">
      {/* Top abstract design + logo */}
      <div className="relative z-10 px-6 pt-16 text-white text-center">
        <h1 className="text-4xl font-bold">Take Notes!</h1>
        <p className="text-sm mt-2 tracking-widest">By Pratikshit Kumar</p>
      </div>

      {/* Abstract SVG wave */}
      {/* <div className="absolute top-0 left-0 right-0 h-80">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.99,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "white" }}
          ></path>
        </svg>
      </div> */}

      {/* White bottom section */}
      <div className="z-10 bg-white rounded-t-3xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="card icon"
            className="w-14 h-14"
          />
        </div>
        <p className="text-gray-700 text-sm mb-6 px-2">
          Organize, find, and enjoy your Daily Note cards in a more modern and dynamic way.
        </p>

        <div className="flex flex-col gap-3 px-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-black text-white font-semibold py-3 rounded-full"
          >
            SIGN UP
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border-2 border-black text-black font-semibold py-3 rounded-full"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
