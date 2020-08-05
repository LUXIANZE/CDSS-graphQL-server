import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        patients: [patient!]!
        patient(id: ID!): patient
    }

    extend type Mutation {
        addPatient(name: String!, ic: String!, assignedClinician: String!): patient!
        deletePatient(id: ID!): String!
        updatePatient(id: ID!, name: String!, ic: String!, assignedClinician: String!): patient!
    }

    type patient {
        id: ID!
        ic: String!
        name: String!
        assignedClinician: ID!
        pathologyReport: [pathologyReport]!
        histologyReport: [histologyReport]!
        createdAt: String!
    }
`
