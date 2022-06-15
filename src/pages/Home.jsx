import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () => {
  const [input, setInput] = useState("");

  const onInputChange = (el) => {
    setInput(el.target.value);
  };

  const search = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then((response) =>
      response.json()
    ).then(result=>{console.log(result)});
  };

  const onEnter = (ev) =>{
    if(ev.code==="Enter"){
      search();
    }
  }

  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onEnter}/>
      <button type="button" onClick={search}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
