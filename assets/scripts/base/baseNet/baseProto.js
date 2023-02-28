/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

// var $protobuf = require("protobufjs/minimal");
var $protobuf = protobuf

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.proto_ping = (function() {

    /**
     * Properties of a proto_ping.
     * @exports Iproto_ping
     * @interface Iproto_ping
     * @property {number} now proto_ping now
     */

    /**
     * Constructs a new proto_ping.
     * @exports proto_ping
     * @classdesc Represents a proto_ping.
     * @implements Iproto_ping
     * @constructor
     * @param {Iproto_ping=} [properties] Properties to set
     */
    function proto_ping(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * proto_ping now.
     * @member {number} now
     * @memberof proto_ping
     * @instance
     */
    proto_ping.prototype.now = 0;

    /**
     * Creates a new proto_ping instance using the specified properties.
     * @function create
     * @memberof proto_ping
     * @static
     * @param {Iproto_ping=} [properties] Properties to set
     * @returns {proto_ping} proto_ping instance
     */
    proto_ping.create = function create(properties) {
        return new proto_ping(properties);
    };

    /**
     * Encodes the specified proto_ping message. Does not implicitly {@link proto_ping.verify|verify} messages.
     * @function encode
     * @memberof proto_ping
     * @static
     * @param {Iproto_ping} message proto_ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.now);
        return writer;
    };

    /**
     * Encodes the specified proto_ping message, length delimited. Does not implicitly {@link proto_ping.verify|verify} messages.
     * @function encodeDelimited
     * @memberof proto_ping
     * @static
     * @param {Iproto_ping} message proto_ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_ping.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a proto_ping message from the specified reader or buffer.
     * @function decode
     * @memberof proto_ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {proto_ping} proto_ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_ping.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto_ping();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.now = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("now"))
            throw $util.ProtocolError("missing required 'now'", { instance: message });
        return message;
    };

    /**
     * Decodes a proto_ping message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof proto_ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {proto_ping} proto_ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_ping.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a proto_ping message.
     * @function verify
     * @memberof proto_ping
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    proto_ping.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.now))
            return "now: integer expected";
        return null;
    };

    /**
     * Creates a proto_ping message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof proto_ping
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {proto_ping} proto_ping
     */
    proto_ping.fromObject = function fromObject(object) {
        if (object instanceof $root.proto_ping)
            return object;
        var message = new $root.proto_ping();
        if (object.now != null)
            message.now = object.now | 0;
        return message;
    };

    /**
     * Creates a plain object from a proto_ping message. Also converts values to other types if specified.
     * @function toObject
     * @memberof proto_ping
     * @static
     * @param {proto_ping} message proto_ping
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    proto_ping.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.now = 0;
        if (message.now != null && message.hasOwnProperty("now"))
            object.now = message.now;
        return object;
    };

    /**
     * Converts this proto_ping to JSON.
     * @function toJSON
     * @memberof proto_ping
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    proto_ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return proto_ping;
})();

$root.proto_pong = (function() {

    /**
     * Properties of a proto_pong.
     * @exports Iproto_pong
     * @interface Iproto_pong
     * @property {number} now proto_pong now
     */

    /**
     * Constructs a new proto_pong.
     * @exports proto_pong
     * @classdesc Represents a proto_pong.
     * @implements Iproto_pong
     * @constructor
     * @param {Iproto_pong=} [properties] Properties to set
     */
    function proto_pong(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * proto_pong now.
     * @member {number} now
     * @memberof proto_pong
     * @instance
     */
    proto_pong.prototype.now = 0;

    /**
     * Creates a new proto_pong instance using the specified properties.
     * @function create
     * @memberof proto_pong
     * @static
     * @param {Iproto_pong=} [properties] Properties to set
     * @returns {proto_pong} proto_pong instance
     */
    proto_pong.create = function create(properties) {
        return new proto_pong(properties);
    };

    /**
     * Encodes the specified proto_pong message. Does not implicitly {@link proto_pong.verify|verify} messages.
     * @function encode
     * @memberof proto_pong
     * @static
     * @param {Iproto_pong} message proto_pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_pong.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.now);
        return writer;
    };

    /**
     * Encodes the specified proto_pong message, length delimited. Does not implicitly {@link proto_pong.verify|verify} messages.
     * @function encodeDelimited
     * @memberof proto_pong
     * @static
     * @param {Iproto_pong} message proto_pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_pong.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a proto_pong message from the specified reader or buffer.
     * @function decode
     * @memberof proto_pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {proto_pong} proto_pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_pong.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto_pong();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.now = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("now"))
            throw $util.ProtocolError("missing required 'now'", { instance: message });
        return message;
    };

    /**
     * Decodes a proto_pong message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof proto_pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {proto_pong} proto_pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_pong.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a proto_pong message.
     * @function verify
     * @memberof proto_pong
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    proto_pong.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.now))
            return "now: integer expected";
        return null;
    };

    /**
     * Creates a proto_pong message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof proto_pong
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {proto_pong} proto_pong
     */
    proto_pong.fromObject = function fromObject(object) {
        if (object instanceof $root.proto_pong)
            return object;
        var message = new $root.proto_pong();
        if (object.now != null)
            message.now = object.now | 0;
        return message;
    };

    /**
     * Creates a plain object from a proto_pong message. Also converts values to other types if specified.
     * @function toObject
     * @memberof proto_pong
     * @static
     * @param {proto_pong} message proto_pong
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    proto_pong.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.now = 0;
        if (message.now != null && message.hasOwnProperty("now"))
            object.now = message.now;
        return object;
    };

    /**
     * Converts this proto_pong to JSON.
     * @function toJSON
     * @memberof proto_pong
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    proto_pong.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return proto_pong;
})();

$root.proto_lc_use_protocol_proto_ack = (function() {

    /**
     * Properties of a proto_lc_use_protocol_proto_ack.
     * @exports Iproto_lc_use_protocol_proto_ack
     * @interface Iproto_lc_use_protocol_proto_ack
     */

    /**
     * Constructs a new proto_lc_use_protocol_proto_ack.
     * @exports proto_lc_use_protocol_proto_ack
     * @classdesc Represents a proto_lc_use_protocol_proto_ack.
     * @implements Iproto_lc_use_protocol_proto_ack
     * @constructor
     * @param {Iproto_lc_use_protocol_proto_ack=} [properties] Properties to set
     */
    function proto_lc_use_protocol_proto_ack(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new proto_lc_use_protocol_proto_ack instance using the specified properties.
     * @function create
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {Iproto_lc_use_protocol_proto_ack=} [properties] Properties to set
     * @returns {proto_lc_use_protocol_proto_ack} proto_lc_use_protocol_proto_ack instance
     */
    proto_lc_use_protocol_proto_ack.create = function create(properties) {
        return new proto_lc_use_protocol_proto_ack(properties);
    };

    /**
     * Encodes the specified proto_lc_use_protocol_proto_ack message. Does not implicitly {@link proto_lc_use_protocol_proto_ack.verify|verify} messages.
     * @function encode
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {Iproto_lc_use_protocol_proto_ack} message proto_lc_use_protocol_proto_ack message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_lc_use_protocol_proto_ack.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified proto_lc_use_protocol_proto_ack message, length delimited. Does not implicitly {@link proto_lc_use_protocol_proto_ack.verify|verify} messages.
     * @function encodeDelimited
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {Iproto_lc_use_protocol_proto_ack} message proto_lc_use_protocol_proto_ack message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_lc_use_protocol_proto_ack.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a proto_lc_use_protocol_proto_ack message from the specified reader or buffer.
     * @function decode
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {proto_lc_use_protocol_proto_ack} proto_lc_use_protocol_proto_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_lc_use_protocol_proto_ack.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto_lc_use_protocol_proto_ack();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a proto_lc_use_protocol_proto_ack message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {proto_lc_use_protocol_proto_ack} proto_lc_use_protocol_proto_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_lc_use_protocol_proto_ack.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a proto_lc_use_protocol_proto_ack message.
     * @function verify
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    proto_lc_use_protocol_proto_ack.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a proto_lc_use_protocol_proto_ack message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {proto_lc_use_protocol_proto_ack} proto_lc_use_protocol_proto_ack
     */
    proto_lc_use_protocol_proto_ack.fromObject = function fromObject(object) {
        if (object instanceof $root.proto_lc_use_protocol_proto_ack)
            return object;
        return new $root.proto_lc_use_protocol_proto_ack();
    };

    /**
     * Creates a plain object from a proto_lc_use_protocol_proto_ack message. Also converts values to other types if specified.
     * @function toObject
     * @memberof proto_lc_use_protocol_proto_ack
     * @static
     * @param {proto_lc_use_protocol_proto_ack} message proto_lc_use_protocol_proto_ack
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    proto_lc_use_protocol_proto_ack.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this proto_lc_use_protocol_proto_ack to JSON.
     * @function toJSON
     * @memberof proto_lc_use_protocol_proto_ack
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    proto_lc_use_protocol_proto_ack.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return proto_lc_use_protocol_proto_ack;
})();

$root.proto_cl_use_protocol_proto_req = (function() {

    /**
     * Properties of a proto_cl_use_protocol_proto_req.
     * @exports Iproto_cl_use_protocol_proto_req
     * @interface Iproto_cl_use_protocol_proto_req
     */

    /**
     * Constructs a new proto_cl_use_protocol_proto_req.
     * @exports proto_cl_use_protocol_proto_req
     * @classdesc Represents a proto_cl_use_protocol_proto_req.
     * @implements Iproto_cl_use_protocol_proto_req
     * @constructor
     * @param {Iproto_cl_use_protocol_proto_req=} [properties] Properties to set
     */
    function proto_cl_use_protocol_proto_req(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new proto_cl_use_protocol_proto_req instance using the specified properties.
     * @function create
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {Iproto_cl_use_protocol_proto_req=} [properties] Properties to set
     * @returns {proto_cl_use_protocol_proto_req} proto_cl_use_protocol_proto_req instance
     */
    proto_cl_use_protocol_proto_req.create = function create(properties) {
        return new proto_cl_use_protocol_proto_req(properties);
    };

    /**
     * Encodes the specified proto_cl_use_protocol_proto_req message. Does not implicitly {@link proto_cl_use_protocol_proto_req.verify|verify} messages.
     * @function encode
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {Iproto_cl_use_protocol_proto_req} message proto_cl_use_protocol_proto_req message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_cl_use_protocol_proto_req.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified proto_cl_use_protocol_proto_req message, length delimited. Does not implicitly {@link proto_cl_use_protocol_proto_req.verify|verify} messages.
     * @function encodeDelimited
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {Iproto_cl_use_protocol_proto_req} message proto_cl_use_protocol_proto_req message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_cl_use_protocol_proto_req.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a proto_cl_use_protocol_proto_req message from the specified reader or buffer.
     * @function decode
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {proto_cl_use_protocol_proto_req} proto_cl_use_protocol_proto_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_cl_use_protocol_proto_req.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto_cl_use_protocol_proto_req();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a proto_cl_use_protocol_proto_req message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {proto_cl_use_protocol_proto_req} proto_cl_use_protocol_proto_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_cl_use_protocol_proto_req.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a proto_cl_use_protocol_proto_req message.
     * @function verify
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    proto_cl_use_protocol_proto_req.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a proto_cl_use_protocol_proto_req message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {proto_cl_use_protocol_proto_req} proto_cl_use_protocol_proto_req
     */
    proto_cl_use_protocol_proto_req.fromObject = function fromObject(object) {
        if (object instanceof $root.proto_cl_use_protocol_proto_req)
            return object;
        return new $root.proto_cl_use_protocol_proto_req();
    };

    /**
     * Creates a plain object from a proto_cl_use_protocol_proto_req message. Also converts values to other types if specified.
     * @function toObject
     * @memberof proto_cl_use_protocol_proto_req
     * @static
     * @param {proto_cl_use_protocol_proto_req} message proto_cl_use_protocol_proto_req
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    proto_cl_use_protocol_proto_req.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this proto_cl_use_protocol_proto_req to JSON.
     * @function toJSON
     * @memberof proto_cl_use_protocol_proto_req
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    proto_cl_use_protocol_proto_req.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return proto_cl_use_protocol_proto_req;
})();

$root.proto_cb_send_disconnect_req = (function() {

    /**
     * Properties of a proto_cb_send_disconnect_req.
     * @exports Iproto_cb_send_disconnect_req
     * @interface Iproto_cb_send_disconnect_req
     */

    /**
     * Constructs a new proto_cb_send_disconnect_req.
     * @exports proto_cb_send_disconnect_req
     * @classdesc Represents a proto_cb_send_disconnect_req.
     * @implements Iproto_cb_send_disconnect_req
     * @constructor
     * @param {Iproto_cb_send_disconnect_req=} [properties] Properties to set
     */
    function proto_cb_send_disconnect_req(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new proto_cb_send_disconnect_req instance using the specified properties.
     * @function create
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {Iproto_cb_send_disconnect_req=} [properties] Properties to set
     * @returns {proto_cb_send_disconnect_req} proto_cb_send_disconnect_req instance
     */
    proto_cb_send_disconnect_req.create = function create(properties) {
        return new proto_cb_send_disconnect_req(properties);
    };

    /**
     * Encodes the specified proto_cb_send_disconnect_req message. Does not implicitly {@link proto_cb_send_disconnect_req.verify|verify} messages.
     * @function encode
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {Iproto_cb_send_disconnect_req} message proto_cb_send_disconnect_req message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_cb_send_disconnect_req.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified proto_cb_send_disconnect_req message, length delimited. Does not implicitly {@link proto_cb_send_disconnect_req.verify|verify} messages.
     * @function encodeDelimited
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {Iproto_cb_send_disconnect_req} message proto_cb_send_disconnect_req message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    proto_cb_send_disconnect_req.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a proto_cb_send_disconnect_req message from the specified reader or buffer.
     * @function decode
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {proto_cb_send_disconnect_req} proto_cb_send_disconnect_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_cb_send_disconnect_req.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto_cb_send_disconnect_req();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a proto_cb_send_disconnect_req message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {proto_cb_send_disconnect_req} proto_cb_send_disconnect_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    proto_cb_send_disconnect_req.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a proto_cb_send_disconnect_req message.
     * @function verify
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    proto_cb_send_disconnect_req.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a proto_cb_send_disconnect_req message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {proto_cb_send_disconnect_req} proto_cb_send_disconnect_req
     */
    proto_cb_send_disconnect_req.fromObject = function fromObject(object) {
        if (object instanceof $root.proto_cb_send_disconnect_req)
            return object;
        return new $root.proto_cb_send_disconnect_req();
    };

    /**
     * Creates a plain object from a proto_cb_send_disconnect_req message. Also converts values to other types if specified.
     * @function toObject
     * @memberof proto_cb_send_disconnect_req
     * @static
     * @param {proto_cb_send_disconnect_req} message proto_cb_send_disconnect_req
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    proto_cb_send_disconnect_req.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this proto_cb_send_disconnect_req to JSON.
     * @function toJSON
     * @memberof proto_cb_send_disconnect_req
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    proto_cb_send_disconnect_req.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return proto_cb_send_disconnect_req;
})();

module.exports = $root;
