// package: zkp
// file: zkp.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class GetCircuitRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): GetCircuitRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCircuitRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCircuitRequest): GetCircuitRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCircuitRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCircuitRequest;
    static deserializeBinaryFromReader(message: GetCircuitRequest, reader: jspb.BinaryReader): GetCircuitRequest;
}

export namespace GetCircuitRequest {
    export type AsObject = {
        name: string,
    }
}

export class Circuit extends jspb.Message { 
    getName(): string;
    setName(value: string): Circuit;
    getProgram(): Uint8Array | string;
    getProgram_asU8(): Uint8Array;
    getProgram_asB64(): string;
    setProgram(value: Uint8Array | string): Circuit;
    getContract(): string;
    setContract(value: string): Circuit;
    getPk(): Uint8Array | string;
    getPk_asU8(): Uint8Array;
    getPk_asB64(): string;
    setPk(value: Uint8Array | string): Circuit;

    hasVk(): boolean;
    clearVk(): void;
    getVk(): Circuit.VerificationKey | undefined;
    setVk(value?: Circuit.VerificationKey): Circuit;

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
        program: Uint8Array | string,
        contract: string,
        pk: Uint8Array | string,
        vk?: Circuit.VerificationKey.AsObject,
    }


    export class VerificationKey extends jspb.Message { 

        hasAlpha(): boolean;
        clearAlpha(): void;
        getAlpha(): Circuit.VerificationKey.G1Affine | undefined;
        setAlpha(value?: Circuit.VerificationKey.G1Affine): VerificationKey;

        hasBeta(): boolean;
        clearBeta(): void;
        getBeta(): Circuit.VerificationKey.G2Affine | undefined;
        setBeta(value?: Circuit.VerificationKey.G2Affine): VerificationKey;

        hasGamma(): boolean;
        clearGamma(): void;
        getGamma(): Circuit.VerificationKey.G2Affine | undefined;
        setGamma(value?: Circuit.VerificationKey.G2Affine): VerificationKey;

        hasDelta(): boolean;
        clearDelta(): void;
        getDelta(): Circuit.VerificationKey.G2Affine | undefined;
        setDelta(value?: Circuit.VerificationKey.G2Affine): VerificationKey;
        clearGammaAbcList(): void;
        getGammaAbcList(): Array<Circuit.VerificationKey.G1Affine>;
        setGammaAbcList(value: Array<Circuit.VerificationKey.G1Affine>): VerificationKey;
        addGammaAbc(value?: Circuit.VerificationKey.G1Affine, index?: number): Circuit.VerificationKey.G1Affine;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): VerificationKey.AsObject;
        static toObject(includeInstance: boolean, msg: VerificationKey): VerificationKey.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: VerificationKey, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): VerificationKey;
        static deserializeBinaryFromReader(message: VerificationKey, reader: jspb.BinaryReader): VerificationKey;
    }

    export namespace VerificationKey {
        export type AsObject = {
            alpha?: Circuit.VerificationKey.G1Affine.AsObject,
            beta?: Circuit.VerificationKey.G2Affine.AsObject,
            gamma?: Circuit.VerificationKey.G2Affine.AsObject,
            delta?: Circuit.VerificationKey.G2Affine.AsObject,
            gammaAbcList: Array<Circuit.VerificationKey.G1Affine.AsObject>,
        }


        export class G1Affine extends jspb.Message { 
            clearFqList(): void;
            getFqList(): Array<string>;
            setFqList(value: Array<string>): G1Affine;
            addFq(value: string, index?: number): string;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): G1Affine.AsObject;
            static toObject(includeInstance: boolean, msg: G1Affine): G1Affine.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: G1Affine, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): G1Affine;
            static deserializeBinaryFromReader(message: G1Affine, reader: jspb.BinaryReader): G1Affine;
        }

        export namespace G1Affine {
            export type AsObject = {
                fqList: Array<string>,
            }
        }

        export class G2Affine extends jspb.Message { 
            clearFq2List(): void;
            getFq2List(): Array<Circuit.VerificationKey.G1Affine>;
            setFq2List(value: Array<Circuit.VerificationKey.G1Affine>): G2Affine;
            addFq2(value?: Circuit.VerificationKey.G1Affine, index?: number): Circuit.VerificationKey.G1Affine;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): G2Affine.AsObject;
            static toObject(includeInstance: boolean, msg: G2Affine): G2Affine.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: G2Affine, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): G2Affine;
            static deserializeBinaryFromReader(message: G2Affine, reader: jspb.BinaryReader): G2Affine;
        }

        export namespace G2Affine {
            export type AsObject = {
                fq2List: Array<Circuit.VerificationKey.G1Affine.AsObject>,
            }
        }

    }

}
