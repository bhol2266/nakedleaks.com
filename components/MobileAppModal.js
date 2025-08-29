import { StarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import videosContext from '../context/videos/videosContext';




const MobileAppModal = () => {

    const router = useRouter()

    const { MobileAppModalVisible, setMobileAppModalVisible } = useContext(videosContext);

    const downloadNow = () => {
        router.push('https://www.chutlunds.com/chutlundsAPK')
    }



    return (

        <div>
            {/* Make background darker */}
            <div  className={`bg-black bg-opacity-40 fixed inset-0 z-20  ${MobileAppModalVisible ? "hidden" : "hidden"} `} />

            <div className={` fixed  transition-transform duration-300 ease-out  z-20  w-4/5 top-8 bottom-8 scrollbar-hide overflow-scroll mx-auto left-0 right-0 ${MobileAppModalVisible ? 'animate-colorModal' : 'translate-y-[3000px]'}`}>

                <div className={`bg-orange-100 w-full  p-[20px] rounded-xl shadow-md`}>

                    <div className='flex items-center justify-center space-x-4'>
                        <img src='/megaphone.png' className='h-[50px] pb-4' />
                        <h1 className='text-center mb-5 font-inter text-[14px] lg:text-[16px]'>Download our new App for Desi Sex videos</h1>
                    </div>



                    <div className='flex space-x-1 items-start justify-start'>
                        <img src="/chutlunds.png" className='rounded-xl h-[120px] lg:h-[180px]' alt="" />
                        <div>
                            <div className='flex items-center space-x-1'>

                                <h1 className='font-inter text-[16px] lg:text-[18px] font-semibold mt-2 lg:mt-3 xl:mt-4 text-[#374151]'>Chutlunds - Indian Sex Videos APK
                                </h1>
                                <img src="/android.png" className='rounded-xl h-[25px] lg:h-[30px] mt-2' alt="" />

                            </div>
                            <div className='flex space-x-1 items-center justify-start mt-1'>
                                <StarIcon className='h-4 lg:h-6 text-yellow-600' />
                                <StarIcon className='h-4 lg:h-6 text-yellow-600' />
                                <StarIcon className='h-4 lg:h-6 text-yellow-600' />
                                <StarIcon className='h-4 lg:h-6 text-yellow-600' />
                                <StarIcon className='h-4 lg:h-6 text-gray-400' />
                                <h2 className='font-inter text-[14px] lg:text-[16px] font-medium text-[#374151]'>(4.0)
                                </h2>


                            </div>
                            <p className='text-start my-2 hidden lg:flex capitalize text-[#374151] font-inter'>Free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. The FREE Chutlunds app lets you stream your favorite porn videos in the palm of your hand, with no ads. Through its fast and simple navigation, you can enjoy the best Chutlunds videos</p>
                        </div>
                    </div>

                    <p className='pl-3 text-sm font-semibold my-1.5 mt-2.5  lg:hidden font-inter'>Description</p>
                    <p className='text-start text-sm mb-1 lg:hidden capitalize pl-3 text-[#374151]'>Free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. The FREE Chutlunds app lets you stream your favorite porn videos in the palm of your hand, with no ads. Through its fast and simple navigation, you can enjoy the best Chutlunds videos</p>

                    <div className='flex space-x-4 items-center justify-between md:justify-start '>

                        <button onClick={() => { setMobileAppModalVisible(!MobileAppModalVisible) }} className={`lg:w-[260px] w-[232px]  py-1.5 bg-orange-300 text-[14px] lg:text-[16px] font-inter text-[#000000] rounded-[4px] cursor-pointer mt-5`}>Cancel</button>

                        <button onClick={downloadNow} className={`lg:w-[260px] w-[232px]   py-1.5 bg-orange-300 text-[14px] lg:text-[16px] font-inter text-[#000000] rounded-[4px] cursor-pointer mt-5`}>Download Now!</button>
                    </div>



                    <div className='pl-3 mt-3 xl:hidden font-inter text-[#374151]'>

                        <p className='text-lg font-semibold mb-1.5 '>What&apos;s new</p>
                        <p className='mb-1 text-sm'>New Features Added:</p>
                        <p className='mb-1 text-sm'>1. Unlimited 4K, HD  Videos Added</p>
                        <p className='mb-1 text-sm'>2. Download your Favourite Video Offline</p>
                        <p className='mb-1 text-sm'>3. Fully Optimized App</p>
                        <p className='mb-1 text-sm'>4. New Download Feature Added</p>
                        <p className='mb-1 text-sm'>5. Reduced Processor And Ram Usage</p>

                    </div>




                    <div className='xl:flex flex-row-reverse justify-between items-center xl:space-x-16 mt-1'>


                        <div className='xl:w-1/2'>

                            <div className='grid grid-cols-2 xl:grid-cols-2  lg:grid-cols-3'>
                                {/* <img src="/screenshots/ss1.png" className='rounded-xl   ' alt="" />
                                <img src="/screenshots/ss4.png" className='rounded-xl   ' alt="" />
                                <img src="/screenshots/ss7.png" className='rounded-xl hidden   3xl:hidden lg:flex xl:hidden' alt="" /> */}
                                {/* <img src="/screenshots/ss3.png" className='rounded-xl    hidden lg:flex xl:hidden' alt="" />
                                <img src="/screenshots/ss4.png" className='rounded-xl    hidden' alt="" />
                                <img src="/screenshots/ss5.png" className='rounded-xl    hidden ' alt="" /> */}

                            </div>

                        </div>


                        <div className=' mt-1 xl:w-1/2 xl:mt-0 xl:pt-8 2xl:pt-0 xl:pb-8 text-[#374151] pl-3 xl:pl-0'>

                            <div className='text-[14px] lg:text-[16px] mb-5 font-inter text-[#374151]  hidden xl:flex flex-col'>

                                <p className='text-xl font-semibold mb-1.5'>What&apos;s new</p>
                                <p className='mb-1 '>New Features Added:</p>
                                <p className='mb-1 '>1. Unlimited 4K, HD  Videos Added</p>
                                <p className='mb-1 '>2. Download your Favourite Video Offline</p>
                                <p className='mb-1 '>3. Fully Optimized App</p>
                                <p className='mb-1 '>4. New Download Feature Added</p>
                                <p className='mb-1 '>5. Reduced Processor And Ram Usage</p>

                            </div>



                            <p className='font-inter my-3 text-2xl font-semibold'>HOW TO INSTALL</p>
                            <p className='font-inter mb-1 text-[14px] lg:text-[17px]'>1. Download the app on your Android</p>
                            <p className='font-inter mb-1 text-[14px] lg:text-[17px]'>2. Open the file from the notification area or from your download folder</p>
                            <p className='font-inter mb-1 text-[14px] lg:text-[17px]'>3. Select Install</p>
                            <span className='font-inter mb-1 text-[14px] lg:text-[17px]'>4. You may have to allow <strong>Unknown Sources</strong> at <strong>Settings &gt; Security Screen</strong></span>


                        </div>
                    </div>





                </div>

            </div>
        </div>


    )
};
export default MobileAppModal;
