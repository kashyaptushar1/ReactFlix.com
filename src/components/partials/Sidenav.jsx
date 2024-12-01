// import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import axios from '../../utils/axios'

function Sidenav() {


    

  return (
    <div className="w-[20%] h-full border-zinc-400 border-r-2 p-3 " >
        <h1 className='text-4xl text-white font-bold' >
            <i className='ri-tv-fill text-[#6556CD] mr-2'></i>
           <span className='text-2xl' >ReactFlix</span>
        </h1>
       <nav className='flex flex-col text-zinc-400' >
       <h1 className='text-white font-semibold text-xl mt-4 mb-3 ' >New Feeds</h1>
      <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 text-xl' > <i className="ri-fire-fill"></i> Trending</Link>
      <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 text-xl' > <i className="ri-bard-fill"></i> Popular</Link>
      <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 text-xl' ><i className="ri-movie-2-fill"></i> Movies</Link>
      <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 text-xl' > <i className="ri-tv-2-fill"></i> TV Shows</Link>
      <Link to="/person" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 mb-1 text-xl' ><i className="ri-team-fill"></i> People</Link>
      
       </nav>
       <hr className='border-none h-[1px] bg-zinc-400'/>
       <nav className='flex flex-col text-zinc-400' >
      
       <h1 className='text-white font-semibold text-2xl mt-3 ' >Website Information</h1>
      <Link to="/about" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 text-xl' > <i className="ri-information-fill"></i> About </Link>
      <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 text-xl' ><i className="ri-phone-fill"></i> Contant US</Link>
      
       </nav>
    </div>
  )
}

export default Sidenav
