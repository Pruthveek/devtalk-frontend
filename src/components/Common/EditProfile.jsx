import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { toast } from "react-toastify";
import LoddingAnimation from "./LoddingAnimation";  

export const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const saveProfile = async () => {
    setLoading(true); 
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, about, age, gender, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success("Profile edited successfully.");
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong.";
      toast.error(msg);
    }finally {
      setLoading(false); 
    } 
  };
  if (loading) {
    return (
      <LoddingAnimation />
    );
  }   
  return (
    <div className=" flex flex-col md:flex-row gap-4 pt-10 pb-20 sm:py-24 justify-center items-center">
      <div className="mx-2">
        <div className="card bg-base-500 md:w-96 shadow-2xl shadow-black">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            <div className="md:grid md:grid-cols-2 md:pr-4 space-y-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select"
                >
                  <option value="" disabled>
                    Select a gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea h-24"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-1 text-red-500 font-bold"
                      onClick={() => removeSkill(skill)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <select
                  className="select flex-1"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                >
                  <option value="" disabled>
                    Select a skill
                  </option>
                  <option value="c++">c++</option>
                  <option value="java">java</option>
                  <option value="python">python</option>
                  <option value="c">c</option>
                  <option value="javascript">javascript</option>
                  <option value="react">react</option>
                  <option value="node">node</option>
                  <option value="ml">ml</option>
                  <option value="ai">ai</option>
                </select>
                <button
                  type="button"
                  className="btn"
                  onClick={addSkill}
                >
                  Add
                </button>
              </div>
            </fieldset>

            <div className="card-actions justify-center">
              <button className="btn btn-success" onClick={saveProfile}>
                Save Profile
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <div>
        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender, skills }}
          viewOnly={true}
        />
      </div>
    </div>
  );
};
