import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {
  return (
    <div className='rounded-xl p-4 bg-[#2a3046] hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h4 className='text-white text-lg font-normal'>{title}</h4>
                <span className='text-xs text-slate-400'>{moment(date).format('Do MMM YYYY')}</span>
            </div>

            <MdOutlinePushPin
                className={`icon-btn ${isPinned ? 'text-blue-500' : 'text-slate-400'}`}
                onClick={onPinNote}
                />        
        </div>

        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-slate-400'>{tags.map((item)=> `#${item}`)}</div>
            <div className='flex items-center gap-2'>
                <MdCreate
                    className='icon-btn hover:text-blue-500'
                    onClick={onEdit}
                    />
                <MdDelete
                    className='icon-btn hover:text-red-600'
                    onClick={onDelete}
                    />

            </div>
        </div>

    </div>
  )
}

export default NoteCard