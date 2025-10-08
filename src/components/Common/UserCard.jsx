import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const UserCard = ({ user, viewOnly = false }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
    user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handelSendRequest = async (status, userId) => {
    if (viewOnly) return;
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      if (status === "interested") {
        toast.success(res.data.message + ` to ${firstName}.`);
      }
      if (status === "ignored") {
        toast.error(`${firstName} removed from feed.`);
      }
    } catch (err) {
      console.error("Error : " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 mx-2 sm:w-96 shadow-2xl shadow-black">
      <figure>
        <img
          src={photoUrl}
          alt={firstName + lastName}
          className="w-96 h-80 bg-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <p>{"Age: " + age}</p>}
        {gender && <p>{" Gender: " + gender}</p>}
        <p>{about}</p>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills: </legend>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="badge flex items-center gap-1">
                {skill}
              </span>
            ))}
          </div>
        </fieldset>

        <div className="card-actions justify-center mt-4">
          <>
            <button
              className={`btn btn-error ${
                viewOnly || loading ? "cursor-not-allowed " : ""
              }`}
              disabled={viewOnly || loading}
              onClick={() => handelSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className={`btn btn-success ${
                viewOnly || loading ? "cursor-not-allowed " : ""
              }`}
              disabled={viewOnly || loading}
              onClick={() => handelSendRequest("interested", _id)}
            >
              Interested
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
