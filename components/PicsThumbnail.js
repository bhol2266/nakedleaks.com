import Link from 'next/link';
import React, { useState } from 'react';
import PopunderAds from './Ads/Popunder';
import { Eye, Folder, FileText, Tags } from "lucide-react"; // icons
import categories from "../JsonData/photos/categories_list.json";
import tags from "../JsonData/photos/tags_list.json";

function PicsThumbnail({ data, imageIndex }) {
    const [showImage, setShowImage] = useState(true);

    const href = data.href;

    // Format date from ISO string
    const formatDate = (dateObj) => {
        let isoDate = dateObj?.$date || dateObj; // fallback if $date is missing
        const d = new Date(isoDate);
        if (isNaN(d.getTime())) return "Invalid Date"; // safety check
        return d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    function getCategoryLink(category_title) {



        const categoryObj = categories.find(cat => cat.category_title === category_title);

        return `/category/${categoryObj?.href}`;
    }


    function getTagLink(tag_title) {
        const tagObj = tags.find(tag => tag.title === tag_title);
        return `/tag/${tagObj?.href}`;
    }


    function getAlbumlink(href) {
        const newHref = href.replaceAll("_", "+").toLowerCase()
        return `/album/${href}`;
    }

    return (
        <div className="p-2 ">
            <PopunderAds />
            <div className=" animate-fade flex flex-col justify-center rounded-2xl shadow-lg bg-[#F1F1F1] transform transition duration-150  overflow-hidden">

                <div className='px-3 pt-3 pb-2'>

                    <Link href={`/photo/${href}`}>
                        <h1 className="text-[16px] lg:text-[20px]] font-semibold  font-inter line-clamp-2 hover:text-[#3A6FE1]">
                            {data.title}
                        </h1>
                    </Link>

                    <div className='flex items-center space-x-4'>

                        {/* Date */}
                        <p className="text-[12px] lg:text-[13px] text-gray-600">{formatDate(data.date)}</p>

                        {/* Views badge (top-right) */}
                        <div className=" bg-white font-semibold mb-1 text-black text-[12px]  px-1.5 py-0.5 rounded-md">
                            {data.views} views
                        </div>
                    </div>
                </div>


                <Link href={getAlbumlink(href)} className="cursor-pointer block">
                    {/* Thumbnail */}
                    {showImage && (
                        <div className="w-full h-full rounded-t-2xl relative flex items-center justify-center my-2">
                            {/* Image */}
                            <img
                                className="max-w-full h-[300px] bg-black object-contain rounded-t-2xl"
                                loading="lazy"
                                alt={data.title}
                                // src="/dummy_image.png"
                                src={`https://pub-5fcdf72a54cd4edbb03ec3edaa415a42.r2.dev/nakedleaks/${data.href}/thumbnail.jpg`}
                                onError={() => setShowImage(false)}
                            />


                        </div>
                    )}
                </Link> 

                <div className='p-2'>



                    {/* Description */}
                    <div className="text-[14px] lg:text-[15px] font-medium">
                        <p className="line-clamp-2 min-h-[2.8em]">
                            {data.description}
                        </p>
                    </div>


                    {/* Content */}
                    <div className="flex flex-col space-y-1.5 mt-2">


                        {/* Category */}
                        <div className="flex items-center text-[13px]">
                            <img className='h-[20px] w-[20px] mr-3' src='./icons/folder.png' alt='' />
                            {data.category.split(",").map((cat, index) => (
                                <span key={index}>
                                    <Link href={getCategoryLink(cat.trim())} className="hover:underline">
                                        {cat.trim()}
                                    </Link>
                                    {index < data.category.split(",").length - 1 && ", "}
                                </span>
                            ))}
                        </div>


                        {/* Tags (comma separated, clickable, underlined) */}
                        {data.tags && data.tags.length > 0 && (
                            <div className="flex items-start text-[13px] text-[#3A6FE1] ">
                                <img className="h-[20px] w-[20px] mr-3" src="./icons/tag.png" alt="" />
                                <div className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                                    {data.tags.map((tag, i) => (
                                        <span key={i} className="mr-2">
                                            <Link
                                                href={getTagLink(tag.trim())}
                                                className="hover:underline underline"
                                            >
                                                {tag}
                                            </Link>
                                            {i < data.tags.length - 1 && ","}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className="flex items-center text-[13px]">
                            <img className='h-[20px] w-[20px] mr-3' src='./icons/chat.png' alt='' />
                            <span className='text-[13px]'>Leave a comment</span>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default PicsThumbnail;
