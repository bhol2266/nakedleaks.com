import Posts from '@/components/Posts';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../components/Pagination';
import videosContext from '../../context/videos/videosContext';


function Pics({ finalDataArray, currentPage, pagination_nav_pages }) {


    const context = useContext(videosContext);
    const router = useRouter();
    var { page } = router.query

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={"#DB2777"} />
            </div>
        )
    }


    return (
        <div className=" ">

            <Head>
                <title>Indian Nude Photos - Page {page} | Desi Scandals</title>
                <meta
                    name="description"
                    content={`Explore Indian nude photos and sex galleries. Page ${page} features hot Indian girls' photos across categories like selfies, couples, and adult content.`}
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={`Indian Nude Photos - Page ${page} | Desi Scandals`} />
                <meta property="og:description" content={`Browse page ${page} of Indian nude and sex photo galleries. See hot desi girls' selfies, couples, and adult photos.`} />
                <meta property="og:url" content={`https://www.nakedleaks.com/page/${page}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/og-default.jpg" />
                <meta property="og:image:alt" content="Indian nude and sex photo gallery preview" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Indian Nude Photos - Page ${page} | Desi Scandals`} />
                <meta name="twitter:description" content={`Explore Indian nude photos on page ${page}. Hot selfies, couples, and adult galleries.`} />
                <meta name="twitter:image" content="/images/twitter-card.jpg" />
                <meta name="twitter:image:alt" content="Indian nude and sex photo gallery preview" />

                {/* Structured Data: JSON-LD for ImageGallery */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageGallery",
                            "name": `Indian Nude Photos - Page ${page} | Desi Scandals`,
                            "description": `Page ${page} of Indian nude and sex photo galleries. Browse hot desi girls' selfies, couples, and adult photos.`,
                            "url": `https://www.nakedleaks.com/photo/${page}`,
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
                    }}
                />
            </Head>


            <Posts posts={finalDataArray} />


            {/* PAGINATION */}
            <Pagination data={{ url: `/`, currentPage: pagination_nav_pages[0], lastPage: pagination_nav_pages[1] }} />



        </div>
    )
}

export default Pics


export async function getStaticPaths() {

    return {
        paths: [{ params: { page: '2' } }],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {

    const { page } = context.params;

    const res = await fetch(`${process.env.BACKEND_URL}getPhotoAlbumsPaginated_API?page=${page}`);
    const data = await res.json();



    return {
        props: {
            finalDataArray: data.docs,
            pagination_nav_pages: data.paginationNavPages,
            currentPage: page,
        }
    }
}
