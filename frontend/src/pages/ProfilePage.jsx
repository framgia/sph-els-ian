import { useParams } from "react-router-dom";
const ProfilePage = () => {
  const { userId } = useParams();
  return <div className="ProfilePage Outlet">{userId}</div>;
};
export default ProfilePage;
