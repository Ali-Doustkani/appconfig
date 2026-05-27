import { useEffect, useState } from "react";

export default function Instances(){
    const [data, setData] = useState(null)

    useEffect(()=>{
        fetch('/api/health')
        .then(res=>res.json())
        .then(setData)
    }, [])

    if(!data){
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Instances</h1>
            <p>Status: {data.status}</p>
            <p>Service: {data.service}</p>
            <p>Timestamp: {data.timestamp}</p>
        </div>
    )
}