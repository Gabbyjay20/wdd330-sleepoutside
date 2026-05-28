export default class Alert {
  constructor() {
    this.path = '/json/alerts.json';
  }

  async init() {
    const alerts = await this.getAlerts();
    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async getAlerts() {
    try {
      const res = await fetch(this.path);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  renderAlerts(alerts) {
    const section = document.createElement('section');
    section.className = 'alert-list';

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    main.prepend(section);
  }
}
