export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  CONNECTION_STRING = 'mongodb+srv://LU-Developer-98:stJK1QzNedyCQwLL@lu-dev-cluster-5pzdu.mongodb.net/CDSS?retryWrites=true&w=majority',
  DB_USERNAME = 'LU-Developer-98',
  DB_PASSWORD = 'stJK1QzNedyCQwLL',
  DB_NAME = 'CDSS'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
