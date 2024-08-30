document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <header>
            <div id="site-name"><a href="index.html">HardWork PH</a></div>
            <nav id="main-nav">
                <a href="index.html">Home</a>
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact Us</a>
                <span id="user-info"></span>
                <button id="logoutButton" style="display:none;">Logout</button>
            </nav>
        </header>
    `;
    
    const footerHTML = `
        <footer>
            <p>&copy; 2024 HardWork PH</p>
        </footer>
    `;

    document.getElementById("header-placeholder").innerHTML = headerHTML;
    document.getElementById("footer-placeholder").innerHTML = footerHTML;
});
