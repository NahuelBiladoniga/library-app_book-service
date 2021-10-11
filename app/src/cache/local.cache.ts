import {MemoryDBInterface} from "./interface.cache";

export default class LocalMemoryDB extends MemoryDBInterface {
    map = {}

    async getValue(key: string): Promise<string> {
        return this.map[key]
    }

    async setValue(key: string, value: string): Promise<void> {
        this.map[key] = value
    }

    async setValueWithTTL(key: string, value: string, ttlInMinutes: number): Promise<void> {
        await this.setValue(key, value)
    }

    async getTTL(key: string): Promise<number> {
        return 0;
    }
}
