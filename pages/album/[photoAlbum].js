import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Outstreams from "../../components/Ads/Outstream";
import PicsThumbnail from "../../components/PicsThumbnail";
import SinglePicThumnail from "../../components/SinglePicThumnail";
import categories_photo from '@/JsonData/photos/categories_list.json'
import Link from "next/link";
import videosContext from "../../context/videos/videosContext";
import Carousel from "../../components/Carousel";
import Posts from "@/components/Posts";


function Album({ data, relatedAlbums }) {


  const { showCarousel, setshowCarausel, CarouselIndex, setCarouselIndex, setImageUrls } = useContext(videosContext);

  useEffect(() => {
    if (router.isReady) {
      setImageUrls(data.imageArray)
    }
  }, [])


  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={"#DB2777"} />
      </div>
    );
  }




  const { photoAlbum } = router.query;

  var title;
  if (photoAlbum) {
    try {
      title = photoAlbum.trim().replaceAll("-", " ");
    } catch (error) { }
  }




  return (
    <div className=" ">
      <Head>
        <title>{data.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Explore ${data.title} with high-quality Indian nude and sex photos. Browse explicit photos, hot selfies, and adult galleries.`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:title" content={`${data.title}`} />
        <meta property="og:description" content={`Check out ${data.title}. High-quality Indian nude and sex photos including hot selfies and adult content.`} />
        <meta property="og:url" content={`https://www.nakedleaks.com/${encodeURIComponent(photoAlbum)}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={data.imageArray[0] || "/images/og-default.jpg"} />
        <meta property="og:image:alt" content={`${data.title} gallery preview`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${data.title}`} />
        <meta name="twitter:description" content={`Explore ${data.title} with Indian nude photos, hot selfies, and adult galleries.`} />
        <meta name="twitter:image" content={data.imageArray[0] || "/images/twitter-card.jpg"} />
        <meta name="twitter:image:alt" content={`${data.title} gallery preview`} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              "name": data.title,
              "description": `Explore ${data.title} with Indian nude and sex photos.`,
              "url": `https://www.nakedleaks.com/${encodeURIComponent(photoAlbum)}`,
              "thumbnailUrl": data.imageArray[0] || "/images/og-default.jpg",
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



      <div className="flex flex-col">
        <h1 className={` font-semibold text-md sm:text-lg md:text-2xl text-center p-1 mx-4 font-inter`} >
          {data.title}
        </h1>

        <div className="flex flex-wrap justify-center">

          {data.imageArray.map((img, index) => (
            <SinglePicThumnail key={img} picURL={img} index={index} />
          ))}

        </div>


        <div >
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-3 rounded-lg shadow-lg mb-6">
            Related Photos
          </h2>
          <Posts posts={relatedAlbums} />
        </div>
      </div>

      <p className=" text-center mx-auto text-[18px] border-gray-400 rounded-md text-black font-semibold  p-1 pl-4 pr-2 cursor-pointer  opacity-75 mt-[30px]">
        Photo Categories
      </p>

      <div className="md:hidden   mx-[16px] mt-4">
        {categories_photo.map(category => (
          <Link key={category.href} href={`/photo/category/${category.href}`}>
            <p className=" font-inter text-left my-2 py-1.5 px-8  text-sm hover:bg-orange-200 rounded-md text-semiblack  cursor-pointer underline">
              {category.category_title}
            </p>
          </Link>
        ))}
      </div>

      <Carousel />
      <Outstreams />
    </div>
  );
}

export default Album;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { photoAlbum: "desi_girl_indulges_in_boss's_thick_dick_sucking_in_explicit_pictures" } },
    ],
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { photoAlbum } = context.params;

  const newHref = photoAlbum.replaceAll("+", "_").toLowerCase()

  const res = await fetch(`${process.env.BACKEND_URL}getSingleAlbum_API?href=${photoAlbum}`);
  const data = await res.json();

  return {
    props: {
      data: data.album,
      relatedAlbums: data.similarAlbums
    },
  };
}

