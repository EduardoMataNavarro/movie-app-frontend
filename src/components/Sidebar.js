import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchLang from './SearchLang';


export default function Sidebar() {
    const [genres, setGenres] = useState([]);

    useEffect(async () => {
        axios.get('genre')
            .then(res => {
                setGenres([...res.data]);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="w-full h-full text-zinc-300 bg-zinc-900 p-6">
            <h2 className="font-bold mb-2">Genres</h2>
            {
                genres.length > 0 ? genres.map((genre, idx) => {
                    return <h3 className="my-2" key={idx}><Link to={`/genre/${genre.id}`}>{genre.name}</Link></h3>
                }) :
                    <h3 className="font-semibold text-sm">No genres yet</h3>
            }

            <h2 className="font-bold mb-2 mt-4">Languages</h2>
            <SearchLang />
        </div>
    )
}
