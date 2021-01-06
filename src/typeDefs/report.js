import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getReport: [patientReport!]!
  }
  type patientReport {
    mRNNumber: String!
    report: String!
    date: String!
  }
`;
