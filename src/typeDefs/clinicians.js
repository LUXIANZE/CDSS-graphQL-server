import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    clinicians: [Clinician!]!
    clinician(id: ID!): Clinician
  }

  extend type Mutation {
    addClinician(registerInput: RegisterInput): Clinician!
    deleteClinician(id: ID!): String!
  }

  input RegisterInput {
    name: String!
    staffId: String!
    password: String!
    confirmPassword: String!
  }

  type Clinician {
    id: ID!
    name: String!
    staffId: String!
    token: String!
    role: String!
    createdAt: String!
    patients: [patient]
  }
`;
