import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import MovieGrid from './MovieGrid';

export default function MovieList({ query }) {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        getMovies(id, query);
    }, [null, id, query]);

    const getMovies = (id, query) => {
        axios.get(`movie/find`, {
            params: {
                [query]: id
            }
        })
        .then(res => {
            setMovies([...res.data]);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="w-full">
            <MovieGrid cols="5" gap="4" movies={movies} title={'Movies'} />
        </div>
    )
}
