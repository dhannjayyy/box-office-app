import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import GET_API from "../components/misc/getapi";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Season";
import ShowMainData from "../components/show/ShowMainData";

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    GET_API(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_SUCCESS",
            show: results,
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_FAILED",
            error: err.message,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(show);
  
  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <h2>Details</h2>
      <Details status={show.status} network={show.network} premiered={show.premiered}/>

      <h2>Season</h2> 
      <Seasons seasons={show._embedded.seasons}/>

      <h2>Cast</h2>
      <Cast cast={show._embedded.cast}/>
    </div>
  );
};

export default Show;
