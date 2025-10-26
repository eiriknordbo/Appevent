import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData, where,
} from "firebase/firestore";
import { db, auth } from "../../src/firebaseConfig/firebaseConfig";
import AppEvent from "../interface/events.ts";
import { onAuthStateChanged } from "firebase/auth";
import SignupEvent from "./SignupEvent.tsx";
import { formatDate } from "../utils/formatDate";

export default function EventsList() {
  const [eventList, setEventList] = useState<AppEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const eventListRef = collection(db, "events");

  //const userListRef = collection(db, "users");
  //const usersList = await getDocs(userListRef);

  useEffect(() => {

    try {
      const q = query(
          eventListRef,
          where("private_participants","==", []),
      );

      // Had input from Chat to refactor code and divide into two useEffects, from here
      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          try {
            const updatedEvents = snapshot.docs.map(
              (doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data(),
                id: doc.id,
              }),
            ) as AppEvent[];
            setEventList(updatedEvents);
          } catch (error) {
            console.error(error);
          }
        },
      );
      return () => unsubscribe();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists() && userDoc.data()?.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);
  //to here

  const deleteEventAdmin = async (eventId: string) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists() && userDoc.data().role === "admin") {
      try {
        await deleteDoc(doc(db, "events", eventId));
        setEventList(eventList.filter((ev) => ev.id !== eventId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <section className= "bg-gray-200">
      <h2 className="text-4xl font-bold mb-3 bg-gray-200 flex items-start ml-9">
        Arrangementer
      </h2>
      <h3 className="text-lg font-semibold mb-10 bg-gray-200 flex items-start ml-9">
        Arrangementer du kan melde deg på
      </h3>
      <section className=" bg-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {eventList.map((ev, id) => (
          <article
            key={id}
            className="flex flex-col bg-blue-900 text-white p-6 rounded-xl shadow-lg mb-10"
          >
            <SignupEvent eventId={ev.id} />
            <img
              src={ev.Image}
              alt={ev.Title}
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{ev.Title}</h3>
              <p className="text-lg">{ev.Bio}</p>
              <p className="text-md font-semibold">{ev.Location}</p>
              <p className="text-sm text-gray-300">{formatDate(ev.Date)}</p>
            </div>

            {isAdmin && (
              <button
                onClick={() => deleteEventAdmin(ev.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Slett arrangement
              </button>
            )}
          </article>
        ))}
      </section>
      </section>
    </>
  );
}
