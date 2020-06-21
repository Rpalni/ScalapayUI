import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

function Header() {

    var currentRoute = window.location.pathname;
    var pageHeading = "Get Configuration Details";

    if (currentRoute === "/postorder") {
        pageHeading = "Post Order";
    }
    else if (currentRoute === "/") {
        pageHeading = "Configuration Details";
    }

    return (
        <Router>
            <div>
                <h1><center>Scalapay Management System</center></h1>
                <h4><strong>{pageHeading}</strong></h4>
                <p> <a href="./">Configuration Details</a> | <a href="./postorder">Post Order</a></p>
            </div>
        </Router >
    );
}

export default Header;
