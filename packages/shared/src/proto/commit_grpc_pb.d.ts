// package: commit
// file: commit.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as commit_pb from "./commit_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface ICommitService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getCommit: ICommitService_IGetCommit;
    getCommits: ICommitService_IGetCommits;
    getRoot: ICommitService_IGetRoot;
    getProof: ICommitService_IGetProof;
    getTracked: ICommitService_IGetTracked;
    track: ICommitService_ITrack;
    untrack: ICommitService_IUntrack;
    verify: ICommitService_IVerify;
    verifyAndPush: ICommitService_IVerifyAndPush;
}

interface ICommitService_IGetCommit extends grpc.MethodDefinition<commit_pb.Request.Commit, commit_pb.Commitment> {
    path: "/commit.Commit/GetCommit";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Commit>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Commit>;
    responseSerialize: grpc.serialize<commit_pb.Commitment>;
    responseDeserialize: grpc.deserialize<commit_pb.Commitment>;
}
interface ICommitService_IGetCommits extends grpc.MethodDefinition<commit_pb.Request.Commits, commit_pb.Response.Commitments> {
    path: "/commit.Commit/GetCommits";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Commits>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Commits>;
    responseSerialize: grpc.serialize<commit_pb.Response.Commitments>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Commitments>;
}
interface ICommitService_IGetRoot extends grpc.MethodDefinition<commit_pb.Request.Root, commit_pb.Response.Root> {
    path: "/commit.Commit/GetRoot";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Root>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Root>;
    responseSerialize: grpc.serialize<commit_pb.Response.Root>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Root>;
}
interface ICommitService_IGetProof extends grpc.MethodDefinition<commit_pb.Request.Proof, commit_pb.Response.Commitments> {
    path: "/commit.Commit/GetProof";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Proof>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Proof>;
    responseSerialize: grpc.serialize<commit_pb.Response.Commitments>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Commitments>;
}
interface ICommitService_IGetTracked extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, commit_pb.Response.Tracked> {
    path: "/commit.Commit/GetTracked";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<commit_pb.Response.Tracked>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Tracked>;
}
interface ICommitService_ITrack extends grpc.MethodDefinition<commit_pb.Request.Track, commit_pb.Response.Bool> {
    path: "/commit.Commit/Track";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Track>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Track>;
    responseSerialize: grpc.serialize<commit_pb.Response.Bool>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Bool>;
}
interface ICommitService_IUntrack extends grpc.MethodDefinition<commit_pb.Request.Untrack, commit_pb.Response.Bool> {
    path: "/commit.Commit/Untrack";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Untrack>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Untrack>;
    responseSerialize: grpc.serialize<commit_pb.Response.Bool>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Bool>;
}
interface ICommitService_IVerify extends grpc.MethodDefinition<commit_pb.Request.Verify, commit_pb.Response.Bool> {
    path: "/commit.Commit/Verify";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.Verify>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.Verify>;
    responseSerialize: grpc.serialize<commit_pb.Response.Bool>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.Bool>;
}
interface ICommitService_IVerifyAndPush extends grpc.MethodDefinition<commit_pb.Request.VerifyAndPush, commit_pb.Response.PushCommitment> {
    path: "/commit.Commit/VerifyAndPush";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<commit_pb.Request.VerifyAndPush>;
    requestDeserialize: grpc.deserialize<commit_pb.Request.VerifyAndPush>;
    responseSerialize: grpc.serialize<commit_pb.Response.PushCommitment>;
    responseDeserialize: grpc.deserialize<commit_pb.Response.PushCommitment>;
}

export const CommitService: ICommitService;

export interface ICommitServer extends grpc.UntypedServiceImplementation {
    getCommit: grpc.handleUnaryCall<commit_pb.Request.Commit, commit_pb.Commitment>;
    getCommits: grpc.handleUnaryCall<commit_pb.Request.Commits, commit_pb.Response.Commitments>;
    getRoot: grpc.handleUnaryCall<commit_pb.Request.Root, commit_pb.Response.Root>;
    getProof: grpc.handleUnaryCall<commit_pb.Request.Proof, commit_pb.Response.Commitments>;
    getTracked: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, commit_pb.Response.Tracked>;
    track: grpc.handleUnaryCall<commit_pb.Request.Track, commit_pb.Response.Bool>;
    untrack: grpc.handleUnaryCall<commit_pb.Request.Untrack, commit_pb.Response.Bool>;
    verify: grpc.handleUnaryCall<commit_pb.Request.Verify, commit_pb.Response.Bool>;
    verifyAndPush: grpc.handleUnaryCall<commit_pb.Request.VerifyAndPush, commit_pb.Response.PushCommitment>;
}

