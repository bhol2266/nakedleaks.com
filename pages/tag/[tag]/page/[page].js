import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import videosContext from '@/context/videos/videosContext';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import tags_list from "../../../../JsonData/photos/tags_list.json";


function Pics({ finalDataArray, currentPage, pagination_nav_pages, tag_title, category_description, category }) {


    const context = useContext(videosContext);
    const router = useRouter();
    var { page, tag } = router.query

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
                <title>{tag_title} | Indian Nude Photos - Page {currentPage}</title>
                <meta name="description" content={`${category_description} - Page ${currentPage}`} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                <meta property="og:title" content={`${tag_title} | Indian Nude Photos - Page ${currentPage}`} />
                <meta property="og:description" content={`${category_description} - Page ${currentPage}`} />
                <meta property="og:url" content={`https://www.nakedleaks.com/tag/${tag}/${currentPage}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/og-default.jpg" />
                <meta property="og:image:alt" content={`${tag_title} gallery preview`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${tag_title} | Indian Nude Photos - Page ${currentPage}`} />
                <meta name="twitter:description" content={`${category_description} - Page ${currentPage}`} />
                <meta name="twitter:image" content="/images/twitter-card.jpg" />
                <meta name="twitter:image:alt" content={`${tag_title} gallery preview`} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageGallery",
                            "name": `${tag_title} - Page ${currentPage}`,
                            "description": `${category_description} - Page ${currentPage}`,
                            "url": `https://www.nakedleaks.com/tag/${tag}/${currentPage}`,
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
    )
}

export default Pics


export async function getStaticPaths() {

    return {
        paths: [{ params: { tag: 'anal-sex-photos', page: '2' } }],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {


    const { tag, page } = context.params;



    // Find the category object
    const tagObj = tags_list.find(cat => cat.href === tag);


    const res = await fetch(`${process.env.BACKEND_URL}getPhotoAlbumsTagPaginated_API?tag=${tagObj.title}&page=${page}`);

    const data = await res.json();


    return {
        props: {
            finalDataArray: data.docs,
            pagination_nav_pages: data.paginationNavPages,
            currentPage: page,
            category: tagObj.title,
            tag_title: tagObj.title,        // from JSON file
            category_description: tagObj.content,
        }
    }
}
