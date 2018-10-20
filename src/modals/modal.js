export default class Modal {
  constructor(name, title, data = {}) {
    this.name = name;
    this.title = title;
    this.data = data;
  }
  load() {
    if (!this.name) {
      return false;
    }

    this.id = this._getRandomString();
    return this._loadModal();
  }

  open() {
    this._getModal();
    requestAnimationFrame(() => {
      this.modal.classList.add("show");
    });
  }

  close() {
    this._getModal();
    requestAnimationFrame(() => {
      this.modal.classList.remove("show");
      this.modal.addEventListener("transitionend", event => {
        requestAnimationFrame(() => {
          this.modal.remove();
        });
      });
    });
  }

  _getModal() {
    if (this.modal) {
      return;
    }
    this.modal = document.querySelector(`#modal-${this.id}`);
  }

  _getRandomString() {
    return [...Array(5)].map(() => Math.random().toString(36)[5]).join("");
  }

  _loadModal() {
    return new Promise((resolve, reject) => {
      import(`./${this.name}/${this.name}.html`).then(htmlModule => {
        const template = htmlModule.default;
        document.body.insertAdjacentHTML(
          "beforeend",
          `<div class="modal" id="modal-${this.id}">
            <div class="modal-nav">
            <svg class="modal-back" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <div class="modal-title">${this.title}</div>
        </div>
        <div class="modal-body">
            ${template}
            </div>
        </div>`
        );
      });
      import(`./${this.name}/${this.name}.js`).then(jsModule => {
        this._getModal();
        this.modal
          .querySelector(".modal-back")
          .addEventListener("click", () => {
            this.close();
          });
        if (jsModule && jsModule.default) {
          jsModule.default(this.modal, this.data, this);
        }
        resolve(this);
      });
    });
  }
}
