import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import GET_API from "../components/misc/getapi";
import ShowGrid from "../components/show/ShowGrid";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isSearchShows = searchOption === "shows";

  const onInputChange = (el) => {
    setInput(el.target.value);
  };

  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  }

  const search = () => {
    GET_API(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
    });
  };

  const onEnter = (ev) => {
    if (ev.code === "Enter") {
      search();
    }
  };


  const showResults = () => {
    console.log();
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show 
      ? (<ShowGrid data={results}/>)
      : (<ActorGrid data={results}/>)
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onEnter} placeholder="Search for something" />
      <div>
        <label htmlFor="shows-radio">
          Shows
          <input id="shows-radio" type="radio" value="shows" onChange={onRadioChange} checked={isSearchShows}/>
        </label>
        <label htmlFor="actors-radio">
          Actors
          <input id="actors-radio" type="radio" value="people" onChange={onRadioChange} checked={!isSearchShows} />
        </label>
      </div>
      <button type="button" onClick={search}>
        Search
      </button>
      {showResults()}
    </MainPageLayout>
  );
};

export default Home;
