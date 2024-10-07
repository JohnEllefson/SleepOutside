export default class Alert {
    constructor() {
      this.alertsFile = "/json/alerts.json"; 
      this.init();
    }
  
    async init() {
      try {
        const alerts = await this.fetchAlerts();
        if (alerts.length > 0) {
          this.renderAlerts(alerts);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    }
  
    async fetchAlerts() {
      const response = await fetch(this.alertsFile);
      if (!response.ok) {
        throw new Error("Could not fetch alerts");
      }
      return await response.json();
    }
  
    renderAlerts(alerts) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");
  
      alerts.forEach(alert => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertSection.appendChild(alertElement);
      });

      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.prepend(alertSection);
      } else {
        console.error("Main element not found");
      }
    }
}