export interface ICommitClient {
    getCommit(request: commit_pb.Request.Commit, callback: (error: grpc.ServiceError | null, response: commit_pb.Commitment) => void): grpc.ClientUnaryCall;
    getCommit(request: commit_pb.Request.Commit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Commitment) => void): grpc.ClientUnaryCall;
    getCommit(request: commit_pb.Request.Commit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Commitment) => void): grpc.ClientUnaryCall;
    getCommits(request: commit_pb.Request.Commits, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    getCommits(request: commit_pb.Request.Commits, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    getCommits(request: commit_pb.Request.Commits, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    getRoot(request: commit_pb.Request.Root, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Root) => void): grpc.ClientUnaryCall;
    getRoot(request: commit_pb.Request.Root, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Root) => void): grpc.ClientUnaryCall;
    getRoot(request: commit_pb.Request.Root, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Root) => void): grpc.ClientUnaryCall;
    getProof(request: commit_pb.Request.Proof, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    getProof(request: commit_pb.Request.Proof, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    getProof(request: commit_pb.Request.Proof, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    getTracked(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Tracked) => void): grpc.ClientUnaryCall;
    getTracked(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Tracked) => void): grpc.ClientUnaryCall;
    getTracked(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Tracked) => void): grpc.ClientUnaryCall;
    track(request: commit_pb.Request.Track, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    track(request: commit_pb.Request.Track, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    track(request: commit_pb.Request.Track, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    untrack(request: commit_pb.Request.Untrack, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    untrack(request: commit_pb.Request.Untrack, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    untrack(request: commit_pb.Request.Untrack, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    verify(request: commit_pb.Request.Verify, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    verify(request: commit_pb.Request.Verify, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    verify(request: commit_pb.Request.Verify, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    verifyAndPush(request: commit_pb.Request.VerifyAndPush, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.PushCommitment) => void): grpc.ClientUnaryCall;
    verifyAndPush(request: commit_pb.Request.VerifyAndPush, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.PushCommitment) => void): grpc.ClientUnaryCall;
    verifyAndPush(request: commit_pb.Request.VerifyAndPush, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.PushCommitment) => void): grpc.ClientUnaryCall;
}

export class CommitClient extends grpc.Client implements ICommitClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getCommit(request: commit_pb.Request.Commit, callback: (error: grpc.ServiceError | null, response: commit_pb.Commitment) => void): grpc.ClientUnaryCall;
    public getCommit(request: commit_pb.Request.Commit, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Commitment) => void): grpc.ClientUnaryCall;
    public getCommit(request: commit_pb.Request.Commit, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Commitment) => void): grpc.ClientUnaryCall;
    public getCommits(request: commit_pb.Request.Commits, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    public getCommits(request: commit_pb.Request.Commits, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    public getCommits(request: commit_pb.Request.Commits, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    public getRoot(request: commit_pb.Request.Root, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Root) => void): grpc.ClientUnaryCall;
    public getRoot(request: commit_pb.Request.Root, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Root) => void): grpc.ClientUnaryCall;
    public getRoot(request: commit_pb.Request.Root, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Root) => void): grpc.ClientUnaryCall;
    public getProof(request: commit_pb.Request.Proof, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    public getProof(request: commit_pb.Request.Proof, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    public getProof(request: commit_pb.Request.Proof, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Commitments) => void): grpc.ClientUnaryCall;
    public getTracked(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Tracked) => void): grpc.ClientUnaryCall;
    public getTracked(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Tracked) => void): grpc.ClientUnaryCall;
    public getTracked(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Tracked) => void): grpc.ClientUnaryCall;
    public track(request: commit_pb.Request.Track, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public track(request: commit_pb.Request.Track, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public track(request: commit_pb.Request.Track, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public untrack(request: commit_pb.Request.Untrack, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public untrack(request: commit_pb.Request.Untrack, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public untrack(request: commit_pb.Request.Untrack, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public verify(request: commit_pb.Request.Verify, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public verify(request: commit_pb.Request.Verify, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public verify(request: commit_pb.Request.Verify, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.Bool) => void): grpc.ClientUnaryCall;
    public verifyAndPush(request: commit_pb.Request.VerifyAndPush, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.PushCommitment) => void): grpc.ClientUnaryCall;
    public verifyAndPush(request: commit_pb.Request.VerifyAndPush, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.PushCommitment) => void): grpc.ClientUnaryCall;
    public verifyAndPush(request: commit_pb.Request.VerifyAndPush, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: commit_pb.Response.PushCommitment) => void): grpc.ClientUnaryCall;
}
