import { MemoryDBInterface } from "./interface.cache";
import { getMemoryDBURL, isIntegrationTestScope } from "../utils/environment";
import { createClient } from 'redis';

const url = getMemoryDBURL()
let client

if (isIntegrationTestScope()) {
    client = require("redis-mock").createClient()
} else {
    client = createClient({ url })
    client.connect()
}

export default class RedisMemoryDB extends MemoryDBInterface {
    async getValue(key: string): Promise<string> {
        return await client.get(key)
    }

    async setValue(key: string, value: string): Promise<void> {
        await client.set(key, value);
    }

    async setValueWithTTL(key: string, value: string, ttlInMinutes: number): Promise<void> {
        await client.set(key, value, { EX: 60 * ttlInMinutes })
    }

    async getTTL(key: string): Promise<number> {
        return await client.ttl(key)
    }
}
