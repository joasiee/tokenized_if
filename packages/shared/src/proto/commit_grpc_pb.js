// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var commit_pb = require('./commit_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_commit_Commitment(arg) {
  if (!(arg instanceof commit_pb.Commitment)) {
    throw new Error('Expected argument of type commit.Commitment');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Commitment(buffer_arg) {
  return commit_pb.Commitment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Commit(arg) {
  if (!(arg instanceof commit_pb.Request.Commit)) {
    throw new Error('Expected argument of type commit.Request.Commit');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Commit(buffer_arg) {
  return commit_pb.Request.Commit.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Commits(arg) {
  if (!(arg instanceof commit_pb.Request.Commits)) {
    throw new Error('Expected argument of type commit.Request.Commits');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Commits(buffer_arg) {
  return commit_pb.Request.Commits.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Proof(arg) {
  if (!(arg instanceof commit_pb.Request.Proof)) {
    throw new Error('Expected argument of type commit.Request.Proof');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Proof(buffer_arg) {
  return commit_pb.Request.Proof.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Root(arg) {
  if (!(arg instanceof commit_pb.Request.Root)) {
    throw new Error('Expected argument of type commit.Request.Root');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Root(buffer_arg) {
  return commit_pb.Request.Root.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Track(arg) {
  if (!(arg instanceof commit_pb.Request.Track)) {
    throw new Error('Expected argument of type commit.Request.Track');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Track(buffer_arg) {
  return commit_pb.Request.Track.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Untrack(arg) {
  if (!(arg instanceof commit_pb.Request.Untrack)) {
    throw new Error('Expected argument of type commit.Request.Untrack');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Untrack(buffer_arg) {
  return commit_pb.Request.Untrack.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_Verify(arg) {
  if (!(arg instanceof commit_pb.Request.Verify)) {
    throw new Error('Expected argument of type commit.Request.Verify');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_Verify(buffer_arg) {
  return commit_pb.Request.Verify.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Request_VerifyAndPush(arg) {
  if (!(arg instanceof commit_pb.Request.VerifyAndPush)) {
    throw new Error('Expected argument of type commit.Request.VerifyAndPush');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Request_VerifyAndPush(buffer_arg) {
  return commit_pb.Request.VerifyAndPush.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Response_Bool(arg) {
  if (!(arg instanceof commit_pb.Response.Bool)) {
    throw new Error('Expected argument of type commit.Response.Bool');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Response_Bool(buffer_arg) {
  return commit_pb.Response.Bool.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Response_Commitments(arg) {
  if (!(arg instanceof commit_pb.Response.Commitments)) {
    throw new Error('Expected argument of type commit.Response.Commitments');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Response_Commitments(buffer_arg) {
  return commit_pb.Response.Commitments.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Response_PushCommitment(arg) {
  if (!(arg instanceof commit_pb.Response.PushCommitment)) {
    throw new Error('Expected argument of type commit.Response.PushCommitment');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Response_PushCommitment(buffer_arg) {
  return commit_pb.Response.PushCommitment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Response_Root(arg) {
  if (!(arg instanceof commit_pb.Response.Root)) {
    throw new Error('Expected argument of type commit.Response.Root');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Response_Root(buffer_arg) {
  return commit_pb.Response.Root.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_commit_Response_Tracked(arg) {
  if (!(arg instanceof commit_pb.Response.Tracked)) {
    throw new Error('Expected argument of type commit.Response.Tracked');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_commit_Response_Tracked(buffer_arg) {
  return commit_pb.Response.Tracked.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommitService = exports.CommitService = {
  getCommit: {
    path: '/commit.Commit/GetCommit',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Commit,
    responseType: commit_pb.Commitment,
    requestSerialize: serialize_commit_Request_Commit,
    requestDeserialize: deserialize_commit_Request_Commit,
    responseSerialize: serialize_commit_Commitment,
    responseDeserialize: deserialize_commit_Commitment,
  },
  getCommits: {
    path: '/commit.Commit/GetCommits',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Commits,
    responseType: commit_pb.Response.Commitments,
    requestSerialize: serialize_commit_Request_Commits,
    requestDeserialize: deserialize_commit_Request_Commits,
    responseSerialize: serialize_commit_Response_Commitments,
    responseDeserialize: deserialize_commit_Response_Commitments,
  },
  getRoot: {
    path: '/commit.Commit/GetRoot',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Root,
    responseType: commit_pb.Response.Root,
    requestSerialize: serialize_commit_Request_Root,
    requestDeserialize: deserialize_commit_Request_Root,
    responseSerialize: serialize_commit_Response_Root,
    responseDeserialize: deserialize_commit_Response_Root,
  },
  getProof: {
    path: '/commit.Commit/GetProof',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Proof,
    responseType: commit_pb.Response.Commitments,
    requestSerialize: serialize_commit_Request_Proof,
    requestDeserialize: deserialize_commit_Request_Proof,
    responseSerialize: serialize_commit_Response_Commitments,
    responseDeserialize: deserialize_commit_Response_Commitments,
  },
  getTracked: {
    path: '/commit.Commit/GetTracked',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: commit_pb.Response.Tracked,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_commit_Response_Tracked,
    responseDeserialize: deserialize_commit_Response_Tracked,
  },
  track: {
    path: '/commit.Commit/Track',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Track,
    responseType: commit_pb.Response.Bool,
    requestSerialize: serialize_commit_Request_Track,
    requestDeserialize: deserialize_commit_Request_Track,
    responseSerialize: serialize_commit_Response_Bool,
    responseDeserialize: deserialize_commit_Response_Bool,
  },
  untrack: {
    path: '/commit.Commit/Untrack',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Untrack,
    responseType: commit_pb.Response.Bool,
    requestSerialize: serialize_commit_Request_Untrack,
    requestDeserialize: deserialize_commit_Request_Untrack,
    responseSerialize: serialize_commit_Response_Bool,
    responseDeserialize: deserialize_commit_Response_Bool,
  },
  verify: {
    path: '/commit.Commit/Verify',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.Verify,
    responseType: commit_pb.Response.Bool,
    requestSerialize: serialize_commit_Request_Verify,
    requestDeserialize: deserialize_commit_Request_Verify,
    responseSerialize: serialize_commit_Response_Bool,
    responseDeserialize: deserialize_commit_Response_Bool,
  },
  verifyAndPush: {
    path: '/commit.Commit/VerifyAndPush',
    requestStream: false,
    responseStream: false,
    requestType: commit_pb.Request.VerifyAndPush,
    responseType: commit_pb.Response.PushCommitment,
    requestSerialize: serialize_commit_Request_VerifyAndPush,
    requestDeserialize: deserialize_commit_Request_VerifyAndPush,
    responseSerialize: serialize_commit_Response_PushCommitment,
    responseDeserialize: deserialize_commit_Response_PushCommitment,
  },
};

exports.CommitClient = grpc.makeGenericClientConstructor(CommitService);
