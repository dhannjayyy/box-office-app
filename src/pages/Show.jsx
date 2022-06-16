import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import GET_API from "../components/misc/getapi";

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

    const [{show,isLoading,error}, dispatch] = useReducer(reducer, initialState);

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
    console.log(show,isLoading,error)
    return <div>This is show page</div>;
};

export default Show;
