import { useSelector } from "react-redux";
import { EditProfile } from "../components/Common/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="pt-20 md:pt-0">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
