import { useEffect, useState } from "react"
import { get } from "../helpers/fetch-wrapper"


export default function useFetch(url){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await get(url)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    const getInit = (init, ctType = "application/json") => {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type",ctType)
        myHeaders.append("Accept",ctType)
        var myInit = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default",
        }
        return { ...myInit, ...init }
    }

    const refetch = () => {
        setLoading(true);
        fetch(url, getInit())
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error");
            }
            return response.json();
        })
        .then((json) => {
            setData(callable(json));
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
        setLoading(false);
      });
    }
    return { data, error, loading, refetch }

}