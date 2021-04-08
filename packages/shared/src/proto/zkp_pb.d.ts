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

export class GenerateProofRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): GenerateProofRequest;
    clearArgsList(): void;
    getArgsList(): Array<string>;
    setArgsList(value: Array<string>): GenerateProofRequest;
    addArgs(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GenerateProofRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GenerateProofRequest): GenerateProofRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GenerateProofRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GenerateProofRequest;
    static deserializeBinaryFromReader(message: GenerateProofRequest, reader: jspb.BinaryReader): GenerateProofRequest;
}

export namespace GenerateProofRequest {
    export type AsObject = {
        name: string,
        argsList: Array<string>,
    }
}

export class Proof extends jspb.Message { 

    hasProof(): boolean;
    clearProof(): void;
    getProof(): Proof.ProofPoints | undefined;
    setProof(value?: Proof.ProofPoints): Proof;
    clearInputsList(): void;
    getInputsList(): Array<string>;
    setInputsList(value: Array<string>): Proof;
    addInputs(value: string, index?: number): string;

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
        proof?: Proof.ProofPoints.AsObject,
        inputsList: Array<string>,
    }


    export class ProofPoints extends jspb.Message { 
        clearAList(): void;
        getAList(): Array<string>;
        setAList(value: Array<string>): ProofPoints;
        addA(value: string, index?: number): string;
        clearB1List(): void;
        getB1List(): Array<string>;
        setB1List(value: Array<string>): ProofPoints;
        addB1(value: string, index?: number): string;
        clearB2List(): void;
        getB2List(): Array<string>;
        setB2List(value: Array<string>): ProofPoints;
        addB2(value: string, index?: number): string;
        clearCList(): void;
        getCList(): Array<string>;
        setCList(value: Array<string>): ProofPoints;
        addC(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ProofPoints.AsObject;
        static toObject(includeInstance: boolean, msg: ProofPoints): ProofPoints.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ProofPoints, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ProofPoints;
        static deserializeBinaryFromReader(message: ProofPoints, reader: jspb.BinaryReader): ProofPoints;
    }

    export namespace ProofPoints {
        export type AsObject = {
            aList: Array<string>,
            b1List: Array<string>,
            b2List: Array<string>,
            cList: Array<string>,
        }
    }

}
