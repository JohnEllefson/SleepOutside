let isShown = localStorage.getItem("visit");

// let firstVisit = localStorage.getItem("visit");

if (isShown !== null) {
    window.alert("Welcome to the site! Please register with our site! The first 100 people that do get a $25 voucher!");
    localStorage.setItem("visit", "true");
    // isShown = true;
}