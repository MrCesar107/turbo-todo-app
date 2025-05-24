import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu"];

  toogleMenu(event) {
    event.preventDefault();
    this.menuTarget.classList.toggle("hidden");
  }

  closeMenu(event) {
    this.menuTarget.classList.add("hidden");
  }
}
