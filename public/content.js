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


function createVideoCard({ id, publicId, title, views, description, thumbnailSrc }) {
  const card = document.createElement("div");
  card.className =
    "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 w-full max-w-sm";

  // Thumbnail
  const thumbnailWrapper = document.createElement("div");
  thumbnailWrapper.className = "relative group";

  const thumbnail = document.createElement("img");
  thumbnail.setAttribute("id", id);
  thumbnail.src = thumbnailSrc;
  thumbnail.alt = title;
  thumbnail.className =
    "w-full h-48 object-cover rounded-t-2xl transition duration-300 group-hover:scale-105";

  // Optional play overlay
  const overlay = document.createElement("div");
  overlay.className =
    "absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300";

  const playIcon = document.createElement("i");
  playIcon.className = "fas fa-play text-white text-3xl opacity-0 group-hover:opacity-100 transition";
  overlay.appendChild(playIcon);

  thumbnailWrapper.appendChild(thumbnail);
  thumbnailWrapper.appendChild(overlay);

  // Content area
  const content = document.createElement("div");
  content.className = "p-4";

  const titleEl = document.createElement("h3");
  titleEl.className = "text-white text-lg font-semibold truncate";
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

  card.appendChild(thumbnailWrapper);
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
        thumbnailSrc:data.thumbnail
      });
      card.style.cursor = 'pointer';
      card.addEventListener("click" , () =>{
        console.log(`card clicked video id: ${id}`)
        window.location.href = `watchVideo.html?v=${id}`;
     })
      container.appendChild(card);

    //   const cld = cloudinary.Cloudinary.new({ cloud_name: "dvz27jtw8" });
    //   cld.videoPlayer(id, {
    //     publicId: data.videoPublicId,
    //     fluid: true,
    //     controls: false,
    //     autoplay: false,
    //     posterOptions: {
    //       publicId: data.thumbnailPublicId, // The Cloudinary public ID for the image
    //       transformation: {
    //         width: 480,
    //         height: 200,
    //         crop: "crop"
    //       }
    //     }
    //   });
    //   // document.getElementById("video").addEventListener("click",() =>{
    //   //   views++
    //   //   console.log(views)
    //   // })
    // }
}
  } catch (err) {
    console.error("Error fetching videos:", err);
  }
}

document.addEventListener("DOMContentLoaded", fetchVideos);
