import { dislikePost, likePost } from '../api.js'
import { getToken, goToPage, page, posts } from '../index.js'
import { AUTH_PAGE, POSTS_PAGE, USER_POSTS_PAGE } from '../routes.js'
import { renderPostsPageComponent } from './posts-page-component.js'
import { renderUserPostsPageComponent } from './renderUserPostsPageComponent.js'

export const setPosts = (newPosts) => {
    posts = newPosts
}

export const initLikeListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button')

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation()

            const tokenUser = getToken()

            if (!tokenUser) {
                alert('Необходимо авторизоваться')
                goToPage(AUTH_PAGE)
                return
            }

            const indexButton = likeButtonElement.dataset.index

            // console.log(`Нажал на лайк с id: ${indexButton}`)

            const likedPost = posts[indexButton]
            const likedPostId = posts[indexButton].id

            // console.log(`Пост ${likedPost} с id: ${likedPostId}`)

            let userHostId =
                'https://wedev-api.sky.pro/api/v1/prod/instapro/' +
                likedPostId.toString()

            const appEl = document.getElementById('app')

            if (likedPost.isLiked) {
                dislikePost({ token: getToken(), baseHostId: userHostId }).then(
                    (data) => {
                        posts.splice(`${indexButton}`, 1, data.post)
                        renderPostsPageComponent({ appEl })
                    },
                )
            } else {
                likePost({ token: getToken(), baseHostId: userHostId }).then(
                    (data) => {
                        posts.splice(`${indexButton}`, 1, data.post)
                        renderPostsPageComponent({ appEl })
                    },
                )
            }
            // console.log(posts);
            renderPostsPageComponent({ appEl })
        })
    }
}

//

//     });
//   }
// };
