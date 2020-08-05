import { HistologyReport } from '../models'

export default {
  Query: {
    histologyReport: (root, args, context, info) => {
      return HistologyReport.find({})
    }
  },
  Mutation: {
    addHistologyReport: (root, args, context, info) => {
      return HistologyReport.create(args)
    }
  }
}
