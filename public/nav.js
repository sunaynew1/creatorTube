async function userData() {
  try {
    const res = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("User data received:", data);

    if (!data?.data?._id) {
      throw new Error("User ID missing in dashboard data");
    }

    const userId = data.data._id;

    // ✅ Set avatar
    const avatar = document.getElementById("avatar");
    if (avatar) {
      avatar.src = data.data.avatar;
      avatar.addEventListener("click", () => {
        window.location.href = "profile.html";
      });
    } else {
      console.warn("Avatar element not found.");
    }

    // ✅ Set channel link
    const channelBtn = document.getElementById("mychannel");
    if (channelBtn) {
      channelBtn.href = `https://creator-tube-phi.vercel.app/channelPage.html?v=${userId}`;
      console.log("Channel button href set.");
    } else {
      console.warn("My Channel button not found.");
    }

  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
}

document.addEventListener("DOMContentLoaded", userData);
