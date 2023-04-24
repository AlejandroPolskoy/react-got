import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function HomePage() {
    return <div className="home bg">
        <Header home={true}/>
        <h1>GAMES OF THRONES</h1>
        <Footer/>
    </div>
}