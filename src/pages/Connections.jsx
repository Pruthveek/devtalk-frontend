import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className=" w-full flex justify-center pt-24">
        <h1 className="text-3xl">No connection found 😭</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-24">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Connections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((collection, index) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              about,
              skills,
              age,
              gender,
            } = collection;

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
                    <div className="flex ">
                      <p className="flex gap-2 flex-wrap">Skill: {skills.map((skill, i) => (
                        <span key={i} className="badge">
                          {skill}
                        </span>
                      ))}</p>
                      
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
