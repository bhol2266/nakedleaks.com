import Script from "next/script";


function BannerAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div className="">

            {/* <Script id="banner-script" strategy="afterInteractive">
                {`
          aclib.runBanner({
            zoneId: '10331322',
          });
        `}
            </Script> */}

        </div >
    )
}

export default BannerAds;
