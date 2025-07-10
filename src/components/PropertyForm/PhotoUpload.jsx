import React, { useRef, useState } from "react";

export default function PhotoUpload ({ photos, setPhotos, onBack, onContinue })  {
  const inputRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  // Handles file selection or drop
  const handleFiles = files => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
    setPhotos(prev => [...prev, ...imageFiles]);
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Browse button
  const handleBrowse = (e) => {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files);
    }
  };

  // Remove a photo
  const handleRemove = idx => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Add Photos</h2>
      <div
        className={`border-2 border-dashed rounded-xl bg-[#f8f8fc] py-16 px-8 flex flex-col items-center justify-center mb-8 transition-all 
          ${dragActive ? "border-[#4338ca] bg-[#ece9fc]" : "border-[#d7d7e9]"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        style={{ cursor: "pointer" }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleBrowse}
        />
        <img
          src="https://static.thenounproject.com/png/3322766-200.png"
          alt="Upload"
          className="w-16 h-16 mb-3 opacity-70"
        />
        <div className="text-center mb-2 font-medium text-gray-600">Drag and drop here</div>
        <div className="text-center mb-4 text-gray-400 text-sm">or</div>
        <button
          type="button"
          className="px-6 py-2 rounded-md border border-[#a792e4] bg-[#f3efff] text-[#4338ca] font-semibold shadow-sm"
          onClick={e => { e.stopPropagation(); inputRef.current.click(); }}
        >
          Browse
        </button>
      </div>

      {/* Show previews if any */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {photos.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                onClick={e => { e.stopPropagation(); handleRemove(idx); }}
                type="button"
                title="Remove"
              >×</button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <button
            className="py-2 px-6 rounded-lg font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
            type="button"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className={`py-2 px-10 rounded-lg font-bold shadow transition-all
              ${photos.length > 0
                ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
            disabled={photos.length === 0}
            type="button"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};


