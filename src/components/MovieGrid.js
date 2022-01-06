import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


export default function MovieGrid({ cols, gap, movies, title }) {
    return (
        <div className="w-full p-4">
            <h1 className="text-2xl">{title}</h1>
            <div className={`grid grid-cols-5 gap-4 py-6`}>
                {
                    movies && movies.map((movie, idx) => {
                        return (
                            <div key={idx}>
                                <div className="border-2 shadow-xl rounded-xl border-zinc-900 p-4">
                                    <img src={
                                        (movie.backdrop_path || movie.poster_path) ?
                                            `https://image.tmdb.org/t/p/w500${movie.poster_path ?? movie.backdrop_path}`
                                            :
                                            'https://phcmenudeo.s3.amazonaws.com/misc/noimage.jpg'
                                    } className="w-full h-auto" />
                                    <h2 className="mt-4"> <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link></h2>
                                    <h2 className="text-xs">({movie.title})</h2>
                                    <h2 className="my-4">{movie.vote_average}/10 <FontAwesomeIcon className="text-yellow-600" icon={faStar} /></h2>
                                    <p className="my-4 text-xs">
                                        {movie.cast.map((actor, idx) => {
                                            return <span key={idx}>{actor}. </span>
                                        })}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
