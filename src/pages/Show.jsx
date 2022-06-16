import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import GET_API from '../components/misc/getapi';

const Show = () => {
    const { id } = useParams();
    const [show,setShow] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        GET_API(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results=>{
            if(isMounted){
                setIsLoading(false);
                setShow(results);
            }
        }).catch(err=>{
            if(isMounted){
                setIsLoading(false);
                setError(err.message);
            }
        })
        
        return ()=>{
            isMounted=false;
        }
    }, [id])
    
    return (
        <div>This is show page</div>
    )
}

export default Show