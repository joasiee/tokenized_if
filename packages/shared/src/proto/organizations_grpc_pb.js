// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var organizations_pb = require('./organizations_pb.js');

function serialize_organizations_AddGroupRequest(arg) {
  if (!(arg instanceof organizations_pb.AddGroupRequest)) {
    throw new Error('Expected argument of type organizations.AddGroupRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_AddGroupRequest(buffer_arg) {
  return organizations_pb.AddGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_AddOrgRequest(arg) {
  if (!(arg instanceof organizations_pb.AddOrgRequest)) {
    throw new Error('Expected argument of type organizations.AddOrgRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_AddOrgRequest(buffer_arg) {
  return organizations_pb.AddOrgRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  getOrgRegistry: {
    path: '/organizations.Organizations/GetOrgRegistry',
    requestStream: false,
    responseStream: false,
    requestType: organizations_pb.OrgRegistry,
    responseType: organizations_pb.OrgRegistry,
    requestSerialize: serialize_organizations_OrgRegistry,
    requestDeserialize: deserialize_organizations_OrgRegistry,
    responseSerialize: serialize_organizations_OrgRegistry,
    responseDeserialize: deserialize_organizations_OrgRegistry,
  },
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
  addOrganization: {
    path: '/organizations.Organizations/AddOrganization',
    requestStream: false,
    responseStream: false,
    requestType: organizations_pb.AddOrgRequest,
    responseType: organizations_pb.OrgRegistry,
    requestSerialize: serialize_organizations_AddOrgRequest,
    requestDeserialize: deserialize_organizations_AddOrgRequest,
    responseSerialize: serialize_organizations_OrgRegistry,
    responseDeserialize: deserialize_organizations_OrgRegistry,
  },
  addWorkgroup: {
    path: '/organizations.Organizations/AddWorkgroup',
    requestStream: false,
    responseStream: false,
    requestType: organizations_pb.AddGroupRequest,
    responseType: organizations_pb.OrgRegistry,
    requestSerialize: serialize_organizations_AddGroupRequest,
    requestDeserialize: deserialize_organizations_AddGroupRequest,
    responseSerialize: serialize_organizations_OrgRegistry,
    responseDeserialize: deserialize_organizations_OrgRegistry,
  },
};

exports.OrganizationsClient = grpc.makeGenericClientConstructor(OrganizationsService);
