lucide.createIcons();

const toggleAboutBtn = document.getElementById('toggleAboutMe');
const aboutText = document.getElementById('aboutMe');
const aboutStatic = document.getElementById('aboutMeStatic');
const saveAbout = document.getElementById('saveAboutMe');


async function forgotPassword(mailId) {
    const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/Mail",{
        method:"POST",
        headers: {
            "Content-Type" : "application/json"
         },
             credentials: "include",
             body:JSON.stringify({mailId})
        })
 
}
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
toggleAboutBtn.addEventListener('click', () => {
    aboutText.classList.toggle('hidden');
    aboutStatic.classList.toggle('hidden');
    saveAbout.classList.toggle('hidden');
});

const togglePassBtn = document.getElementById('togglePasswordForm');
const passForm = document.getElementById('passwordForm');

togglePassBtn.addEventListener('click', () => {
    passForm.classList.toggle('hidden');
});


async function fetchData() {
    const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/allData", {
        method: "POST",
        headers: {
            "Content-Type": "applications/json"
        },
        credentials: "include",
    })
    const data = req.json()
    return data
}

async function postAboutMe(aboutMe) {
    try {
        const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/postAboutMe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ aboutMe })
        })
        const data = req.json()
        return data
    } catch (error) {
        console.log(`error encountered profile.js ${error}`)
    }
}

async function changeCurrentPassword(oldPassword, newPassword) {
    try {
        const req = await fetch("https://creator-tube-phi.vercel.app/api/v1/users/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ oldPassword, newPassword })
        })
        const data = req.json()
        return data
    } catch (error) {
        console.log(`error encountered profile.js ${error}`)
    }
}


async function allData() {
    const userData = await fetchData()
    console.log(userData)
    const coverimage = document.getElementById("coverImage")
    const subscriber = document.getElementById("subscriberCount")
    const videoCount = document.getElementById("viewsCount")

    document.getElementById("about-text").textContent = userData.data.aboutMe
    coverimage.src = userData.data.coverImage
    subscriber.textContent = userData.data.subscriberCount
    videoCount.textContent = userData.data.myVideos.length


    saveAbout.addEventListener("click", async () => {
        console.log(aboutText.value)
        const aboutValue = aboutText.value
        const d = await postAboutMe(aboutValue)
        console.log(d)

        aboutText.classList.toggle('hidden');
        aboutStatic.classList.toggle('hidden');
        saveAbout.classList.toggle('hidden');
        document.getElementById("about-text").textContent = d.data.aboutMe
    })

    document.getElementById("updatePassword").addEventListener("click", async () => {

        try {
            const oldPassword = document.getElementById("Current_Password").value
            const newPassword = document.getElementById("New_Password").value
            const confirmPassword = document.getElementById("Confirm_Password").value

            console.log(`new pw : ${newPassword} updated pw ${confirmPassword} `)
            if (newPassword == confirmPassword) {
                const d = await changeCurrentPassword(oldPassword, newPassword)
                console.log(d.data)
                if (d.data = "Old Password is Incorrect") {
                    showNotification("❌Error Occurred while changing password ", true);
                } else {
                    showNotification("Password changed Successfully✅");
                    passForm.classList.toggle('hidden');
                    console.log(d)
                    console.log("password updated successfully")
                }

            } else {
                console.log("password not same")
                showNotification("New and updated passwords are not same ❌");
            }
        } catch (error) {

            console.log(error)
        }

    })
    document.getElementById("forgot_password").addEventListener("click" , async () => {
        console.log(userData.data.email)
        forgotPassword(userData.data.email)
    } )

}

allData()