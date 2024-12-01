import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadtv, removetv } from '../store/actions/tvActions'
import { useParams, useNavigate, Link, useLocation, Outlet } from 'react-router-dom'
import Loading from './Loading'
import HorizontalCards from "./partials/HorizontalCards"

function TvDetails() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { info } = useSelector((state) => state.tv) || {} // fallback to empty object to avoid undefined error
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncloadtv(id))
    return () => {
      dispatch(removetv())
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
            url(https://image.tmdb.org/t/p/original/${info.detail?.backdrop_path || ''})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className=" relative w-screen h-[240vh] px-[10%]"
    >
      {/* Part 1: Navigation */}
      <nav className="w-full h-[10vh] flex items-center gap-10 text-zinc-200 text-xl">
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] mr-[10%] ri-arrow-left-line text-2xl"></Link>
        <a target="_blank" rel="noopener noreferrer" href={info.detail?.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid?.wikidata_id}`}>
          <i className="ri-earth-fill"></i>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.externalid?.imdb_id}/`}>IMDB</a>
      </nav>

      {/* Part 2: Poster and Details */}
      <div className="w-full flex">
        <img className="h-[50vh] object-cover" src={`https://image.tmdb.org/t/p/original/${info.detail?.poster_path || info.detail?.backdrop_path || ''}`} alt="" />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black ">
            {info.detail?.name || info.detail?.title || info.detail?.original_name || info.detail?.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail?.first_air_date?.split("-")[0] || 'N/A'})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex items-center gap-x-5">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white h-[7vh] w-[7vh] flex items-center justify-center">
              {(info.detail?.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>

            <h1 className='w-[60px] font-semibold text-xl leading-5'>User Score</h1>
            <h1>{info.detail?.first_air_date}</h1>
            <h1>{info.detail?.genres ? info.detail.genres.map((g) => g.name).join(", ") : 'N/A'}</h1>
            <h1>{info.detail?.runtime ? `${info.detail.runtime} min` : 'N/A'}</h1>
          </div>

          <h1 className='text-xl font-semibold italic'>{info.detail?.tagline}</h1>
          <h1 className='text-2xl mt-3 font-semibold'>Overview</h1>
          <p>{info.detail?.overview}</p>

          <h1 className='text-2xl mt-3 font-semibold'>Movie Translated:</h1>
          <p className='mb-5'>{info.translations ? info.translations.join(", ") : 'N/A'}</p>

          <Link to={`${pathname}/trailer`} className='p-3 bg-[#6556CD] rounded-lg'>
            <i className="text-xl ri-play-fill"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3: Available Platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 m-10">
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

      {info.detail.seasons && info.detail.seasons.length > 0 ? (
  <div className="w-[100%] flex overflow-y-hidden mb-3">
    {info.detail.seasons.map((s, i) => (
      <Link to={`/tv/details/${s.id}`} key={i} className="min-w-[15%] ml-5 mb-5 bg-zinc-900 overflow-auto">
        <img className="h-[40vh] object-cover" src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt="" />
        <div className="text-white p-3 h-[45%]">
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
            {s.name || s.title || s.original_name || s.original_title}
          </h1>
         
        </div>
      </Link>
    ))}
  </div>
) : (
  <h1 className="text-3xl text-white font-black text-center mt-5">Nothing to show</h1>
)}


      {/* Part 4: Recommendations or Similar Movies */}
      <hr className='mt-10 mb-5 border-none h-[1px] bg-zinc-500 ' />
      <h1 className='text-3xl font-bold text-white  mb-3' >Recommendation and Similar stuff: </h1>
      <HorizontalCards data={info.recommendations || info.similar || []} />
      <Outlet />
    </div>
  ) : (
    <Loading />
  )
}

export default TvDetails
