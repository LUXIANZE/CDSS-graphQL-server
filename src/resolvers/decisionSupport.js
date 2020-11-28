import { DECISION_ENGINE } from "../config";
import axios from "axios";

export default {
  Mutation: {
    generateDecision: async (root, args, context, info) => {
      const decision = await axios.post(`${DECISION_ENGINE}/decision`, args);
      return decision.data;
    },
  },
};
