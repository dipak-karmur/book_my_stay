import React from 'react'
import {useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    function handleNavigate(){
        navigate('/')
    }

  return (
    <div>
      <div className='w-screen h-screen  bg-slate-50'>
      <div className="w-screen h-[8vh] bg-[#0295db] text-white font-bold grid place-items-center text-3xl py-3">Bac-Mart</div>
      <div className='error-container w-screen h-[92vh] flex items-center flex-col justify-center gap-5'>
        <div className="error-img w-[min(80%,460px)]">
          <img src="/images/Monster 404 Error-pana.svg" alt="404 Error | Page Not Found" className='w-full' />
        </div>
          <button onClick={handleNavigate} >
          GO TO HOMEPAGE
          </button>
      </div>
    </div>
    </div>
  )
}

export default ErrorPage
