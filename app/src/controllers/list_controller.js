import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    listId: Number,
  };

  async destroyList(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/lists/${this.listIdValue}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.querySelector(`#list-${this.listIdValue}`).remove();
    }
  }
}
