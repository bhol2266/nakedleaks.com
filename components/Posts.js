import React from "react";
import PicsThumbnail from "./PicsThumbnail";
import { BannedHrefs } from "@/JsonData/BannedUrls";

const Posts = ({ posts }) => {

  // 🔒 Remove banned posts
  const filteredPosts = posts.filter(
    (post) => !BannedHrefs.includes(post.href)
  );

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        xl:grid-cols-3
        2xl:grid-cols-4
        3xl:grid-cols-6
        gap-2 md:gap-3 lg:gap-4
      "
    >
      {filteredPosts.map((obj) => (
        <PicsThumbnail key={obj.href || obj.title} data={obj} />
      ))}
    </div>
  );
};

export default Posts;
