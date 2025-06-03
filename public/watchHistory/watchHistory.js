console.log("dsdsgsdfsdfdf")
async function userDetails() {
    try {
        const req = await fetch("https://creator-tube-three.vercel.app/api/v1/users/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
        });

        const data = await req.json(); // <-- missing 'await' fixed here
        console.log(data)
        return data;
    } catch (error) {
        console.log("Error fetching user details:", error);
    }
}

console.log("reached here watch history")

async function a (){
    const d=  await userDetails()
    console.log(d)
}

a();

    // const historyGrid = document.getElementById("historyGrid");

    // const watchHistory = [
    //   {
    //     title: "Mastering Tailwind CSS Animations",
    //     thumbnail: "https://i.ytimg.com/vi/2kl3LiyguCw/hqdefault.jpg",
    //     time: "2 days ago",
    //     channel: "Frontend Simplified"
    //   },
    //   {
    //     title: "Async Await Crash Course",
    //     thumbnail: "https://i.ytimg.com/vi/V_Kr9OSfDeU/hqdefault.jpg",
    //     time: "3 days ago",
    //     channel: "Dev Ed"
    //   },
    //   {
    //     title: "JavaScript in 100 Seconds",
    //     thumbnail: "https://i.ytimg.com/vi/Kphg2cFuTag/hqdefault.jpg",
    //     time: "5 days ago",
    //     channel: "Fireship"
    //   }
    // ];

    // watchHistory.forEach(video => {
    //   const card = document.createElement("div");
    //   card.className = "rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg hover:ring-1 hover:ring-purple-500 transition-all";

    //   card.innerHTML = `
    //     <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-48 object-cover" />
    //     <div class="p-4">
    //       <h3 class="text-lg font-semibold text-white line-clamp-2">${video.title}</h3>
    //       <p class="text-sm text-zinc-400">${video.channel}</p>
    //       <p class="text-xs text-zinc-500">${video.time}</p>
    //     </div>
    //   `;
    //   historyGrid.appendChild(card);
    // });

    // // Sidebar toggle
    // let isSidebarOpen = false;
    // const sidebar = document.getElementById('sidebar');
    // const toggleBtn = document.getElementById('sidebarToggle');

    // toggleBtn.addEventListener('click', () => {
    //   isSidebarOpen = !isSidebarOpen;
    //   sidebar.classList.toggle('-translate-x-full');
    //   toggleBtn.innerHTML = isSidebarOpen
    //     ? '<i data-lucide="x" class="w-5 h-5 text-white"></i>'
    //     : '<i data-lucide="menu" class="w-5 h-5 text-white"></i>';
    //   lucide.createIcons();
    // });

    // lucide.createIcons();
