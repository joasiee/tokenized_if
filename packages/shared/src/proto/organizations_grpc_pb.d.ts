// package: organizations
// file: organizations.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as organizations_pb from "./organizations_pb";

interface IOrganizationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getOrgRegistry: IOrganizationsService_IGetOrgRegistry;
    deployOrgRegistry: IOrganizationsService_IDeployOrgRegistry;
}

interface IOrganizationsService_IGetOrgRegistry extends grpc.MethodDefinition<organizations_pb.OrgRegistry, organizations_pb.OrgRegistry> {
    path: "/organizations.Organizations/GetOrgRegistry";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<organizations_pb.OrgRegistry>;
    requestDeserialize: grpc.deserialize<organizations_pb.OrgRegistry>;
    responseSerialize: grpc.serialize<organizations_pb.OrgRegistry>;
    responseDeserialize: grpc.deserialize<organizations_pb.OrgRegistry>;
}
interface IOrganizationsService_IDeployOrgRegistry extends grpc.MethodDefinition<organizations_pb.OrgRegistry, organizations_pb.OrgRegistry> {
    path: "/organizations.Organizations/DeployOrgRegistry";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<organizations_pb.OrgRegistry>;
    requestDeserialize: grpc.deserialize<organizations_pb.OrgRegistry>;
    responseSerialize: grpc.serialize<organizations_pb.OrgRegistry>;
    responseDeserialize: grpc.deserialize<organizations_pb.OrgRegistry>;
}

export const OrganizationsService: IOrganizationsService;

export interface IOrganizationsServer extends grpc.UntypedServiceImplementation {
    getOrgRegistry: grpc.handleUnaryCall<organizations_pb.OrgRegistry, organizations_pb.OrgRegistry>;
    deployOrgRegistry: grpc.handleUnaryCall<organizations_pb.OrgRegistry, organizations_pb.OrgRegistry>;
}

export interface IOrganizationsClient {
    getOrgRegistry(request: organizations_pb.OrgRegistry, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    getOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    getOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    deployOrgRegistry(request: organizations_pb.OrgRegistry, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    deployOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    deployOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
}

export class OrganizationsClient extends grpc.Client implements IOrganizationsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getOrgRegistry(request: organizations_pb.OrgRegistry, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public getOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public getOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public deployOrgRegistry(request: organizations_pb.OrgRegistry, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public deployOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public deployOrgRegistry(request: organizations_pb.OrgRegistry, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
}
