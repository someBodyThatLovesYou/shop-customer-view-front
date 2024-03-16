import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const ImageComponent = () => {
 const [imageUrl, setImageUrl] = useState('');

 useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`${API_BASE_URL}/get-image/your-image.jpg`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    };

    fetchImage();
 }, []);

 return (
    <div>
      <img src={imageUrl} alt="Fetched from Flask" />
    </div>
 );
};

export default ImageComponent;