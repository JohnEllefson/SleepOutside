let isShown = localStorage.getItem("visit");

function alertMessage() {
    if (isShown == null) {
        const alert = document.createElement("div");
        alert.classList.add("alert");
        alert.innerHTML = `<p>Welcome to the site! Register and be one of the first 25 to get a free $50 voucher!</p><span>X</span>`;  
        alert.addEventListener("click", function(e) {
          if (e.target.tagName == "SPAN") {
            main.removeChild(this);
          }
        })
        const main = document.querySelector("main");
        main.prepend(alert);
    }
    localStorage.setItem("visit", "true");
  }

alertMessage();