console.log("dsdsgsdfsdfdf")
async function watchHistory() {
  try {
    const res = await fetch("https://creator-tube-three.vercel.app/api/v1/users/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
      return data
  } catch (error) {
    console.log(`Watch History error: ${error}`);
  }
}

console.log("reached here watch history")

    async function videoCard (){
        const response=  await watchHistory()
        const data = response.data
        console.log(`watch history data frontend s: ${data}`)


    data.forEach(v => {
        const videoId = v.videoId 

        const timeUTC = v.visitedAt
        console.log(timeUTC)
        const date = new Date(timeUTC)
        
        const istTime = date.toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true // Optional: Use 12-hour format (AM/PM)
});
console.log(istTime)
        const card = document.createElement("div");
        let title; 
        if(videoId.videoTitle.length>40){
          title = `${videoId.videoTitle.slice(0,40)}...`
        }else{
            title= videoId.videoTitle
        }
        


         card.id=videoId._id
        card.className = "rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg hover:ring-1 hover:ring-purple-500 transition-all";

        card.innerHTML = `
            <img src="${videoId.thumbnail}" alt="${videoId.title}" class="w-full h-48 object-cover" />
            <div class="p-4">
            <h3 class="text-lg font-semibold text-white line-clamp-2">${title}</h3>
            <p class="text-sm text-zinc-400">${videoId.owner.username}</p>
            <p class="text-xs text-zinc-500">Durations:${(videoId.durationstr)}</p>
            <p class="text-xs text-zinc-500">Visited At: ${istTime}</p>
            </div>
        `;
        historyGrid.appendChild(card);
        card.addEventListener("click" ,() => {
            window.location.href=`/watchVideo?v=${videoId._id}`
        })
        });
        
       

    // Sidebar toggle
    let isSidebarOpen = false;
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    toggleBtn.addEventListener('click', () => {
      isSidebarOpen = !isSidebarOpen;
      sidebar.classList.toggle('-translate-x-full');
      toggleBtn.innerHTML = isSidebarOpen
        ? '<i data-lucide="x" class="w-5 h-5 text-white"></i>'
        : '<i data-lucide="menu" class="w-5 h-5 text-white"></i>';
      lucide.createIcons();
    });

    lucide.createIcons();

}

document.addEventListener("DOMContentLoaded", videoCard());

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

    