import { expect } from "chai";
import "mocha";

import { createMessagingClient } from "../src";
import { IMessagingClient, IMessagingClientConfig } from "../src/interfaces";

const config : IMessagingClientConfig = { serverUrl: "nats://localhost:4222" };

describe('messaging service', function () {
    describe('server connection', async () => {
        const client = createMessagingClient(config);
        it('is disconnected after initialization', () => {
            expect(client.isConnected()).to.be.false;
        });
        it('establishes a connection to the server after being explicitly told so', async () => {
            await client.connect();
            expect(client.isConnected()).to.be.true;
        });
        it('gracefully closes the connection', async () => {
            await client.disconnect();
            expect(client.isConnected()).to.be.false;
        });
        it('allows to reopen the connection later', async () => {
            await client.connect();
            expect(client.isConnected()).to.be.true;
        });
        // close connection
        await client.disconnect();
    });

    describe('authenticated requests', async () => {
        const authConfig : IMessagingClientConfig = {
            serverUrl: "nats://localhost:4222",
            // DO NOT USE THIS SPECIFIC SEED IN PRODUCTION!!!
            seed: "SUAKBQLSEALNTLABG6XCLLWHYHIAOFM3HXD6RUHRPQ53GZNZ3MVLTZCZOM"
        };
        const client = createMessagingClient(authConfig);
        it('establishes an authenticated connection', async () => {
            await client.connect();
            expect(client.isConnected()).to.be.true;
        });
        await client.disconnect();
    })

    describe('publish and subscribe', function() {
        const subject = 'time';
        let client : IMessagingClient;

        const returnFirst = async <T>(sub: AsyncGenerator<T, unknown, unknown>) => {
            for await (const m of sub) {
                return m;
            }
        };

        beforeEach('create clean messaging client for each test', async function () {
            client = createMessagingClient(config);
            await client.connect();
        });
        afterEach('close connection of messaging client after each test', async function () {
            await client.disconnect();
        });

        it('receives published messages without payload', async function () {
            const sub = client.subscribe(subject);
            const iter = returnFirst(sub);
            await client.publish(subject);
            const message = await iter;
            expect(message.subject).to.equal(subject);
            expect(message.payload).to.be.undefined;
        });
        
        it('receives published messages with payload (number)', async function () {
            const payload = 42;
            const sub = client.subscribe<number>(subject);
            const iter = returnFirst(sub);
            await client.publish(subject, payload);
            const message = await iter;
            expect(message.subject).to.equal(subject);
            expect(message.payload).to.equal(payload);
        });
        
        it('receives published messages with payload (string)', async function () {
            const payload = 'a simple string';
            const sub = client.subscribe<string>(subject);
            const iter = returnFirst(sub);
            await client.publish(subject, payload);
            const message = await iter;
            expect(message.subject).to.equal(subject);
            expect(message.payload).to.equal(payload);
        });

        it('receives published messages with payload (object)', async function () {
            const payload = { name: 'a value', value: 42 };
            const sub = client.subscribe<{name,value}>(subject);
            const iter = returnFirst(sub);
            await client.publish(subject, payload);
            const message = await iter;
            expect(message.subject).to.equal(subject);
            expect(message.payload.name).to.equal(payload.name);
            expect(message.payload.value).to.equal(payload.value);
        });

        it('receives multiple messages in FIFO order', async function () {
            const sub = client.subscribe<number>(subject);
            const iter = (async () => {
                const numbers: number[] = [];
                for await (const m of sub) {
                    numbers.push(m.payload);
                    if (numbers.length === 10) {
                        return numbers;
                    }
                }
            })()
            const payload: number[] = [];
            for (let i = 0; i < 10; i++) {
                payload.push(i);
                await client.publish<number>(subject, i);
            }
            const numbers = await iter;
            expect(numbers).deep.equals(payload);
        });

        it('receives no more messages after unsubscribing', async function () {
            const sub = client.subscribe(subject);
            const iter = returnFirst(sub);
            await client.unsubscribe(subject);
            expect(client.getSubscribedSubjects()).to.be.empty;
            await client.publish(subject);
            const message = await iter;
            // expect rejection
            expect(message).to.be.undefined;
        });
    });

    describe('request and reply', function() {
        let client: IMessagingClient;

        beforeEach('create clean messaging client for each test', async function () {
            client = createMessagingClient(config);
            await client.connect();
        });
        afterEach('close connection of messaging client after each test', async function () {
            await client.disconnect();
        });
    })
});

