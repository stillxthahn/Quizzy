import { Outlet, Navigate, Link } from 'react-router-dom';
const RootLayout = () => {
    const token = localStorage.getItem("token")
    return (
        token === null ? <Navigate to="/sign-in" /> :
            <>
                <div>RootLayout </div>
                <ul>
                    <li><Link to="/" >Home</Link ></li>
                    <li><Link to="/topic" >Topic</Link ></li>
                    <li><Link to="/answers" >Answers</Link ></li>
                </ul>
                <Outlet />
            </>
    )
}


export default RootLayout