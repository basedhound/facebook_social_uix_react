import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER; //? Images
   const [user, setUser] = useState({}); //? User state
   const username = useParams().username;
   // console.log(username)

   //? Fetch user
   useEffect(() => {
      const fetchUser = async () => {
         const res = await axios.get(`/users?username=${username}`);
         setUser(res.data);
         console.log(res.data);
      };
      fetchUser();
   }, [username]);

   return (
      <>
         <Topbar />
         <div className="profile">
            <Sidebar />
            <div className="profileRight">
               <div className="profileRightTop">
                  <div className="profileCover">
                     <img
                        className="profileCoverImg"
                        src={
                           user.coverPicture
                              ? PF + user.coverPicture
                              : PF + "person/noCover.png"
                        }
                        alt=""
                     />
                     <img
                        className="profileUserImg"
                        src={
                           user.profilePicture
                              ? PF + user.profilePicture
                              : PF + "person/noAvatar.png"
                        }
                        alt=""
                     />
                  </div>
                  <div className="profileInfo">
                     <h4 className="profileInfoName">{user.username}</h4>
                     <span className="profileInfoDesc">{user.desc}</span>
                  </div>
               </div>
               <div className="profileRightBottom">
                  <Feed username={username} />
                  <Rightbar user={user} />
               </div>
            </div>
         </div>
      </>
   );
}
