import { expect } from "chai";
import "mocha";

import { createMessagingClient } from "../src";

const config = { serverUrl: "localhost:4222" };
const client = createMessagingClient(config);

describe('messaging service', () => {
    describe('connecting to the server', () => {
        it('is disconnected after initialization', () => {
            expect(client.isConnected()).to.be.false;
        });
        it('establishes a connection to the server after being explicitly told so', async () => {
            await client.connect();
            expect(client.isConnected()).to.be.true;
        });
    });
});

