
import Script from "next/script";

function PopunderAds() {


    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    let currentHost = '';

    if (typeof window !== "undefined") {
        currentHost = window.location.host;
    }

    // Check if the app is running on localhost
    const isLocalhost = currentHost.includes('localhost')

    // Only render the Script component if not on localhost
    return (
        <div className="flex items-center justify-center">
            {/* <Script id="popunder-script" strategy="afterInteractive">
                {`
          aclib.runPop({
            // zoneId: '10331262',
          });
        `}
            </Script> */}
        </div>
    );
}

export default PopunderAds;


