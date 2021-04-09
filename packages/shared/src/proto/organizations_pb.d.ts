// package: organizations
// file: organizations.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class OrgRegistry extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): OrgRegistry;
    getName(): string;
    setName(value: string): OrgRegistry;
    clearOrgsList(): void;
    getOrgsList(): Array<Organization>;
    setOrgsList(value: Array<Organization>): OrgRegistry;
    addOrgs(value?: Organization, index?: number): Organization;
    clearGroupsList(): void;
    getGroupsList(): Array<Workgroup>;
    setGroupsList(value: Array<Workgroup>): OrgRegistry;
    addGroups(value?: Workgroup, index?: number): Workgroup;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OrgRegistry.AsObject;
    static toObject(includeInstance: boolean, msg: OrgRegistry): OrgRegistry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OrgRegistry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OrgRegistry;
    static deserializeBinaryFromReader(message: OrgRegistry, reader: jspb.BinaryReader): OrgRegistry;
}

export namespace OrgRegistry {
    export type AsObject = {
        address: string,
        name: string,
        orgsList: Array<Organization.AsObject>,
        groupsList: Array<Workgroup.AsObject>,
    }
}

export class Organization extends jspb.Message { 
    getName(): string;
    setName(value: string): Organization;
    getAddress(): string;
    setAddress(value: string): Organization;
    getMsgurl(): string;
    setMsgurl(value: string): Organization;
    getMsgkey(): string;
    setMsgkey(value: string): Organization;
    getZkpkey(): string;
    setZkpkey(value: string): Organization;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Organization.AsObject;
    static toObject(includeInstance: boolean, msg: Organization): Organization.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Organization, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Organization;
    static deserializeBinaryFromReader(message: Organization, reader: jspb.BinaryReader): Organization;
}

export namespace Organization {
    export type AsObject = {
        name: string,
        address: string,
        msgurl: string,
        msgkey: string,
        zkpkey: string,
    }
}

export class Workgroup extends jspb.Message { 
    getName(): string;
    setName(value: string): Workgroup;
    getTokenaddress(): string;
    setTokenaddress(value: string): Workgroup;
    getShieldaddress(): string;
    setShieldaddress(value: string): Workgroup;
    getVerifieraddress(): string;
    setVerifieraddress(value: string): Workgroup;
    getWorkstep(): number;
    setWorkstep(value: number): Workgroup;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Workgroup.AsObject;
    static toObject(includeInstance: boolean, msg: Workgroup): Workgroup.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Workgroup, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Workgroup;
    static deserializeBinaryFromReader(message: Workgroup, reader: jspb.BinaryReader): Workgroup;
}

export namespace Workgroup {
    export type AsObject = {
        name: string,
        tokenaddress: string,
        shieldaddress: string,
        verifieraddress: string,
        workstep: number,
    }
}

export class AddOrgRequest extends jspb.Message { 

    hasRegistry(): boolean;
    clearRegistry(): void;
    getRegistry(): OrgRegistry | undefined;
    setRegistry(value?: OrgRegistry): AddOrgRequest;

    hasOrganization(): boolean;
    clearOrganization(): void;
    getOrganization(): Organization | undefined;
    setOrganization(value?: Organization): AddOrgRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddOrgRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddOrgRequest): AddOrgRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddOrgRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddOrgRequest;
    static deserializeBinaryFromReader(message: AddOrgRequest, reader: jspb.BinaryReader): AddOrgRequest;
}

export namespace AddOrgRequest {
    export type AsObject = {
        registry?: OrgRegistry.AsObject,
        organization?: Organization.AsObject,
    }
}

export class AddGroupRequest extends jspb.Message { 

    hasRegistry(): boolean;
    clearRegistry(): void;
    getRegistry(): OrgRegistry | undefined;
    setRegistry(value?: OrgRegistry): AddGroupRequest;

    hasWorkgroup(): boolean;
    clearWorkgroup(): void;
    getWorkgroup(): Workgroup | undefined;
    setWorkgroup(value?: Workgroup): AddGroupRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddGroupRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddGroupRequest): AddGroupRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddGroupRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddGroupRequest;
    static deserializeBinaryFromReader(message: AddGroupRequest, reader: jspb.BinaryReader): AddGroupRequest;
}

export namespace AddGroupRequest {
    export type AsObject = {
        registry?: OrgRegistry.AsObject,
        workgroup?: Workgroup.AsObject,
    }
}
