// source: zkp.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
goog.object.extend(proto, google_protobuf_any_pb);
goog.exportSymbol('proto.zkp.Circuit', null, global);
goog.exportSymbol('proto.zkp.Circuit.Artifacts', null, global);
goog.exportSymbol('proto.zkp.GenerateProofRequest', null, global);
goog.exportSymbol('proto.zkp.Proof', null, global);
goog.exportSymbol('proto.zkp.Proof.ProofPoints', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.zkp.Circuit = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.zkp.Circuit, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.zkp.Circuit.displayName = 'proto.zkp.Circuit';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.zkp.Circuit.Artifacts = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.zkp.Circuit.Artifacts, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.zkp.Circuit.Artifacts.displayName = 'proto.zkp.Circuit.Artifacts';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.zkp.GenerateProofRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.zkp.GenerateProofRequest.repeatedFields_, null);
};
goog.inherits(proto.zkp.GenerateProofRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.zkp.GenerateProofRequest.displayName = 'proto.zkp.GenerateProofRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.zkp.Proof = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.zkp.Proof.repeatedFields_, null);
};
goog.inherits(proto.zkp.Proof, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.zkp.Proof.displayName = 'proto.zkp.Proof';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.zkp.Proof.ProofPoints = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.zkp.Proof.ProofPoints.repeatedFields_, null);
};
goog.inherits(proto.zkp.Proof.ProofPoints, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.zkp.Proof.ProofPoints.displayName = 'proto.zkp.Proof.ProofPoints';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.zkp.Circuit.prototype.toObject = function(opt_includeInstance) {
  return proto.zkp.Circuit.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.zkp.Circuit} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Circuit.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    artifacts: (f = msg.getArtifacts()) && proto.zkp.Circuit.Artifacts.toObject(includeInstance, f),
    contract: jspb.Message.getFieldWithDefault(msg, 3, ""),
    pk: msg.getPk_asB64(),
    deployed: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    address: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.zkp.Circuit}
 */
proto.zkp.Circuit.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.zkp.Circuit;
  return proto.zkp.Circuit.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.zkp.Circuit} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.zkp.Circuit}
 */
proto.zkp.Circuit.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.zkp.Circuit.Artifacts;
      reader.readMessage(value,proto.zkp.Circuit.Artifacts.deserializeBinaryFromReader);
      msg.setArtifacts(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContract(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPk(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeployed(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.zkp.Circuit.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.zkp.Circuit.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.zkp.Circuit} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Circuit.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getArtifacts();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.zkp.Circuit.Artifacts.serializeBinaryToWriter
    );
  }
  f = message.getContract();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPk_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getDeployed();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.zkp.Circuit.Artifacts.prototype.toObject = function(opt_includeInstance) {
  return proto.zkp.Circuit.Artifacts.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.zkp.Circuit.Artifacts} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Circuit.Artifacts.toObject = function(includeInstance, msg) {
  var f, obj = {
    program: msg.getProgram_asB64(),
    abi: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.zkp.Circuit.Artifacts}
 */
proto.zkp.Circuit.Artifacts.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.zkp.Circuit.Artifacts;
  return proto.zkp.Circuit.Artifacts.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.zkp.Circuit.Artifacts} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.zkp.Circuit.Artifacts}
 */
proto.zkp.Circuit.Artifacts.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setProgram(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAbi(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.zkp.Circuit.Artifacts.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.zkp.Circuit.Artifacts.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.zkp.Circuit.Artifacts} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Circuit.Artifacts.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProgram_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getAbi();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional bytes program = 1;
 * @return {!(string|Uint8Array)}
 */
proto.zkp.Circuit.Artifacts.prototype.getProgram = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes program = 1;
 * This is a type-conversion wrapper around `getProgram()`
 * @return {string}
 */
proto.zkp.Circuit.Artifacts.prototype.getProgram_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getProgram()));
};


/**
 * optional bytes program = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getProgram()`
 * @return {!Uint8Array}
 */
