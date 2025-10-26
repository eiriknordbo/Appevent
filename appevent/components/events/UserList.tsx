import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/firebaseConfig/firebaseConfig";
import User from "../interface/user";
import privateParticipants from "../interface/privateParticipants.ts";

/**
 * privateParticipants is passed as props in UserList and is used in CreateEvent.tsx
 **/
export default function UserList({
  privateParticipants,
  setPrivateParticipants,
}: privateParticipants) {
  const [users, setUsersList] = useState<User[]>([]);

  /**
   * This initially sets the useState for users from the users collection in firebase.
   * It uses the User interface to format the list of users.
   **/
  useEffect(() => {
    const getUsers = async () => {
      const userCollectionRef = collection(db, "users");
      const allUsers = await getDocs(userCollectionRef);
      const userList = allUsers.docs.map((doc) => doc.data() as User);
      setUsersList(userList);
    };
    getUsers();
  }, []);

  /**
   * This handles the creation of a new array with the selected checkbox(user).
   * Else it filters out the user if the checkbox is not checked.
   **/

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: User, //tar inn user som en user med user-interface
  ) => {
    if (e.target.checked) {
      setPrivateParticipants((prev) => [...prev, user]);
    } else {
      setPrivateParticipants((prev) => prev.filter((u) => u.uid !== user.uid));
    }
  };
  console.log(privateParticipants);

  return (
    <div>
      <h3>Pick participants here:</h3>
      <ul>
        {users.map((user: User) => (
          <li key={user.uid}>
            <input
              type="checkbox"
              name={user.username}
              checked={privateParticipants.some((u) => u.uid === user.uid)} //ChatGPT was used on this line for the logic of the checked attribute.
              onChange={(e) => handleCheckboxChange(e, user)}
            />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
