import Link from "next/link";
import categories_photo from '@/JsonData/photos/categories_list.json';
import Outstreams from "./Ads/Outstream";

const Pagination = ({ data }) => {
  const url = data.url;
  const currentPage = data.currentPage;
  const lastPage = data.lastPage;

  return (
    <div className="mt-10 mb-[100px]">

      {/* Pagination Buttons */}
      <div
        className={`${parseInt(currentPage) === 1 || parseInt(currentPage) === parseInt(lastPage)
            ? "justify-around"
            : "justify-between"
          } flex items-center md:justify-center`}
      >
        <Link href={`${url}/page/${parseInt(currentPage) - 1}`}>
          <div className={`${parseInt(currentPage) === 1 ? "hidden" : ""}`}>
            <button className="scale-90 md:scale-100 font-inter text-lg sm:mx-4 rounded-lg  px-2 py-1 hover:bg-black hover:text-white ml-1 border-black border-1 cursor-pointer">
              &lt; Previous            </button>
          </div>
        </Link>

        <div className="flex items-center justify-center rounded py-[1px]">
          <p className="font-inter px-4 py-1 rounded text-gray-700 text-md sm:text-lg">
            {currentPage}
          </p>
          <span className="mb-1 scale-125 text-black">/</span>
          <p className="font-inter px-4 py-1 rounded text-gray-500 text-md sm:text-lg">
            {lastPage}
          </p>
        </div>

        <Link href={`${url}/page/${parseInt(currentPage) + 1}`}>
          <div className={`${parseInt(currentPage) === parseInt(lastPage) ? "hidden" : ""}`}>
            <button className="scale-90 md:scale-100 font-inter text-lg sm:mx-4 rounded-lg  px-2 py-1 hover:bg-black hover:text-white ml-1 border-black border-1 cursor-pointer">
              Next &gt;
            </button>
          </div>
        </Link>
      </div>

     

      {/* Ads Section */}
      <div className="sm:flex items-center justify-center sm:w-1/2 lg:w-1/4 mx-auto mt-4">
        <Outstreams />
        <Outstreams />
        <Outstreams />
      </div>
    </div>
  );
};

export default Pagination;
