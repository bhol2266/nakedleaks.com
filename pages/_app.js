import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerAds from '../components/Ads/BannerAds';
import Outstreams from '../components/Ads/Outstream';
import Footer from '../components/Footer';
import { ModalFeedbackForm } from '../components/ModalFeedbackForm';
import Navbar from '../components/Navbar';
import VideoState from '../context/videos/VideoState';
import { bannedKeywords } from '../JsonData/BannedKeywords';
import { BannedUrls } from '../JsonData/BannedUrls'; // List of banned URLs
import '../styles/globals.css';
import '../styles/nProgress.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentRoute = router.pathname;

  // Start/Complete loading bar on route change
  Router.events.on('routeChangeStart', (url) => {
    console.log('routeChangeStart');
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', (url) => {
    console.log('routeChangeComplete');
    NProgress.done();
  });

  // Firebase push notification
  useEffect(() => {
    const blockedUrls = [
      "https://www.nakedleaks.com/album/experience_the_sensuality_of_delhi's_zoya_ansari_in_nude_photography",
      "https://www.nakedleaks.com/album/viral_pics:_kanpur_muslim_girlfriend_zoya_khan's_big_selfie_reveal",
      "https://www.nakedleaks.com/album/experience_the_sensuality_of_delhi's_zoya_ansari_in_nude_photography"
    ];

    if (blockedUrls.includes(router.pathname)) {
      router.replace("/404");
    }
  }, []);

  // Check for banned URLs and redirect if necessary
  useEffect(() => {

    const currentUrl = window.location.href;

    if (BannedUrls.includes(window.location.href)) {
      router.replace('/404');
    }

    const containsBannedKeywords = bannedKeywords.some(keyword => currentUrl.toLowerCase().includes(keyword.toLowerCase()));
    if (containsBannedKeywords) {
      router.push("/404")
    }
  }, [currentRoute]);

  return (
    <>
      <Head>
        <meta name="asg_verification" content="vVcWCcbbgmnqv221hpAjPojb" />
        <meta name="Trafficstars" content="48726" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta property="og:locale" content="hi_IN" />
        <meta name="google-site-verification" content="S1PCTdQeakM3pn5FHSb69dH8Q4FaLwkQ9xWm4XF4ZZ4" />
        <meta name="6a97888e-site-verification" content="6a7cc8128293023c8e44e366450437f9" />
        <meta name="algolia-site-verification" content="1A27F895C802E527" />
        <meta name="google-site-verification" content="Hgx4K4-ZN9TaUybpVTVa2DZtuDrXXZCRKLXNXGeRcxA" />
      </Head>

      <VideoState>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KE8H4D9BW3"
        />
        <Script id="gtm-script" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KE8H4D9BW3');`}
        </Script>

        <Navbar />
        <div className="bg-white">
          <div className="4xl:w-[85%] 3xl:w-[95%] flex mx-auto justify-center pt-1 md:pt-3 px-1">
            <Component {...pageProps} />
          </div>
        </div>
        <hr />

        <ModalFeedbackForm />
        <ToastContainer />
        <div className="flex items-center justify-center sm:w-1/2 lg:w-1/4 mx-auto mt-4">
          <BannerAds />
          <Outstreams />
          <Outstreams />
          <Outstreams />
          <BannerAds />
        </div>
        <Footer />
      </VideoState>
    </>
  );
}

export default MyApp;
