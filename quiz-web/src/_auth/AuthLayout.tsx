import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const token = localStorage.getItem("token")
    // const isAuth = false
    console.log(token)
    return (
        <>
            {token === null ? (
                <>
                    <section className='flex flex-1 justify-center items-center flex-col py-10'>
                        <Outlet />
                    </section>

                    <img src="/assets/images/side-img.jpg" alt="logo" width={1000} height={1000} className='hidden xl:block h-screen object-cover bg-no-repeat' />
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
    )

}

export default AuthLayout