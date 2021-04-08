// package: commit
// file: commit.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Request extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Request.AsObject;
    static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Request;
    static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
    export type AsObject = {
    }


    export class Commit extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Commit;
        getIndex(): number;
        setIndex(value: number): Commit;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Commit.AsObject;
        static toObject(includeInstance: boolean, msg: Commit): Commit.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Commit, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Commit;
        static deserializeBinaryFromReader(message: Commit, reader: jspb.BinaryReader): Commit;
    }

    export namespace Commit {
        export type AsObject = {
            address: string,
            index: number,
        }
    }

    export class Commits extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Commits;
        getStartindex(): number;
        setStartindex(value: number): Commits;
        getCount(): number;
        setCount(value: number): Commits;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Commits.AsObject;
        static toObject(includeInstance: boolean, msg: Commits): Commits.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Commits, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Commits;
        static deserializeBinaryFromReader(message: Commits, reader: jspb.BinaryReader): Commits;
    }

    export namespace Commits {
        export type AsObject = {
            address: string,
            startindex: number,
            count: number,
        }
    }

    export class Root extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Root;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Root.AsObject;
        static toObject(includeInstance: boolean, msg: Root): Root.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Root, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Root;
        static deserializeBinaryFromReader(message: Root, reader: jspb.BinaryReader): Root;
    }

    export namespace Root {
        export type AsObject = {
            address: string,
        }
    }

    export class Proof extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Proof;
        getLeafindex(): number;
        setLeafindex(value: number): Proof;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Proof.AsObject;
        static toObject(includeInstance: boolean, msg: Proof): Proof.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Proof, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Proof;
        static deserializeBinaryFromReader(message: Proof, reader: jspb.BinaryReader): Proof;
    }

    export namespace Proof {
        export type AsObject = {
            address: string,
            leafindex: number,
        }
    }

    export class Track extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Track;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Track.AsObject;
        static toObject(includeInstance: boolean, msg: Track): Track.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Track, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Track;
        static deserializeBinaryFromReader(message: Track, reader: jspb.BinaryReader): Track;
    }

    export namespace Track {
        export type AsObject = {
            address: string,
        }
    }

    export class Untrack extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Untrack;
        getPrune(): boolean;
        setPrune(value: boolean): Untrack;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Untrack.AsObject;
        static toObject(includeInstance: boolean, msg: Untrack): Untrack.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Untrack, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Untrack;
        static deserializeBinaryFromReader(message: Untrack, reader: jspb.BinaryReader): Untrack;
    }

    export namespace Untrack {
        export type AsObject = {
            address: string,
            prune: boolean,
        }
    }

    export class Verify extends jspb.Message { 
        getAddress(): string;
        setAddress(value: string): Verify;
        getRoot(): string;
        setRoot(value: string): Verify;
        getCommit(): string;
        setCommit(value: string): Verify;
        clearSiblingpathList(): void;
        getSiblingpathList(): Array<Commitment>;
        setSiblingpathList(value: Array<Commitment>): Verify;
        addSiblingpath(value?: Commitment, index?: number): Commitment;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Verify.AsObject;
        static toObject(includeInstance: boolean, msg: Verify): Verify.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Verify, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Verify;
        static deserializeBinaryFromReader(message: Verify, reader: jspb.BinaryReader): Verify;
    }

    export namespace Verify {
        export type AsObject = {
            address: string,
            root: string,
            commit: string,
            siblingpathList: Array<Commitment.AsObject>,
        }
    }

    export class VerifyAndPush extends jspb.Message { 
        getSender(): string;
        setSender(value: string): VerifyAndPush;
        getAddress(): string;
        setAddress(value: string): VerifyAndPush;
        clearProofList(): void;
        getProofList(): Array<number>;
        setProofList(value: Array<number>): VerifyAndPush;
        addProof(value: number, index?: number): number;
        clearPublicinputsList(): void;
        getPublicinputsList(): Array<string>;
        setPublicinputsList(value: Array<string>): VerifyAndPush;
        addPublicinputs(value: string, index?: number): string;
        getValue(): string;
        setValue(value: string): VerifyAndPush;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): VerifyAndPush.AsObject;
        static toObject(includeInstance: boolean, msg: VerifyAndPush): VerifyAndPush.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: VerifyAndPush, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): VerifyAndPush;
        static deserializeBinaryFromReader(message: VerifyAndPush, reader: jspb.BinaryReader): VerifyAndPush;
    }

    export namespace VerifyAndPush {
        export type AsObject = {
            sender: string,
            address: string,
            proofList: Array<number>,
            publicinputsList: Array<string>,
            value: string,
        }
    }

}

