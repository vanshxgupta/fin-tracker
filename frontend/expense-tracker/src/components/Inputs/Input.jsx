import React, { useEffect, useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';

const Input = ({ value, onChange, label, placeholder, type,name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-black dark:text-black mb-1.5">
        {label}
      </label>

      {/* Input Box */}
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary transition">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none text-gray-900 dark:text-black placeholder-gray-400"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="ml-2 text-black hover:text-gray-950 dark:hover:text-black focus:outline-none"
          >
            {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
