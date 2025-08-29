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
        const newHref= href.replaceAll("_","+").toLowerCase()
        return `/album/${href}`;
    }

    return (
        <div className="p-2">
            <PopunderAds />
            <div className="animate-fade flex flex-col justify-center rounded-2xl shadow-lg transform transition duration-150  overflow-hidden">

                <Link href={getAlbumlink(href)} className="cursor-pointer block">
                    {/* Thumbnail */}
                    {showImage && (
                        <div className="w-full h-full rounded-t-2xl  flex items-center justify-center">
                            <img
                                className="max-w-full h-[300px] bg-black object-contain"
                                loading="lazy"
                                alt={data.title}
                                src={data.thumbnail}
                                // src="/dummy_image.png"

                                // src={`https://pub-5fcdf72a54cd4edbb03ec3edaa415a42.r2.dev/nakedleaks/${data.href}/thumbnail.jpg`}
                                onError={() => setShowImage(false)}
                            />
                        </div>
                    )}
                </Link>


                {/* Content */}
                <div className="p-3 space-y-2">
                    <Link href={`/photo/${href}`}>
                        <h1 className="text-md lg:text-lg font-semibold  font-inter line-clamp-2 hover:text-blue-600">
                            {data.title}
                        </h1>
                    </Link>

                    {/* Date */}
                    <p className="text-sm text-gray-500">{formatDate(data.date)}</p>

                    {/* Category */}
                    <div className="flex items-center text-sm lg:text-base text-gray-600">
                        <Folder className="w-4 h-4 mr-1 text-blue-500" />
                        {data.category.split(",").map((cat, index) => (
                            <span key={index}>
                                <Link href={getCategoryLink(cat.trim())} className="hover:underline">
                                    {cat.trim()}
                                </Link>
                                {index < data.category.split(",").length - 1 && ", "}
                            </span>
                        ))}
                    </div>


                    {/* Views */}
                    <div className="flex items-center text-sm lg:text-base text-gray-600">
                        <Eye className="w-4 h-4 mr-1 text-green-500" />
                        {data.views} views
                    </div>

                    {/* Tags (comma separated, clickable, underlined) */}
                    {data.tags && data.tags.length > 0 && (
                        <div className="flex items-start text-sm text-gray-600 mt-2"> {/* Added top margin for spacing */}
                            <Tags className="w-8 h-8 mr-3 text-purple-500 mt-0.5" /> {/* Increased margin-right for more space */}
                            <div className="flex flex-wrap gap-2"> {/* Added gap between tags */}
                                {data.tags.map((tag, i) => (
                                    <span key={i}>
                                        <Link
                                            href={getTagLink(tag.trim())}
                                            className="hover:underline underline hover:text-purple-700"
                                        >
                                            {tag}
                                        </Link>
                                        {i < data.tags.length - 1 && ","}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Description */}
                    <div className="flex items-start text-sm lg:text-base text-gray-600 line-clamp-3">
                        <FileText className="w-[50px] h-8 mr-1 mt-0.5 text-red-500" />
                        <span>{data.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PicsThumbnail;