proto.zkp.Circuit.Artifacts.prototype.getProgram_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getProgram()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.zkp.Circuit.Artifacts} returns this
 */
proto.zkp.Circuit.Artifacts.prototype.setProgram = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional string abi = 2;
 * @return {string}
 */
proto.zkp.Circuit.Artifacts.prototype.getAbi = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.zkp.Circuit.Artifacts} returns this
 */
proto.zkp.Circuit.Artifacts.prototype.setAbi = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.zkp.Circuit.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.zkp.Circuit} returns this
 */
proto.zkp.Circuit.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Artifacts artifacts = 2;
 * @return {?proto.zkp.Circuit.Artifacts}
 */
proto.zkp.Circuit.prototype.getArtifacts = function() {
  return /** @type{?proto.zkp.Circuit.Artifacts} */ (
    jspb.Message.getWrapperField(this, proto.zkp.Circuit.Artifacts, 2));
};


/**
 * @param {?proto.zkp.Circuit.Artifacts|undefined} value
 * @return {!proto.zkp.Circuit} returns this
*/
proto.zkp.Circuit.prototype.setArtifacts = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.zkp.Circuit} returns this
 */
proto.zkp.Circuit.prototype.clearArtifacts = function() {
  return this.setArtifacts(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.zkp.Circuit.prototype.hasArtifacts = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string contract = 3;
 * @return {string}
 */
proto.zkp.Circuit.prototype.getContract = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.zkp.Circuit} returns this
 */
proto.zkp.Circuit.prototype.setContract = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bytes pk = 4;
 * @return {!(string|Uint8Array)}
 */
proto.zkp.Circuit.prototype.getPk = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes pk = 4;
 * This is a type-conversion wrapper around `getPk()`
 * @return {string}
 */
proto.zkp.Circuit.prototype.getPk_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPk()));
};


/**
 * optional bytes pk = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPk()`
 * @return {!Uint8Array}
 */
proto.zkp.Circuit.prototype.getPk_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPk()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.zkp.Circuit} returns this
 */
proto.zkp.Circuit.prototype.setPk = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional bool deployed = 5;
 * @return {boolean}
 */
proto.zkp.Circuit.prototype.getDeployed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.zkp.Circuit} returns this
 */
proto.zkp.Circuit.prototype.setDeployed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string address = 6;
 * @return {string}
 */
proto.zkp.Circuit.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.zkp.Circuit} returns this
 */
proto.zkp.Circuit.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.zkp.GenerateProofRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.zkp.GenerateProofRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.zkp.GenerateProofRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.zkp.GenerateProofRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.GenerateProofRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    argsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.zkp.GenerateProofRequest}
 */
proto.zkp.GenerateProofRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.zkp.GenerateProofRequest;
  return proto.zkp.GenerateProofRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.zkp.GenerateProofRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.zkp.GenerateProofRequest}
 */
proto.zkp.GenerateProofRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addArgs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.zkp.GenerateProofRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.zkp.GenerateProofRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.zkp.GenerateProofRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.GenerateProofRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getArgsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.zkp.GenerateProofRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.zkp.GenerateProofRequest} returns this
 */
proto.zkp.GenerateProofRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string args = 2;
 * @return {!Array<string>}
 */
proto.zkp.GenerateProofRequest.prototype.getArgsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.zkp.GenerateProofRequest} returns this
 */
proto.zkp.GenerateProofRequest.prototype.setArgsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.zkp.GenerateProofRequest} returns this
 */
proto.zkp.GenerateProofRequest.prototype.addArgs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.zkp.GenerateProofRequest} returns this
 */
proto.zkp.GenerateProofRequest.prototype.clearArgsList = function() {
  return this.setArgsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.zkp.Proof.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.zkp.Proof.prototype.toObject = function(opt_includeInstance) {
  return proto.zkp.Proof.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.zkp.Proof} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Proof.toObject = function(includeInstance, msg) {
  var f, obj = {
    proof: (f = msg.getProof()) && proto.zkp.Proof.ProofPoints.toObject(includeInstance, f),
    inputsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.zkp.Proof}
 */
proto.zkp.Proof.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.zkp.Proof;
  return proto.zkp.Proof.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.zkp.Proof} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.zkp.Proof}
 */
