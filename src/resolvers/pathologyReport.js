import { PathologyReport } from '../models'

export default {
  Query: {
    pathologyReport: (root, args, context, info) => {
      return PathologyReport.find({})
    }
  },
  Mutation: {
    addPathologyReport: (root, args, context, info) => {
      return PathologyReport.create(args)
    }
  }
}
