import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const api = "https://jsonplaceholder.typicode.com/users"
// const ReactQuery = () => {

//     const [data, setData] = useState([])

//     const fetchItems = async () => {
//         const response = await axios.get(api);
//         setData(response.data)  
//         console.log(response.data);
              
//         return response.data
//         };

//     useEffect(()=>{
        
//         fetchItems();

//     },[])
//   return (
  
//     <div className="grid grid-cols-2 gap-4 p-4">
//         {data.map((item) => (
//             <div key={item.index} className="border p-4 rounded-lg shadow-md bg-white">
//                 <p className="font-bold text-lg">Name: {item.name}</p>
//                 <p>Email: {item.email}</p>
//                 <p>Username: {item.username}</p>
//             </div>
//         ))}
//     </div>
//   )
// }

// export default ReactQuery;


// Using react-query

const ReactQuery = () => {

    const fetchUsers = async () => {
        const response = await axios.get(api);
              
        return response.data
        };

    const { data, error, isLoading, isError } = useQuery({queryKey:"users",queryFn:fetchUsers});

    if (isLoading) {
    return <div>Loading...</div>;
    }
    
    if (isError) {
    return <div>Error: {error.message}</div>;
    }

  return (
  
    <div className="grid grid-cols-2 gap-4 p-4">
        {data.map((item) => (
            <div key={item.index} className="border p-4 rounded-lg shadow-md bg-white">
                <p className="font-bold text-lg">Name: {item.name}</p>
                <p>Email: {item.email}</p>
                <p>Username: {item.username}</p>
            </div>
        ))}
    </div>
  )
}

export default ReactQuery;