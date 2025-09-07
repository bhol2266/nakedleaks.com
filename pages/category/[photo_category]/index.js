import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import videosContext from '@/context/videos/videosContext';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import categories from "../../../JsonData/photos/categories_list.json";

function Index({ finalDataArray, currentPage, pagination_nav_pages, category_title, category_description, category }) {

    const context = useContext(videosContext);


    const router = useRouter();
    var { photo_category } = router.query

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
                <title>{category_title} | Indian Nude Photos</title>
                <meta name="description" content={category_description} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Open Graph / Social Sharing */}
                <meta property="og:title" content={`${category_title} | Indian Nude Photos`} />
                <meta property="og:description" content={category_description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.nakedleaks.com/category/${category}`} />
                <meta property="og:image" content={`https://nakedleaks.com/logo2.png`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${category_title} | Indian Nude Photos`} />
                <meta name="twitter:description" content={category_description} />
                <meta name="twitter:image" content={`https://nakedleaks.com/logo2.png`} />
            </Head>


            <h1 className='text-xl font-semibold m-2 mx-4 md:text-2xl font-inter'>{category_title}</h1>
            <p className='text-lg m-2 mx-4 md:text-xl font-light text-sb font-hindi'>{category_description}</p>
            <p className='text-lg text-right font-medium m-2 mx-4 md:text-xl'>PAGE : {currentPage}</p>



            <Posts posts={finalDataArray} />


            {/* PAGINATION */}
            <Pagination data={{ url: `/category/${photo_category}`, currentPage: pagination_nav_pages[0], lastPage: pagination_nav_pages[1] }} />

        </div>
    );
}

export default Index;

export async function getStaticPaths() {
    return {
        paths: [
            { params: { photo_category: 'bada-lund' } }
        ],
        fallback: true, // This will allow Next.js to build pages on demand
    };
}

export async function getStaticProps(context) {
    const { photo_category } = context.params;

    // Find the category object
    const categoryObj = categories.find(cat => cat.href === photo_category);

    const page = "1"

    const res = await fetch(`${process.env.BACKEND_URL}getPhotoAlbumsCategoriesPaginated_API?category=${categoryObj.category_title}&page=${page}`);

    const data = await res.json();


    return {
        props: {
            finalDataArray: data.docs,
            pagination_nav_pages: data.paginationNavPages,
            currentPage: 1,
            category: categoryObj.category_title,
            category_title: categoryObj.category_title,        // from JSON file
            category_description: categoryObj.content,
        }
    }


}