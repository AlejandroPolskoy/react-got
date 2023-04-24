import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ContextLanguage, t } from "../App";

export default function Footer( {location} ) {
    const {lang} = useContext(ContextLanguage);

    return <div className="footer">
        <NavLink to="/characters">{t[lang].characters}</NavLink>
        <NavLink to="/houses">{t[lang].houses}</NavLink>
        <NavLink to="/cronologia">{t[lang].chronology}</NavLink>
    </div>
}