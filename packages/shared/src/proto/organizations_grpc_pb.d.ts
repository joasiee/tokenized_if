// package: organizations
// file: organizations.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as organizations_pb from "./organizations_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IOrganizationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    deployOrgRegistry: IOrganizationsService_IdeployOrgRegistry;
}

interface IOrganizationsService_IdeployOrgRegistry extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, organizations_pb.OrgRegistry> {
    path: "/organizations.Organizations/deployOrgRegistry";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<organizations_pb.OrgRegistry>;
    responseDeserialize: grpc.deserialize<organizations_pb.OrgRegistry>;
}

export const OrganizationsService: IOrganizationsService;

export interface IOrganizationsServer extends grpc.UntypedServiceImplementation {
    deployOrgRegistry: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, organizations_pb.OrgRegistry>;
}

export interface IOrganizationsClient {
    deployOrgRegistry(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    deployOrgRegistry(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    deployOrgRegistry(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
}

export class OrganizationsClient extends grpc.Client implements IOrganizationsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public deployOrgRegistry(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public deployOrgRegistry(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
    public deployOrgRegistry(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: organizations_pb.OrgRegistry) => void): grpc.ClientUnaryCall;
}
