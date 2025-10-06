import axios from "axios";
import { useEffect } from "react";
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed || feed.length <= 0) {
    return (
      <div className=" w-full flex justify-center pt-40">
        <h1 className="text-3xl text-center">
           No new person was found.<br/> Please check again after some time. ✌
        </h1>
      </div>
    );
  }
  return (
    feed && (
      <div className="h-screen w-full flex justify-center items-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
