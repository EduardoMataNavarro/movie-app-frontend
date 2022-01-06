import React from 'react'
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

export default function Header() {
    
    return (
        <div className="w-full bg-zinc-900 text-zinc-300 p-3">
            <div className="flex flex-row flex-1">
                <div>
                    <Link to='/'>
                        <h3 className="text-xl py-2 px-4 rounded-md border-4 border-dashed border-emerald-800">
                            Movies app
                        </h3>
                    </Link>
                </div>
                <div className="mx-auto">
                    <Searchbar />
                </div>
            </div>
        </div>
    )
}
