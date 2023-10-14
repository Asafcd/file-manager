//@ts-nocheck
import React from "react";

function NavBar() {
    const navs = [
        { name: "Demandas", to: "/archives" },
        //{name: "Evidencias", to: "/files"},
        //{name: "Clientes", to: "/clients"},
        //{name: "Calendario", to: "/calendar"},
        //{name: "Agenda", to: "/agenda"},
    ]

    return (
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/archives">Demandas</a>
                        </li>
                        
                    </ul>
                    {/* <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
