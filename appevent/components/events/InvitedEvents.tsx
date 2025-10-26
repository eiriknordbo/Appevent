import {useEffect, useState} from "react";
import AppEvent from "../interface/events";
import { db, auth } from "../../src/firebaseConfig/firebaseConfig";
import {collection, getDocs, query, where} from "firebase/firestore";
import SignupEvent from "./SignupEvent";
import { formatDate } from "../utils/formatDate";

export default function InvitedEvents() {
    const [eventList, setEventList] = useState<AppEvent[]>([]);

    useEffect(  () => {
        const gettingInvitedParticipants = async() =>{
        const user = auth.currentUser;
        if (!user) {
            console.log("User not found.");
            return;
        }

        try {
            const queriesPrivateEvents = query(
                collection(db,"events"),
                where("private_participants", "array-contains", user.uid)
            );
            console.log(queriesPrivateEvents);

            const data = await getDocs(queriesPrivateEvents);

            const filterData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as AppEvent[];
            console.log("hhhhh",filterData);
            setEventList(filterData);
        } catch (e) {
            console.log(e);
        }
        };
        gettingInvitedParticipants()
    }, []);

    return(
        <>
            <section className=" grid grid-cols-1 gap-8 px-4 flex-col items-senter justify-items-center ">
                <h2 className="text-3xl mt-15 mb-10 flex items-center md:font-semibold">
                    Invitasjoner til arrangementer
                </h2>
            </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-7 ml-15 mr-15">
            {eventList.map((ev) => (
                <article
                    key={ev.id}
                    className="flex flex-col bg-blue-900 text-white p-6 rounded-xl shadow-lg mb-10 "
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
                        <SignupEvent eventId={ev.id} />
                    </div>
                </article>
            ))}
        </section>
        </>
    );
}