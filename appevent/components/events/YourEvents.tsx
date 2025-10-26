import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../src/firebaseConfig/firebaseConfig";
import AppEvent from "../interface/events";
import { doc, deleteDoc } from "firebase/firestore";
import SignupEvent from "./SignupEvent.tsx";
import { formatDate } from "../utils/formatDate";


export default function YourEvents() {
  const [eventList, setEventList] = useState<AppEvent[]>([]);
  /**
   * This useEffect initially handles the query for fetching the events you have created.
   * It compares the userID of all the events that have the same userID as you user.
   * ChatGPT helped with the syntax of the query.**/
  useEffect(() => {
    const getsYourEventList = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "Bruker er ikke logget inn, vi må huske og protecte routes",
        );
        return;
      }
      try {
        const queriesEvents = query(
          collection(db, "events"),
          where("userID", "==", user.uid),
        ); //ChatGPT was used here for the syntax of the query
        const data = await getDocs(queriesEvents);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as AppEvent[];
        console.log(filteredData);
        setEventList(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getsYourEventList();
  }, []);

  /**
   * This function handles deletion frontend logic and deletion from firebase.
   * **/
  const handleDelete = async (eventId: string) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
      setEventList((prevState) =>
        prevState.filter((event) => event.id !== eventId),
      );
    } catch (e) {
      console.error("Error deleting event:", e);
    }
  };

  return (
    <>
      <section className=" grid grid-cols-1 gap-8 px-4 flex-col items-senter justify-items-center ">
        <h2 className="text-3xl mt-15 mb-10 flex items-center md:font-semibold">
          Dine arrangementer
        </h2>
      </section>

      <section className="flex flex-col">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-7 ml-15 mr-15">
          {eventList.map((ev) => (
            <article
              key={ev.id}
              className="flex flex-col bg-blue-900 text-white p-6 rounded-xl shadow-lg "
            >
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

                <button
                  onClick={() => handleDelete(ev.id)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500 mt-4"
                >
                  Slett arrangement
                </button>
                <SignupEvent eventId={ev.id} />
              </div>
            </article>
          ))}
        </section>
      </section>
    </>
  );
}
