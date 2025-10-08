import axios from "axios";
import { useEffect,useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fatchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
  const reviewRequest = async (status, _id) => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fatchRequest();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className=" w-full flex justify-center pt-40">
        <h1 className="text-3xl">No requests found 😭</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-24">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Received Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request, index) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              about,
              skills,
              age,
              gender,
            } = request.fromUserId || {};

            return (
              <div
                key={_id || index}
                className="card bg-base-100 shadow-2xl shadow-black w-80"
              >
                <div className="card-body">
                  <div className="avatar flex justify-center">
                    <div className="w-20 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                      <img src={photoUrl} alt={firstName} />
                    </div>
                  </div>
                  <h2 className="card-title mt-3">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{about}</p>
                  {age && (
                    <p>
                      Age : <span>{age}</span>
                    </p>
                  )}
                  {gender && (
                    <p>
                      Gender : <span>{gender}</span>
                    </p>
                  )}
                  {skills && skills.length > 0 && (
                    <div className=" flex">
                      <p className="flex flex-wrap gap-2">
                        Skill:{" "}
                        {skills.map((skill, i) => (
                          <span key={i} className="badge">
                            {skill}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                  <div className="card-actions justify-center mt-4">
                    <button
                      className={`btn btn-error ${
                        loading ? "cursor-not-allowed " : ""
                      }`}
                      disabled={loading}
                      onClick={() => {
                        reviewRequest("rejected", request._id);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className={`btn btn-success ${
                        loading ? "cursor-not-allowed " : ""
                      }`}
                      disabled={loading}
                      onClick={() => {
                        reviewRequest("accepted", request._id);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
