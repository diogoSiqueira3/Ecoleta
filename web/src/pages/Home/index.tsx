import React from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () =>{
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="logo"/>
                </header>

                <main>
                    <h1>Marketplace de coleta</h1>
                    <p>Ajudamos</p>

                    <Link to="/create-point">
                        <span><FiLogIn/></span>
                        <strong>Cadestre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home;