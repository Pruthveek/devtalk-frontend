import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/Common/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
      console.log(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  // return (
  //   feed &&(
  //     <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 p-4">
  //     {feed.map((user, idx) => (
  //       <UserCard key={idx} user={user} />
  //     ))}
  //   </div>
  //   )
  // );
  return (
    feed && (
      <div className="h-screen w-full flex justify-center items-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
