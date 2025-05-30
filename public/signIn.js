
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


document.getElementById("btn-signup").addEventListener("click", async () => {
    console.log("hola")
    document.getElementById("btn-signup").disabled = true;
    showNotification(data.message || "Wait registering User", false);
const fullName =  document.getElementById("fullName").value   
const email = document.getElementById("email").value
const username= document.getElementById("userName").value
const password=document.getElementById("password").value
const avatar = document.getElementById("avatarUpload").files[0];
const coverImage = document.getElementById("coverUpload").files[0];
    console.log(`email: ${email} username : ${username}  password : ${password}`)
    
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);
    try{
        const req = await fetch("https://creatortube-production.up.railway.app/api/v1/users/register",{
            method:"POST",
            body: formData
        })
        const data = await req.json();   // <-- convert response to JSON
          console.log(data);    // You can see the full server response here

       
          if (req.ok) {
  showNotification(data.message || "Signed up successfully", false); // ✅ success = false
  window.location.href = "dashboard.html";
} else {
  showNotification(data.message || "error encountered", true); // ✅ error = true
}
    }catch(error){
          console.log("ERROR ENCOUNTERED WHILE LOGIN IN!!!")
          console.log(error)
    }
})
