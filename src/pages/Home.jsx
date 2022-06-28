import React, { useState, useCallback } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import { useLastQuery } from "../components/misc/custom-hooks";
import GET_API from "../components/misc/getapi";
import ShowGrid from "../components/show/ShowGrid";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isSearchShows = searchOption === "shows";

  const onInputChange = useCallback(
    (el) => {
     setInput(el.target.value);
   },[setInput]
  )

  const onRadioChange = useCallback(
    (ev) => {
      setSearchOption(ev.target.value);
    }, []
  )

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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onInputChange}
        onKeyDown={onEnter}
        value={input}
        placeholder="Search for something"
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-radio"
            value="shows"
            onChange={onRadioChange}
            checked={isSearchShows}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-radio"
            value="people"
            onChange={onRadioChange}
            checked={!isSearchShows}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={search}>
          Search
        </button>
      </SearchButtonWrapper>
      {showResults()}
    </MainPageLayout>
  );
};

export default Home;
