const params = new URLSearchParams(window.location.search);
const token = params.get('token')

async function fetchData(newPassword){
    
    const req = await fetch("https://creator-tube-three.vercel.app/api/v1/users/newPw",{
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        credentials: "include",
            body: JSON.stringify({token,newPassword})
        })  
        const data = await req.json()
        return data
}

async function changePassword(){
    
    const newPassword=document.getElementById("newPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value
 
    if(newPassword == confirmPassword){
      const d = fetchData(newPassword)
      console.log(d)
    }

}
document.getElementById("submitPw").style.cursor="pointer"
document.getElementById("submitPw").addEventListener("click",async () => {
await changePassword()
})