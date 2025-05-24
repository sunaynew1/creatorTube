window.onload = async () => {
    console.log("dashboard code is working");

    // Get the token from cookie string
    const token =  document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
        // const token=req.cookies.accessToken
        console.log(`token recieved ${token}`)
    if (!token || token === "undefined") {
        // No token found or token is invalid
        window.location.href = "login.html";
    }

    try{
        const req = await fetch("http://localhost:3004/api/v1/users/dashboard",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
             credentials: "include",
            
        })

      document.getElementById("mychannel").addEventListener("click" , () => {
        window.location.href = `channelPage.html?v=${data.data.owner._id}`
      })

       
        } catch(error){
            console.log("error while sending token")
        }
    // Otherwise, token is present, continue with dashboard operations
};
