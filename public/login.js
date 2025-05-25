
function showNotification(message, isError ) {
  const notification = document.getElementById("uploadNotification");
  const messageEl = document.getElementById("uploadMessage");
  const successIcon = document.getElementById("uploadSuccessIcon");
  const errorIcon = document.getElementById("uploadErrorIcon");
  const iconBg = document.getElementById("uploadIcon");

  messageEl.textContent = message;

  // Switch icons and colors
  if (isError) {
    iconBg.className = "w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-lg";
    successIcon.classList.add("hidden");
    errorIcon.classList.remove("hidden");
  } else {
    iconBg.className = "w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg";
    successIcon.classList.remove("hidden");
    errorIcon.classList.add("hidden");
  }

  // Show
  notification.classList.remove("hidden");
  notification.classList.add("animate-fadeIn");
 
  // Auto hide
  setTimeout(() => {
    notification.classList.add("hidden");
    notification.classList.remove("animate-fadeIn");
  }, 6000);
}


document.getElementById("btn-signin").addEventListener("click", async () => {
    console.log("hola")
    const email = document.getElementById("email").value
const username= document.getElementById("userName").value
const password=document.getElementById("password").value

    console.log(`email: ${email} username : ${username}  password : ${password}`)
    
    try{
        const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/login",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
             credentials: "include",
            body: JSON.stringify({ email,username, password })
        })
        const data = await req.json();   // <-- convert response to JSON
          console.log(data);    // You can see the full server response here

        //   document.getElementById("login-check").textContent=`${data.message}`
          console.log(document.cookie)
          if (req.ok) {
  showNotification(data.message || "Logged in successfully", false); // ✅ success = false
  window.location.href = "dashboard.html";
} else {
  showNotification(data.message || "Login failed", true); // ✅ error = true
}
    }catch(error){
          console.log("ERROR ENCOUNTERED WHILE LOGIN IN!!!")
          console.log(error)
    }
})


// document.getElementById("btn-logout").addEventListener("click" , async () => {

//     const cookies = document.cookie.split('; ');
// let token = '';
// cookies.forEach(cookie => {
//     if (cookie.startsWith('accessToken=')) {
//         token = cookie.split('=')[1];  // Extract the value
//     }
// });
    
//     fetch("https://creator-tube-phi.vercel.app/api/v1/users/logout", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${token}}`
//         },
//         credentials: "include",  // This sends cookies with the request
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Logout successful:', data);
//         // Handle logout success
//     })
//     .catch(error => {
//         console.error('Logout error:', error);
//     });
// })