import React from 'react'
import { useState, useEffect } from 'react';

export default function Employee() {
    const [currentData, setCurrentData] = useState();

    async function fetchAPI(){
        const response = await fetch("http://localhost:5000/todos/");
        const data = await response.json();
        console.log(data)
        setCurrentData(data);
    }

    useEffect(async () => {
        fetchAPI();
    }, [])
    
    return (
        <div>
            
        </div>
    )
}
