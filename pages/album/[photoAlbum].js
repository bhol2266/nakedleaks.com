import Posts from "@/components/Posts";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import Outstreams from "../../components/Ads/Outstream";
import Carousel from "../../components/Carousel";
import SinglePicThumnail from "../../components/SinglePicThumnail";
import videosContext from "../../context/videos/videosContext";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from "react";


function Album({ data, relatedAlbums }) {


  const router = useRouter();
  const { setCarouselIndex, setImageUrls } = useContext(videosContext);
  const [downloading, setDownloading] = useState(false); // ✅ state for spinner


  useEffect(() => {
    if (router.isReady && data?.imageArray) {
      setImageUrls(data.imageArray);   // Update context images
      setCarouselIndex(0);             // Reset carousel to first image
    }
  }, [router.isReady, data, setImageUrls, setCarouselIndex]);


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

  const handleDownloadAll = async () => {
    setDownloading(true); // ✅ show spinner

    const zip = new JSZip();
    const folder = zip.folder(data.title || "images");

    const imageUrls = data.imageArray.map((_, index) => {
      const realUrl = `https://pub-5fcdf72a54cd4edbb03ec3edaa415a42.r2.dev/nakedleaks/${data.href}/${index}.jpg`;
      return `/api/proxyImage?url=${encodeURIComponent(realUrl)}`;
    });

    const fetchAndAddImage = async (url, index) => {
      try {
        const response = await fetch(url);
        if (!response.ok) return;
        const blob = await response.blob();
        folder.file(`image_${index + 1}.jpg`, blob);
      } catch (error) {
        console.error(`Error fetching image ${url}:`, error);
      }
    };

    await Promise.all(imageUrls.map((url, index) => fetchAndAddImage(url, index)));

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${data.title || "album"}.zip`);
      setDownloading(false); // ✅ hide spinner
    }).catch(() => {
      setDownloading(false); // ✅ hide spinner if failed
    });
  };




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
            <SinglePicThumnail key={img} picURL={img} index={index} href={data.href} />
          ))}

        </div>

        <h2 className="p-2 text-sm lg text-md">{data.content}</h2>

        <div className="flex justify-center my-4">
          <button
            onClick={handleDownloadAll}
            disabled={downloading}
            className={`bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded shadow flex items-center gap-2 ${downloading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {downloading ? (
              <>
                <BeatLoader size={8} color="#fff" />
                <span>Preparing Album...</span>
              </>
            ) : (
              "Download This Album"
            )}
          </button>
        </div>

        <div >
          <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-center bg-black text-white py-2 rounded-lg shadow-lg mb-2">
            Related Photos
          </h2>
          <Posts posts={relatedAlbums} />
        </div>
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

  // Encode the href to handle special characters
  const encodedHref = encodeURIComponent(photoAlbum);

  const res = await fetch(`${process.env.BACKEND_URL}getSingleAlbum_API?href=${encodedHref}`);
  const data = await res.json();

  return {
    props: {
      data: data.album,
      relatedAlbums: data.similarAlbums || [],
    },
  };
}


