import { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from "react-country-flag";
import videosContext from '../context/videos/videosContext';
import categories from "../JsonData/photos/categories_list.json";

import { Fragment } from 'react';

import {
    ChevronDownIcon,
    MenuIcon
} from '@heroicons/react/outline';
import { } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';

var navigation = [
    { name: 'Home', href: '/', current: true },
    // { name: 'Desi Girls - Video Chat', href: 'https://play.google.com/store/apps/details?id=com.bhola.livevideochat&hl=en-IN', current: false },
    { name: 'Mobile App', href: "https://play.google.com/store/apps/details?id=com.bhola.desiKahaniya&hl=en", current: false },
    { name: 'Sex Videos', href: "https://www.xhamster.gg/", current: false },  // route "/videos"
    { name: 'अपनी कहानी भेजे', href: "/submitStory", current: false },



]





function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {


    const { MobileAppModalVisible, setMobileAppModalVisible } = useContext(videosContext);
    const [searchKey, setsearchKey] = useState('')
    const [showSuggested, setshowSuggested] = useState(false)


    const router = useRouter();
    const context = useContext(videosContext);
    const { currentLocation, countryBlocked } = context;

    const [location, setlocation] = useState(currentLocation)


    useEffect(() => {
        if (localStorage.getItem("location") && !currentLocation) {
            setlocation(JSON.parse(localStorage.getItem("location")))
        }

    }, [])

    const goSearch = (e) => {
        e.preventDefault();


    }

    const getSuggestedTags = (e) => {



    }



    return (

        <div>

            <div className="  p-2  shadow-md lg:hidden">

                <Disclosure as="nav" >
                    {({ open }) => (
                        <>
                            <div className='flex  items-center justify-between'>

                                <Link href='/'>
                                    <div className='flex items-center space-x-1' >
                                        <img src='/logo2.png' className=' h-6  ml-1.5' />

                                        {location &&
                                            <div className=''>
                                                <ReactCountryFlag
                                                    svg
                                                    countryCode={location.countryCode}
                                                    style={{
                                                        fontSize: '25px',
                                                        lineHeight: '25px',
                                                    }}
                                                    aria-label="United States"
                                                />
                                            </div>
                                        }

                                    </div>
                                </Link>






                                <div className='flex items-center'>




                                    <Disclosure.Button className="lg:hidden items-center justify-center ring-0   rounded-md text-black hover:text-white hover:bg-gray-800 p-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <SearchIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>



                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Disclosure.Panel className="sm:flex">
                                    <div className={`flex flex-col relative p-1   transition ease-in-out delay-150 mt-2 `}>


                                        <form className="flex w-full items-center" onSubmit={goSearch}>
                                            <div className="flex-grow mr-4">
                                                <input
                                                    value={searchKey}
                                                    onChange={getSuggestedTags}
                                                    className="w-full h-[35px] px-4 text-sm text-black border-[0.8px] border-[#E5E5E5] rounded-[15px] bg-transparent outline-none"
                                                    type="text"
                                                    placeholder="Search your favourite videos"
                                                />
                                            </div>
                                            <div className="w-[18%]">
                                                <button
                                                    type="submit"
                                                    className="w-full p-2 text-sm bg-gray-800 text-white cursor-pointer hover:bg-gray-700 rounded-[15px] hover:bg-button_hover"
                                                >
                                                    Search
                                                </button>
                                            </div>



                                        </form>
                                        {showSuggested &&
                                            <div className='bg-semiblack max-h-[300px] mt-1.5 z-50  overflow-scroll scrollbar-hide'>
                                                {tags.map(tag => {
                                                    return (
                                                        <div key={tag} onClick={() => {
                                                            setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                                        }} className='flex items-center space-x-2 p-2  cursor-pointer hover:bg-gray-200 pl-4 hover:rounded-[15px] hover:text-semiblack text-white'>
                                                            {/* <img src='/login/history.png' className='h-[20px]' /> */}
                                                            <p className='text-[13px] fontinter  '>{tag}</p>

                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }



                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>





            </div>


            <div className='flex flex-col font-inter font-medium  items-center text-gray-700  bg-black shadow-lg lg:hidden  '>

                <div className='flex items-center justify-evenly  pl-2 w-full '>
                    <Link href='/'>
                        <p className='text-white text-[15px] md:text-xl  text-center p-1 pr-6  ml-2  hover:text-gray-300'>Home</p>
                    </Link>

                    <Menu as="div" className="relative text-left">
                        <div className='w-fit'>
                            <Menu.Button className="flex items-center font-medium text-white text-[15px] md:text-xl text-center p-1 pr-6 hover:text-gray-300">
                                Categories
                                <ChevronDownIcon className='sm:h-6 h-5 mb-[3px] pt-1 ml-1' />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-50 origin-top-right absolute bg-white left-0 w-44 max-h-[500px] rounded-md shadow-lg  overflow-y-auto">
                                {categories.map(item => (
                                    <Menu.Item key={item.category_title}>
                                        {({ active }) => (
                                            <p
                                                onClick={() => { router.push(`/category/${item.href}`) }}
                                                className='block px-4 py-2 text-sm font-normal hover:bg-gray-200 hover:text-semiblack cursor-pointer'
                                            >
                                                {item.category_title}
                                            </p>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>



                    <Link href='/tag'>
                        <p className=' text-[15px] md:text-xl   text-center p-1 pr-6 hover:text-gray-300  text-white'>Tags</p>
                    </Link>

                    <a href='https://play.google.com/store/apps/details?id=com.bhola.desiKahaniya&hl=en' >
                        <p className=' text-[15px] md:text-xl   text-center p-1 pr-6 hover:text-gray-300 text-white cursor-pointer'>Nude girl pics</p>
                    </a>

                </div>




            </div>



            {/* Large Sreeen NavBar  */}



            <div className='flex-col hidden lg:flex' >


                {/* Navbar */}
                <div className='flex items-center justify-between   py-1 pt-2 '>

                    <div className='flex items-center space-x-1 md:space-x-3 ' >

                        <Link href='/'>
                            <img src='/logo2.png' className=' h-8  ml-3 xl:ml-4 ' />
                        </Link>

                        {location &&
                            <div className=''>
                                <ReactCountryFlag
                                    svg
                                    countryCode={location.countryCode}
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '25px',
                                    }}
                                    aria-label="United States"
                                />
                            </div>
                        }

                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.bhola.livevideochat&hl=en-IN" rel="noopener noreferrer">
                            <div className='hidden  flex  items-center 
                             cursor-pointer hover:scale-105   '>
                                <img
                                    src='/livesex.png'
                                    height={40}
                                    width={40}
                                    alt='loading'
                                ></img>
                                <p className='font-bold '>Desi Girls - Video Chat</p>
                            </div>
                        </a>
                    </div>

                    {/* 
                    <div className='flex space-x-4 items-center  '>


                        <div >
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-l'>
                                <SunIcon onClick={enableLightMode} className='h-8 w-8 text-white' />
                            </button>
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-r'>                                            <MoonIcon onClick={enableDarkMode} className='h-8 w-8' />
                            </button>
                        </div>

                    </div> */}

                </div>






                <div className='w-full  items-center justify-around   flex  shadow-lg'>
                    {navigation.map(item => {

                        return (
                            <Link href={item.href} key={item.name}>

                                <p key={item.name} className='text-lg text-gray-700 font-semibold cursor-pointer p-[1px]  hover:text-orange-800'>{item.name}</p>
                            </Link>
                        )
                    })}


                </div>

            </div>


        </div>
    )
}

export default Navbar
