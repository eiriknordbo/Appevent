import Header from "../components/Header";
import YourEvents from "../components/events/YourEvents.tsx";
import PreferenceTable from "../components/profile/PreferenceTable.tsx";
import ChangeUsername from "../components/profile/ChangeUsername.tsx";
import Footer from "../components/shared/Footer.tsx";
import InvitedEvents from "../components/events/InvitedEvents.tsx";

export default function ProfilePage() {
    return(
        <>
            <section>
                <Header></Header>
                <section className="flex flex-row items-center justify-center ">
                <ChangeUsername/>
                <PreferenceTable/>
                </section>
                <YourEvents/>
                <InvitedEvents/>
                <Footer/>
            </section>
    </>
    )
}