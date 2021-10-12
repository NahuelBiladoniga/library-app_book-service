import Transport from 'winston-transport'
import {NewRelicApiLogger} from './newRelic.logger'

export default class NewRelicApiTransport extends Transport {
    private logger: any;

    constructor(options) {
        super(options);
        this.logger = new NewRelicApiLogger(options)
    }

    emitLoggedEvent(level: string, message: string) {
        setImmediate(() => this.emit('logged', {message, level}))
    }

    info(message: string) {
        this.emitLoggedEvent('info', message)
        this.logger.info(message)
    }

    error(message: string, err: Error) {
        this.emitLoggedEvent('error', message)
        this.logger.error(message, err)
    }
};
