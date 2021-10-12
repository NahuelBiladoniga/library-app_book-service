import {isProdScope} from "../utils/environment";
import NewRelicApiWinstonTransport from "./winstonTransportNewRelic.logger";

export default new NewRelicApiWinstonTransport({
    attributes: {
        app: 'library-app',
        env: isProdScope() ? 'production' : 'development',
        logger: 'winston'
    }
});
