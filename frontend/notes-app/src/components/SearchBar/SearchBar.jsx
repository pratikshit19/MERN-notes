import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {IoMdClose} from 'react-icons/io';

const SearchBar = ({value, onChange, onClearSearch, handleSearch}) => {
  return (
    <div className='flex lg:w-96 sm:w-24 items-center px-3 mr-2 bg-[#2a3046] rounded-xl'>
      <input
        type='text'
        placeholder='Search Notes'
        className='w-full bg-transparent text-xs outline-none px-2 py-[11px]'
        value={value}
        onChange={onChange}
        />

        { value && (
            <IoMdClose 
            className='text-xl text-slate-400 cursor-pointer hover:text-black mr-3' 
            onClick={onClearSearch} 
            />
        )}

        <FaMagnifyingGlass 
            className='text-slate-400 cursor-pointer hover:text-black' 
            onClick={handleSearch} 
            />
    </div>
  )
}

export default SearchBar
