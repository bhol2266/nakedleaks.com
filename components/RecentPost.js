import Link from 'next/link';
import React, { useState } from 'react';
import PopunderAds from './Ads/Popunder';
import { Eye, Folder, FileText, Tags } from "lucide-react"; // icons
import categories from "../JsonData/photos/categories_list.json";
import tags from "../JsonData/photos/tags_list.json";

function RecentPost({ data, imageIndex }) {
    const [showImage, setShowImage] = useState(true);

    const href = data.href;


    function getAlbumlink(href) {
        const newHref = href.replaceAll("_", "+").toLowerCase()
        return `/album/${href}`;
    }

    return (
        <div className="p-2 bg-[#F1F1F1]">
            <PopunderAds />
            <div className="p-2 animate-fade flex flex-col justify-center rounded-2xl shadow-lg transform transition duration-150  overflow-hidden">




                <Link href={getAlbumlink(href)} className="cursor-pointer block">
                    {/* Thumbnail */}
                    {showImage && (
                        <div className="w-full h-full rounded-t-2xl relative flex items-center justify-center my-2">
                            {/* Image */}
                            <img
                                className="max-w-full h-[300px] bg-black object-contain rounded-t-2xl"
                                loading="lazy"
                                alt={data.title}
                                src="/dummy_image.png"
                                // src={`https://pub-5fcdf72a54cd4edbb03ec3edaa415a42.r2.dev/nakedleaks/${data.href}/thumbnail.jpg`}
                                onError={() => setShowImage(false)}
                            />

                        </div>
                    )}
                </Link>

                <Link href={`/photo/${href}`}>
                    <h1 className="text-[14px] lg:text-[15px] font-semibold font-inter 
                 hover:text-[#3A6FE1] 
                 line-clamp-2 
                 h-[3em] 
                 overflow-hidden">
                        {data.title}
                    </h1>
                </Link>



            </div>
        </div>
    );
}

export default RecentPost;
