import React from 'react'
import { Link } from 'react-router-dom'
import Noimage from '/Noimage.jpg'

function Cards({data , title}) {
  
  return (
    <div className='flex flex-wrap w-full h-full pl-[5%] bg-[#1F1E24]' >
      {data.map((c,i)=>(
        <Link to={`/${c.media_type || title}/details/${c.id}`} className=' relative w-[25vh]  mr-[4%] mb-[5%]' key={i}>

            <img className='h-[40vh] object-cover' src={c.poster_path || c.backdrop_path ||c.profile_path?`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path ||c.profile_path}`:Noimage} alt="" />
       <h1 className='text-2xl text-zinc-300 mt-3 font-semibold' >
         {c.name || c.title || c.original_name || c.original_title }
         </h1>

         {c.vote_average && (
          <div className='absolute right-[-13%] bottom-[40%] text-white bg-yellow-600 w-[7vh] h-[7vh] flex justify-center items-center rounded-full text-xl  ' >{(c.vote_average*10).toFixed()} <sup>%</sup>

          </div>
         )}
          

        </Link>
      ))}
    </div>
  )
}

export default Cards
