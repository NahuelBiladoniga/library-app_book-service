import {App} from './app'

async function main() {
    const app = new App()
    await app.listen()
}

main().catch(err => console.error("Error trying to start the server!"))
