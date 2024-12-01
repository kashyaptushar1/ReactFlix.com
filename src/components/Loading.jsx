import loader from "/Loader.gif";

function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center   bg-black " >
      <img className="w-full h-[100vh]" src={loader} alt="" />
    </div>
  )
}

export default Loading;
