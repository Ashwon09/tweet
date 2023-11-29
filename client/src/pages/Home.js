import React from "react";
import { useEffect, useState } from "react";
import PostsComponent from "../components/PostsComponent";
import { ListOfPostContext } from "../helpers/ListOfPostsContext";
import { getAllPosts } from "../services/PostService";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  const loadPosts = async () => {
    const res = await getAllPosts();
    if (res.data) setListOfPosts(res.data);
  };
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ListOfPostContext.Provider value={{ listOfPosts, setListOfPosts }}>
      <div>
        {listOfPosts.map((post, key) => {
          return <PostsComponent post={post} key={key} />;
        })}
      </div>
    </ListOfPostContext.Provider>
  );
}

export default Home;
