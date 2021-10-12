import {MemoryDBInterface} from "./interface.cache";

export default class LocalMemoryDB extends MemoryDBInterface {
    map = {}

    async getValue(key: string): Promise<string> {
        const obj = this.map[key]
        if (obj) {
            return obj['value']
        }
    }

    async setValue(key: string, value: string): Promise<void> {
        this.map[key] = {value, 'ttl': 0}
    }

    async setValueWithTTL(key: string, value: string, ttlInMinutes: number): Promise<void> {
        this.map[key] = {value, 'ttl': this.generateTTL(ttlInMinutes)}
    }

    async getTTL(key: string): Promise<number> {
        const value = this.map[key]
        if (value) {
            return value['ttl'] - new Date().getTime();
        }
    }

    private generateTTL(ttlDefaultTime: number): number {
        const createDate = new Date()
        createDate.setMinutes(createDate.getMinutes() + ttlDefaultTime)
        return createDate.getTime()
    }
}
