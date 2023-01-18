import React from "react";
import RelatedVideosCard from "./DesignCards/smallCard";

function Home() {
  return (
    <div>
      <RelatedVideosCard wd={"175px"} ht={"100px"} />
      <RelatedVideosCard wd={"175px"} ht={"100px"} />
    </div>
  );
}

export default Home;
