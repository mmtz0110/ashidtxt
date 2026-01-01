const API_URL = "http://localhost:3000/api/posts";

async function loadPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();

  if (!posts.length) return;

  renderMainPost(posts[0]);
  if (posts[1]) renderSidePost(posts[1], "sidePost1");
  if (posts[2]) renderSidePost(posts[2], "sidePost2");
}

function makePreview(text, limit) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

function goToDetail(id) {
  window.location.href = `./post.html?id=${id}`;
}

function renderMainPost(post) {
  const el = document.getElementById("mainPost");

  el.innerHTML = `
    <img
      class="main-thumb"
      src="${post.thumbnail_url}"
      alt="${post.title}"
    />
    <div class="main-content">
      <h1>${post.title}</h1>
      <p>${makePreview(post.content, 220)}</p>
    </div>
  `;

  el.onclick = () => goToDetail(post.id);
}

function renderSidePost(post, id) {
  const el = document.getElementById(id);

  el.innerHTML = `
    <img
      class="side-thumb"
      src="${post.thumbnail_url}"
      alt="${post.title}"
    />
    <div class="side-content">
      <h3>${post.title}</h3>
      <p>${makePreview(post.content, 70)}</p>
    </div>
  `;

  el.onclick = () => goToDetail(post.id);
}

loadPosts();
