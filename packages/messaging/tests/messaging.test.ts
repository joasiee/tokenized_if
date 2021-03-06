import { expect } from "chai";
import "mocha";

import { createMessagingClient } from "../src";
import { IMessagingClient, IMessagingClientConfig } from "../src";

const config: IMessagingClientConfig = { serverUrl: "nats://localhost:4222" };

describe("messaging service", function() {
  describe("server connection", function() {
    const client = createMessagingClient(config);
    it("is disconnected after initialization", () => {
      expect(client.isConnected()).to.be.false;
    });
    it("establishes a connection to the server after being explicitly told so", async () => {
      await client.connect();
      expect(client.isConnected()).to.be.true;
    });
    it("gracefully closes the connection", async () => {
      await client.disconnect();
      expect(client.isConnected()).to.be.false;
    });
    it("allows to reopen the connection later", async () => {
      await client.connect();
      expect(client.isConnected()).to.be.true;
    });

    after("ensure connection closes", async function() {
      await client.disconnect();
    });
  });

  describe("authenticated requests", function() {
    const authConfig: IMessagingClientConfig = {
      serverUrl: "nats://localhost:4222",
      // DO NOT USE THIS SPECIFIC SEED IN PRODUCTION!!!
      seed: "SUAKBQLSEALNTLABG6XCLLWHYHIAOFM3HXD6RUHRPQ53GZNZ3MVLTZCZOM"
    };
    const client = createMessagingClient(authConfig);
    it("establishes an authenticated connection", async () => {
      await client.connect();
      expect(client.isConnected()).to.be.true;
    });

    after("ensure connection closes", async function() {
      await client.disconnect();
    });
  });

  describe("publish and subscribe", function() {
    let client: IMessagingClient;
    const subject = "time";

    const returnFirst = async <T>(sub: AsyncGenerator<T, unknown, unknown>) => {
      for await (const m of sub) {
        return m;
      }
    };

    beforeEach("create clean messaging client for each test", async function() {
      client = createMessagingClient(config);
      await client.connect();
    });
    afterEach("close connection of messaging client after each test", async function() {
      await client.disconnect();
    });

    it("receives published messages without payload", async function() {
      const sub = client.subscribe(subject);
      const iter = returnFirst(sub);
      await client.publish(subject);
      const message = await iter;
      expect(message.subject).to.equal(subject);
      expect(message.payload).to.be.undefined;
    });

    it("receives published messages with payload (number)", async function() {
      const payload = 42;
      const sub = client.subscribe<number>(subject);
      const iter = returnFirst(sub);
      await client.publish(subject, payload);
      const message = await iter;
      expect(message.subject).to.equal(subject);
      expect(message.payload).to.equal(payload);
    });

    it("receives published messages with payload (string)", async function() {
      const payload = "a simple string";
      const sub = client.subscribe<string>(subject);
      const iter = returnFirst(sub);
      await client.publish(subject, payload);
      const message = await iter;
      expect(message.subject).to.equal(subject);
      expect(message.payload).to.equal(payload);
    });

    it("receives published messages with payload (object)", async function() {
      const payload = { name: "a value", value: 42 };
      const sub = client.subscribe<{ name; value }>(subject);
      const iter = returnFirst(sub);
      await client.publish(subject, payload);
      const message = await iter;
      expect(message.subject).to.equal(subject);
      expect(message.payload.name).to.equal(payload.name);
      expect(message.payload.value).to.equal(payload.value);
    });

    it("receives multiple messages in FIFO order", async function() {
      const sub = client.subscribe<number>(subject);
      const iter = (async () => {
        const numbers: number[] = [];
        for await (const m of sub) {
          numbers.push(m.payload);
          if (numbers.length === 10) {
            return numbers;
          }
        }
      })();
      const payload: number[] = [];
      for (let i = 0; i < 10; i++) {
        payload.push(i);
        await client.publish<number>(subject, i);
      }
      const numbers = await iter;
      expect(numbers).deep.equals(payload);
    });

    it("receives no more messages after unsubscribing", async function() {
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

  describe("request and reply", function() {
    let client: IMessagingClient;
    const subject = "increment";

    beforeEach("create clean messaging client for each test", async function() {
      client = createMessagingClient(config);
      await client.connect();
    });
    afterEach("close connection of messaging client after each test", async function() {
      await client.disconnect();
    });

    it("replies to messages without payload", async function() {
      const rro = client.reply(subject);
      void (async () => {
        for await (const r of rro) {
          await r.respond(1);
        }
      })();
      const reply = await client.request(subject);
      expect(reply).to.equal(1);
    });

    it("replies to messages with payload (number)", async function() {
      const rro = client.reply<number, number>(subject);
      void (async () => {
        for await (const r of rro) {
          await r.respond(r.payload + 1);
        }
      })();
      const reply = await client.request(subject, 42);
      expect(reply).to.equal(43);
    });

    it("replies to messages with payload (string)", async function() {
      const rro = client.reply<string, string>(subject);
      void (async () => {
        for await (const r of rro) {
          await r.respond(r.payload + " world");
        }
      })();
      const reply = await client.request(subject, "hello");
      expect(reply).to.equal("hello world");
    });

    it("replies to messages with payload (object)", async function() {
      const rro = client.reply<{ str: string }, { num: number }>(subject);
      void (async () => {
        for await (const r of rro) {
          await r.respond({ num: parseInt(r.payload.str) });
        }
      })();
      const reply = await client.request<{ str: string }, { num: number }>(subject, { str: "42" });
      expect(reply.num).to.equal(42);
    });

    it("replies to multiple requests", async function() {
      const rro = client.reply(subject);
      void (async () => {
        let timesCalled = 0;
        for await (const r of rro) {
          await r.respond(timesCalled++);
        }
      })();
      for (let i = 0; i < 5; i++) {
        const reply = await client.request(subject);
        expect(reply).to.equal(i);
      }
    });
  });
});
