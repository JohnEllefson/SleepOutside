import fetch from "node-fetch";

class Alert {
  constructor() {
    this.alerts = [];
  }

  async loadAlerts() {
    try {
      const response = await fetch("alerts.json");
      this.alerts = await response.json();
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  displayAlerts() {
    const alertList = document.createElement("section");
    alertList.className = "alert-list";

    this.alerts.forEach((alert) => {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      alertList.appendChild(alertElement);
    });

    const mainElement = document.querySelector("main");
    mainElement.prepend(alertList);
  }
}

export default Alert;