export class Response extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
    }


    export class PushCommitment extends jspb.Message { 

        hasCommitment(): boolean;
        clearCommitment(): void;
        getCommitment(): Commitment | undefined;
        setCommitment(value?: Commitment): PushCommitment;
        getTxhash(): string;
        setTxhash(value: string): PushCommitment;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PushCommitment.AsObject;
        static toObject(includeInstance: boolean, msg: PushCommitment): PushCommitment.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PushCommitment, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PushCommitment;
        static deserializeBinaryFromReader(message: PushCommitment, reader: jspb.BinaryReader): PushCommitment;
    }

    export namespace PushCommitment {
        export type AsObject = {
            commitment?: Commitment.AsObject,
            txhash: string,
        }
    }

    export class Commitments extends jspb.Message { 
        clearCommitmentsList(): void;
        getCommitmentsList(): Array<Commitment>;
        setCommitmentsList(value: Array<Commitment>): Commitments;
        addCommitments(value?: Commitment, index?: number): Commitment;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Commitments.AsObject;
        static toObject(includeInstance: boolean, msg: Commitments): Commitments.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Commitments, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Commitments;
        static deserializeBinaryFromReader(message: Commitments, reader: jspb.BinaryReader): Commitments;
    }

    export namespace Commitments {
        export type AsObject = {
            commitmentsList: Array<Commitment.AsObject>,
        }
    }

    export class Root extends jspb.Message { 
        getRoot(): string;
        setRoot(value: string): Root;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Root.AsObject;
        static toObject(includeInstance: boolean, msg: Root): Root.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Root, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Root;
        static deserializeBinaryFromReader(message: Root, reader: jspb.BinaryReader): Root;
    }

    export namespace Root {
        export type AsObject = {
            root: string,
        }
    }

    export class Tracked extends jspb.Message { 
        clearTrackedList(): void;
        getTrackedList(): Array<string>;
        setTrackedList(value: Array<string>): Tracked;
        addTracked(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Tracked.AsObject;
        static toObject(includeInstance: boolean, msg: Tracked): Tracked.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Tracked, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Tracked;
        static deserializeBinaryFromReader(message: Tracked, reader: jspb.BinaryReader): Tracked;
    }

    export namespace Tracked {
        export type AsObject = {
            trackedList: Array<string>,
        }
    }

    export class Bool extends jspb.Message { 
        getValue(): boolean;
        setValue(value: boolean): Bool;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Bool.AsObject;
        static toObject(includeInstance: boolean, msg: Bool): Bool.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Bool, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Bool;
        static deserializeBinaryFromReader(message: Bool, reader: jspb.BinaryReader): Bool;
    }

    export namespace Bool {
        export type AsObject = {
            value: boolean,
        }
    }

}

export class Commitment extends jspb.Message { 
    getNumber(): number;
    setNumber(value: number): Commitment;
    getValue(): string;
    setValue(value: string): Commitment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Commitment.AsObject;
    static toObject(includeInstance: boolean, msg: Commitment): Commitment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Commitment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Commitment;
    static deserializeBinaryFromReader(message: Commitment, reader: jspb.BinaryReader): Commitment;
}

export namespace Commitment {
    export type AsObject = {
        number: number,
        value: string,
    }
}
