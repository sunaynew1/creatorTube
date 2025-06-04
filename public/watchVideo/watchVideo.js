

lucide.createIcons();
const params = new URLSearchParams(window.location.search);
const videoId = params.get('v')

// function createCommentElement(username, avatarUrl, commentText, timestamp = "Just now") {
//   // Outer card container
//   const wrapper = document.createElement("div");
//   wrapper.className = `
//     flex items-start gap-4 
//     p-4 mb-3 
//     rounded-lg 
//     bg-[#1c1c1e] 
//     border border-[#2c2c2e] 
//     shadow-sm
//   `;

//   // Avatar
//   const avatar = document.createElement("img");
//   avatar.src = avatarUrl;
//   avatar.alt = `${username}'s avatar`;
//   avatar.className = "w-10 h-10 rounded-full object-cover border border-[#333]";

//   // Content container
//   const content = document.createElement("div");
//   content.className = "flex-1";

//   // Header: username and timestamp
//   const header = document.createElement("div");
//   header.className = "flex items-center gap-2 mb-1";

//   const nameEl = document.createElement("span");
//   nameEl.className = "font-semibold text-white text-sm";
//   nameEl.textContent = username;

//   const timeEl = document.createElement("span");
//   timeEl.className = "text-xs text-gray-400";
//   timeEl.textContent = `• ${timestamp}`;

//   header.appendChild(nameEl);
//   header.appendChild(timeEl);

//   // Comment text
//   const commentEl = document.createElement("p");
//   commentEl.className = "text-sm text-gray-300 leading-snug";
//   commentEl.textContent = commentText;

//   // Assemble content
//   content.appendChild(header);
//   content.appendChild(commentEl);

//   // Assemble wrapper
//   wrapper.appendChild(avatar);
//   wrapper.appendChild(content);

//   return wrapper;
// }



function createCommentElement(name, text, useravatar) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "flex justify-between gap-4 bg-[#1f1f1f] p-5 rounded-xl border border-[#2a2a2a] mb-4 shadow-sm hover:shadow-md transition-shadow duration-200";

  // Left Section
  const leftSection = document.createElement("div");
  leftSection.className = "flex gap-4";

  const avatar = document.createElement("img");
  avatar.src = useravatar;
  avatar.alt = `${name}'s avatar`;
  avatar.className = "w-11 h-11 rounded-full object-cover border border-gray-600";

  const content = document.createElement("div");
  content.className = "flex-1";

  const nameEl = document.createElement("p");
  nameEl.className = "font-semibold text-white text-base mb-2 tracking-wide";
  nameEl.textContent = name;

  const textEl = document.createElement("p");
  textEl.className =
    "text-[15px] text-gray-200 leading-relaxed break-words whitespace-pre-wrap";
  textEl.textContent = text;

  content.appendChild(nameEl);
  content.appendChild(textEl);
  leftSection.appendChild(avatar);
  leftSection.appendChild(content);

  // Right Section: Icons
  const rightSection = document.createElement("div");
  rightSection.className = "flex flex-col gap-2 items-end";

  // Edit Icon
  // const editBtn = document.createElement("button");
  // editBtn.innerHTML = `<i data-lucide="edit" class="text-gray-400 hover:text-blue-400 w-5 h-5 transition duration-150"></i>`;
  // editBtn.title = "Edit";

  // // Delete Icon
  // const deleteBtn = document.createElement("button");
  // deleteBtn.innerHTML = `<i data-lucide="trash-2" class="text-gray-400 hover:text-red-400 w-5 h-5 transition duration-150"></i>`;
  // deleteBtn.title = "Delete";

  // rightSection.appendChild(editBtn);
  // rightSection.appendChild(deleteBtn);

  // Assemble
  wrapper.appendChild(leftSection);
  wrapper.appendChild(rightSection);

  // Activate Lucide
  // lucide.createIcons();

  return wrapper;
}

