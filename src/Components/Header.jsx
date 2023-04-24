import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ContextLanguage, t } from "../App";

export default function Header( { buscador, home, from } ) {
    const {lang, setLang, searching, setSearch} = useContext(ContextLanguage); 
    let delay;

    const location = useLocation() 

    return <div className="header">
        <div>
            { buscador && <><img src={"search.png"} /><input className="header_searchbar" type="text" placeholder={t[lang].search} onChange={search}/></> }
            { from && <Link to={from}><span className="flecha">&#x2190;</span> {t[lang].return}</Link> }
        </div>
        <div className="header_nav">
            { !home && <Link to="/"><img src="/home.png" alt="home"/></Link> }
            <a onClick={()=>setLang("es")}><img src="/spanish.png" alt="spanish"/></a>
            <a onClick={()=>setLang("en")}><img src="/english.png" alt="english"/></a>
        </div>
    </div>

    function search(e) {
        clearTimeout(delay);
        delay = setTimeout(()=> {
            setSearch( e.target.value );
        }, 500);
    }
}