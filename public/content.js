// Function to create a video card
 
async function redirectWatch() {
  const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/watch",{
    method:"POST",
    headers: {
        "Content-Type" : "application/json"
    },
     
    body: JSON.stringify(comment,videoId)
})
  }



function createVideoCard({ id, publicId, title, views, description }) {
  const card = document.createElement("div");
  card.className =
    "bg-[#1e1e1e] rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300";
   

  // Cloudinary Player hooks to this video by ID
  const video = document.createElement("video");
  video.setAttribute("id", id);
  video.setAttribute("controls", true);
  video.className = "w-full h-48 object-cover bg-black";
 
  const content = document.createElement("div");
  content.className = "p-4";

  const titleEl = document.createElement("h2");
  titleEl.className = "text-lg font-semibold text-white truncate";
  titleEl.textContent = title;

  const viewsEl = document.createElement("p");
  viewsEl.className = "text-sm text-gray-400";
  viewsEl.textContent = `${views} views`;


  const descEl = document.createElement("p");
  descEl.className = "text-sm text-gray-300 mt-2 line-clamp-2";
  descEl.textContent = description;

  content.appendChild(titleEl);
  content.appendChild(viewsEl);
  content.appendChild(descEl);

  card.appendChild(video);
  card.appendChild(content);

  return card;
}

// Fetch video data and render cards
async function fetchVideos() {
  try {
    const res = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/content", {
      headers: { "Content-Type": "application/json" },
    });

    const fetchData = await res.json();
    const container = document.getElementById("videoGrid");

    for (const data of fetchData.data) {
      const id = `${data._id}`;

      const card = createVideoCard({
        id,
        publicId: data.videoPublicId,
        title: data.videoTitle || "Untitled",
        views: data.views || 0,
        description: data.description || "No description",
      });
      card.style.cursor = 'pointer';
      card.addEventListener("click" , () =>{
        console.log(`card clicked video id: ${id}`)
        window.location.href = `watchVideo.html?v=${id}`;
     })
      container.appendChild(card);

      const cld = cloudinary.Cloudinary.new({ cloud_name: "dvz27jtw8" });
      cld.videoPlayer(id, {
        publicId: data.videoPublicId,
        fluid: true,
        controls: false,
        autoplay: false,
        posterOptions: {
          publicId: data.thumbnailPublicId, // The Cloudinary public ID for the image
          transformation: {
            width: 480,
            height: 200,
            crop: "crop"
          }
        }
      });
      // document.getElementById("video").addEventListener("click",() =>{
      //   views++
      //   console.log(views)
      // })
    }
  } catch (err) {
    console.error("Error fetching videos:", err);
  }
}

document.addEventListener("DOMContentLoaded", fetchVideos);
