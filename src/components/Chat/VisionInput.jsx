import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';

const VisionInput = ({ onImageSelect }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    if (e.target.value) {
      onImageSelect(e.target.value);
    }
  };

  return (
    <div className="flex gap-2">
      <label className="flex cursor-pointer items-center gap-2 rounded-md bg-muted px-4 py-2 hover:bg-muted/80">
        <ImagePlus className="h-4 w-4" />
        <span>Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <input
        type="url"
        value={imageUrl}
        onChange={handleUrlChange}
        placeholder="Or paste image URL..."
        className="flex-1 rounded-md bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default VisionInput;
