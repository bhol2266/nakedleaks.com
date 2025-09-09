import { useContext, useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "lucide-react";
import videosContext from "../context/videos/videosContext";
import categories from "../JsonData/photos/categories_list.json";
import index from '../utils/algolia';

function Navbar() {
    const { MobileAppModalVisible, setMobileAppModalVisible } = useContext(videosContext);
    const { currentLocation, countryBlocked } = useContext(videosContext);


    const [showSuggested, setShowSuggested] = useState(false);
    const [tags, setTags] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const [location, setLocation] = useState(currentLocation);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("location") && !currentLocation) {
            setLocation(JSON.parse(localStorage.getItem("location")));
        }
    }, [currentLocation]);

    // Fetch suggestions from Algolia
    const getSuggestedTags = async (e) => {
        const query = e.target.value;
        setSearchKey(query);

        if (!query) {
            setTags([]);
            setShowSuggested(false);
            return;
        }

        try {
            const results = await index.search(query, { hitsPerPage: 12});
            setTags(results.hits); // store full hit objects
            setShowSuggested(true);
        } catch (error) {
            console.error(error);
        }
    };

    // Navigate when clicking a suggestion
    const goToTag = (obj) => {
        setSearchKey(obj.title)
        setShowSuggested(false)
        router.push(`/album/${obj.objectID}`);

    };

    // Handle search button click
    const goSearch = (e) => {
        e.preventDefault();

        if (searchKey.trim() !== '' && tags.length > 0) {
            // extract objectIDs from current hits
            const objectIDs = tags.map(hit => hit.objectID);

            // pass objectIDs as a query string array
            router.push({
                pathname: '/search',
                query: {
                    query: searchKey.trim(),
                    ids: objectIDs.join(',')  // e.g., "id1,id2,id3"
                }
            });

            setShowSuggested(false);
        }
    };



    return (
        <div>



            <div className="  p-2  shadow-md xl:hidden">

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




                                    <Disclosure.Button className="xl:hidden items-center justify-center ring-0   rounded-md text-black hover:text-white hover:bg-gray-800 p-2">
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



                                    <div className="flex flex-col relative p-1 w-full transition ease-in-out delay-150 mt-2">
                                        <form className="flex w-full items-center" onSubmit={goSearch}>
                                            <div className="flex-grow mr-4">
                                                <input
                                                    value={searchKey}
                                                    onChange={getSuggestedTags}
                                                    className="w-full h-[35px] px-4 text-sm text-black border-[0.8px] border-[#E5E5E5] rounded-[15px] bg-transparent outline-none"
                                                    type="text"
                                                    placeholder="Search your favourite album"
                                                />
                                            </div>
                                            <div className="w-[18%]">
                                                <button
                                                    type="submit"
                                                    className="w-full p-2 text-sm bg-gray-800 text-white cursor-pointer hover:bg-gray-700 rounded-[15px]"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </form>

                                        {showSuggested && (
                                            <div className="bg-semiblack max-h-[300px] mt-1.5 z-50 overflow-y-scroll ">
                                                {tags.map(obj => (
                                                    <div
                                                        key={obj.objectID}
                                                        onClick={() => goToTag(obj)}
                                                        className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 pl-4 hover:rounded-[15px] hover:text-semiblack text-black"
                                                    >
                                                        <p className="text-[13px] fontinter truncate w-full">{obj.title}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>



                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>





            </div>


            <div className='flex flex-col font-inter font-medium  items-center text-gray-700  bg-black shadow-lg xl:hidden  '>

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




            {/* Large Screen NavBar */}
            <div className="flex-col hidden xl:flex bg-black px-8">
                <div className="flex items-center justify-between pt-4 pb-4">
                    {/* Left Side: Logo + Flag + Search */}
                    <div className="flex items-center space-x-3 w-full">
                        <Link href="/">
                            <img src="/logo2.png" alt="Logo" className="h-8 ml-4" />
                        </Link>

                        {location && (
                            <ReactCountryFlag
                                svg
                                countryCode={location.countryCode}
                                style={{ fontSize: "25px", lineHeight: "25px" }}
                            />
                        )}

                        <div className="relative w-[400px]">
                            <form onSubmit={goSearch}>
                                <div className="flex items-center border border-gray-500 rounded-lg px-2">
                                    <SearchIcon className="text-gray-400 h-6" />
                                    <input
                                        value={searchKey}
                                        onChange={getSuggestedTags}
                                        className="w-full h-[35px] bg-transparent outline-none pl-2 text-white placeholder-gray-400"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </div>
                            </form>

                            {/* Suggestions dropdown */}
                            {showSuggested && (
                                <div className="absolute top-full left-0 right-0  mt-1 bg-white rounded-md z-50 h-fit overflow-y-auto shadow-lg pb-2">
                                    {tags.map(obj => (
                                        <div
                                            key={obj.objectID}
                                            onClick={() => goToTag(obj)}
                                            className="px-4 py-3 cursor-pointer hover:bg-gray-200 text-black truncate text-sm "
                                        >
                                            {obj.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Navigation */}
                    <div className="flex items-center justify-end space-x-[40px] w-full ">
                        <Link href="/">
                            <p
                                className={`${router.pathname === "/"
                                    ? "text-white text-[21px] border-b-2 border-white"
                                    : "text-white text-[19px] hover:text-gray-300"
                                    }`}
                            >
                                Home
                            </p>
                        </Link>

                        {/* Categories Dropdown */}
                        <Menu as="div" className="relative text-left">
                            <Menu.Button
                                className={`flex items-center font-medium ${router.pathname.startsWith("/category")
                                    ? "text-white text-[21px] border-b-2 border-white"
                                    : "text-white text-[19px] hover:text-gray-300"
                                    }`}
                            >
                                Categories
                                <ChevronDownIcon className="h-5 ml-1" />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-50 bg-white top-[50px] w-[200px] max-h-[700px] rounded-md shadow-lg overflow-y-auto">
                                    {categories.map((item) => (
                                        <Menu.Item key={item.category_title}>
                                            {({ active }) => (
                                                <p
                                                    onClick={() => router.push(`/category/${item.href}`)}
                                                    className="block px-4 py-2 text-[16px] hover:bg-gray-200 hover:text-black cursor-pointer"
                                                >
                                                    {item.category_title}
                                                </p>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <Link href="/tag">
                            <p
                                className={`${router.pathname === "/tag"
                                    ? "text-white text-[21px] border-b-2 border-white"
                                    : "text-white text-[19px] hover:text-gray-300"
                                    }`}
                            >
                                Tags
                            </p>
                        </Link>

                        <a
                            href="https://play.google.com/store/apps/details?id=com.bhola.desiKahaniya&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p
                                className={`${router.asPath.includes("bhola.desiKahaniya")
                                    ? "text-white text-[21px] border-b-2 border-white"
                                    : "text-white text-[19px] hover:text-gray-300"
                                    } cursor-pointer`}
                            >
                                Nude girl pics
                            </p>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
