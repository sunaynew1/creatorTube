let videos = null;
let currentEditId = null;

// Fetch videos from the backend
async function fetchData() {
  const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/myVideos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  const data = await req.json();
  console.log(data);
  videos = data.data.myVideos;
  return videos;
}

// Delete a video using public IDs
async function deleteAVideo(videopublicId, thumbnailpublicId) {
  await fetch("https://creator-tube-phi.vercel.app/api/v1/users/deleteVideo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ videopublicId, thumbnailpublicId })
  });
}

// Render the video cards
async function renderVideos() {
  const videoList = await fetchData();
  const container = document.getElementById("videoList");
  container.innerHTML = "";

  videoList.forEach(video => {
    const videoId = video.videoId._id;
    const div = document.createElement("div");

    div.className = "bg-zinc-900 p-4 rounded-xl shadow-lg shadow-purple-900/30 flex items-start gap-4 border border-purple-800";

    div.innerHTML = `
      <img src="${video.videoId.thumbnail}" alt="Thumbnail" class="w-32 h-20 object-cover rounded-lg" />
      <div class="flex-1">
        <h3 class="text-xl font-bold text-white">${video.videoId.videoTitle}</h3>
        <p class="text-gray-400 text-sm mb-2">${video.videoId.description}</p>
        <div class="text-xs text-gray-500 flex gap-4">
          <span>👁️ ${video.videoId.views} views</span>
          <span>👍 ${video.videoId.likes}</span>
          <span>👎 ${video.videoId.dislikes}</span>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <button onclick="editVideo('${videoId}')" class="text-sm px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition">Edit</button>
        <button onclick="deleteVideo('${videoId}')" class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// Handle delete button
async function deleteVideo(id) {
  const video = videos.find(v => v.videoId._id === id);
  if (!video) return;

  await deleteAVideo(video.videoId.videoPublicId, video.videoId.thumbnailPublicId);
  renderVideos();
}

// Open modal to edit
function editVideo(id) {
  currentEditId = id;
  const video = videos.find(v => v.videoId._id === id);
  if (!video) return;

  document.getElementById("editTitle").value = video.videoId.videoTitle;
  document.getElementById("editDescription").value = video.videoId.description;
  document.getElementById("editModal").classList.remove("hidden");
}

// Close edit modal
function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
  currentEditId = null;
}

// Save edited content
async function saveEdit() {
  const title = document.getElementById("editTitle").value;
  const description = document.getElementById("editDescription").value;
  const video = videos.find(v => v.videoId._id === currentEditId);
  if (!video) return;

  await fetch("https://creator-tube-phi.vercel.app/api/v1/users/editVideo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ videoId: video.videoId._id, title, description })
  });

  closeEditModal();
  renderVideos();
}

// Hook save button
document.getElementById("btn-save").addEventListener("click", saveEdit);

// Initial render
renderVideos();
