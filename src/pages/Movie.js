import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

export default function Movie() {

    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        console.log('Cambio el param id: ' + id);
        axios.get(`/movie/${id}`)
            .then(res => {
                setMovie(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);
    return (
        <div className="text-zinc-200">
            <h2 className="text-3xl mb-4">{movie?.original_title}</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-zinc-900 shadow-md p-12">
                    <img
                        className="w-full h-auto" 
                        src={
                            movie?.poster_path ? 
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://phcmenudeo.s3.amazonaws.com/misc/noimage.jpg'
                        } 
                        alt="Movie image..." />
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 shadow-md">
                    <h3 className="mb-4">Overview</h3>
                    <p className="w-full">
                        {
                            movie?.overview
                        }
                    </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 shadow-md">
                    <h3 className="mb-6">General Information</h3>
                    <h3 className="mb-6">{movie.tagline ? `"${movie.tagline}"` : ''}</h3>
                    <h3 className="mb-2">Status: {movie?.status}</h3>
                    <h3 className="mb-2">Release date: {movie?.release_data} </h3>
                    <h3 className="mb-2">Status: {movie?.status}</h3>
                    <h3 className="mb-2">Rating: {movie?.vote_average}/10 <FontAwesomeIcon icon={faStar} /> </h3>
                </div>
            </div>
        </div>
    )
}
