import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Noimage from '/Noimage.jpg';
import { ThemeContext } from '../ThemeContext';
import axios from '../../utils/axios';

function Topnav() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const GetSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
        } catch (error) {
            console.log("Error", error);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            GetSearches();
        } else {
            setSearches([]);
        }
    }, [query]);

    return (
        <div className='w-[80%] h-[10vh] relative flex mx-auto items-center ml-[15%]'>
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className='w-[50%] mx-10 p-2 text-xl outline-none border-none text-zinc-200 bg-transparent'
                type="text"
                placeholder='Search Anything'
            />
            {query.length > 0 && (
                <i onClick={() => setQuery("")} className="text-zinc-400 ri-close-fill right-0 text-3xl"></i>
            )}
            <button className='ml-[50vh]' onClick={toggleTheme}>
                {theme ? <i className="ri-sun-fill text-white  "></i> : <i className="ri-moon-fill"></i>}
            </button>

            <div className='z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto rounded'>
                {searches.map((s, i) => (
                    <Link
                        to={`/${s.media_type}/details/${s.id}`}
                        key={i}
                        className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100'
                    >
                        <img
                            className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                            src={
                                s.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${s.poster_path}`
                                    : s.profile_path
                                    ? `https://image.tmdb.org/t/p/w500/${s.profile_path}`
                                    : s.backdrop_path
                                    ? `https://image.tmdb.org/t/p/w500/${s.backdrop_path}`
                                    : Noimage
                            }
                            alt=""
                        />
                        <span>{s.name || s.title || s.original_name || s.original_title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Topnav;
