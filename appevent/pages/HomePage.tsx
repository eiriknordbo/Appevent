import Header from "../components/Header";
import CreateEvent from "../components/events/CreateEvent.tsx";
import EventsList from "../components/events/EventsList.tsx";
import Footer from "../components/shared/Footer.tsx";

export default function HomePage(){
    return(
        <>
            <Header/>
            <CreateEvent/>
            <EventsList/>
            <Footer/>

        </>
    )
}