import { IMessagingService } from "@baseline-protocol/messaging";
import { assert, expect } from "chai";
import "mocha";

import { createMessagingClient } from "../src";

const config = { serverUrl: "nats://localhost:4222" };

function sleep(ms: number) : Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
} 

describe('messaging service', () => {
    describe('connecting to the server', async () => {
        let client = createMessagingClient(config);
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

    describe('publishing and subscribing', () => {
        let alice : IMessagingService;
        let bob : IMessagingService;
        beforeEach('create clean messaging client for each test', async () => {
            alice = createMessagingClient(config);
            bob = createMessagingClient(config);
            await Promise.all([alice.connect(), bob.connect()]);
        });
        afterEach('close connection of messaging client after each test', async () => {
            let promises : Promise<void>[];
            if (alice.isConnected()) {
                await alice.disconnect();
            }
            if (bob.isConnected()) {
                await bob.disconnect();
            }
        });

        it('receives published messages by others on subscribed topics', (done) => {
            let subject = 'money';
            let callback = (msg, err) => {
                if (err) {
                    done(err)
                }
                expect(msg).to.equal('increment');
                done();
            };
            alice.subscribe(subject, callback).then(() =>
                bob.publish(subject, 'increment'));
        });
        it('receives published messages by itself on subscribed topics', (done) => {
            let subject = 'money';
            let callback = (msg, err) => {
                if (err) {
                    done(err)
                }
                expect(msg).to.equal('increment');
                done();
            };
            alice.subscribe(subject, callback).then(() =>
                alice.publish(subject, 'increment'));
        });
        it('receives a messages pnce after subscribing multiple times', async () => {
            let subject = 'money';
            let messages : string[] = []
            let callback = (msg, err) => {
                messages.push(msg);
            };
            await alice.subscribe(subject, callback);
            await alice.subscribe(subject, callback);      
            expect(alice.getSubscribedSubjects()).to.have.lengthOf(1);
            await bob.publish(subject, 'increment');
            await sleep(1000);
            expect(messages).to.have.lengthOf(1);
        });
    });
});

