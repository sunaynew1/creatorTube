async function authorizationCheck() {
  try {
    const res = await fetch("https://creatortube-production.up.railway.app/api/v1/users/Authorization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (data.message !== "success") {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.log(`Authorization error: ${error}`);
  }
}

window.onload = async () => {
  console.log("Dashboard script loaded.");

  // Optional: Run auth check first
  await authorizationCheck();

  try {
    const res = await fetch("https://creator-tube-three.vercel.app/api/v1/users/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    console.log("User data received:", data);

    // Guard check
    if (!data?.data?._id) {
      throw new Error("User ID missing in dashboard data");
    }

    const userId = data.data._id;

    // Update avatar image
    const avatar = document.getElementById("avatar");
    if (avatar) {
      avatar.src = data.data.avatar;
      avatar.addEventListener("click", () => {
        window.location.href = "profile.html";
      });
    } else {
      console.warn("Avatar element not found.");
    }

    // Add event to "My Channel" button
    const channelBtn = document.getElementById("mychannel");
    if (channelBtn) {
      channelBtn.addEventListener("click", () => {
        const url = `channelPage.html?v=${userId}`;
        console.log("Navigating to:", url);
        window.location.href = url;
      });
    } else {
      console.warn("Button #mychannel not found.");
    }

  } catch (error) {
    console.error("Error loading dashboard:", error);
  }

  // Mobile navbar toggle
  document.querySelectorAll("[data-collapse-toggle]").forEach((button) => {
    const targetId = button.getAttribute("data-collapse-toggle");
    const target = document.getElementById(targetId);

    button.addEventListener("click", () => {
      target?.classList.toggle("hidden");
    });
  });
};



authorizationCheck()