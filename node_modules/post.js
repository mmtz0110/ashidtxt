const API_BASE = "http://localhost:3000";

function renderParagraph(text) {
  return text
    .split("\n\n")
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .map(p => `<p>${p.replace(/\\n/g, "<br>")}</p>`)
    .join("");
}

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
  document.getElementById("content").innerText = "Post tidak ditemukan";
  throw new Error("ID post tidak ada di URL");
}

fetch(`${API_BASE}/api/posts/${postId}`)
  .then(res => {
    if (!res.ok) throw new Error("Request gagal");
    return res.json();
  })
  .then(post => {
    document.getElementById("title").innerText = post.title;
    document.getElementById("thumb").src = post.thumbnail_url;
    document.getElementById("content").innerHTML =
      renderParagraph(post.content);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("content").innerText = "Gagal memuat post";
  });
