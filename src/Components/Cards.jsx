import { Link } from "react-router-dom";

const url = "http://localhost:3000/";

export function Card( {item, tipo} ) {
    let link = tipo == "casas" ? "/houses/" : "/characters/";

    return <div className="gallery_card">
        <Link to={link + item.id}>
            <img src={url + item.image} alt={item.name} />
            <div className="gallery_card_name">
                {item.name}
            </div>
        </Link>
    </div>
}

export function Details( {title, item} ) {
    return <div className="gallery_details">
        <h3>{ title }</h3>
        <ul>
            { typeof(item) == "object" && item.image 
            ? <><h3>{item.name}</h3><img src={url+item.image} alt="" width="200"/></>
            : typeof(item) == "object" 
            ? item.map((data, index)=><li key={index}>{data}</li>) 
            : <li>{item}</li> }
        </ul>
    </div>
}