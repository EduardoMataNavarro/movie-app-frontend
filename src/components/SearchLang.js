import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';


export default function SearchLang() {
    const [query, setQuery] = useState('');
    const [languages, setLanguages] = useState([]);
    const [results, setResuts] = useState([]);
    const [search] = useDebounce(query, 250);

    useEffect(() => {
        axios.get('language')
        .then(res => {
            setLanguages([...res.data]);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if (search !== '') {
            let results = [...languages.filter(el => el.iso_639_1.includes(search) || el.english_name.includes(search))];
            setResuts([...results]);  
        } else {
            setResuts([]);
        }
    }, [search]);

    useEffect(() => {
        console.log(results);
    }, [results])
    return (
        <div className="w-full text-zinc-700 mb-40">
            <input
                type="text"
                className="py-2 px-1  border-none shadow-md rounded-md focus:outline-none"
                placeholder="Search language..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onBlur={e => setQuery('')}
            />
            {
                results.length > 0 ?
                    <div className="absolute w-60 max-h-32 overflow-y-scroll bg-zinc-100 py-2 border-2 rounded-md border-zinc-500">
                        {
                            results.map((res, idx) => {
                                return (
                                    <h3 className="px-1 py-1 hover:bg-zinc-300" key={idx}>
                                        <Link to={`/lang/${res.iso_639_1}`}>{res.english_name}</Link>
                                    </h3>
                                ) 
                            })
                        }
                    </div>
                    : null
            }
        </div>
    )
}
