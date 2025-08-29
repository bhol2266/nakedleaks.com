import { useEffect, useRef } from "react";


function InterstitialAds({ command }) {

    var clickRefMoble = useRef(null);
    var clickRefIntertitials = useRef(null);

    useEffect(() => {

        // setTimeout(() => {
        //     if (window.innerWidth < 750) {
        //         clickRefMoble.current.click();
        //         console.log("clickRefIntertitials");

        //     } else {
        //         clickRefIntertitials.current.click();
        //         console.log("clickRefIntertitials");
        //     }
        // }, 3000);


    }, []);


    return (
        <div className="flex items-center justify-center">


        </div>
    )
}

export default InterstitialAds;
