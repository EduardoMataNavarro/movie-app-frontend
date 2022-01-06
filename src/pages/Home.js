import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import MovieGrid from '../components/MovieGrid'


export default function Home() {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    
    useEffect(() => {
        axios.get('movie/top-rated')
        .then(res => {
            setTopRatedMovies([...res.data]);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('movie/latest')
        .then(res => {
            setLatestMovies([...res.data]);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div className="w-full">
           <MovieGrid cols="5" gap="4" title="Top rated movies" movies={topRatedMovies} />
           <MovieGrid cols="5" gap="4" title="Now playing" movies={latestMovies} />
        </div>
    )
}
