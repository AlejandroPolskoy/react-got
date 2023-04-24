import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Card, Details } from "../Components/Cards";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContextLanguage, t } from "../App";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const url = "http://localhost:3000/";
const urlChars = "http://localhost:3000/characters";
//const urlHouses = "http://localhost:3000/houses";

// buscador ?name_like=

export function Characters() {
    const [characters, setCharacters] = useState([]);
    const {searching} = useContext(ContextLanguage);

    useEffect(()=> {
        axios.get(urlChars).then((res)=> {
            setCharacters(res.data)
        })
    }, [])

    return <div className="home">
        <Header buscador={true}/>
        <SimpleBar style={{ height: "72.5vh", width: "80vw", margin: "0 auto" }} forceVisible="y" autoHide={false}>
        <div className="gallery gallery_tall">
            { searching 
            ? characters.filter(searchData => searchData.name.toLowerCase().indexOf(searching.toLowerCase()) >= 0 ).map((data)=> <Card key={data.id} item={data} tipo={"characters"} />) 
            : characters.map((data)=> <Card key={data.id} item={data} tipo={"characters"} />) }
        </div>
        </SimpleBar>
        <Footer location="characters"/>
    </div>
}

export function CharacterDetails() {
    const {id} = useParams();
    const [details, setDetails] = useState([]);
    const {lang} = useContext(ContextLanguage);

    useEffect(()=> {
        axios.get( urlChars + "/" + id ).then((res)=> {
            //console.log( res );
            // http://localhost:3000/houses?name_like=
            axios.get( url + "houses?name_like=" + res.data.house ).then((resHouse)=> {
                //console.log( resHouse );
                res.data.house = resHouse.data[0]
                setDetails(res.data)
                //console.log( res.data );
            })
                
            // house - casa
            // image 
            // name 
            // alliances - alianzas
            // episodes - aparicines
            // parents - padre
            // siblings - descendientes
            // titles - titulos
        })
    }, [])

    return <div style={{ minHeight: "100vh"}}>
        <Header from={"/characters"} />
        <div className="middle">
            <div className="charDetails">
                { details.image && <div className="gallery_card"><img src={url + details.image} alt=""/></div> }
                <h3>{details.name}</h3>
                <div className="gallery">
                    <Details title={t[lang].house} item={details.house} />
                    <Details title={t[lang].alliances} item={details.alliances} />
                    <Details title={t[lang].parents} item={details.parents} />
                    <Details title={t[lang].apparation} item={details.episodes} />
                    <Details title={t[lang].siblings} item={details.siblings} />
                    <Details title={t[lang].titles} item={details.titles} />
                </div>
            </div>
        </div>
    </div>
}