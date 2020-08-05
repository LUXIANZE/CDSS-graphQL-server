import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        histologyReport: histologyReport!
    }

    extend type Mutation {
        addHistologyReport(patientID: String!, title: String!, content: String!): histologyReport!
    }
    
    type histologyReport {
        id: ID!
        title: String!
        content: String!
        patientID: ID!
        createdAt: String!
    }
`
