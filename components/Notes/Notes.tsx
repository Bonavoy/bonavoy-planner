import React from 'react'

export const Notes = () => {
  return (
    <div className="pt-4">
      <div className='flex justify-center'>
        <div className='pt-4 md:w-1/2'>
          <h1 className='text-4xl font-heading font-semibold py-2 outline-none' contentEditable="true">Notes</h1>
          <div className='p-px'>
            <div className='hover:bg-surface focus:bg-surface duration-100 rounded-sm text-sm outline-none px-1' contentEditable="true" placeholder='edit stuff'>This page should be similar to Notion</div>
          </div>
          <div className='p-px'>
            <div className='hover:bg-surface focus:bg-surface duration-100 rounded-sm text-sm outline-none px-1' contentEditable="true" placeholder='edit stuff'>lets support titles, subtitles,</div>
          </div>
          <div className='p-px'>
            <div className='hover:bg-surface focus:bg-surface duration-100 rounded-sm text-sm outline-none px-1' contentEditable="true" placeholder='edit stuff'>lists, file and HTTP link embeds (for now)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes
