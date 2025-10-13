import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/Common/UserCard";
import LoddingAnimation from "../components/Common/LoddingAnimation";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  useEffect(() => {
    if (!feed || feed.length === 0) getFeed();
  }, []); 

  if (loading) return <LoddingAnimation />;

  if (!feed || feed.length === 0) {
    return (
      <div className="w-full flex justify-center pt-40">
        <h1 className="text-3xl text-center">
          No new person was found.
          <br /> Please check again after some time. ✌
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
