import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import videosContext from '../context/videos/videosContext';

const Carousel = () => {
    const { showCarousel, setshowCarausel, CarouselIndex, imageUrls } =
        useContext(videosContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showThumbnails, setShowThumbnails] = useState(false);

    const [imageData, setImageData] = useState([]); // ✅ base64 images
    const [loadingIndexes, setLoadingIndexes] = useState({}); // ✅ loading state

    const thumbnailsRef = useRef(null);



    useEffect(() => {
        setCurrentIndex(0);
        setImageData([]);          // Clear old images
        setLoadingIndexes({});     // Reset loading state
        setShowThumbnails(false);  // Hide thumbnails
    }, [imageUrls]);

    // Fetch image base64
    const fetchImageData = async (url, index) => {
        try {
            setLoadingIndexes(prev => ({ ...prev, [index]: true }));

            const res = await fetch('/api/getImageData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();

            setImageData(prev => {
                const copy = [...prev];
                copy[index] = data.base64;
                return copy;
            });
        } catch (err) {
            console.error("Image fetch failed:", err);
        } finally {
            setLoadingIndexes(prev => ({ ...prev, [index]: false }));
        }
    };

    // Fetch all images when carousel opens
    useEffect(() => {
        if (!showCarousel) return;

        imageUrls.forEach((url, index) => {
            if (!imageData[index]) {
                fetchImageData(url, index);
            }
        });
    }, [showCarousel]);

    // Center thumbnail
    useEffect(() => {
        if (!thumbnailsRef.current) return;
        const el = thumbnailsRef.current.children[currentIndex];
        if (!el) return;

        thumbnailsRef.current.scrollTo({
            left: el.offsetLeft - thumbnailsRef.current.clientWidth / 2 + el.clientWidth / 2,
            behavior: 'smooth',
        });
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex(i => (i === 0 ? imageUrls.length - 1 : i - 1));
        setShowThumbnails(true);
    };

    const handleNext = () => {
        setCurrentIndex(i => (i === imageUrls.length - 1 ? 0 : i + 1));
        setShowThumbnails(true);
    };

    return (
        <div className={`${showCarousel ? "fixed" : "hidden"} inset-0 bg-black bg-opacity-90 z-50`}>
            <IoIosClose
                onClick={() => setshowCarausel(false)}
                className="absolute top-4 right-4 text-gray-300 text-4xl cursor-pointer z-50"
            />

            {/* Image */}
            <div className="flex items-center justify-center w-full h-full">
                {loadingIndexes[currentIndex] && (
                    <div className="absolute bottom-10 w-1/2 h-1 bg-gray-700 rounded">
                        <div className="h-full bg-white animate-pulse rounded" />
                    </div>
                )}

                {imageData[currentIndex] && (
                    <img
                        src={`data:image/jpeg;base64,${imageData[currentIndex]}`}
                        className="max-w-full max-h-full object-contain"
                        onClick={() => setShowThumbnails(!showThumbnails)}
                        alt=""
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div
                className={`absolute bottom-5 left-1/2 -translate-x-1/2 transition-opacity ${showThumbnails ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div style={{
                    scrollbarWidth: "none",      // Firefox
                    msOverflowStyle: "none",     // IE/Edge
                }} ref={thumbnailsRef} className="flex gap-2 overflow-x-auto px-4 ">
                    {imageData.map((img, i) => (
                        <img
                            key={i}
                            src={`data:image/jpeg;base64,${img}`}
                            className={`h-16 w-12 object-cover rounded cursor-pointer ${i === currentIndex ? "border-2 border-white scale-125" : ""}`}
                            onClick={() => setCurrentIndex(i)}
                        />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <button className="absolute left-4 top-1/2" onClick={handlePrev}>
                <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>

            <button className="absolute right-4 top-1/2" onClick={handleNext}>
                <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
        </div>
    );
};

export default Carousel;
