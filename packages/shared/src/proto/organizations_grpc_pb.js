// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var organizations_pb = require('./organizations_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

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
    requestType: organizations_pb.OrgRegistry,
    responseType: organizations_pb.OrgRegistry,
    requestSerialize: serialize_organizations_OrgRegistry,
    requestDeserialize: deserialize_organizations_OrgRegistry,
    responseSerialize: serialize_organizations_OrgRegistry,
    responseDeserialize: deserialize_organizations_OrgRegistry,
  },
};

exports.OrganizationsClient = grpc.makeGenericClientConstructor(OrganizationsService);
