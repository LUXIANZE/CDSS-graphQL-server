import { Report } from "../models";

export default {
  Query: {
    getReport: (root, args, context, info) => {
      const data = Report.find({});
      return data;
    },
  },
};
