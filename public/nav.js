async function userData() {
  try {
    const res = await fetch("https://creator-tube-three.vercel.app/api/v1/users/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    return data
    
}catch(error){
    console.log(error)
}
}

async function working(){
lucide.createIcons();
  const avatar= document.getElementById("avatar")
  avatar.addEventListener("click", () =>{
    window.location.href="/profile"
  })
    const data = await userData()

   document.getElementById("logo").addEventListener("click" , () => {
    window.location.href= "/dashboard"
   })


    avatar.src=data.data.avatar
    const navbar = document.getElementById("channel_nav")
    // console.log(btn)
    // link.href=`login.html`
//lll
    navbar.addEventListener("click", () => {
       window.location.href = `/channelPage?v=${data.data._id}`
    })

    const dropdown = document.getElementById("channel_drop")
    // console.log(btn)
    // link.href=`login.html`

    dropdown.addEventListener("click", () => {
       window.location.href = `/channelPage?v=${data.data._id}`
    })


    // Mobile navbar toggle
  document.querySelectorAll("[data-collapse-toggle]").forEach((button) => {
    const targetId = button.getAttribute("data-collapse-toggle");
    const target = document.getElementById(targetId);

    button.addEventListener("click", () => {
      target?.classList.toggle("hidden");
    });
  });
}



document.addEventListener("DOMContentLoaded", working);


// console.log("User data received:", data);

//     if (!data?.data?._id) {
//       throw new Error("User ID missing in dashboard data");
//     }

//     const userId = data.data._id;

//     // ✅ Set avatar
//     const avatar = document.getElementById("avatar");
//     if (avatar) {
//       avatar.src = data.data.avatar;
//       avatar.addEventListener("click", () => {
//         window.location.href = "profile.html";
//       });
//     } else {
//       console.warn("Avatar element not found.");
//     }

//     // ✅ Set channel link
//     // const channelBtn = document.getElementById("mychannel");
//       console.log(data)
//   document.getElementById("mychannel").addEventListener("click" , () => {
//         window.location.href = `channelPage.html?v=${data.data._id}`
//       })
//     // if (channelBtn) {
//     //     channelBtn.href=`profile.html`
//     // //   channelBtn.href = `https://creator-tube-three.vercel.app/channelPage.html?v=${userId}`;
//     //   console.log("Channel button href set.");
//     // } else {
//     //   console.warn("My Channel button not found.");
//     // }

// // Mobile navbar toggle
//   document.querySelectorAll("[data-collapse-toggle]").forEach((button) => {
//     const targetId = button.getAttribute("data-collapse-toggle");
//     const target = document.getElementById(targetId);

//     button.addEventListener("click", () => {
//       target?.classList.toggle("hidden");
//     });
//   });

//   } catch (error) {
//     console.error("Error loading dashboard:", error);
//   }