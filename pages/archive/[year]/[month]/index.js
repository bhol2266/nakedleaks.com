import Posts from "@/components/Posts";
import videosContext from "@/context/videos/videosContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Index({ finalDataArray, currentPage, pagination_nav_pages }) {
  const context = useContext(videosContext);
  const router = useRouter();
  const { year, month } = router.query;
  const { setdisclaimerShow } = context;

  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10">
        <BeatLoader loading size={25} color="#DB2777" />
      </div>
    );
  }

  // Convert month number to name
  const monthNumber = parseInt(month, 10) - 1;
  const monthName = monthNames[monthNumber] || month;

  const pageTitle = `${monthName} ${year} | Indian Nude Photos`;
  const pageDescription = `Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos for ${monthName} ${year} alag alag categories mein.`;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content="Indian Nude Photos | Desi Scandals" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.Antarvasna.app/photo" />
        <meta property="og:site_name" content="Indian Nude Photos | Desi Scandals" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Indian Nude Photos | Desi Scandals" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:label1" content="पोस्ट" />
        <meta name="twitter:data1" content="85" />
      </Head>

      <h1 className="text-xl font-semibold mt-2 mx-4 md:text-2xl font-inter">
       Archive - {monthName} {year}
      </h1>
      <p className="text-lg text-right font-medium  mx-4 md:text-xl">
        PAGE : {currentPage}
      </p>

      <Posts posts={finalDataArray} />

    </div>
  );
}

export default Index;

export async function getStaticPaths() {
  return {
    paths: [{ params: { year: "2025", month: "03" } }],
    fallback: true, // build pages on demand
  };
}

export async function getStaticProps(context) {
  const { year, month } = context.params;
  const page = "1";

  const res = await fetch(
    `${process.env.BACKEND_URL}getPhotoAlbumsByMonthYear_API?year=${year}&month=${month}&page=${page}`
  );

  const data = await res.json();

  return {
    props: {
      finalDataArray: data.docs || [],
      pagination_nav_pages: data.paginationNavPages || ["1", "1"],
      currentPage: parseInt(page),
    },
  };
}
