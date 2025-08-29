import Head from 'next/head';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../components/Pagination';
import PicsThumbnail from "../../components/PicsThumbnail";
import videosContext from '../../context/videos/videosContext';
import Outstreams from '../../components/Ads/Outstream';


function Pics({ finalDataArray, currentPage, pagination_nav_pages }) {


    const context = useContext(videosContext);
    const router = useRouter();
    var { page } = router.query

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'orange'} />
            </div>
        )
    }

   const displaypics = finalDataArray.map((obj) => {


        return (
            <PicsThumbnail key={obj.title} data={obj}  />

        )
    })

    return (
        <div className=" ">

            <Head>
                <title>Indian Nude Photos | Desi Scandals</title>
                <meta name="description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


                <meta property="og:title" content="Indian Nude Photos | Desi Scandals" />
                <meta property="og:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta property="og:url" content={`https://www.Antarvasna.app/photo/${page}`} />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Indian Nude Photos | Desi Scandals" />
                <meta name="twitter:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
            </Head>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2 lg:gap-3  md:grid-cols-4 lg:grid-cols-4">

                {displaypics}
            </div>

            {/* PAGINATION */}
            <Pagination data={{ url: `/`, currentPage:  pagination_nav_pages[0], lastPage: pagination_nav_pages[1] }} />



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

     const res = await fetch(`${process.env.BACKEND_URL}getPhotoAlbumsPaginated_API?page=${page}`  );
     const data = await res.json();

    

    return {
        props: {
            finalDataArray: data.docs,
            pagination_nav_pages: data.paginationNavPages,
            currentPage: page,
        }
    }
}
