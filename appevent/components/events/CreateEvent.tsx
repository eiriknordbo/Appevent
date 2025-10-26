import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebaseConfig/firebaseConfig.ts";
import UserList from "./UserList.tsx";
import User from "../interface/user.ts";

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    Title: "",
    Bio: "",
    Date: "",
    Type: "",
    Availability: false,
    Location: "",
    Image: "",
    participants: [],
    private_participants: [],
  });
  const [privateParticipants, setPrivateParticipants] = useState<User[]>([]);
  /**
   * We initialy set isAccessible as false.
   **/
  const [isAccessible, setIsAccessible] = useState(false);

  /**
   * This handles an event that uses the input or text and is strictly passed with typescript types.
   * It updates the eventData array with the corresponding e(event) data.
   * ChatGPT was used here for setEventData.
   **/

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
    setIsAccessible(true);
  };

  /**
   * Gets the user currently logged in.
   * It then adds a new document(event) in the collection(events) in firebase.
   * The userID is important here because it links the event to the user that created it(currently logged inn).
   *
   **/
  const addEvent = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("bruker er ikke innlogget");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        ...eventData,
        private_participants: privateParticipants.map((user) => user.uid), //ChatGPT was used here for mapping of privateparticipants
        userID: user.uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
      <section className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Opprett et arrangement!</h1>
        <p className="text-lg font-semibold">Nytt arrangement</p>
        <p className="text-gray-700 max-w-2xl mt-2">
          Her kan du enkelt opprette et arrangement ved å fylle inn detaljene
          nedenfor. Legg inn en tittel, beskrivelse, type arrangement, dato,
          tidspunkt og lokasjon. Du kan også laste opp et bilde ved å legge inn
          en URL til bildet under.
          <br />
          <br />
          Når du har lagt inn all informasjonen er det bare å trykke "Opprett".
          <br />
          <br />
          <i>Ja, så enkelt er det faktisk!</i>
        </p>
        <button
          onClick={addEvent}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Opprett
        </button>
      </section>

      <section className="mt-8 p-6 bg-blue-900 text-white rounded-xl shadow-lg flex flex-col w-full max-w-4xl md:flex-row md:gap-4 mb-16">
        <form className="flex flex-col w-full gap-4 md:flex-row">
          {/* Column 1 */}
          <section className="flex flex-col w-full gap-4">
            <input
              type="text"
              name="Title"
              placeholder="Tittel"
              className="p-2 rounded bg-white text-black"
              value={eventData.Title}
              onChange={handleChange}
            />
            <textarea
              name="Bio"
              placeholder="Info..."
              className="p-2 rounded bg-white text-black h-32"
              value={eventData.Bio}
              onChange={handleChange}
            />
          </section>

          {/* Column 2 */}
          <section className="flex flex-col w-full gap-4">
            <input
              type="datetime-local"
              name="Date"
              className="p-2 rounded bg-white text-black"
              value={eventData.Date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Type"
              placeholder="Type"
              className="p-2 rounded bg-white text-black"
              value={eventData.Type}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Location"
              placeholder="Lokasjon"
              className="p-2 rounded bg-white text-black"
              value={eventData.Location}
              onChange={handleChange}
            />

            <div>
              <label>Privat arrangement </label>
              <input
                type="checkbox"
                name="Availability"
                checked={eventData.Availability}
                onChange={handleChange}
                className="p-2 rounded bg-white"
              />
            </div>
            {isAccessible && (
              <article>
                <UserList
                  privateParticipants={privateParticipants}
                  setPrivateParticipants={setPrivateParticipants}
                ></UserList>{" "}
                {/*ChatGPT was used on this line for understanding the passing of props through UserList */}
              </article>
            )}
          </section>

          {/* Column 3 */}
          <section className="flex flex-col w-full items-start">
            <section className="flex flex-col gap-4">
              <img
                src={eventData.Image || "../src/assets/Placeholder.png"}
                alt="Placeholder image"
                className="w-full object-cover rounded-xl"
              />
              <input
                type="text"
                name="Image"
                placeholder="Sett inn din bilde-URL her"
                className="p-2 rounded bg-white text-black"
                value={eventData.Image}
                onChange={handleChange}
              />
            </section>
          </section>
        </form>
      </section>
    </main>
  );
}
