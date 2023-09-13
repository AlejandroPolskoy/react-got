import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Card, Details } from "../Components/Cards";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContextLanguage, t, url } from "../App";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export function Casas() {
    const [casas, setCasas] = useState([]);
    const {searching} = useContext(ContextLanguage);

    useEffect(()=> {
        axios.get(url + "/houses").then((res)=> {
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
        axios.get(url+"/houses/"+id).then((res)=> {
            setCasas(res.data[0])
        })
    }, [])

    return <div>
        <Header from={"/houses"}/>
        <div className="middle">
            <div className="charDetails">
                { casas.image && <div className="gallery_card"><img src={casas.image} alt=""/></div> }
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