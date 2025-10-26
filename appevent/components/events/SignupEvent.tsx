import { auth, db } from "../../src/firebaseConfig/firebaseConfig";
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function SignupEvent({ eventId }: { eventId: string }) {
  const [participants, setParticipants] = useState<string[]>([]);

  // Todo:
  //for løkke som matcher alle user ids med alle users i db
  //hente alle users
  //matche id med participants
  //Også må du sette matchene id'er som et navn i users

  /**
   * User was moved out of toggle sign up so that it can be accessed in the HTML
   * **/
  const user = auth.currentUser;
  /**
   * We initially fetch participants from the participants list.
   * ChatGPT was used here for getting the list of participants.
   * It fetches the entire events collection of documents.
   * Checks if data.participants is an array and sets the participant as an empty list if not.
   **/
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!eventId) return;
      try {
        const eventDocRef = doc(db, "events", eventId);
        const eventDoc = await getDoc(eventDocRef);

        if (eventDoc.exists()) {
          //ChatGPT was used here. From here
          const data = eventDoc.data();
          //console.log("her er dataen jeg er ute etter", data);
          const participantsList = Array.isArray(data.participants)
            ? data.participants
            : []; //To here.
          console.log("her er mer data jeg er ute etter", participantsList);
          setParticipants(participantsList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchParticipants();
  }, [eventId]);
  /**
   * This is a signup that switches between signup and sign out of an event when you click the button provided below.
   * It checks if you're in the list of participants with userID and set's the participant list based on userIDs.
   * It updates the array removing your id if you're in it, and adds you using union if you're not in the participants list.
   * ChatGPT was used for
   **/
  const toggleSignup = async () => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const eventDocRef = doc(db, "events", eventId);
    const isSignedUp = participants.includes(user.uid);

    try {
      setParticipants((prev) => {
        //ChatGPT was used here for helping setting participants. We struggled with the logic here, so ChatGPT was used to tie up the loose ends.
        if (isSignedUp) {
          return prev.filter((id) => id !== user.uid);
        } else {
          return [...prev, user.uid];
        }
      });
      await updateDoc(eventDocRef, {
        participants: isSignedUp ? arrayRemove(user.uid) : arrayUnion(user.uid), //To here.
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <button
        onClick={toggleSignup}
        className="mt-4 px-6 py-2 text-white rounded-lg shadow-md hover:opacity-80 transition"
        style={{
          backgroundColor: participants.includes(user?.uid || "")
            ? "red"
            : "green",
        }}
      >
        {participants.includes(user?.uid || "")
          ? "Meld deg av"
          : "Meld deg på"}
      </button>

      <p> Deltakere: {participants.length}</p>
    </section>
  );
}
