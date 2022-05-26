import { Db, MongoClient } from "mongodb";


export const connectDB = async (): Promise<Db> => {

  
  const mongouri: string = process.env.MONGO_URL as string;
  if(!mongouri){
    console.error("mongo uri not defined")
  }
  const client = new MongoClient(mongouri);
  try {
    await client.connect();
    console.info("MongoDB connected");
    return client.db("Agenda");
  } catch (e) {
    throw e;
  }
};
