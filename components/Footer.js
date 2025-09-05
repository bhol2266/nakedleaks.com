import Link from 'next/link';

import { useContext } from 'react';
import videosContext from '../context/videos/videosContext';


function Footer() {

    //Use Context
    const context = useContext(videosContext);
    const { spinnerLoading } = context;
    const year = new Date().getFullYear();

    return (

        <div className={`font-footer    ${spinnerLoading ? "hidden" : ""} bg-black`}>



            <div className="flex  justify-around items-center py-4 2xl:w-3/4 3xl:w-1/2 mx-auto">
                <div className="">
                    <p className='font-semibold text-white text-[17px] text-left mb-2 lg:text-[20px] underline'>Information</p>


                    <Link passHref={true} href={'/terms'}>
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>Terms and conditions</p>
                    </Link>
                    <Link passHref={true} href={'/privacy'}>
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>Privacy Policy</p>
                    </Link>
{/* 
                    <a rel="nofollow" href='https://theporndude.com' >
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>ThePornDude</p>
                    </a> */}

                    <Link passHref={true} href={'/parentalcontrol'}>
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>Parental Control</p>
                    </Link>

                </div>

                <div className="">
                    <p className='font-semibold text-white underline text-[17px] text-left mb-2 lg:text-[20px]'>Legal</p>

                    <Link passHref={true} href={'/cookiepolicy'}>
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>Cookies Policy</p>
                    </Link>
                    <Link passHref={true} href={'/dmca'}>
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>DMCA / Content Removal</p>
                    </Link>
                    <Link passHref={true} href={'/2257'}>
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-white transition-colors lg:text-[18px]'>2257</p>
                    </Link>
                </div>


            </div>





            <div className='w-full p-4 text-center pt-10'>
                <p className='whitespace-normal break-words mb-2 px-4 text-sm text-white'>
                    NakedLeaks is rated with RTA label. Parents, you can easily block access to this site.
                    Please <a href="https://www.rtalabel.org/index.php?content=parents" className='text-blue-500 underline hover:text-blue-700'>read</a> for more information.
                </p>
                <p className='whitespace-normal break-words font-inter text-sm text-white'>
                    © {new Date().getFullYear()} NakedLeaks.app is a Indian Nude Photos Website
                </p>
            </div>


        </div>

    )

}

export default Footer
