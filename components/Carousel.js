 import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import videosContext from '../context/videos/videosContext';


const Carousel = () => {

    const { showCarousel, setshowCarausel, CarouselIndex, imageUrls,setImageUrls } = useContext(videosContext);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const thumbnailsRef = useRef(null);



    // Update currentIndex when CarouselIndex from context changes
    useEffect(() => {
        if (CarouselIndex >= 0 && CarouselIndex < imageUrls.length) {
            setCurrentIndex(CarouselIndex);
        }
    }, [CarouselIndex, imageUrls.length]);

    // Center the selected thumbnail when currentIndex changes
    useEffect(() => {
        if (thumbnailsRef.current) {
            const thumbnailElements = thumbnailsRef.current.children;
            const selectedThumbnail = thumbnailElements[currentIndex];
            if (selectedThumbnail) {
                const containerWidth = thumbnailsRef.current.clientWidth;
                const thumbnailWidth = selectedThumbnail.clientWidth;
                const scrollLeft = selectedThumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
                thumbnailsRef.current.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
        );
        setShowThumbnails(true); // Show thumbnails when navigating
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        );
        setShowThumbnails(true); // Show thumbnails when navigating
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
        setShowThumbnails(true);
    };




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
                throw new Error('Failed to fetch image data');
            }

            // Parse the JSON response to get the base64-encoded string
            const data = await response.json();
            const base64Image = data.base64;

            const updatedImages = [...images];
            updatedImages[index] = base64Image;

            // Set the updated images array
            setImageUrls(updatedImages);

        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };



    return (
        <div className={`${showCarousel ? "fixed" : "hidden"} inset-0 flex items-center justify-center bg-black bg-opacity-90 select-none`} data-carousel="slide">
            <div className='absolute right-4 top-4 lg:top-8 lg:right-8 p-2 z-50 rounded-full bg-black bg-opacity-50 flex justify-center items-center'>
                <IoIosClose onClick={() => { setshowCarausel(false) }} className="cursor-pointer text-gray-300 text-[30px] lg:text-[40px]" />
            </div>

            {/* Carousel wrapper */}
            <div className="relative w-full">
                {imageUrls.map((image, index) => (
                    <div
                        key={index}
                        className={`${index === currentIndex ? 'block' : 'hidden'} duration-700 ease-in-out`}
                        data-carousel-item
                    >
                        <img
                            src={image}
                            className="rounded-lg w-screen h-screen object-contain"
                            alt={`Slide ${index + 1}`}
                            onClick={() => setShowThumbnails(!showThumbnails)}
                        />
                    </div>
                ))}
            </div>

            {/* Slider indicators */}
            <div
                className={`absolute z-40 flex left-1/2 -translate-x-1/2 bottom-5 transition-opacity duration-300 w-full ${showThumbnails ? 'opacity-100' : 'opacity-0'}`}
            >
                <div ref={thumbnailsRef} className='flex space-x-1 items-center mx-auto overflow-x-auto scrollbar-hide px-4'>
                    {imageUrls.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className={`h-16 w-12 object-cover rounded-lg cursor-pointer transition-transform duration-300 my-2 ${index === currentIndex ? 'border-2 border-white scale-125 z-50' : ''}`}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => handleIndicatorClick(index)}
                            aria-label={`Thumbnail ${index + 1}`}
                            onError={() => handleImageError(index)}

                        />
                    ))}
                </div>
            </div>

            {/* Slider controls */}
            <button
                type="button"
                className="select-none absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none focus:ring-0"
                onClick={handlePrev}
                data-carousel-prev
                style={{ WebkitTapHighlightColor: 'transparent' }}

            >
                <div className='h-10 w-10 rounded-full bg-black bg-opacity-50 flex justify-center items-center'>
                    <ChevronLeftIcon className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
            </button>

            <button
                type="button"
                className="select-none absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none focus:ring-0"
                onClick={handleNext}
                data-carousel-next
                style={{ WebkitTapHighlightColor: 'transparent' }}

            >
                <div className='h-10 w-10 rounded-full bg-black bg-opacity-50 flex justify-center items-center'>
                    <ChevronRightIcon className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
            </button>
        </div>
    );
};

export default Carousel;
