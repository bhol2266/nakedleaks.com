import Head from 'next/head';
import { useRouter } from "next/router";
import { useContext } from 'react';
import Outstreams from "../components/Ads/Outstream";
import Pagination from '../components/Pagination';
import videosContext from '../context/videos/videosContext';
import RecentPost from '@/components/RecentPost';
import Posts from '@/components/Posts';
function Pics({ finalDataArray, currentPage, pagination_nav_pages, topAlbumsAllTime, topAlbumsLast60Days }) {


    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;
    const router = useRouter();


    const getLast6Months = () => {
        const months = [];
        const now = new Date();
        for (let i = 0; i < 6; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = d.toLocaleString('default', { month: 'long' });
            const year = d.getFullYear();
            months.push(`${monthName} ${year}`);
        }
        return months;
    };

    const archiveMonths = getLast6Months();

    return (
        <div className=" ">

            <Head>
                <title>Indian Nude Photos | Desi Scandals</title>
                <meta name="description"
                    content="Antarvasna free desi Indian sex photos. Desi sex pics of porn action of chut, lund and gaand chudai." />
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


                <meta property="og:title" content="Indian Nude Photos | Desi Scandals" />
                <meta property="og:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta property="og:url" content="https://www.Antarvasna.app/photo" />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Indian Nude Photos | Desi Scandals" />
                <meta name="twitter:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
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
                {archiveMonths.map((month) => (
                    <div
                        key={month}
                        className="flex items-center flex-col gap-2 p-2 bg-[#f1f1f1] rounded hover:bg-gray-100 cursor-pointer"
                    >
                        <img src="./icons/archives.png" alt="Archive Icon" className="w-[60px] h-[60px]" />
                        <span className="font-inter font- text-[12px] sm:text-[14px]">{month}</span>
                    </div>
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
