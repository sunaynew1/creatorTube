
function showNotification(message, isError = false) {
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
document.getElementById("btn-upload").addEventListener("click", async () => {
  
  
  const videoTitle = document.getElementById("videoTitle").value;
    const description = document.getElementById("description").value;
    const videoFile = document.getElementById("btn-Videofile").files[0];
    const thumbnail = document.getElementById("btn-Thumbnail").files[0];
    const progressBar = document.getElementById("uploadProgressBar");
   console.log("reached here")
    const formData = new FormData();
    formData.append("videoTitle", videoTitle);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    const xhr = new XMLHttpRequest();

    // xhr.open("POST", "https://creator-tube-phi.vercel.app/api/v1/users/upload-video");
  
    // // Include cookies
    // xhr.withCredentials = true;
  
    // // Track upload progress
    // xhr.upload.onprogress = (event) => {
    //   if (event.lengthComputable) {
    //     const percent = (event.loaded / event.total) * 100;
    //     progressBar.style.width = `${percent}%`;
    //   }
    // };
  
    // xhr.onload = () => {
    //   if (xhr.status === 201) {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log("Upload successful:", res);
    //     progressBar.style.width = "100%";
    //   } else {
    //     console.error("Upload failed:", xhr.responseText);
    //   }
    // };
  
    // xhr.onerror = () => {
    //   console.error("Upload error occurred.");
    // };
  
    // xhr.send(formData);
  
    try {
      showNotification("Video started uploading 🚀🚀");
      const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/upload-video", {
        method: "POST",
        body: formData,
        credentials: "include" // to include cookies
      });
  
      const res = await req.json();
      console.log("Upload response:", res);
      showNotification("✅ Video uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      showNotification(" Video uploaded failed!");
    }
  });
  
