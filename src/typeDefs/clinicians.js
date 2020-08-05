import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        clinicians: [Clinician!]!
        clinician(id: ID!): Clinician
    }

    extend type Mutation {
        addClinician(email: String!, name: String!): Clinician!
        deleteClinician(id: ID!): String!
    }

    type Clinician {
        id: ID!
        email: String!
        name: String!
        createdAt: String!
        patients: [patient]
    }
`
