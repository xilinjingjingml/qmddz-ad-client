import * as $protobuf from "protobufjs";
/** Properties of a proto_ping. */
export interface Iproto_ping {

    /** proto_ping now */
    now: number;
}

/** Represents a proto_ping. */
export class proto_ping implements Iproto_ping {

    /**
     * Constructs a new proto_ping.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_ping);

    /** proto_ping now. */
    public now: number;

    /**
     * Creates a new proto_ping instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_ping instance
     */
    public static create(properties?: Iproto_ping): proto_ping;

    /**
     * Encodes the specified proto_ping message. Does not implicitly {@link proto_ping.verify|verify} messages.
     * @param message proto_ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_ping, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_ping message, length delimited. Does not implicitly {@link proto_ping.verify|verify} messages.
     * @param message proto_ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_ping, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_ping message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_ping;

    /**
     * Decodes a proto_ping message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_ping;

    /**
     * Verifies a proto_ping message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a proto_ping message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_ping
     */
    public static fromObject(object: { [k: string]: any }): proto_ping;

    /**
     * Creates a plain object from a proto_ping message. Also converts values to other types if specified.
     * @param message proto_ping
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this proto_ping to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a proto_pong. */
export interface Iproto_pong {

    /** proto_pong now */
    now: number;
}

/** Represents a proto_pong. */
export class proto_pong implements Iproto_pong {

    /**
     * Constructs a new proto_pong.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_pong);

    /** proto_pong now. */
    public now: number;

    /**
     * Creates a new proto_pong instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_pong instance
     */
    public static create(properties?: Iproto_pong): proto_pong;

    /**
     * Encodes the specified proto_pong message. Does not implicitly {@link proto_pong.verify|verify} messages.
     * @param message proto_pong message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_pong, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_pong message, length delimited. Does not implicitly {@link proto_pong.verify|verify} messages.
     * @param message proto_pong message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_pong, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_pong message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_pong;

    /**
     * Decodes a proto_pong message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_pong;

    /**
     * Verifies a proto_pong message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a proto_pong message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_pong
     */
    public static fromObject(object: { [k: string]: any }): proto_pong;

    /**
     * Creates a plain object from a proto_pong message. Also converts values to other types if specified.
     * @param message proto_pong
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this proto_pong to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a proto_lc_use_protocol_proto_ack. */
export interface Iproto_lc_use_protocol_proto_ack {
}

/** Represents a proto_lc_use_protocol_proto_ack. */
export class proto_lc_use_protocol_proto_ack implements Iproto_lc_use_protocol_proto_ack {

    /**
     * Constructs a new proto_lc_use_protocol_proto_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_lc_use_protocol_proto_ack);

    /**
     * Creates a new proto_lc_use_protocol_proto_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_lc_use_protocol_proto_ack instance
     */
    public static create(properties?: Iproto_lc_use_protocol_proto_ack): proto_lc_use_protocol_proto_ack;

    /**
     * Encodes the specified proto_lc_use_protocol_proto_ack message. Does not implicitly {@link proto_lc_use_protocol_proto_ack.verify|verify} messages.
     * @param message proto_lc_use_protocol_proto_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_lc_use_protocol_proto_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_lc_use_protocol_proto_ack message, length delimited. Does not implicitly {@link proto_lc_use_protocol_proto_ack.verify|verify} messages.
     * @param message proto_lc_use_protocol_proto_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_lc_use_protocol_proto_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_lc_use_protocol_proto_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_lc_use_protocol_proto_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_lc_use_protocol_proto_ack;

    /**
     * Decodes a proto_lc_use_protocol_proto_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_lc_use_protocol_proto_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_lc_use_protocol_proto_ack;

    /**
     * Verifies a proto_lc_use_protocol_proto_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a proto_lc_use_protocol_proto_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_lc_use_protocol_proto_ack
     */
    public static fromObject(object: { [k: string]: any }): proto_lc_use_protocol_proto_ack;

    /**
     * Creates a plain object from a proto_lc_use_protocol_proto_ack message. Also converts values to other types if specified.
     * @param message proto_lc_use_protocol_proto_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_lc_use_protocol_proto_ack, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this proto_lc_use_protocol_proto_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a proto_cl_use_protocol_proto_req. */
export interface Iproto_cl_use_protocol_proto_req {
}

/** Represents a proto_cl_use_protocol_proto_req. */
export class proto_cl_use_protocol_proto_req implements Iproto_cl_use_protocol_proto_req {

    /**
     * Constructs a new proto_cl_use_protocol_proto_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cl_use_protocol_proto_req);

    /**
     * Creates a new proto_cl_use_protocol_proto_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cl_use_protocol_proto_req instance
     */
    public static create(properties?: Iproto_cl_use_protocol_proto_req): proto_cl_use_protocol_proto_req;

    /**
     * Encodes the specified proto_cl_use_protocol_proto_req message. Does not implicitly {@link proto_cl_use_protocol_proto_req.verify|verify} messages.
     * @param message proto_cl_use_protocol_proto_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cl_use_protocol_proto_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cl_use_protocol_proto_req message, length delimited. Does not implicitly {@link proto_cl_use_protocol_proto_req.verify|verify} messages.
     * @param message proto_cl_use_protocol_proto_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cl_use_protocol_proto_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cl_use_protocol_proto_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cl_use_protocol_proto_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cl_use_protocol_proto_req;

    /**
     * Decodes a proto_cl_use_protocol_proto_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cl_use_protocol_proto_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cl_use_protocol_proto_req;

    /**
     * Verifies a proto_cl_use_protocol_proto_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a proto_cl_use_protocol_proto_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cl_use_protocol_proto_req
     */
    public static fromObject(object: { [k: string]: any }): proto_cl_use_protocol_proto_req;

    /**
     * Creates a plain object from a proto_cl_use_protocol_proto_req message. Also converts values to other types if specified.
     * @param message proto_cl_use_protocol_proto_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cl_use_protocol_proto_req, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this proto_cl_use_protocol_proto_req to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a proto_cb_send_disconnect_req. */
export interface Iproto_cb_send_disconnect_req {
}

/** Represents a proto_cb_send_disconnect_req. */
export class proto_cb_send_disconnect_req implements Iproto_cb_send_disconnect_req {

    /**
     * Constructs a new proto_cb_send_disconnect_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cb_send_disconnect_req);

    /**
     * Creates a new proto_cb_send_disconnect_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cb_send_disconnect_req instance
     */
    public static create(properties?: Iproto_cb_send_disconnect_req): proto_cb_send_disconnect_req;

    /**
     * Encodes the specified proto_cb_send_disconnect_req message. Does not implicitly {@link proto_cb_send_disconnect_req.verify|verify} messages.
     * @param message proto_cb_send_disconnect_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cb_send_disconnect_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cb_send_disconnect_req message, length delimited. Does not implicitly {@link proto_cb_send_disconnect_req.verify|verify} messages.
     * @param message proto_cb_send_disconnect_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cb_send_disconnect_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cb_send_disconnect_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cb_send_disconnect_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cb_send_disconnect_req;

    /**
     * Decodes a proto_cb_send_disconnect_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cb_send_disconnect_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cb_send_disconnect_req;

    /**
     * Verifies a proto_cb_send_disconnect_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a proto_cb_send_disconnect_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cb_send_disconnect_req
     */
    public static fromObject(object: { [k: string]: any }): proto_cb_send_disconnect_req;

    /**
     * Creates a plain object from a proto_cb_send_disconnect_req message. Also converts values to other types if specified.
     * @param message proto_cb_send_disconnect_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cb_send_disconnect_req, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this proto_cb_send_disconnect_req to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
