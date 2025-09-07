import Head from 'next/head';
import { useContext } from 'react';
import { useRouter } from "next/router";
import Outstreams from '@/components/Ads/Outstream';
import Pagination from '@/components/Pagination';
import PicsThumbnail from '@/components/PicsThumbnail';
import videosContext from '@/context/videos/videosContext';
import { BeatLoader } from 'react-spinners';
import tags_list from "../../../JsonData/photos/tags_list.json";
import Posts from '@/components/Posts';

function Index({ finalDataArray, currentPage, pagination_nav_pages, tag_title, category_description, category }) {

    const context = useContext(videosContext);


    const router = useRouter();
    var { tag } = router.query

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={"#DB2777"} />
            </div>
        )
    }
    const { setdisclaimerShow } = context;



    return (
        <div className=''>
            <Head>
                <title>{tag_title} | Indian Nude Photos - Page {currentPage}</title>
                <meta name="description" content={category_description} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Open Graph */}
                <meta property="og:title" content={`${tag_title} | Indian Nude Photos - Page ${currentPage}`} />
                <meta property="og:description" content={category_description} />
                <meta property="og:url" content={`https://www.nakedleaks.com/tag/${tag}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/og-default.jpg" />
                <meta property="og:image:alt" content={`${tag_title} gallery preview`} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${tag_title} | Indian Nude Photos - Page ${currentPage}`} />
                <meta name="twitter:description" content={category_description} />
                <meta name="twitter:image" content="/images/twitter-card.jpg" />
                <meta name="twitter:image:alt" content={`${tag_title} gallery preview`} />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageGallery",
                            "name": `${tag_title} - Page ${currentPage}`,
                            "description": category_description,
                            "url": `https://www.nakedleaks.com/tag/${tag}`,
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

            <h1 className='text-xl font-semibold m-2 mx-4 md:text-2xl font-inter'>{tag_title}</h1>
            <p className='text-lg m-2 mx-4 md:text-xl font-light text-sb font-hindi'>{category_description}</p>
            <p className='text-lg text-right font-medium m-2 mx-4 md:text-xl'>PAGE : {currentPage}</p>
            <Posts posts={finalDataArray} />


            {/* PAGINATION */}
            <Pagination data={{ url: `/tag/${tag}`, currentPage: pagination_nav_pages[0], lastPage: pagination_nav_pages[1] }} />

        </div>
    );
}

export default Index;

export async function getStaticPaths() {
    return {
        paths: [
            { params: { tag: 'anal-sex-photos' } }
        ],
        fallback: true, // This will allow Next.js to build pages on demand
    };
}

export async function getStaticProps(context) {
    const { tag } = context.params;

    console.log(tag);


    // Find the category object
    const tagObj = tags_list.find(cat => cat.href === tag);



    const page = "1"

    const res = await fetch(`${process.env.BACKEND_URL}getPhotoAlbumsTagPaginated_API?tag=${tagObj.title}&page=${page}`);

    const data = await res.json();


    return {
        props: {
            finalDataArray: data.docs,
            pagination_nav_pages: data.paginationNavPages,
            currentPage: 1,
            category: tagObj.title,
            tag_title: tagObj.title,        // from JSON file
            category_description: tagObj.content,
        }
    }


}