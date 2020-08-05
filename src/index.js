import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, CONNECTION_STRING } from './config'
import mongoose from 'mongoose'

const app = express()

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD
  // mocks: true
})

server.applyMiddleware({ app })

mongoose.set('useFindAndModify', false)
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true }).then(() => {
  return app.listen({ port: APP_PORT })
}).then((res) => {
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
})

// const { ApolloServer, gql} = require('apollo-server')
// const cors = require('cors')
// const crypto = require('crypto')

// const PORT = 5000

// const db = {
//     clinicians: [
//         {id: '5', email:'a@gmail.com', name: 'a'},
//         {id: '2', email:'b@gmail.com', name: 'b'},
//         {id: '3', email:'c@gmail.com', name: 'c'},
//         {id: '4', email:'d@gmail.com', name: 'd'}
//     ],
//     patients: [
//         {id: '1', name: 'Tan1', ic: '980623065001', assignedClinician: '1'},
//         {id: '2', name: 'Tan2', ic: '980623065002', assignedClinician: '2'},
//         {id: '3', name: 'Tan3', ic: '980623065003', assignedClinician: '3'},
//         {id: '4', name: 'Tan4', ic: '980623065004', assignedClinician: '2'}
//     ]
// }

// const typeDefs = gql`
//     type Query {
//         clinicians: [Clinician!]!
//         clinician(id: ID!): Clinician
//         patients: [Patient!]!
//     }

//     type Mutation {
//         addClinician(email: String!, name: String!): Clinician
//         addPatient(name: String!, ic: String!): Patient
//     }

//     type Clinician{
//         id: ID!
//         email: String!
//         name: String!
//         patients: [Patient!]!
//     }

//     type Patient{
//         id: ID!
//         name: String!
//         ic: String!
//         assignedClinician: String!
//     }
// `

// const resolvers = {
//     Query:{
//         clinicians: () => db.clinicians,
//         clinician: (root, { id }) => db.clinicians.find(clinician => clinician.id === args.id ),
//         patients: () => db.patients,
//     },
//     Mutation: {
//         addClinician: (root, {email, name}) => {
//             const Clinician = {
//                 id: crypto.randomBytes(10).toString('hex'),
//                 email,
//                 name
//             }
    
//             db.clinicians.push(Clinician)
    
//             return Clinician
//         },
//         addPatient: (root, {name, ic}) => {
//             const Patient = {
//                 id: crypto.randomBytes(10).toString('hex'),
//                 name,
//                 ic
//             }
    
//             db.patients.push(Patient)
    
//             return Patient
//         }
//     },
//     Clinician: {
//         patients: clinician => db.patients.filter(patient => patient.assignedClinician === clinician.id)
//     }
// }

// const server = new ApolloServer({ typeDefs, resolvers })

// // this is for undone api testing
// // const server = new ApolloServer({ typeDefs, mocks: true })

// server.listen().then(({ url }) => console.log(url))
