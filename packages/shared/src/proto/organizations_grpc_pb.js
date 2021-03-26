// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var organizations_pb = require('./organizations_pb.js');
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

function serialize_organizations_OrgRegistry(arg) {
  if (!(arg instanceof organizations_pb.OrgRegistry)) {
    throw new Error('Expected argument of type organizations.OrgRegistry');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_OrgRegistry(buffer_arg) {
  return organizations_pb.OrgRegistry.deserializeBinary(new Uint8Array(buffer_arg));
}


var OrganizationsService = exports.OrganizationsService = {
  deployOrgRegistry: {
    path: '/organizations.Organizations/DeployOrgRegistry',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: organizations_pb.OrgRegistry,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_organizations_OrgRegistry,
    responseDeserialize: deserialize_organizations_OrgRegistry,
  },
};

exports.OrganizationsClient = grpc.makeGenericClientConstructor(OrganizationsService);
