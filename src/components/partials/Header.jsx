import React from 'react';
import { Link } from 'react-router-dom';

function Header({ data }) {
    // console.log(data);
    return (
        <div
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(0, 0, 0, 0.4), 
                        rgba(0, 0, 0, 0.5), 
                        rgba(0, 0, 0, 0.6)
                    ),
                    url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className='w-full h-[50vh] flex flex-col justify-end items-start p-[4%] '
        >
          <h1 className='w-[70%] text-5xl font-black text-white' >{data.name || data.title || data.original_name || data.original_title}</h1>
          <p className='w-[70%] text-white mb-3 mt-3 ' >{data.overview.slice(0,200)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400' >More</Link></p>
          <p className='text-white mb-3 ' >
          <i className="ri-megaphone-fill text-yellow-500 "></i>{data.release_date || "No info"}
          <i className="ri-album-fill text-yellow-500 ml-5 "></i>{data.media_type.toUpperCase()}
          </p>
          <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='bg-[#6556CD] p-2 rounded text-white font-semibold ' >Watch trailer</Link>
        </div>
    );
}

export default Header;
