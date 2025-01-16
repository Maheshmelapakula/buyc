const express = require("express")
const cors = require("cors");
const app = express()
const connection = require("./config/db")
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userRoutes');
const oemRoutes = require('./routes/oemRoutes'); 
const carRoutes = require("./routes/carRoutes")
app.use(express.json())
app.use(cors());
app.get("", (req,res)=>{
    res.send("welocome")
})


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/oem', oemRoutes);
app.use('/api/car/', carRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, async(req,res)=>{
    try {
        await connection;
        console.log("Connected to database");
        
    } catch (error) {
        console.log("Error in connecting to DB");
        
    }
    console.log(`Server is running on port http://localhost:${PORT}`)
})