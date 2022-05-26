import { Db, ObjectId, Collection } from "mongodb";
import { ApolloError } from 'apollo-server'

import {User} from "../types";

function mayusc(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Mutation = {

    addPerson: async (parent: any, args: { name: string, surname: string, email: string, phone: string }, context: { client: Db,user:any }) => {
        try {
            const { name, surname, email, phone } = args;
            if (!name || !surname || !email || !phone || phone?.length != 9) {
                throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
            }
            const db = context.client;
            const collectio: Collection = db.collection("Persons");
            if (await collectio.findOne({ email: email })) {
                throw new ApolloError("Something went wrong", "Email already in use", { status: 403 });
            }
            const name2 = mayusc(name)
            const surname2 = mayusc(surname)
            const result = await collectio.insertOne({
                name: name2,
                surname: surname2,
                email,
                phone,
            });
            return { name: name2, surname: surname2, email, phone, _id: result.insertedId };
        } catch (error) {
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
        
    },

    register: async (parent: any, args: any, context: { client: Db }) => {
        try {
            const db = context.client;

            const { user, password } = args;
            const exists = await db.collection("users").findOne({ user })
            if (exists) {
                throw new ApolloError("Something went wrong", "User already exists", { status: 403 });
            }
            const result = await db.collection("users").insertOne({
                user,
                password,
            });
            return { _id: result.insertedId, user: user };
        } catch (e) {
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
    },

    login: async (parent: any, args: any, context: { client: Db }) => {
        try {
            const db = context.client;

            const { user, password } = args;
            const user_exist = await db.collection("users").findOne({ user, password });
            if (!user_exist) {
                throw new ApolloError("Something went wrong", "User or password incorrect", { status: 403 });
            }
            const token = Math.random().toString(36).substring(2, 15);
            await db.collection("users").updateOne({ user }, { $set: { token } });
            return token;
        } catch (error) {
            throw new ApolloError("Something went wrong", "User need to be register", { status: 403 });
        }
    },
    logout: async (parent: any, args: any, context: { client: Db, user: any }) => {
        try {
            console.log(context.user)
            const db = context.client;
            const user = context.user;
            if(!user){
                throw new ApolloError("Something went wrong", "Unathorized", { status: 403 });
            }
            const iduser = user._id;
            await db.collection("users").updateOne({ _id: iduser }, { $set: { token: null } });
            return true
        } catch (error) {
            throw new ApolloError("Something went wrong", "Unathorized", { status: 403 });
            
        }
    },

    deletePerson: async (parent: any, args: { email: string }, context: { client: Db }) => {
        let { email } = args;
        if (!email) {
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
        const db = context.client;
        const collectio: Collection = db.collection("Persons");
        if (!(await collectio.findOne({ email: email }))) {
            throw new ApolloError("Something went wrong", "Contact does not exist", { status: 403 });
        }
        const result = await collectio.deleteOne({
            email,
        });
        return "Delete succesful";
    }
    ,

    editPerson: async (parent: any, args: { name: string, surname: string, email: string, email2: string, phone: string }, context: { client: Db }) => {
        const { name, surname, email, email2, phone } = args;
        if (!name || !surname || !email || !phone || phone?.length != 9 || !email2) {
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
        const db = context.client;
        const collectio: Collection = db.collection("Persons");
        if (!(await collectio.findOne({ email: email }))) {
            throw new ApolloError("Something went wrong", "Contact does not exist", { status: 403 });
        }
        const name2 = mayusc(name)
        const surname2 = mayusc(surname)
        const result = await collectio.findOneAndUpdate({
            email: email,
        }, {
            $set: {
                name: name2,
                surname: surname2,
                email: email2,
                phone,
            }
        });
        return { name: name2, surname: surname2, email: email2, phone };
    }
}