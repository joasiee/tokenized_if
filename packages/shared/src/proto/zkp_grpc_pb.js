// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var zkp_pb = require('./zkp_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zkp_Circuit(arg) {
  if (!(arg instanceof zkp_pb.Circuit)) {
    throw new Error('Expected argument of type zkp.Circuit');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zkp_Circuit(buffer_arg) {
  return zkp_pb.Circuit.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zkp_GenerateProofRequest(arg) {
  if (!(arg instanceof zkp_pb.GenerateProofRequest)) {
    throw new Error('Expected argument of type zkp.GenerateProofRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zkp_GenerateProofRequest(buffer_arg) {
  return zkp_pb.GenerateProofRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zkp_Proof(arg) {
  if (!(arg instanceof zkp_pb.Proof)) {
    throw new Error('Expected argument of type zkp.Proof');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zkp_Proof(buffer_arg) {
  return zkp_pb.Proof.deserializeBinary(new Uint8Array(buffer_arg));
}


var ZKPService = exports.ZKPService = {
  compileCircuit: {
    path: '/zkp.ZKP/CompileCircuit',
    requestStream: false,
    responseStream: false,
    requestType: zkp_pb.Circuit,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_zkp_Circuit,
    requestDeserialize: deserialize_zkp_Circuit,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  deployCircuit: {
    path: '/zkp.ZKP/DeployCircuit',
    requestStream: false,
    responseStream: false,
    requestType: zkp_pb.Circuit,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_zkp_Circuit,
    requestDeserialize: deserialize_zkp_Circuit,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getCircuit: {
    path: '/zkp.ZKP/GetCircuit',
    requestStream: false,
    responseStream: false,
    requestType: zkp_pb.Circuit,
    responseType: zkp_pb.Circuit,
    requestSerialize: serialize_zkp_Circuit,
    requestDeserialize: deserialize_zkp_Circuit,
    responseSerialize: serialize_zkp_Circuit,
    responseDeserialize: deserialize_zkp_Circuit,
  },
  addCircuit: {
    path: '/zkp.ZKP/AddCircuit',
    requestStream: false,
    responseStream: false,
    requestType: zkp_pb.Circuit,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_zkp_Circuit,
    requestDeserialize: deserialize_zkp_Circuit,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  generateProof: {
    path: '/zkp.ZKP/GenerateProof',
    requestStream: false,
    responseStream: false,
    requestType: zkp_pb.GenerateProofRequest,
    responseType: zkp_pb.Proof,
    requestSerialize: serialize_zkp_GenerateProofRequest,
    requestDeserialize: deserialize_zkp_GenerateProofRequest,
    responseSerialize: serialize_zkp_Proof,
    responseDeserialize: deserialize_zkp_Proof,
  },
};

exports.ZKPClient = grpc.makeGenericClientConstructor(ZKPService);
