import { posts } from "../index.js"
import { renderHeaderComponent } from "./header-component.js";

export const renderUserPostsPageComponent = ({ appEl }) => {
    const userAppHtml = posts
    .map((post, index) => {
      //   let postTime = new Date(post.createdAt);
      // postTime = postTime
      //   .toLocaleDateString("ru-RU", {
      //     year: "numeric",
      //     month: "numeric",
      //     day: "numeric",
      //     // hour: "2-digit",
      //     // minute: "2-digit",
      //   })
      //   .replace(/[\s,]/g, " ");

        let likesNum = post.likes.length
        const nameOfLikersAndId = post.likes;
      let nameOfLikers = nameOfLikersAndId.map((like) => like.name);
      let showLikers;
      if (likesNum === 0) {
        showLikers = "";
      } else if (likesNum === 1) {
        showLikers = nameOfLikers[0];
      } else {
        showLikers = `${nameOfLikers[0]} и еще ${likesNum - 1}`;
      }

        return `<li class="post" data-index="${index}">
              <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}">
              </div>
              <div class="post-likes">
                  <button data-post-id="${post.id}" class="like-button" data-index="${index}">
                    <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
                  </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes.length}</strong>
              </p>
              </div>
              <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                  ${post.description}
              </p>
              <p class="post-date">
                ${post.createdAt}
              </p>
            </li>`
  }).join('');

    const pageContainer = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">${userAppHtml}</ul>
      </div>`;

  appEl.innerHTML = pageContainer;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });
}