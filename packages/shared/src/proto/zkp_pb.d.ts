// package: zkp
// file: zkp.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Circuit extends jspb.Message { 
    getName(): string;
    setName(value: string): Circuit;

    hasArtifacts(): boolean;
    clearArtifacts(): void;
    getArtifacts(): Circuit.Artifacts | undefined;
    setArtifacts(value?: Circuit.Artifacts): Circuit;
    getContract(): string;
    setContract(value: string): Circuit;
    getPk(): Uint8Array | string;
    getPk_asU8(): Uint8Array;
    getPk_asB64(): string;
    setPk(value: Uint8Array | string): Circuit;
    getDeployed(): boolean;
    setDeployed(value: boolean): Circuit;
    getAddress(): string;
    setAddress(value: string): Circuit;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Circuit.AsObject;
    static toObject(includeInstance: boolean, msg: Circuit): Circuit.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Circuit, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Circuit;
    static deserializeBinaryFromReader(message: Circuit, reader: jspb.BinaryReader): Circuit;
}

export namespace Circuit {
    export type AsObject = {
        name: string,
        artifacts?: Circuit.Artifacts.AsObject,
        contract: string,
        pk: Uint8Array | string,
        deployed: boolean,
        address: string,
    }


    export class Artifacts extends jspb.Message { 
        getProgram(): Uint8Array | string;
        getProgram_asU8(): Uint8Array;
        getProgram_asB64(): string;
        setProgram(value: Uint8Array | string): Artifacts;
        getAbi(): string;
        setAbi(value: string): Artifacts;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Artifacts.AsObject;
        static toObject(includeInstance: boolean, msg: Artifacts): Artifacts.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Artifacts, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Artifacts;
        static deserializeBinaryFromReader(message: Artifacts, reader: jspb.BinaryReader): Artifacts;
    }

    export namespace Artifacts {
        export type AsObject = {
            program: Uint8Array | string,
            abi: string,
        }
    }

}
