import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    const mongoURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

     if(mongoURI.endsWith('/')){
        mongoURI = mongoURI.slice(0,-1)
     }

     await mongoose.connect(`${mongoURI}/${projectName}`)
  } catch (error) {
    console.log("Database connection error:", error.message);
   
  }
};

export default connectDB;