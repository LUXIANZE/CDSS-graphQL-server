import { DECISION_ENGINE } from "../config";
import { DecisionSupport } from "../models";
import axios from "axios";
import { UserInputError } from "apollo-server-express";

export default {
  Query: {
    getDecisionTree: async (root, args, context, info) => {
      const decision = await axios.get(`${DECISION_ENGINE}/getAllTrees`);
      return JSON.stringify(decision.data);
    },
    finalDecisions: (root, args, context, info) => {
      return DecisionSupport.find({});
    },
  },
  Mutation: {
    generateDecision: async (root, args, context, info) => {
      const decision = await axios.post(`${DECISION_ENGINE}/decisionByTreeId`, {
        treeId: 1,
        ...args,
      });
      return decision.data;
    },
    finalDecision: async (root, { finalDecision }, context, info) => {
      const invalid_input = finalDecision === null;
      if (invalid_input) {
        throw new UserInputError("Invalid input");
      }

      const doc = new DecisionSupport({
        ...finalDecision,
      });
      const new_decision = await doc.save();
      return {
        id: new_decision.id,
        ...new_decision._doc,
      };
      return args;
    },
    updateDecisionTree: async (root, args, context, info) => {
      const decision = await axios.put(`${DECISION_ENGINE}/updateTree`, args);
      return decision.data;
    },
  },
};
