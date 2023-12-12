import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the selected image to the data URL
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Display the selected image if available */}
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected Profile Picture"
          style={{ width: '100px', height: '100px' }}
        />
      )}

      {/* Input element for selecting an image */}
      <label htmlFor="imageInput">Click to pick an image:</label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageUpload;
