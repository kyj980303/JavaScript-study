import AbstractView from "../views/AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("404 Not Found");
  }

  async getHtml() {
    return `
   	 <p>404 Not Found!</p>
    `;
  }
}
