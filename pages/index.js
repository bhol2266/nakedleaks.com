import Head from 'next/head';
import { useRouter } from "next/router";
import { useContext } from 'react';
import Outstreams from "../components/Ads/Outstream";
import Pagination from '../components/Pagination';
import videosContext from '../context/videos/videosContext';
import RecentPost from '@/components/RecentPost';
import Posts from '@/components/Posts';
import Link from 'next/link';


function Pics({ finalDataArray, currentPage, pagination_nav_pages, topAlbumsAllTime, topAlbumsLast60Days }) {


    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;
    const router = useRouter();


    const getLast6Months = () => {
        const months = [];
        const now = new Date();
        for (let i = 1; i <= 6; i++) { // start from 1 to skip current month
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const month = String(d.getMonth() + 1).padStart(2, "0"); // 2-digit month
            const year = d.getFullYear();
            const monthName = d.toLocaleString("default", { month: "long" });
            months.push({ monthName, month, year });
        }
        return months;
    };

    const archiveMonths = getLast6Months();

    return (
        <div className=" ">

            <Head>
                {/* Basic Meta */}
                <title>Indian Nude Photos | Desi Scandals</title>
                <meta name="description" content="Explore free Indian nude photos and sex galleries. Enjoy hot desi girls' photos across categories including selfies, couples, and adult content." />
                <meta name="keywords" content="Indian nude photos, desi sex photos, hot Indian girls, desi adult galleries, free porn photos" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <link rel="canonical" href="https://www.nakedleaks.com/" />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Indian Nude Photos | Desi Scandals" />
                <meta property="og:description" content="Explore free Indian nude and sex photo galleries. Browse hot desi girls' selfies, couples, and adult photos in multiple categories." />
                <meta property="og:url" content="https://www.nakedleaks.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/og-default.jpg" /> {/* Replace with a high-res OG image */}
                <meta property="og:image:alt" content="Indian nude and sex photo gallery preview" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Indian Nude Photos | Desi Scandals" />
                <meta name="twitter:description" content="Explore free Indian nude and sex photo galleries. Browse hot desi girls' selfies, couples, and adult photos in multiple categories." />
                <meta name="twitter:image" content="/images/twitter-card.jpg" /> {/* Replace with Twitter-specific image */}
                <meta name="twitter:image:alt" content="Indian nude and sex photo gallery preview" />

                {/* Structured Data: JSON-LD for PhotoGallery */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ImageGallery",
                        "name": "Indian Nude Photos | Desi Scandals",
                        "description": "Explore free Indian nude and sex photo galleries. Browse hot desi girls' selfies, couples, and adult photos in multiple categories.",
                        "url": "https://www.nakedleaks.com/",
                        "thumbnailUrl": "/images/og-default.jpg",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Desi Scandals",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "/images/logo.png"
                            }
                        }
                    })
                }} />
            </Head>





            <Posts posts={finalDataArray} />


            {/* PAGINATION */}
            <Pagination data={{ url: `/`, currentPage: pagination_nav_pages[0], lastPage: pagination_nav_pages[1] }} />

            <h3 className='font-inter font-semibold m-4 text-[16px] sm:text-[20px]'>Top Galleries </h3>


            {topAlbumsAllTime && topAlbumsAllTime.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
                    {topAlbumsAllTime.slice(0, 6).map((album) => (
                        <RecentPost
                            key={album.original_fullalbum_href}
                            data={album}  // Pass the whole object
                        />
                    ))}
                </div>
            )}


            <h3 className='font-inter font-semibold mx-4 mt-[80px] mb-4 text-[16px] sm:text-[20px]'>Visitors Favourites (Monthly) </h3>

            {topAlbumsLast60Days && topAlbumsLast60Days.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
                    {topAlbumsLast60Days.slice(0, 6).map((album) => (
                        <RecentPost
                            key={album.original_fullalbum_href}
                            data={album}  // Pass the whole object
                        />
                    ))}
                </div>
            )}



            <h3 className='font-inter font-semibold mx-4 mt-[80px] mb-4 text-[16px] sm:text-[20px]'>Archives</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mx-4 mb-4">
                {archiveMonths.map(({ monthName, month, year }) => (
                    <Link
                        key={`${month}-${year}`}
                        href={`/archive/${year}/${month}`}
                        className="flex items-center flex-col gap-2 p-2 bg-[#f1f1f1] rounded hover:bg-gray-100 cursor-pointer"
                    >
                        <img
                            src="/icons/archives.png"
                            alt="Archive Icon"
                            className="w-[60px] h-[60px]"
                        />
                        <span className="font-inter text-[12px] sm:text-[14px]">
                            {monthName} {year}
                        </span>
                    </Link>
                ))}
            </div>


        </div>
    )
}

export default Pics


export async function getStaticProps(context) {
    try {
        const page = 1;

        // Fetch paginated albums
        const paginatedRes = await fetch(`${process.env.BACKEND_URL}getPhotoAlbumsPaginated_API?page=${page}`);
        const paginatedData = await paginatedRes.json();

        // Fetch top albums (all time + last 60 days)
        const topAlbumsRes = await fetch(`${process.env.BACKEND_URL}getTopAlbumsCombined_API`);
        const topAlbumsData = await topAlbumsRes.json();


        return {
            props: {
                finalDataArray: paginatedData.docs,
                pagination_nav_pages: paginatedData.paginationNavPages,
                currentPage: page,
                topAlbumsAllTime: topAlbumsData.allTime || [],
                topAlbumsLast60Days: topAlbumsData.lastDays || [],
            },
        };
    } catch (error) {
        console.error("❌ getStaticProps error:", error);
        return {
            props: {
                finalDataArray: [],
                pagination_nav_pages: [],
                currentPage: 1,
                topAlbumsAllTime: [],
                topAlbumsLast60Days: [],
            },
        };
    }
}
