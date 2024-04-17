import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authentication';

export default function Navbar() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.authentication);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">HOME</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    {
                        (currentUser === undefined) ?
                            <></>
                            : (currentUser === null) ?
                                (
                                    <>
                                        <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                                        <Link className="btn btn-primary" to="/signup">Signup</Link>
                                    </>
                                )
                                :
                                <>
                                    <div className="nav-item" style={{ color: 'white' }}>
                                        {currentUser.name}
                                    </div>

                                    <button className="btn btn-danger mx-2" onClick={async () => {
                                        await dispatch(logout());
                                        history('/signup')
                                    }}>Logout</button>
                                </>
                    }

                </div>
            </div>
        </nav>
    )
}
