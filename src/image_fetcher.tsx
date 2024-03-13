import React, { useEffect, useState } from 'react';

const ImageComponent = () => {
 const [imageUrl, setImageUrl] = useState('');

 useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('http://localhost:5000/get-image/your-image.jpg');
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