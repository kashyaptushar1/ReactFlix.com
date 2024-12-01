import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Loading from './Loading'

function Moviedetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { info } = useSelector((state) => state.movie)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovie())
    }
  }, [dispatch, id])

  return info ? (
    <div
      style={{
        backgroundImage: `
            linear-gradient(
                rgba(0, 0, 0, 0.4), 
                rgba(0, 0, 0, 0.5), 
                rgba(0, 0, 0, 0.6)
            ),
            url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || ''})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-screen h-screen px-[10%]"
    >
      {/* part 1 navigation */}
      <nav className="w-full h-[10vh] flex items-center gap-10 text-zinc-200 text-xl">
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] mr-[10%] ri-arrow-left-line text-2xl"></Link>
        <a target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid?.wikidata_id}`}>
          <i className="ri-earth-fill"></i>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.externalid?.imdb_id}/`}>IMDB</a>
      </nav>

      {/* part 2 poster */}
      <div className="w-full flex">
        <img className="h-[40vh] object-cover" src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path || ''}`} alt="" />

        <div className="content ml-[5%]">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.release_date?.split("-")[0] || 'N/A'})
            </small>
          </h1>

          <div className=" mt-3 mb-10  flex text-zinc-100 items-center gap-x-5" >
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white h-[7vh] w-[7vh] flex items-center justify-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>

            <h1 className='w-[60px] font-semibold text-xl leading-5 ' >User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g)=>g.name).join(",")}</h1>
            <h1>{info.detail.runtime} min</h1>
            

          </div>
        </div>
      </div>

      {/* part 3 available platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders?.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform:</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img title={w.provider_name} key={i} className="h-[5vh] w-[5vh] rounded-md object-cover" src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}
        {info.watchproviders?.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent:</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img title={w.provider_name} key={i} className="h-[5vh] w-[5vh] rounded-md object-cover" src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}
        {info.watchproviders?.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy:</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img title={w.provider_name} key={i} className="h-[5vh] w-[5vh] rounded-md object-cover" src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Moviedetails;
