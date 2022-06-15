import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import GET_API from "../components/misc/getapi";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);

  const onInputChange = (el) => {
    setInput(el.target.value);
  };

  const search = () => {
    GET_API(`/search/shows?q=${input}`)
      .then((result) => {
        setResults(result);
      });
  };

  const onEnter = (ev) => {
    if (ev.code === "Enter") {
      search();
    }
  };

  const showResults = () => {
    if(results && results.length===0){
      return(
        <div>No Results</div>
      )
    }

    if(results && results.length>0){
      return (
        <div>
          {results.map((item) => {
            return (<div key={item.show.id}>{item.show.name}</div>)
          })}
        </div>
      )
    }

    return null;
  };


  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onEnter} />
      <button type="button" onClick={search}>
        Search
      </button>
      {showResults()}
    </MainPageLayout>
  );
};

export default Home;
