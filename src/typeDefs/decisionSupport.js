import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    generateDecision(answer: [String!]): String!
  }
`;
