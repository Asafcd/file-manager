//@ts-nocheck
import React from "react";

function NavBar() {
    const navs = [
        {name: "Expedientes", to: "/archives"},
        //{name: "Evidencias", to: "/files"},
        //{name: "Clientes", to: "/clients"},
        //{name: "Calendario", to: "/calendar"},
        //{name: "Agenda", to: "/agenda"},
    ]

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
            <div className="container-fluid d-flex">

                <a className="navbar-brand" href="/">
                    File Manager
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    { navs.map( ({name, to}) => (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href={to}>
                                {name}
                                </a>
                            </li>
                        
                        </ul>
                        ))
                    }
                </div>
                <div className="end">
                    <ul className="navbar-nav my-2 my-sm-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Log Out</a>
                        </li>
                    </ul> 
                    </div>
            </div>


            
        </nav>
    );
}

export default NavBar;
