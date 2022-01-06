import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Searchbar() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [term] = useDebounce(searchTerm, 1500);
    const location = useLocation();

    useEffect(() => {
        setMovies([]);
        setSearchTerm('');
    }, [location]);

    useEffect(() => {
        console.log(term);
        if (term !== "") {
            axios.get(`movie/query/${encodeURIComponent(term)}`)
                .then(res => {
                    setMovies([...res.data]);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setMovies([]);
        }
    }, [term]);

    return (
        <div className="w-full text-gray-100">
            <input
                type="text"
                className="py-2 px-4 
                w-96 rounded-md
                bg-zinc-600 
                shadow 
                shadow-zinc-600 
                border-none
                focus:outline-none"
                name="search-bar"
                pleaceholder={"Search..."}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {
                movies.length > 0 ?
                    <div className="absolute max-h-full overflow-y-scroll w-96 mt-1 border border-1 border-zinc-800 bg-zinc-700 py-4 rounded-md z-50">
                        {
                            movies.map((movie, idx) => {
                                return (
                                    <div className="mt-1 relative hover:bg-zinc-600 w-full text-left" key={idx}>
                                        <Link to={`/movie/${movie.id}`}>
                                            <div className="w-full flex flex-col ">
                                                <div className="flex flex-row">
                                                    <div className="w-24 h-24 p-2">
                                                        <img
                                                            src={
                                                                (movie.backdrop_path || movie.poster_path) ?
                                                                    `https://image.tmdb.org/t/p/w500${movie.backdrop_path ?? movie.poster_path}`
                                                                    :
                                                                    'https://phcmenudeo.s3.amazonaws.com/misc/noimage.jpg'
                                                            }
                                                            className="w-full h-full object-contain"
                                                            alt="Movie img..." />
                                                    </div>
                                                    <div className="p-4">
                                                        <h4 className="text-sm">{movie.title}</h4>
                                                        <h5 className="text-xs">({movie.year ?? 'NA'})</h5>
                                                        <h5 className="text-xs">
                                                            {
                                                                movie.cast.length > 1 ?
                                                                    movie.cast.map((actor, idx) => {
                                                                        return <span key={idx}>{actor}{idx == movie.cast.length - 1 ? '' : ', '}</span>
                                                                    })
                                                                    : null
                                                            }
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div> : null
            }
        </div>
    )
}
