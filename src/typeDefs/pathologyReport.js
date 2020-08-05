import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        pathologyReport: pathologyReport!
    }

    extend type Mutation {
        addPathologyReport(title: String!, content: String!, patientID: String!): pathologyReport!
    }

    type pathologyReport {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        patientID: ID!
    }
`
