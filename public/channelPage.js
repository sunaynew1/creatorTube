
const params = new URLSearchParams(window.location.search);
const channelId = params.get('v')


async function fetchDetails() {
  try {
    const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/myPage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
       body: JSON.stringify({channelId})

     
    });

    if (!req.ok) {
      throw new Error(`HTTP error! Status: ${req.status}`);
    }

    const data = await req.json();
    return data;
  } catch (err) {
    console.error("Fetch failed:", err);
    return { data: { myVideos: [] } }; // fallback
  }
}

    async function subscribe (){
      const subscribedTo = data.data.owner._id
      console.log(` chaneel  ${subscribedTo}`)
      let reqLike = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/subscribe", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ subscribedTo }),
        credentials: "include"
      })
      let x = await reqLike.json()
      console.log(x)

      return x
    }
 
//  const videos = [
//     {
//       title: "Used Mercedes Horror Story",
//       duration: "17:09",
//       views: "20K",
//       thumbnail: "https://i.ytimg.com/vi/6fQlO_h8w38/hqdefault.jpg"
//     },
//     {
//       title: "Fell in Love with Hyundai Ioniq 5",
//       duration: "20:44",
//       views: "35K",
//       thumbnail: "https://i.ytimg.com/vi/KIHcLWrWv6s/hqdefault.jpg"
//     },
//     {
//       title: "Dehradun Real Estate",
//       duration: "9:25",
//       views: "12K",
//       thumbnail: "https://i.ytimg.com/vi/y1i9d9kEcHk/hqdefault.jpg"
//     }
//   ];
async function subscribe(subscribedTo) {
      // const subscribedTo = data.data.owner._id
      console.log(` chaneel  ${subscribedTo}`)
      let reqLike = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/subscribe", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ subscribedTo }),
        credentials: "include"
      })
      let x = await reqLike.json()
      console.log(x)

      return x
    }
   async function subscriberCheck(channelId) {
      let reqLike = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/subscribeCheck", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ channelId }),
        credentials: "include"
      })
      let x = await reqLike.json()
      console.log(x)

      return x
    }

async function videogrid(){
    const profilePicture = document.getElementById("profielPicture")
 const channelName = document.getElementById("channelName")
 const username = document.getElementById("username")
 const subscriberCount = document.getElementById("subscriberCount")
 const aboutMe = document.getElementById("aboutMe")
 const btn_Subscribe = document.getElementById("subscribe")
 const coverImage= document.getElementById("coverImage")

  const videoGrid = document.getElementById("videoGrid");
   const videos = await fetchDetails();
 console.log(videos)
 profilePicture.src=videos.data.avatar
   channelName.textContent=videos.data.fullName
   username.textContent = `@${videos.data.username}`
   subscriberCount.textContent=`• ${videos.data.subscriberCount} subscribers`
   coverImage.src=videos.data.coverImage

 btn_Subscribe.addEventListener("click", async () => {
  console.log("reached herkghgjgfe")
  console.log(` owner id: ${videos.data._id}`)
      const y = await subscribe(videos.data._id)
      console.log(y.message)
      document.getElementById("subscribelabel").textContent = y.message

      if (y.message == "subscribed") {
        const button = document.getElementById("subscribe")
        const label = document.getElementById("subscribelabel")
        label.textContent = "Subscribed"
        button.classList.remove("bg-white");
        // Add new background
        button.classList.add("bg-red-500");
        label.classList.remove("text-black");
        // Add new background
        button.classList.add("bg-red-500");
        label.classList.add("text-white")
      } else if (y.message == "subscribe") {
        const button = document.getElementById("subscribe")
        const label = document.getElementById("subscribelabel")
        label.textContent = "Subscribe"
        button.classList.remove("bg-red-500");
        // Add new background
        button.classList.add("bg-white");
        label.classList.remove("text-white");
        // Add new background
        button.classList.add("bg-red-500");
        label.classList.add("text-black");
      }
    })
    const subscheck = await subscriberCheck(videos.data._id)
    if (subscheck.data == "subscribed") {
      const button = document.getElementById("subscribe")
      const label = document.getElementById("subscribelabel")
      label.textContent = "Subscribed"
      button.classList.remove("bg-white");
      // Add new background
      button.classList.add("bg-red-500");
      label.classList.remove("text-black");
      // Add new background
      button.classList.add("bg-red-500");

    } else {
      document.getElementById("subscribelabel").textContent = "Subscribe"
    }
//    btn_Subscribe.addEventListener("click" ,async  () => {
//     const y = await subscribe(videos.data.)
//     console.log(y.message)
//       document.getElementById("subscribelabel").textContent= y.message
//    })
   const d= videos.data.myVideos;
//    console.log(d.data.myVideos)
console.log(d)
  d.forEach(video => {
    // console.log(`hola ${video.videoTitle}`)
    console.log(video.videoId.videoTitle)
    const card = document.createElement("div");
    card.className = "bg-[#1f1f1f] rounded-md overflow-hidden hover:shadow-lg transition";
    card.style.cursor="pointer"
    card.innerHTML = `
      <img src="${video.videoId.thumbnail}" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-white text-base font-medium mb-1">${video.videoId.videoTitle}</h3>
        <p class="text-sm text-gray-400"> • ${video.videoId.views} views</p>
      </div>
    `;
    card.addEventListener("click" , () => {
        window.location.href = `watchVideo.html?v=${video.videoId._id}`
    })
    videoGrid.appendChild(card);
  })
 };

  videogrid();
  
