import mongoose from 'mongoose'
import { logger } from '../config/logger'
import config from '../config/config'

const db = mongoose.connection
db.on('error', () => {
    logger.error('DB: mongo db connection is not open')
    logger.info('DB: killing myself so that container restarts')
})

db.once('open', () => {
    logger.info('DB: mongo db connection is established')
})

export default class Database {
    // private url = `mongodb://${config.MongoUser}:${config.MongoPassword}@127.0.0.1:${config.MongoPort}/${config.MongoDatabase}`

    private url =
        'mongodb+srv://fazliddin2001:fazliddin2001@cluster0.dkyih.mongodb.net/?retryWrites=true&w=majority'

    constructor() {
        logger.info(`DB: DATABASE URL: ${this.url}`)
    }

    connect() {
        return mongoose.connect(
            this.url,
            {
                authSource: 'admin',
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            },
            (error) => {
                if (error) {
                    logger.error('DB: MongoDB Connection error:', error)
                    process.exit(1)
                }
            }
        )
    }
}
