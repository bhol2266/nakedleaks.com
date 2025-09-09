import Posts from '@/components/Posts';
import { useRouter } from 'next/router';

import React from 'react'


const Search = ({ query, finalDataArray }) => {

    return (
        <div>
           <h1 className="text-xl my-2 mx-4 md:text-2xl font-inter">
  Search results for <span className="font-bold">&quot;{query}&quot;</span>
</h1>
            <Posts posts={finalDataArray} />
        </div>

    )
}

export default Search

export async function getServerSideProps(context) {
    const { query, ids } = context.query; // get from URL
    const hrefs = ids ? ids.split(',') : []; // convert to array




    // Only call the API if we have hrefs
    let data = { docs: [] };
    if (hrefs.length > 0) {
        try {
            const res = await fetch(
                `${process.env.BACKEND_URL}getPhotoAlbumsByHrefs_API?hrefs=${encodeURIComponent(hrefs.join(','))}`
            );
            data = await res.json();
        } catch (error) {
            console.error('Error fetching photo albums by hrefs:', error);
        }
    }

    return {
        props: {
            finalDataArray: data.docs,
            query: query
        },
    };
}