async function registerView() {
  const registerView = await fetch("https://creator-tube-three.vercel.app/api/v1/users/views", {

    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ videoId })

  })
}
  async function saveVideo(videoId) {
   try{
      const req = await fetch("https://creator-tube-three.vercel.app/api/v1/users/saveVideo", {
        method : "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        credentials: "include",
        body:JSON.stringify({videoId})
      }) 
    const data = req.json()
    return data;
    }
  catch(error){
 console.log(`save error ${error}`)
  }
}

async function videoData() {
  try {
    const videoTitlex = document.getElementById("videoTitle")
    const channelName = document.getElementById("channelName")
    const channelSubscribers = document.getElementById("channelSubscribers")

    const videoDescription = document.getElementById("videoDescription")
    const channelImage = document.getElementById('channelImage')
    const userAvatar = document.getElementById("userAvatar")
    const btn_like = document.getElementById("btn-like")
    const likeCount = document.getElementById("likeCount")
    const btn_dislike = document.getElementById("btn-dislike")
    const dislikeCount = document.getElementById("dislikeCount")
    const subscribeButton = document.getElementById("btn-subscribe")
    const view = document.getElementById("views-textbox")

    const reqvideoData = await fetch("https://creator-tube-three.vercel.app/api/v1/users/videoData", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ videoId })

    })

  

    const reqUserData = await fetch("https://creator-tube-three.vercel.app/api/v1/users/userInfo", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },  
      credentials: "include"
    })

    async function newComment(videoId, comment) {
      const resNewComment = await fetch("https://creator-tube-three.vercel.app/api/v1/users/comment", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ videoId, comment }),
        credentials: "include"
      })
    }

    async function like(videoId) {
      let reqLike = await fetch("https://creator-tube-three.vercel.app/api/v1/users/like", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ videoId }),
        credentials: "include"
      })
      let x = await reqLike.json()
      console.log(x)

      return x
    }

    async function subscriberCheck(channelId) {
      let reqLike = await fetch("https://creator-tube-three.vercel.app/api/v1/users/subscribeCheck", {

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

    async function subscribe() {
      const subscribedTo = data.data.owner._id
      console.log(` chaneel  ${subscribedTo}`)
      let reqLike = await fetch("https://creator-tube-three.vercel.app/api/v1/users/subscribe", {

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
    async function dislike(videoId) {
      let reqDisLike = await fetch("https://creator-tube-three.vercel.app/api/v1/users/dislike", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ videoId }),
        credentials: "include"
      })

      let x = await reqDisLike.json()
      console.log(x)

      return x
    }

    registerView()


    const UserData = await reqUserData.json()
    console.log(UserData)
    const data = await reqvideoData.json()

    const isoDate = data.data.createdAt
    const date = new Date(isoDate);

    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'IST' // optional, keeps it in UTC time
    };

    const formatted = date.toLocaleString('en-US', options);
    console.log(formatted);
 
   if(data.data.videoTitle.length>88){
  videoTitlex.textContent =` ${data.data.videoTitle.slice(0,88)}...`
   }

   if(data.data.description.length>150){
   
   
    
  videoDescription.textContent =` ${ data.data.description.slice(0,150)}...`
  const parentContainer = document.getElementById("desc-container")
  const container =  document.createElement("div") 
    const link = document.createElement("a")
    link.textContent="See More" 
    link.style.cursor="pointer"
    link.addEventListener("click" , () => {
      // videoDescription.classList.add("break-words whitespace-pre-wrap")
       videoDescription.textContent =` ${ data.data.description}`
       
         
      })      
  container.appendChild(link)
  videoDescription.appendChild(container)
   parentContainer.appendChild(videoDescription)
   }
   
    channelName.textContent = data.data.owner.username
    channelSubscribers.textContent = data.data.subscriberCount
    likeCount.textContent = data.data.likesCount
    
    channelImage.src = data.data.owner.avatar
    userAvatar.src = UserData.data.avatar
    likeCount.textContent = data.data.likesCount
    dislikeCount.textContent = data.data.dislikesCount
    // videoTitlex.textContent=data.data.videoTitle
    view.textContent = `●${data.data.views} views  ● uploaded on ${formatted}`
    channelName.style.cursor = "pointer"
    channelName.addEventListener("click", async () => {
      console.log("name clicked")
      window.location.href = `/channelPage?v=${data.data.owner._id}`
    })
    console.log(data)
    const videoPublicId = data.data.videoPublicId;
    const cld = cloudinary.Cloudinary.new({ cloud_name: "dvz27jtw8" });

    console.log(typeof videoPublicId);

 document.getElementById("btn-download").href=`https://res.cloudinary.com/dvz27jtw8/video/upload/fl_attachment:${data.data.videoTitle}/${videoPublicId}.mp4`

    cld.videoPlayer("my-video", {
      publicId: videoPublicId,
      fluid: true,
      controls: true,
      autoplay: true,
      sourceTypes: ["hls"],
      transformation: {
        streaming_profile: "auto"
      },
      playbackRates: [0.5, 1, 1.5, 2], // Speed control
      theme: "dark",
      showLogo: false, // Remove Cloudinary logo
      colors: {
        base: "#000000",
        accent: "#cd1717", // Tailwind purple-500
        text: "#ffffff",
      },
      posterOptions: {
        publicId: data.thumbnailPublicId,
        transformation: {
          width: 480,
          height: 200,
          crop: "thumb",
        },
      },
    });
    for (const comm of data.data.comments) {
      const comment = createCommentElement(comm.userid.username, comm.text, comm.userid.avatar);
      document.getElementById("commentsContainer").appendChild(comment);
      console.log(comment)
    }



    document.getElementById("btn-post-btn").addEventListener("click", () => {
      const commentTextBox = document.getElementById("comment-textBox")
      const commentValue = commentTextBox.value
      if (commentValue != "") {
        const x = createCommentElement(UserData.data.username, commentValue, UserData.data.avatar)
        newComment(videoId, commentValue)
        document.getElementById("commentsContainer").appendChild(x);

        commentTextBox.value = ""


        // console.log(data.data.comments)

        console.log("post clicked")
      }
      
 


    })

    // document.getElementById("btn-download").addEventListener("click" , () => {
    //     console.log("download clicked")
      
      
    // })

    btn_like.addEventListener("click", async () => {
      let count = await like(videoId)
      console.log(count.data.likesCount)
      likeCount.textContent = count.data.likesCount
      dislikeCount.textContent = count.data.dislikesCount
      //   if(count.message == "like"){
      //    btn_like.classList.add('text-white');
      // }else if(count.message=== "unlike"){
      //    btn_like.classList.add('text-gray-400');
      // }
    })
    btn_dislike.addEventListener("click", async () => {
      let count = await dislike(videoId)
      console.log(count)
      likeCount.textContent = count.data.likesCount
      dislikeCount.textContent = count.data.dislikesCount

      // if(count.message == "dislike"){
      //   btn_dislike.classList.add('text-white');
      // }else if(count.message=== "undislike"){
      //   btn_dislike.classList.add('text-gray-400');
      // }
    })

    subscribeButton.addEventListener("click", async () => {
      const y = await subscribe()
      console.log(y.message)
      document.getElementById("subscribelabel").textContent = y.message

      if (y.message == "subscribed") {
        const button = document.getElementById("btn-subscribe")
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
        const button = document.getElementById("btn-subscribe")
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
    const subscheck = await subscriberCheck(data.data.owner._id)
    if (subscheck.data == "subscribed") {
      const button = document.getElementById("btn-subscribe")
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
  } catch (error) {
    console.log("video data error", error)
  }

}



// Load your video by public ID

document.getElementById("btn-share").addEventListener("click" , () => {
   const url = window.location.href
   console.log(url)
    navigator.clipboard.writeText(url);
    alert("Url copied ");
   
})

document.getElementById("btn-save").addEventListener("click", async () => {
      
  const d= await saveVideo(videoId);
  alert(d.message)
  if(d.message == "Saved Successfully!"){
    document.getElementById("btn-save").classList.add("bg-white/30")
  }else{
    document.getElementById("btn-save").classList.remove("bg-white/30")
  }
})

window.addEventListener("DOMContentLoaded", () => {
  videoData(); // now it runs after HTML is ready
});
