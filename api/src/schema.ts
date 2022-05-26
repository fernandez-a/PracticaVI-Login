import { gql } from "apollo-server";

export const typeDefs = gql`
  type Person {
    _id: ID!
    name: String!
    surname: String!
    email: String!
    phone: String!
  }

  type User{
    _id: ID
    user:String
    token: String
  }

  type Query {
    test: String
    getPersons: [Person!]!
    getPerson( email: String): Person
  }

  type Mutation {
    addPerson(
      name: String
      surname: String
      email: String
      phone: String
    ): Person!
    deletePerson(email: String): String!
    editPerson(name: String
      surname: String
      email: String
      phone: String
      email2: String): Person!
    register(user:String,password:String): User!
    login(user:String,password:String): String!
    logout: Boolean!
  }
`;