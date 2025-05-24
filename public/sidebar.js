  async function userData(){
    const req = await fetch("http://creatortube-production.up.railway.app/api/v1/users/onlyId", {
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include"
    })

    const data = await req.json()
    return data;
  }
 
  async function logout(){
    const req = await fetch("http://creatortube-production.up.railway.app/api/v1/users/logout", {
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include"
    })

    const data = await req.json()
    return data;
  }

  async function fetchInfo(){
  const data= await userData()
  console.log(data)
  document.getElementById("mychannel").addEventListener("click" , () => {
        window.location.href = `channelPage.html?v=${data.data._id}`
      })

      document.getElementById("profile").src=data.data.avatar
      document.getElementById("username").textContent=data.data.username
   }

  fetchInfo()
  
   
  
    let isSidebarOpen = false;
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const profilediv = document.getElementById("profilediv")
    const logoutbtn = document.getElementById("logout")

    logoutbtn.addEventListener("click" ,async () => {
       logout()
       window.location.href="login.html"
    })

    toggleBtn.addEventListener('click', () => {
      isSidebarOpen = !isSidebarOpen;
      sidebar.classList.toggle('-translate-x-full');
      toggleBtn.innerHTML = isSidebarOpen
        ? '<i data-lucide="x" class="w-5 h-5"></i>'
        : '<i data-lucide="menu" class="w-5 h-5"></i>';
      lucide.createIcons();
    });
      profilediv.style.cursor="pointer"
     profilediv.addEventListener("click" , () => {
      window.location.href = "profile.html";
     })
    lucide.createIcons();

