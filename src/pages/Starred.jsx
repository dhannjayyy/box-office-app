import React, { useEffect, useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { useShows } from "../components/misc/custom-hooks";
import ShowGrid from "../components/show/ShowGrid"
import GET_API from "../components/misc/getapi";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (starred && starred.length > 0) {
      const Promises = starred.map((showId) => GET_API(`/shows/${showId}`));
      console.log(Promises);

      Promise.all(Promises)
        .then(apiData => apiData.map((show) => ({ show })))
        .then(results => {
          console.log('results',results);
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return <MainPageLayout>
    {isLoading && <div> Shows are loading </div>}
    {error && <div> Something went wrong {` ${error}`} </div>}
    {!isLoading && !shows && <div> No shows were added </div>}
    {!isLoading && !error && shows && <div> <ShowGrid data={shows}/> </div>}
  </MainPageLayout>;
};

export default Starred;
