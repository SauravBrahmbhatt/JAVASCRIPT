const postApi = "https://jsonplaceholder.typicode.com/posts";
const commentApi = "https://jsonplaceholder.typicode.com/comments";
const usersApi = "https://jsonplaceholder.typicode.com/users";

fetch(postApi)
  .then((res) => res.json())
  .then((data) => getPosts(data));

function getPosts(posts) {
  const postsContainer = document.getElementById("posts");
  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const countElement = document.createElement("span");
    countElement.className = "post-count";
    countElement.textContent = `${index + 1}.`;

    const titleElement = document.createElement("h2");
    titleElement.className = "post-title";
    titleElement.textContent = post.title;

    const bodyElement = document.createElement("p");
    bodyElement.className = "post-body";
    bodyElement.textContent = post.body;

    postElement.appendChild(countElement);
    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);
    postsContainer.appendChild(postElement);

    fetch(`${usersApi}/${post.userId}`)
      .then((res) => res.json())
      .then((data) => getUsers(data, postElement));

    const commentsButton = document.createElement("button");
    commentsButton.classList="btn btn-dark btn-sm"
    commentsButton.textContent = "Show Comments";
    commentsButton.addEventListener("click", () => {
      fetch(`${commentApi}?postId=${post.id}`)
        .then((res) => res.json())
        .then((data) => {
          getComments(data, postElement);
          commentsButton.disabled = true;
        });
    });

    postElement.appendChild(commentsButton);
  });
}

function getUsers(user, postElement) {
  const userContainer = document.createElement("h4");
  userContainer.className = "user";
  userContainer.textContent = `Created by: ${user.name}`;
  postElement.appendChild(userContainer);
}

function getComments(comments, postElement) {
  const commentContainer = document.createElement("div");

  comments.forEach((comment, index) => {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";

    const nameElement = document.createElement("h5");
    nameElement.className = "comment-name";
    nameElement.textContent = `Comment by: ${comment.email}`;

    const bodyElement = document.createElement("p");
    bodyElement.className = "comment-body";
    bodyElement.textContent = comment.body;

    commentElement.appendChild(nameElement);
    commentElement.appendChild(bodyElement);

    commentContainer.appendChild(commentElement);
  });

  postElement.appendChild(commentContainer);
}
