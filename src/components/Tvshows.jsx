import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import InfiniteScroll from "react-infinite-scroll-component"
import Cards from './partials/Cards'
import Loading from './Loading'

function Tvshows() {

      

    const navigate = useNavigate()
 const [category , setcategory] =  useState("airing_today")
 
 const [tv , settv] =  useState([])
 const [page , setpage] = useState(1)
 const [hasMore , sethasMore] =   useState(true)

 document.title = "ReactFlix | Movie -" +category.toLocaleUpperCase();

 const GetTv = async () => {
    try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        if (data.results.length > 0) {
            settv((prevState) => [...prevState, ...data.results]);
            setpage((prevPage) => prevPage + 1);
        } else {
            sethasMore(false); // No more data to load
        }
    } catch (error) {
        console.log("Error", error);
    }
};


const refershHandler = () => {
 if(tv.length === 0){
    GetTv()
 }else{
    setpage(1)
    settv([])
    GetTv();
 }
}


useEffect(()=>{
    

    refershHandler()
},[category])


  return tv.length > 0 ? (
    <div className=' w-screen h-screen  ' >
        <div className='px-[5%] w-full flex items-center justify-between ' >
        <h1 className='text-2xl font-semibold text-zinc-400 ' >
        <i onClick={()=>navigate(-1)} className=" hover:text-[#6556CD] mr-[10%] ri-arrow-left-line"></i>
            Tv_Shows
        </h1>
       <div className='flex items-center w-[80%]  ' >
       <Topnav  />
        <Dropdown title="Category" options={["on_the_air","popular","top_rated","airing_today"]} func={(e)=> setcategory(e.target.value)} />
        <div className='w-[3%]' ></div>
        {/* <Dropdown title="Duration" options={["week","day"]} func={(e)=> setduration(e.target.value)} /> */}
       </div>

        </div>



   

            <InfiniteScroll 
            dataLength={tv.length}
            next={GetTv}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}

            >
            <Cards data={tv} title="tv"/>
            </InfiniteScroll>
      
        



    </div>
  ):<Loading/>
}

export default Tvshows
