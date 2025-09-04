import videosContext from "./videosContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";






const VideoState = (props) => {

    const router = useRouter();
    const [spinnerLoading, setspinnerLoading] = useState(false)
    const [DarkTheme, setDarkTheme] = useState('')
    const [currentLocation, setcurrentLocation] = useState(null)
    const [showFeedBackFrom, setshowFeedBackFrom] = useState(false)
    const [FilteredVideos, setFilteredVideos ] = useState([])


    const [showCarousel, setshowCarausel] = useState(false);
    const [CarouselIndex, setCarouselIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);


    const [MobileAppModalVisible, setMobileAppModalVisible] = useState(false);

    function setSpinner(boolean) {

        setspinnerLoading(boolean)
        setTimeout(() => {
            setspinnerLoading(false)

        }, 2000);

    }
    function setDarkThemeFunc(theme) {
        setDarkTheme(theme)

    }





    return (
        <videosContext.Provider value={{ spinnerLoading, setSpinner, setDarkThemeFunc, DarkTheme, currentLocation,
         setcurrentLocation,MobileAppModalVisible, setMobileAppModalVisible,showFeedBackFrom, setshowFeedBackFrom,FilteredVideos, 
         setFilteredVideos,showCarousel, setshowCarausel, CarouselIndex, setCarouselIndex ,imageUrls, setImageUrls}}>
            {props.children}
        </videosContext.Provider>
    )
}




export default VideoState;