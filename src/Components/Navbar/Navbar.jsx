import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            {/* Logo Section */}
            <div style={styles.logo}>
                <img src="/images/NavLogo.png" alt="Logo" style={styles.logoImg} />
                {/* <h2 style={styles.logoText}>MyBrand</h2> */}
            </div>

            {/* Navigation Links */}
            <div style={styles.navLinks}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/about" style={styles.link}>About</Link>
                <Link to="/contact" style={styles.link}>Contact</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 80px",
        background: "#000000",
        color: "white",
        boxShadow: "0px 4px 6px rgba(252, 172, 0, 0.1)",
    },
    logo: {
        display: "flex",
        alignItems: "center",
    },
    logoImg: {
        width: "50px",
        borderRadius: "50%",
        marginRight: "10px",
    },
    logoText: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    navLinks: {
        display: "flex",
        gap: "20px",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "8px 12px",
        borderRadius: "5px",
        transition: "background 0.3s",
    },
    linkHover: {
        background: "#555",
    },
};

export default Navbar;
