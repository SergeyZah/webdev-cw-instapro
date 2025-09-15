import { uploadImage } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { clearHTML } from "./utils.js";

let imageUrl = "";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // @TODO: Реализовать страницу добавления поста
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                Cтраница добавления поста
              </h3>
              <div class="form-inputs">
                <div class="upload-image-container"></div>
                      <input type="text" id="description-input" class="input" placeholder="Описание поста" />
                      <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
      </div>
    `;

    appEl.innerHTML = appHtml;

    const fileInputElement = document.querySelector(".upload-image-container");
    renderUploadImageComponent({
      element: fileInputElement,
      onImageUrlChange: (newImageUrl) => {
        imageUrl = newImageUrl;
      }
    })

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: `${clearHTML(document.querySelector("#description-input").value)}`,
        imageUrl: `${imageUrl}`,
      });
    });
  };
  render();
  renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
}
