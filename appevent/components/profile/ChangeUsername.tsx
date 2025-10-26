import { auth, db } from "../../src/firebaseConfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function ChangeUsername() {
  const [username, setUsername] = useState<string>("");

  const handleChangeForSettingUsername = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUsername(e.target.value);
  };

  /**
   * Changes username in firebase
   * ChatGPT was used here for merge:true, we had issues with overwriting.
   * **/
  const changeUsername = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("bruker er ikke innlogget");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { username }, { merge: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex flex-col p-6 gap-5 w-3/4 mr-30 ml-10">
        <h3 className="text-3xl font-semibold">
          Her kan du endre brukernavnet ditt
        </h3>
        <input
          type="text"
          name="changeusername"
          placeholder="Endre brukernavn"
          className="p-2 rounded bg-white text-black hover:border-2 hover:border-blue-800"
          value={username}
          onChange={handleChangeForSettingUsername}
        />
        <button
          className=" border-2 hover:scale-105 hover:text-white hover:bg-blue-400 p-2"
          onClick={changeUsername}
        >
          Endre brukernavn
        </button>
      </section>
    </>
  );
}
