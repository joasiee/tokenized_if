// package: zkp
// file: zkp.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as zkp_pb from "./zkp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IZKPService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    compileCircuit: IZKPService_ICompileCircuit;
    deployCircuit: IZKPService_IDeployCircuit;
    getCircuit: IZKPService_IGetCircuit;
    addCircuit: IZKPService_IAddCircuit;
}

interface IZKPService_ICompileCircuit extends grpc.MethodDefinition<zkp_pb.Circuit, google_protobuf_empty_pb.Empty> {
    path: "/zkp.ZKP/CompileCircuit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<zkp_pb.Circuit>;
    requestDeserialize: grpc.deserialize<zkp_pb.Circuit>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IZKPService_IDeployCircuit extends grpc.MethodDefinition<zkp_pb.Circuit, google_protobuf_empty_pb.Empty> {
    path: "/zkp.ZKP/DeployCircuit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<zkp_pb.Circuit>;
    requestDeserialize: grpc.deserialize<zkp_pb.Circuit>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IZKPService_IGetCircuit extends grpc.MethodDefinition<zkp_pb.Circuit, zkp_pb.Circuit> {
    path: "/zkp.ZKP/GetCircuit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<zkp_pb.Circuit>;
    requestDeserialize: grpc.deserialize<zkp_pb.Circuit>;
    responseSerialize: grpc.serialize<zkp_pb.Circuit>;
    responseDeserialize: grpc.deserialize<zkp_pb.Circuit>;
}
interface IZKPService_IAddCircuit extends grpc.MethodDefinition<zkp_pb.Circuit, google_protobuf_empty_pb.Empty> {
    path: "/zkp.ZKP/AddCircuit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<zkp_pb.Circuit>;
    requestDeserialize: grpc.deserialize<zkp_pb.Circuit>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const ZKPService: IZKPService;

export interface IZKPServer extends grpc.UntypedServiceImplementation {
    compileCircuit: grpc.handleUnaryCall<zkp_pb.Circuit, google_protobuf_empty_pb.Empty>;
    deployCircuit: grpc.handleUnaryCall<zkp_pb.Circuit, google_protobuf_empty_pb.Empty>;
    getCircuit: grpc.handleUnaryCall<zkp_pb.Circuit, zkp_pb.Circuit>;
    addCircuit: grpc.handleUnaryCall<zkp_pb.Circuit, google_protobuf_empty_pb.Empty>;
}

export interface IZKPClient {
    compileCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    compileCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    compileCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deployCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deployCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deployCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    getCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: zkp_pb.Circuit) => void): grpc.ClientUnaryCall;
    getCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zkp_pb.Circuit) => void): grpc.ClientUnaryCall;
    getCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zkp_pb.Circuit) => void): grpc.ClientUnaryCall;
    addCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    addCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    addCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class ZKPClient extends grpc.Client implements IZKPClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public compileCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public compileCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public compileCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deployCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deployCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deployCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public getCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: zkp_pb.Circuit) => void): grpc.ClientUnaryCall;
    public getCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zkp_pb.Circuit) => void): grpc.ClientUnaryCall;
    public getCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zkp_pb.Circuit) => void): grpc.ClientUnaryCall;
    public addCircuit(request: zkp_pb.Circuit, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public addCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public addCircuit(request: zkp_pb.Circuit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
