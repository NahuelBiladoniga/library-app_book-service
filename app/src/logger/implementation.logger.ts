import {isProdScope} from "../utils/environment";
import NewRelicApiWinstonTransport from "./winstonTransportNewRelic.logger";

export default new NewRelicApiWinstonTransport({
    attributes: {
        app: 'library-app_book-service',
        env: isProdScope() ? 'production' : 'development',
        logger: 'winston'
    }
});
