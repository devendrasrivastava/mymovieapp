import React from 'react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const useremail = localStorage.getItem('userName');
    const navigate = useNavigate();


    //function to log out

    function logout() {
        localStorage.removeItem('jwt_token');
        navigate("/login")
    }


    //header starts here
    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-light user-navbar fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand img-fluid" href="/"><img src="./assets/nwlogo.png" alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse user-navbar-navbtn" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            {
                                localStorage.getItem('jwt_token') ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/movies">Movies</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/favorites">Favorites</Link>
                                        </li>
                                    </>

                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/loginpage">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/signup">Sign Up</Link>
                                        </li>
                                    </>
                            }
                        </ul>


                        {localStorage.getItem('jwt_token') ?
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" id="user-details-on-header" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {useremail}
                                </button>

                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/loginpage" onClick={logout}>Logout</Link></li>
                                </ul>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </nav>



        </div>
    )
}