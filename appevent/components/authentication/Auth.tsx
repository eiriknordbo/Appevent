import {
  auth,
  db,
  googleAuthProvider,
} from "../../src/firebaseConfig/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * https://www.youtube.com/watch?v=2hR-uWjBAgw
 * This tutorial was used for handling the authentication.
 * Auth handles login and  authentication with Google
 * ChatGPT was helped with the setDoc aspect.
 * **/
export const Auth = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuthProvider);
      const user = data.user;
      console.log(user);

      const userRef = doc(db, "users", user.uid);
      const users = await getDoc(userRef);
      console.log(users);
      if (!users.exists()) {
        await setDoc(userRef, {
          username: "ENDRE BRUKERNAVNET DITT",
          email: user.email,
          uid: user.uid,
          role: "default",
          preferences: [],
          createdAt: new Date(),
        });
        console.log("user already exists");
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="bg-[#FFB200E0] text-black text-lg font-medium px-6 py-3 rounded-lg shadow-lg hover:bg-[#FFC84A] hover:shadow-2xl hover:border hover:border-black transition">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </article>
  );
};
