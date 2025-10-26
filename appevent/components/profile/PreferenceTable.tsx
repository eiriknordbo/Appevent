import { auth, db } from "../../src/firebaseConfig/firebaseConfig.ts";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function PreferenceTable() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const user = auth.currentUser;
  const [buttonText, setButtonText] = useState<string>("Lagre preferanse ");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setPreferences(userData.preferences || []);
        }
      } catch (error) {
        console.log("Det skjedde noe feil med å finne preferanser ", error);
      }
    };
    fetchPreferences();
  }, []); //kan kanskje skape litt problemer.

  /**
   * This handles the checkbox change.
   * It was difficult with handling this logic, so we used ChatGPT to help set the preferences.
   * **/
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferences((prev: string[]) => {
      if (checked && prev.length >= 3) {
        return prev;
      }
      return checked ? [...prev, name] : prev.filter((pref) => pref !== name);
    });
  }; //to here

  const checkedFunction = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("Bruker er ikke logget inn, vi må huske og protecte routes");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { preferences: preferences });
      setButtonText("Lagret");
      setIsDisabled(true);

      //setPreferences([])
    } catch (error) {
      console.log(error);
    }
  };

  type EventCategory = {
    id: string;
    name: string;
    image: string;
  };

  const eventCategories: EventCategory[] = [
    //chatGPT brukt til å skrive om alt til ID. Fra her:
    { id: "Weddings", name: "Weddings", image: "../../src/assets/Wedding.jpg" },
    {
      id: "Anniversaries",
      name: "Anniversaries",
      image: "../../src/assets/happy-anniversary-signage.jpg",
    },
    {
      id: "GraduationParties",
      name: "Graduation",
      image: "../../src/assets/Gradutation.jpg",
    },
    {
      id: "ReligiousGatherings",
      name: "Religion",
      image: "../../src/assets/article_topimage_shutterstock_religion.jpg",
    },
    {
      id: "ProfessionalEvents",
      name: "Professional",
      image: "../../src/assets/Proff.jpg",
    },
    {
      id: "ArtExhibitions",
      name: "Art ",
      image: "../../src/assets/standard_The_Scream.jpg",
    },
    {
      id: "SportingEvents",
      name: "Sports",
      image: "../../src/assets/Sport.jpg",
    },
    {
      id: "Workshops",
      name: "Workshops",
      image: "../../src/assets/Workshop.jpg",
    },
    {
      id: "TradeShows",
      name: "Tradeshows",
      image: "../../src/assets/Trade-show-floor-1.jpg",
    },
    {
      id: "MusicFestivals",
      name: "Music ",
      image: "../../src/assets/Musikk.jpg",
    },
    {
      id: "CulturalEntertainmentEvents",
      name: "Cultural",
      image: "../../src/assets/Culture.jpg",
    },
    { id: "Funeral", name: "Funeral", image: "../../src/assets/Funeral.jpg" },
    // til her
  ];

  const isToDisabled = false;
  const buttonTextDisplay = isDisabled
    ? `Velg ${3 - preferences.length} til`
    : buttonText;

  return (
    <>
      <section className="flex flex-col mt-20  ">
        <article className="w-9/10 bg-blue-900 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">
            Choose your preferences to get recommended events!
          </h2>
          <h3 className="text-lg mb-4">Cultural and entertainment events</h3>
          {/* Used ChatGPT to inspire styling from here:*/}
          <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {eventCategories.map((event) => (
              <label
                key={event.id}
                htmlFor={event.id}
                className="relative cursor-pointer"
              >
                {/* Skjult checkbox */}
                <input
                  type="checkbox"
                  id={event.id}
                  name={event.id}
                  checked={preferences.includes(event.id)}
                  onChange={handleCheckboxChange}
                  className="hidden peer"
                />

                {/*Bildde med effekt når valgt*/}
                <div className="relative rounded-lg overflow-hidden transition-transform transform hover:scale-105 peer-checked:scale-95 peer-checked:ring-4 peer_checked:ring-blue-500">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-blue-400 bg-opacity-50 text-blue-900 text-center py-2">
                    {event.name}
                  </div>
                </div>
              </label>
            ))}
          </article>
          <button
            className={`mt-6 w-full py-3 rounded-lg shadow-md transition-transform transform 
                        ${isDisabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:scale-105"}`}
            onClick={checkedFunction}
            disabled={isToDisabled}
          >
            {buttonTextDisplay}
          </button>
        </article>
        {/* to here.*/}
      </section>
    </>
  );
}
