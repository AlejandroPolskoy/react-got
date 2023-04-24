import { useEffect, useState } from "react";
import axios from "axios";
import "./Cronologia.scss";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const url = "http://localhost:3000/";
const urlChars = "http://localhost:3000/characters";

let order = "asc";
let minmax = 0;
export default function Cronologia() {
    const [characters, setCharacters] = useState([]);

    useEffect(()=> {
        axios.get(urlChars).then((res)=> {
            setCharacters(sort(res.data))
        })
    }, [])

    function changeOrder() {
        if(order==="asc") {
            order ="desc";
            minmax = Math.max(...characters.map(data => data.age));
        } else {
            order = "asc";
            minmax = Math.min(...characters.map(data => data.age));
        }
        setCharacters(sort([...characters]))
    }

    function sort( obj ) {
        return order === "asc" ? obj.sort((a, b)=> a.age - b.age) : obj.sort((a, b)=> b.age - a.age);
    }

    return <div className="home">
        <Header/>
        <SimpleBar style={{ height: "72.5vh", width: "80vw", margin: "0 auto" }} forceVisible="y" autoHide={false}>
        <div className="crono_root" onClick={changeOrder}>{ minmax }</div>
        <div className="timeline">
            { characters.map((data, index)=> <div key={index} className={ index%2 === 1 ? "container right" : "container left" } >
                <p>{data.age}</p>
                <h3>{data.name}</h3>
                <img src={url + data.image} alt="" className="crono_img" />
            </div>)}
        </div>
        </SimpleBar>
        <Footer location="crono"/>
    </div>
}