import React from 'react'
import ButtonOutlineBtm from '../components/Reusable/BtnOutlineBtm'
import { useNavigate } from 'react-router'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='pt-20 h-[70dvh] md:h-[100dvh]'>
       <div className='m-5 rounded-lg bg-[#fff9e5] h-full flex items-center w-[calc(100%-40px)] flex-col justify-around'>
        <h2 className=' text-4xl sm-sm-sm:text-5xl lg:text-6xl font-black'>Opps!</h2>
        <h1 className='font-black text-[140px] sm-sm-sm:text-[200px] sm:text-[300px] sm-md:text-[400px] lg:text-[500px] text-[rgba(177,177,177,0.2)] h-min leading-none'>404</h1>
        <ButtonOutlineBtm className="flex items-end gap-2" onClick={() => navigate("/shop")}>Continue Shopping <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="rotate(90 12 12)"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12.707 3.636a1 1 0 0 0-1.414 0L5.636 9.293a1 1 0 1 0 1.414 1.414L11 6.757V20a1 1 0 1 0 2 0V6.757l3.95 3.95a1 1 0 0 0 1.414-1.414l-5.657-5.657Z"/></g></g></svg></ButtonOutlineBtm>
       </div>
    </div>
  )
}

export default PageNotFound