proto.zkp.Proof.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.zkp.Proof.ProofPoints;
      reader.readMessage(value,proto.zkp.Proof.ProofPoints.deserializeBinaryFromReader);
      msg.setProof(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addInputs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.zkp.Proof.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.zkp.Proof.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.zkp.Proof} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Proof.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProof();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.zkp.Proof.ProofPoints.serializeBinaryToWriter
    );
  }
  f = message.getInputsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.zkp.Proof.ProofPoints.repeatedFields_ = [1,2,3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.zkp.Proof.ProofPoints.prototype.toObject = function(opt_includeInstance) {
  return proto.zkp.Proof.ProofPoints.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.zkp.Proof.ProofPoints} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Proof.ProofPoints.toObject = function(includeInstance, msg) {
  var f, obj = {
    aList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    b1List: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f,
    b2List: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    cList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.zkp.Proof.ProofPoints}
 */
proto.zkp.Proof.ProofPoints.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.zkp.Proof.ProofPoints;
  return proto.zkp.Proof.ProofPoints.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.zkp.Proof.ProofPoints} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.zkp.Proof.ProofPoints}
 */
proto.zkp.Proof.ProofPoints.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addA(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addB1(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addB2(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addC(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.zkp.Proof.ProofPoints.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.zkp.Proof.ProofPoints.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.zkp.Proof.ProofPoints} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.zkp.Proof.ProofPoints.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getB1List();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
  f = message.getB2List();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getCList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
};


/**
 * repeated string a = 1;
 * @return {!Array<string>}
 */
proto.zkp.Proof.ProofPoints.prototype.getAList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.setAList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.addA = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.clearAList = function() {
  return this.setAList([]);
};


/**
 * repeated string b1 = 2;
 * @return {!Array<string>}
 */
proto.zkp.Proof.ProofPoints.prototype.getB1List = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.setB1List = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.addB1 = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.clearB1List = function() {
  return this.setB1List([]);
};


/**
 * repeated string b2 = 3;
 * @return {!Array<string>}
 */
proto.zkp.Proof.ProofPoints.prototype.getB2List = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.setB2List = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.addB2 = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.clearB2List = function() {
  return this.setB2List([]);
};


/**
 * repeated string c = 4;
 * @return {!Array<string>}
 */
proto.zkp.Proof.ProofPoints.prototype.getCList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.setCList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.addC = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.zkp.Proof.ProofPoints} returns this
 */
proto.zkp.Proof.ProofPoints.prototype.clearCList = function() {
  return this.setCList([]);
};


/**
 * optional ProofPoints proof = 1;
 * @return {?proto.zkp.Proof.ProofPoints}
 */
proto.zkp.Proof.prototype.getProof = function() {
  return /** @type{?proto.zkp.Proof.ProofPoints} */ (
    jspb.Message.getWrapperField(this, proto.zkp.Proof.ProofPoints, 1));
};


/**
 * @param {?proto.zkp.Proof.ProofPoints|undefined} value
 * @return {!proto.zkp.Proof} returns this
*/
proto.zkp.Proof.prototype.setProof = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.zkp.Proof} returns this
 */
proto.zkp.Proof.prototype.clearProof = function() {
  return this.setProof(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.zkp.Proof.prototype.hasProof = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated string inputs = 2;
 * @return {!Array<string>}
 */
proto.zkp.Proof.prototype.getInputsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.zkp.Proof} returns this
 */
proto.zkp.Proof.prototype.setInputsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.zkp.Proof} returns this
 */
proto.zkp.Proof.prototype.addInputs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.zkp.Proof} returns this
 */
proto.zkp.Proof.prototype.clearInputsList = function() {
  return this.setInputsList([]);
};


goog.object.extend(exports, proto.zkp);
