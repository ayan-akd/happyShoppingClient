// import { Helmet } from "react-helmet-async";
// import CustomContainer from "../../../../Components/Shared/CustomContainer";
// import Loading from "../../../../Components/Shared/Loading";
// import ProfileCard from "../../../../Components/Shared/ProfileCard";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ProfileCard from "../Component/ProfileCard";

const Profile = () => {
  const { userData } = useContext(AuthContext);
 
  return (
    <div className="max-w-screen-xl mx-auto p-10">
          <ProfileCard userData={userData}></ProfileCard>
          <div>
          <h1 className="text-3xl md:text-5xl text-center pt-16 my-12">
            Purchase <span className="text-grn">History</span>
          </h1>
          <h1 className="text-center font-bold text-3xl">
                No History Found!!!
              </h1>
          </div>
    </div>
  );
};

export default Profile;
