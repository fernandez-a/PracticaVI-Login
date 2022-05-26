import React, { useState } from "react";
import Session from "./Session";



const Home = () => {
    const [render,setRender] = useState<boolean>(false);
    const token = localStorage.getItem("token");
    return (
        <div>
            {token ? <h1>Home</h1> : <Session reRender={() => setRender(!render)}></Session>}
        </div>
    )
}

export default Home