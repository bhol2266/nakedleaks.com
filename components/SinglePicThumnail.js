import React, { useState, useContext } from 'react';
import videosContext from '../context/videos/videosContext';

function SinglePicThumnail({ picURL, index }) {
    const { showCarousel, setshowCarausel, CarouselIndex, setCarouselIndex } = useContext(videosContext);
    const [imageSrc, setImageSrc] = useState(picURL);

    const handleImageError = async () => {
        try {
            // Send a POST request with the image URL in the request body
            const response = await fetch('/api/getImageData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: picURL }),
            });

            // Check if the response is OK
            if (!response.ok) {
            }

            // Parse the JSON response to get the base64-encoded string
            const data = await response.json();
            const base64Image = data.base64;

            // Update the image source
            setImageSrc(base64Image);
        } catch (error) {
            console.error('Error fetching image data:', error);
            // Optionally handle the error (e.g., show a placeholder image)
            setImageSrc('/path/to/placeholder-image.jpg'); // Fallback placeholder image
        }
    };


    return (
        <div onClick={() => { setshowCarausel(true); setCarouselIndex(index) }} key={index} className="relative overflow-hidden">
            <img
                // src={imageSrc}
                src="/dummy_image.png"

                alt={picURL}
                onError={handleImageError} // Call this function if the image fails to load

                className="w-auto h-[200px] object-cover m-1 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 "
            />
        </div>
    );
}

export default SinglePicThumnail;
