import { Link } from "react-router";
import { auth, db } from "../src/firebaseConfig/firebaseConfig.ts";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function HeaderFirstPage() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getUsername = async () => {
      const user = auth.currentUser;
      console.log(user?.uid);
      if (!user) {
        console.error("bruker er ikke innlogget");
        return;
      }
      try {
        const userRef = doc(db, "users", user.uid);
        const userdocument = await getDoc(userRef);

        if (userdocument.exists()) {
          setUsername(userdocument.data().username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsername();
  }, []);

  return (
    <>
      <nav className="flex bg-[#3D5499] items-center justify-between px-10 py-4">
        <div className="flex items-center space-x-6">
          <Link
            to="/home"
            className="hover:scale-120 left-0  text-3xl text-[#FFFFFF]  p-10 "
          >
            Appevent
          </Link>
          <h3 className=" left-0  text-3xl text-[#FFFFFF]  p-10 justify between ">
            {username}
          </h3>
        </div>
      </nav>
    </>
  );
}
