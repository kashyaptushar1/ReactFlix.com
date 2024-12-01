import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../Notfound';

function Trailer() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);

   

    return  (
        <div  className='bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] h-screen w-screen flex justify-center items-center'>
            <Link 
                onClick={() => navigate(-1)} 
                className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]'>
            </Link>
            
          {ytvideo?  <ReactPlayer 
                height={600} 
                width={1200} 
                url={`https://www.youtube.com/watch?v=${ytvideo.key}`} 
                playing={true} 
                controls={true} 
            /> :(<NotFound/>)}
        </div>
    );
}

export default Trailer;
