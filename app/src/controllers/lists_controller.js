import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["listsContainer", "createListForm"];
  static values = {
    listId: Number,
  };

  connect() {
    this.buildLists();
  }

  async createList(event) {
    event.preventDefault();
    const formData = new FormData(this.createListFormTarget);
    const body = { name: formData.get("list[name]") };
    const response = await fetch("http://localhost:3000/lists", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    this.buildList(data["list"]);
  }

  async buildLists() {
    const data = await this._fetchLists();
    data["lists"].forEach((list) => {
      this.buildList(list);
    });
  }

  buildList(list) {
    const listElementHTML = this._listElementHTML(list);
    this.listsContainerTarget.innerHTML += listElementHTML;
  }

  _listElementHTML(list) {
    return `
      <div class="min-w-[350px] flex-none h-[80dvh] bg-slate-200 rounded-md" id="list-${list.id}" data-controller="list" data-list-list-id-value="${list.id}">
        <div class="p-6">
          <div class="relative flex justify-between items-center" data-controller="list-header">
            <h2 class="text-lg font-bold">${list.name}</h2>
            <button class="bg-slate-200 rounded-md p-2 cursor-pointer text-xl hover:bg-slate-300 transition-colors duration-300 relative" data-action="list-header#toogleMenu">
              <i class="fas fa-ellipsis-h"></i>
            </button>
            <div class="absolute top-0 mt-15 right-0 bg-white rounded-md w-40 hidden" data-list-header-target="menu">
              <div class="flex justify-between items-center p-2">
                <h3 class="text-sm font-bold">Actions</h3>
                <button class="cursor-pointer text-red-500" data-action="list-header#closeMenu">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <ul class="flex flex-col gap-2 p-3">
                <li class="hover:bg-gray-200 transition-colors duration-300 w-full rounded-md text-center">
                  <a href="#" class="block w-full p-2 text-sm">Add task</a>
                </li>
                <li class="hover:bg-gray-200 transition-colors duration-300 w-full rounded-md text-center">
                  <a href="#" class="block w-full p-2 text-sm" data-action="list#destroyList">Delete list</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  async _fetchLists() {
    const response = await fetch("http://localhost:3000/lists", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const lists = await response.json();
    return lists;
  }

  async deleteList(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/lists/${this.listIdValue}`, {
      method: "DELETE",
    });
    document.querySelector(`#list-${this.listIdValue}`).remove();
  }
}
