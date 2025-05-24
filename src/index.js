import { app } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 3005

// app.listen(PORT , () => {
//     console.log(`server running on ${PORT}`)
// })

connectDB()
.then(() => {
    app.listen(PORT , () => {
    console.log(`server running on ${PORT}`)
})
})
.catch((err => {
    console.log(`mongoDB connection error ${err}`)
}))