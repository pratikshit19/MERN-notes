import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='w-12 h-12 flex rounded-full items-center justify-center bg-slate-200 text-slate-950 font-medium'>
        {getInitials(userInfo?.fullName)}
      </div>

      <div>
        <p className='text-xs lg:text-sm font-medium'>{userInfo?.fullName}</p>
        <button className='text-sm text-red-700 underline' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo
