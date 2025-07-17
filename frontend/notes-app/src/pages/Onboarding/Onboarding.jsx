import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-color1 to-color2">
      {/* Header */}
      <div className="px-6 pt-16 text-white text-center">
        <h1 className="text-4xl font-bold">Take Notes!</h1>
        <p className="text-sm mt-2 tracking-widest">By Pratikshit Kumar</p>
      </div>

      {/* White bottom section */}
      <div className="flex-grow bg-white rounded-t-3xl p-6 text-center mt-44">
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
