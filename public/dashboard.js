

async function authorizationCheck() {
    try{
        const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/Authorization",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
             credentials: "include",
            
        })

        const data = await req.json()

        if(data.message != "success"){
         window.location.href="login.html"
        }

        }catch(error){
            console.log(`dashboard error : ${error}`)
        }
}

window.onload = async () => {
    console.log("dashboard code is working");

    // // Get the token from cookie string
    // const token =  document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('accessToken='))
    //     ?.split('=')[1];
    //     // const token=req.cookies.accessToken
    //     console.log(`token recieved ${token}`)
    // if (!token || token === "undefined") {
    //     // No token found or token is invalid
    //     window.location.href = "login.html";
    // }

    

    try{
        const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/dashboard",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
             credentials: "include",
            
        })
        const data = await req.json()

      document.getElementById("mychannel").addEventListener("click" , () => {
        window.location.href = `channelPage.html?v=${data.data.owner._id}`
      })
        
      document.getElementById("user_profile").src=data.data.avatar
        document.getElementById("user_photo").addEventListener("click" , () => {
        window.location.href = `profile.html`
      })
       
        } catch(error){
            console.log("error while sending token")
        }
    // Otherwise, token is present, continue with dashboard operations
};


document.getElementById('user-menu-button').addEventListener('click', function () {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('hidden');
  });

  // Toggle mobile menu
  document.getElementById('menu-toggle').addEventListener('click', function () {
    const nav = document.getElementById('navbar-user');
    nav.classList.toggle('hidden');
  });