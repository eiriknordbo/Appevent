import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../src/firebaseConfig/firebaseConfig";

export const LogoutAuth = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth.currentUser?.uid);
  return (
    <article
      className="bg-[#FFB200] w-auto text-black text-lg font-medium rounded-lg shadow-lg
                        hover:bg-[#FFC84A] hover:shadow-2xl hover:border hover:border-black transition
                        flex justify-center items-center px-4 py-2"
    >
      <button onClick={logout} className="px-6 py-3 min-w-[120px] text-center">
        Logg ut
      </button>
    </article>
  );
};
