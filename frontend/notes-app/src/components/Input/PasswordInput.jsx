import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ value, onChange, placeholder, autoComplete }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className='flex items-center bg-white border-[1.5px] px-5 rounded-xl mb-3'>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className='w-full text-sm bg-transparent mr-3 py-3 rounded-3xl outline-none'
        autoComplete={autoComplete || "current-password"} // fallback to current-password
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-black cursor-pointer"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
