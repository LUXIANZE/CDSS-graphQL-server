import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, CONNECTION_STRING } from './config'
import mongoose from 'mongoose'

const app = express()

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD
  // mocks: true
})

server.applyMiddleware({ app })

mongoose.set('useFindAndModify', false)
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true }).then(() => {
  return app.listen({ port: APP_PORT })
}).then((res) => {
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
})
