import { Db, ObjectId, Collection } from "mongodb";
import { ApolloError } from 'apollo-server'

export const Query = {
    test: () => "Working fine",
    
    getPersons: async (parent:any, args:any, context : {client:Db,user: any}) => {
        const db = context.client;
        const user = context.user;
        try {
            if(!user){
                throw new ApolloError("Something went wrong", "Unauthorized¡", { status: 401 });
            }
            let users = await db.collection("Persons").find().toArray();
            console.log(users)
            return await db.collection("Persons").find().toArray();
        } catch (error) {
            throw new ApolloError("Something went wrong", "Unauthorized¡", { status: 401 });
        }
    },

    getPerson: async (parent:any, args:{email:string},context:{client:Db})=>{
        return context.client.collection("Persons").find({email:args.email})
    }
}