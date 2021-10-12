require('newrelic')
import {App} from './app'
import Logger from './logger/implementation.logger'

async function main() {
    const app = new App()
    await app.listen()
}

main().catch(err => Logger.error("Error trying to start the server!", err))
