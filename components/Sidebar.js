import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { categories } from '@/JsonData/stories/categories_list'
import categories_photo from '@/JsonData/photos/categories_list.json'
import { monthArray } from '@/JsonData/stories/categories_list'
import video_categories from '../JsonData/videos/Categories.json'


function Sidebar() {
  const [latestStories, setLatestStories] = useState([]);
  const [storiesByDate, setStoriesByDate] = useState([]);
  const router = useRouter();
  const routePath = router.asPath;

  // Fetch latest stories from backend or localStorage
  async function fetchLatestStories() {
  
    try {
      const response = await axios.get(`/api/desikahani/getLatestStories`);
      const { finalDataArray } = response.data.data;
      console.log(finalDataArray);
      

      setLatestStories(finalDataArray);
    } catch (error) {
      console.error("Error fetching latest stories:", error);
    }
  }

  // Generate stories by date
  async function fetchStoriesByDate() {
    const date = new Date();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    const array = [];

    for (let i = 1; i <= 15; i++) {
      const currentMonthString = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
      array.push({ month: monthArray[currentMonth - 1], year: currentYear, href: `${currentYear}-${currentMonthString}` });

      if (currentMonth === 1) {
        currentMonth = 12;
        currentYear -= 1;
      } else {
        currentMonth -= 1;
      }
    }
    setStoriesByDate(array);
  }

  useEffect(() => {
    if (storiesByDate.length === 0) {
      fetchStoriesByDate();
    }
    if (latestStories.length === 0) {
      fetchLatestStories();
    }

  }, []);

  // Determine text and categories to display based on route path
  const isPhotoPage = routePath.includes('/photo');
  const isVideoPage = routePath.includes('/videos');
  const headerText = isPhotoPage
    ? "Photo categories"
    : isVideoPage
      ? "Categories"
      : "श्रेणियां";

  return (
    <div className='mx-6 pt-1 hidden md:flex md:flex-col'>
      <div>
        <p className="w-56 text-[22px] border-gray-400 rounded-md text-black font-bold p-1 pl-4 pr-2 cursor-pointer bg-white opacity-75">
          {headerText}
        </p>


        {isPhotoPage && (
          categories_photo.map(category => (
            <Link key={category.href} href={`/photo/category/${category.href}`}>
              <p className="w-56 font-inter shadow-lg my-2 py-2 font-semibold text-md hover:bg-orange-200 rounded-md text-orange-900 p-1 pl-4 pr-2 cursor-pointer bg-white">
                {category.category_title}
              </p>
            </Link>
          ))
        )}

        {!isPhotoPage && !isVideoPage && (
          categories.map(category => (
            <Link key={category.href} href={`/category/${category.href}`}>
              <p className="w-56 font-inter shadow-lg my-2 py-2 font-semibold text-md hover:bg-orange-200 rounded-md text-orange-900 p-1 pl-4 pr-2 cursor-pointer bg-white">
                {category.category_title}
              </p>
            </Link>
          ))
        )}

        {isVideoPage && (
          video_categories.map(tag => (
            <Link key={tag.category} href={`/videos/tag/${tag.category.replace(/ /g, '-').trim()}`}>
              <p className="w-56 font-inter shadow-lg my-2 py-2 font-semibold text-md hover:bg-orange-200 rounded-md text-orange-900 p-1 pl-4 pr-2 cursor-pointer bg-white">
                {tag.category}
              </p>
            </Link>
          ))
        )}


      </div>

      <div className='pt-1 hidden md:flex md:flex-col my-5'>
        <p className="w-56 font-hindi text-lg text-[24px] border-gray-400 rounded-md text-black font-bold p-1 pl-4 pr-2 cursor-pointer bg-white opacity-75">
          हाल के पोस्ट
        </p>

        {latestStories.map(story => {

          return (
            <Link key={story.href} href={`/${story.newTitle.replace(/ /g, '+')}`}>
              <p className="font-arial w-56  shadow-lg my-2 py-2 text-[15px] lg:text-[17px] hover:bg-orange-200 rounded-md text-orange-800 tracking-wider p-1 pl-4 pr-2 cursor-pointer bg-white">
                {story.newTitle}
              </p>
            </Link>
          );
        })}
      </div>

      <div>
        <p className="w-56 text-lg border-gray-400 rounded-md text-black font-bold p-1 pl-4 pr-2 cursor-pointer opacity-75">
          पुरालेख
        </p>

        {storiesByDate.map(story => (
          <Link key={story.href} href={`/date/${story.href}`}>
            <p className="w-56 font-semibold text-md shadow-lg my-1 hover:bg-orange-200 rounded-md text-orange-900 p-1 pl-4 pr-2 cursor-pointer opacity-75">
              {`${story.month} ${story.year}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
