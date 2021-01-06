import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getDecisionTree: String!
    finalDecisions: [decisionSupport!]!
  }
  extend type Mutation {
    generateDecision(answer: [String!]): String!
    finalDecision(finalDecision: decisionSupportInput!): decisionSupport!
    updateDecisionTree(tree: String!): String!
  }
  input decisionSupportInput {
    staffId: String!
    mRNNumber: String!
    decision: String!
    isOverride: Boolean!
    reason: String!
  }
  type decisionSupport {
    staffId: String!
    mRNNumber: String!
    decision: String!
    isOverride: Boolean!
    reason: String!
  }
`;
