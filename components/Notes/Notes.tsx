import React from 'react';

export const Notes = () => {
  return (
    <div className="pt-4">
      <div className="flex justify-center">
        <div className="pt-4 md:w-1/2">
          <div className="p-px">
            <h1
              className="px-1 py-2 font-heading text-4xl font-semibold outline-none"
              contentEditable="true"
            >
              Notes
            </h1>
          </div>
          <div className="p-px">
            <div
              className="rounded-sm px-1 text-sm outline-none duration-100 hover:bg-surface focus:bg-surface"
              contentEditable="true"
              placeholder="edit stuff"
            >
              This page should be similar to Notion
            </div>
          </div>
          <div className="p-px">
            <div
              className="rounded-sm px-1 text-sm outline-none duration-100 hover:bg-surface focus:bg-surface"
              contentEditable="true"
              placeholder="edit stuff"
            >
              lets support titles, subtitles,
            </div>
          </div>
          <div className="p-px">
            <div
              className="rounded-sm px-1 text-sm outline-none duration-100 hover:bg-surface focus:bg-surface"
              contentEditable="true"
              placeholder="edit stuff"
            >
              lists, file and HTTP link embeds (for now)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
