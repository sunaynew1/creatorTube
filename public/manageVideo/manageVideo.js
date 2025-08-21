 let videos=null
 async function fetchData(){
  const req = await fetch("https://creatortube-production.up.railway.app/api/v1/users/myVideos",{
    method:"POST",
    headers: {
        "Content-Type" : "application/json"
    },
     
    credentials:"include"
})
 const data = await req.json()
 console.log(data)
  videos = data.data.myVideos
 console.log(videos)
 return videos
 }

 async function deleteAVideo(videopublicId,thumbnailpublicId){
  console.log("sdasda",videopublicId,thumbnailpublicId)
  const req = await fetch("https://creatortube-production.up.railway.app/api/v1/users/deleteVideo",{
   
     method:"POST",
    headers: {
        "Content-Type" : "application/json"
    },
     credentials:"include",
    body: JSON.stringify({videopublicId,thumbnailpublicId})
  })
 }

    let currentEditId = null;

   async function renderVideos() {
      const videos = await fetchData()
      
      const container = document.getElementById('videoList');
      container.innerHTML = '';

      videos.forEach(video => {
        const videoId = (video.videoId._id)
        console.log(`asdasdasd${typeof(videoId)}`)
        const div = document.createElement('div');
        div.className = 'bg-[#2a2a2a] p-4 min-w-[200px] rounded-xl shadow-md shadow-purple-900/20 flex items-start gap-4 border border-purple-900';
        div.innerHTML = `
          <img src="${video.videoId.thumbnail}" alt="Thumbnail" class="w-32 h-20 object-cover rounded-lg" />
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-white">${video.videoId.videoTitle}</h3>
            <p class="text-gray-400 mb-1">${video.videoId.description}</p>
            <div class="text-sm text-gray-400 flex gap-4">
              <span>👁️ ${video.videoId.views} views</span>
              <span>👍 ${video.videoId.likesCount}</span>
              <span>👎 ${video.videoId.dislikesCount}</span>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <button onclick="editVideo('${videoId}')" class="text-sm px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600">Edit</button>
            <button onclick="deleteVideo('${videoId}')" class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
          </div>
        `;
        container.appendChild(div);
      });
    }

  async  function deleteVideo(id) {
      console.log(id)
    const video = videos.find(v => v.videoId._id === id);
    console.log(video.videoId.videoPublicId,video.videoId.thumbnailPublicId)
     await deleteAVideo(video.videoId.videoPublicId,video.videoId.thumbnailPublicId)
      renderVideos();
    }

    function editVideo(id) {
      console.log(id)
      currentEditId = id;
      console.log(videos)
      const video = videos.find(v => v.videoId._id === id);
      console.log(video.videoId.videoPublicId)
      document.getElementById('editTitle').value = video.videoId.videoTitle;
      document.getElementById('editDescription').value = video.videoId.description;
      document.getElementById('editModal').classList.remove('hidden');

    }

    // function closeEditModal() {
    //   document.getElementById('editModal').classList.add('hidden');
    //   currentEditId = null;
    // }

    document.getElementById("btn-save").addEventListener("click" , () => {
      saveEdit()
    })
   async function saveEdit() {
      const title = document.getElementById('editTitle').value;
      const description = document.getElementById('editDescription').value;
       const video = videos.find(v => v.videoId._id === currentEditId);
       const videoId = video.videoId._id
    // console.log(`video id:${id}`)
    const req = await fetch("https://creatortube-production.up.railway.app/api/v1/users/editVideo",{
    method:"POST",
    headers: {
        "Content-Type" : "application/json"
    },
     
    credentials:"include",
    body: JSON.stringify({videoId,title,description })
})
     
      video.videoId.title = title;
      video.videoId.description = description;

      closeEditModal();
      renderVideos();
    }

    renderVideos();