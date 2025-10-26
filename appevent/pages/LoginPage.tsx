import Login from "../components/login/Login";
import HeaderFirstPage from "../components/HeaderFirstPage.tsx";
import Footer from "../components/shared/Footer.tsx";

export default function LoginPage(){
    return(
        <>
            <HeaderFirstPage/>
            <Login/>
            <Footer/>
        </>
    )
}