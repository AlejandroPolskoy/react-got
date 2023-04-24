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
const urlHouses = "http://localhost:3000/houses";

export function Casas() {
    const [casas, setCasas] = useState([]);
    const {searching} = useContext(ContextLanguage);

    useEffect(()=> {
        axios.get(urlHouses).then((res)=> {
            setCasas(res.data)
        })
    }, [])

    return <div className="home">
        <Header buscador={true}/>
        <SimpleBar style={{ height: "72.5vh", width: "80vw", margin: "0 auto" }} forceVisible="y" autoHide={false}>
        <div className="gallery gallery_tall">
            { searching 
            ? casas.filter(searchData => searchData.name.toLowerCase().indexOf(searching) >= 0).map((data)=> <Card key={data.id} item={data} tipo={"casas"}/> )
            : casas.map((data)=> <Card key={data.id} item={data} tipo={"casas"}/> ) }
        </div>
        </SimpleBar>
        <Footer location="houses"/>
    </div>
}

export function CasasDetails() {
    const [casas, setCasas] = useState([]);
    const {id} = useParams();
    const {lang} = useContext(ContextLanguage);

    useEffect(()=> {
        axios.get(urlHouses+"/"+id).then((res)=> {
            setCasas(res.data)
        })
    }, [])

    return <div>
        <Header from={"/houses"}/>
        <div className="middle">
            <div className="charDetails">
                { casas.image && <div className="gallery_card"><img src={url + casas.image} alt=""/></div> }
                <h3>{casas.name}</h3>
                <div className="gallery">
                    <Details title={t[lang].settlement} item={casas.settlement} />
                    <Details title={t[lang].region} item={casas.region} />
                    <Details title={t[lang].alliances} item={casas.alliances} />
                    <Details title={t[lang].religions} item={casas.religions} />
                    <Details title={t[lang].foundation} item={casas.foundation} />
                </div>
            </div>
        </div>
    </div>
}