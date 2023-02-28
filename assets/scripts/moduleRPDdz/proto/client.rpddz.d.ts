import * as $protobuf from "protobufjs";
/** Properties of a proto_cb_login_req. */
export interface Iproto_cb_login_req {

    /** proto_cb_login_req plyGuid */
    plyGuid: (number|Long);

    /** proto_cb_login_req plyTicket */
    plyTicket: string;

    /** proto_cb_login_req version */
    version: number;

    /** proto_cb_login_req extParam */
    extParam: string;

    /** proto_cb_login_req mainGameId */
    mainGameId: number;

    /** proto_cb_login_req gameGroup */
    gameGroup: number;
}

/** Represents a proto_cb_login_req. */
export class proto_cb_login_req implements Iproto_cb_login_req {

    /**
     * Constructs a new proto_cb_login_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cb_login_req);

    /** proto_cb_login_req plyGuid. */
    public plyGuid: (number|Long);

    /** proto_cb_login_req plyTicket. */
    public plyTicket: string;

    /** proto_cb_login_req version. */
    public version: number;

    /** proto_cb_login_req extParam. */
    public extParam: string;

    /** proto_cb_login_req mainGameId. */
    public mainGameId: number;

    /** proto_cb_login_req gameGroup. */
    public gameGroup: number;

    /**
     * Creates a new proto_cb_login_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cb_login_req instance
     */
    public static create(properties?: Iproto_cb_login_req): proto_cb_login_req;

    /**
     * Encodes the specified proto_cb_login_req message. Does not implicitly {@link proto_cb_login_req.verify|verify} messages.
     * @param message proto_cb_login_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cb_login_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cb_login_req message, length delimited. Does not implicitly {@link proto_cb_login_req.verify|verify} messages.
     * @param message proto_cb_login_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cb_login_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cb_login_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cb_login_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cb_login_req;

    /**
     * Decodes a proto_cb_login_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cb_login_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cb_login_req;

    /**
     * Verifies a proto_cb_login_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cb_login_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cb_login_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cb_login_req;

    /**
     * Creates a plain object from a proto_cb_login_req message. Also converts values to other types if specified.
     * @param message proto_cb_login_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cb_login_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cb_login_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_login_ack. */
export interface Iproto_bc_login_ack {

    /** proto_bc_login_ack ret */
    ret: number;

    /** proto_bc_login_ack plyBaseData */
    plyBaseData: Iproto_PlyBaseData;

    /** proto_bc_login_ack plyStatus */
    plyStatus: Iproto_PlayerStatus;

    /** proto_bc_login_ack errorMsg */
    errorMsg: string;
}

/** Represents a proto_bc_login_ack. */
export class proto_bc_login_ack implements Iproto_bc_login_ack {

    /**
     * Constructs a new proto_bc_login_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_login_ack);

    /** proto_bc_login_ack ret. */
    public ret: number;

    /** proto_bc_login_ack plyBaseData. */
    public plyBaseData: Iproto_PlyBaseData;

    /** proto_bc_login_ack plyStatus. */
    public plyStatus: Iproto_PlayerStatus;

    /** proto_bc_login_ack errorMsg. */
    public errorMsg: string;

    /**
     * Creates a new proto_bc_login_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_login_ack instance
     */
    public static create(properties?: Iproto_bc_login_ack): proto_bc_login_ack;

    /**
     * Encodes the specified proto_bc_login_ack message. Does not implicitly {@link proto_bc_login_ack.verify|verify} messages.
     * @param message proto_bc_login_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_login_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_login_ack message, length delimited. Does not implicitly {@link proto_bc_login_ack.verify|verify} messages.
     * @param message proto_bc_login_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_login_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_login_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_login_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_login_ack;

    /**
     * Decodes a proto_bc_login_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_login_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_login_ack;

    /**
     * Verifies a proto_bc_login_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_login_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_login_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_login_ack;

    /**
     * Creates a plain object from a proto_bc_login_ack message. Also converts values to other types if specified.
     * @param message proto_bc_login_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_login_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_login_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_PlyBaseData. */
export interface Iproto_PlyBaseData {

    /** proto_PlyBaseData plyGuid */
    plyGuid: (number|Long);

    /** proto_PlyBaseData nickname */
    nickname: string;

    /** proto_PlyBaseData sex */
    sex: number;

    /** proto_PlyBaseData gift */
    gift: number;

    /** proto_PlyBaseData money */
    money: (number|Long);

    /** proto_PlyBaseData score */
    score: number;

    /** proto_PlyBaseData won */
    won: number;

    /** proto_PlyBaseData lost */
    lost: number;

    /** proto_PlyBaseData dogfall */
    dogfall: number;

    /** proto_PlyBaseData tableId */
    tableId: number;

    /** proto_PlyBaseData param_1 */
    param_1: number;

    /** proto_PlyBaseData param_2 */
    param_2: number;

    /** proto_PlyBaseData chairId */
    chairId: number;

    /** proto_PlyBaseData ready */
    ready: number;

    /** proto_PlyBaseData plyVip */
    plyVip: Iproto_VipData;
}

/** Represents a proto_PlyBaseData. */
export class proto_PlyBaseData implements Iproto_PlyBaseData {

    /**
     * Constructs a new proto_PlyBaseData.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_PlyBaseData);

    /** proto_PlyBaseData plyGuid. */
    public plyGuid: (number|Long);

    /** proto_PlyBaseData nickname. */
    public nickname: string;

    /** proto_PlyBaseData sex. */
    public sex: number;

    /** proto_PlyBaseData gift. */
    public gift: number;

    /** proto_PlyBaseData money. */
    public money: (number|Long);

    /** proto_PlyBaseData score. */
    public score: number;

    /** proto_PlyBaseData won. */
    public won: number;

    /** proto_PlyBaseData lost. */
    public lost: number;

    /** proto_PlyBaseData dogfall. */
    public dogfall: number;

    /** proto_PlyBaseData tableId. */
    public tableId: number;

    /** proto_PlyBaseData param_1. */
    public param_1: number;

    /** proto_PlyBaseData param_2. */
    public param_2: number;

    /** proto_PlyBaseData chairId. */
    public chairId: number;

    /** proto_PlyBaseData ready. */
    public ready: number;

    /** proto_PlyBaseData plyVip. */
    public plyVip: Iproto_VipData;

    /**
     * Creates a new proto_PlyBaseData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_PlyBaseData instance
     */
    public static create(properties?: Iproto_PlyBaseData): proto_PlyBaseData;

    /**
     * Encodes the specified proto_PlyBaseData message. Does not implicitly {@link proto_PlyBaseData.verify|verify} messages.
     * @param message proto_PlyBaseData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_PlyBaseData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_PlyBaseData message, length delimited. Does not implicitly {@link proto_PlyBaseData.verify|verify} messages.
     * @param message proto_PlyBaseData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_PlyBaseData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_PlyBaseData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_PlyBaseData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_PlyBaseData;

    /**
     * Decodes a proto_PlyBaseData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_PlyBaseData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_PlyBaseData;

    /**
     * Verifies a proto_PlyBaseData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_PlyBaseData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_PlyBaseData
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_PlyBaseData;

    /**
     * Creates a plain object from a proto_PlyBaseData message. Also converts values to other types if specified.
     * @param message proto_PlyBaseData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_PlyBaseData, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_PlyBaseData to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_PlayerStatus. */
export interface Iproto_PlayerStatus {

    /** proto_PlayerStatus plyGuid */
    plyGuid: (number|Long);

    /** proto_PlayerStatus plyNickname */
    plyNickname: string;

    /** proto_PlayerStatus plyStatus */
    plyStatus: number;

    /** proto_PlayerStatus sex */
    sex: number;

    /** proto_PlayerStatus gameId */
    gameId: number;

    /** proto_PlayerStatus gameServerId */
    gameServerId: number;

    /** proto_PlayerStatus tableId */
    tableId: number;

    /** proto_PlayerStatus money */
    money: (number|Long);

    /** proto_PlayerStatus won */
    won: number;

    /** proto_PlayerStatus lost */
    lost: number;

    /** proto_PlayerStatus moneyRank */
    moneyRank: number;

    /** proto_PlayerStatus wonRank */
    wonRank: number;

    /** proto_PlayerStatus param_1 */
    param_1: number;

    /** proto_PlayerStatus param_2 */
    param_2: number;

    /** proto_PlayerStatus latitude */
    latitude: number;

    /** proto_PlayerStatus longitude */
    longitude: number;
}

/** Represents a proto_PlayerStatus. */
export class proto_PlayerStatus implements Iproto_PlayerStatus {

    /**
     * Constructs a new proto_PlayerStatus.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_PlayerStatus);

    /** proto_PlayerStatus plyGuid. */
    public plyGuid: (number|Long);

    /** proto_PlayerStatus plyNickname. */
    public plyNickname: string;

    /** proto_PlayerStatus plyStatus. */
    public plyStatus: number;

    /** proto_PlayerStatus sex. */
    public sex: number;

    /** proto_PlayerStatus gameId. */
    public gameId: number;

    /** proto_PlayerStatus gameServerId. */
    public gameServerId: number;

    /** proto_PlayerStatus tableId. */
    public tableId: number;

    /** proto_PlayerStatus money. */
    public money: (number|Long);

    /** proto_PlayerStatus won. */
    public won: number;

    /** proto_PlayerStatus lost. */
    public lost: number;

    /** proto_PlayerStatus moneyRank. */
    public moneyRank: number;

    /** proto_PlayerStatus wonRank. */
    public wonRank: number;

    /** proto_PlayerStatus param_1. */
    public param_1: number;

    /** proto_PlayerStatus param_2. */
    public param_2: number;

    /** proto_PlayerStatus latitude. */
    public latitude: number;

    /** proto_PlayerStatus longitude. */
    public longitude: number;

    /**
     * Creates a new proto_PlayerStatus instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_PlayerStatus instance
     */
    public static create(properties?: Iproto_PlayerStatus): proto_PlayerStatus;

    /**
     * Encodes the specified proto_PlayerStatus message. Does not implicitly {@link proto_PlayerStatus.verify|verify} messages.
     * @param message proto_PlayerStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_PlayerStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_PlayerStatus message, length delimited. Does not implicitly {@link proto_PlayerStatus.verify|verify} messages.
     * @param message proto_PlayerStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_PlayerStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_PlayerStatus message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_PlayerStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_PlayerStatus;

    /**
     * Decodes a proto_PlayerStatus message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_PlayerStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_PlayerStatus;

    /**
     * Verifies a proto_PlayerStatus message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_PlayerStatus message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_PlayerStatus
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_PlayerStatus;

    /**
     * Creates a plain object from a proto_PlayerStatus message. Also converts values to other types if specified.
     * @param message proto_PlayerStatus
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_PlayerStatus, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_PlayerStatus to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_VipData. */
export interface Iproto_VipData {

    /** proto_VipData level */
    level: number;

    /** proto_VipData nexLevelTotalDays */
    nexLevelTotalDays: number;

    /** proto_VipData autoUpgradeDay */
    autoUpgradeDay: number;

    /** proto_VipData loginAward */
    loginAward: number;

    /** proto_VipData friendCount */
    friendCount: number;

    /** proto_VipData nextLevelDueDays */
    nextLevelDueDays: number;

    /** proto_VipData remainDueDays */
    remainDueDays: number;

    /** proto_VipData status */
    status: number;
}

/** Represents a proto_VipData. */
export class proto_VipData implements Iproto_VipData {

    /**
     * Constructs a new proto_VipData.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_VipData);

    /** proto_VipData level. */
    public level: number;

    /** proto_VipData nexLevelTotalDays. */
    public nexLevelTotalDays: number;

    /** proto_VipData autoUpgradeDay. */
    public autoUpgradeDay: number;

    /** proto_VipData loginAward. */
    public loginAward: number;

    /** proto_VipData friendCount. */
    public friendCount: number;

    /** proto_VipData nextLevelDueDays. */
    public nextLevelDueDays: number;

    /** proto_VipData remainDueDays. */
    public remainDueDays: number;

    /** proto_VipData status. */
    public status: number;

    /**
     * Creates a new proto_VipData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_VipData instance
     */
    public static create(properties?: Iproto_VipData): proto_VipData;

    /**
     * Encodes the specified proto_VipData message. Does not implicitly {@link proto_VipData.verify|verify} messages.
     * @param message proto_VipData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_VipData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_VipData message, length delimited. Does not implicitly {@link proto_VipData.verify|verify} messages.
     * @param message proto_VipData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_VipData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_VipData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_VipData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_VipData;

    /**
     * Decodes a proto_VipData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_VipData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_VipData;

    /**
     * Verifies a proto_VipData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_VipData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_VipData
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_VipData;

    /**
     * Creates a plain object from a proto_VipData message. Also converts values to other types if specified.
     * @param message proto_VipData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_VipData, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_VipData to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cb_join_table_req. */
export interface Iproto_cb_join_table_req {

    /** proto_cb_join_table_req tableId */
    tableId: number;

    /** proto_cb_join_table_req password */
    password: string;

    /** proto_cb_join_table_req clubUid */
    clubUid: number;
}

/** Represents a proto_cb_join_table_req. */
export class proto_cb_join_table_req implements Iproto_cb_join_table_req {

    /**
     * Constructs a new proto_cb_join_table_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cb_join_table_req);

    /** proto_cb_join_table_req tableId. */
    public tableId: number;

    /** proto_cb_join_table_req password. */
    public password: string;

    /** proto_cb_join_table_req clubUid. */
    public clubUid: number;

    /**
     * Creates a new proto_cb_join_table_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cb_join_table_req instance
     */
    public static create(properties?: Iproto_cb_join_table_req): proto_cb_join_table_req;

    /**
     * Encodes the specified proto_cb_join_table_req message. Does not implicitly {@link proto_cb_join_table_req.verify|verify} messages.
     * @param message proto_cb_join_table_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cb_join_table_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cb_join_table_req message, length delimited. Does not implicitly {@link proto_cb_join_table_req.verify|verify} messages.
     * @param message proto_cb_join_table_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cb_join_table_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cb_join_table_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cb_join_table_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cb_join_table_req;

    /**
     * Decodes a proto_cb_join_table_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cb_join_table_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cb_join_table_req;

    /**
     * Verifies a proto_cb_join_table_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cb_join_table_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cb_join_table_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cb_join_table_req;

    /**
     * Creates a plain object from a proto_cb_join_table_req message. Also converts values to other types if specified.
     * @param message proto_cb_join_table_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cb_join_table_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cb_join_table_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_join_table_ack. */
export interface Iproto_bc_join_table_ack {

    /** proto_bc_join_table_ack ret */
    ret: number;

    /** proto_bc_join_table_ack tableAttrs */
    tableAttrs: Iproto_TableAttr;

    /** proto_bc_join_table_ack errMsg */
    errMsg: string;
}

/** Represents a proto_bc_join_table_ack. */
export class proto_bc_join_table_ack implements Iproto_bc_join_table_ack {

    /**
     * Constructs a new proto_bc_join_table_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_join_table_ack);

    /** proto_bc_join_table_ack ret. */
    public ret: number;

    /** proto_bc_join_table_ack tableAttrs. */
    public tableAttrs: Iproto_TableAttr;

    /** proto_bc_join_table_ack errMsg. */
    public errMsg: string;

    /**
     * Creates a new proto_bc_join_table_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_join_table_ack instance
     */
    public static create(properties?: Iproto_bc_join_table_ack): proto_bc_join_table_ack;

    /**
     * Encodes the specified proto_bc_join_table_ack message. Does not implicitly {@link proto_bc_join_table_ack.verify|verify} messages.
     * @param message proto_bc_join_table_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_join_table_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_join_table_ack message, length delimited. Does not implicitly {@link proto_bc_join_table_ack.verify|verify} messages.
     * @param message proto_bc_join_table_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_join_table_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_join_table_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_join_table_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_join_table_ack;

    /**
     * Decodes a proto_bc_join_table_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_join_table_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_join_table_ack;

    /**
     * Verifies a proto_bc_join_table_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_join_table_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_join_table_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_join_table_ack;

    /**
     * Creates a plain object from a proto_bc_join_table_ack message. Also converts values to other types if specified.
     * @param message proto_bc_join_table_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_join_table_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_join_table_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_TableAttr. */
export interface Iproto_TableAttr {

    /** proto_TableAttr tableId */
    tableId: number;

    /** proto_TableAttr name */
    name: string;

    /** proto_TableAttr lock */
    lock: number;

    /** proto_TableAttr players */
    players?: (Iproto_PlyBaseData[]|null);
}

/** Represents a proto_TableAttr. */
export class proto_TableAttr implements Iproto_TableAttr {

    /**
     * Constructs a new proto_TableAttr.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_TableAttr);

    /** proto_TableAttr tableId. */
    public tableId: number;

    /** proto_TableAttr name. */
    public name: string;

    /** proto_TableAttr lock. */
    public lock: number;

    /** proto_TableAttr players. */
    public players: [ 'Array' ].<Iproto_PlyBaseData>;

    /**
     * Creates a new proto_TableAttr instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_TableAttr instance
     */
    public static create(properties?: Iproto_TableAttr): proto_TableAttr;

    /**
     * Encodes the specified proto_TableAttr message. Does not implicitly {@link proto_TableAttr.verify|verify} messages.
     * @param message proto_TableAttr message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_TableAttr, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_TableAttr message, length delimited. Does not implicitly {@link proto_TableAttr.verify|verify} messages.
     * @param message proto_TableAttr message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_TableAttr, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_TableAttr message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_TableAttr
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_TableAttr;

    /**
     * Decodes a proto_TableAttr message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_TableAttr
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_TableAttr;

    /**
     * Verifies a proto_TableAttr message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_TableAttr message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_TableAttr
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_TableAttr;

    /**
     * Creates a plain object from a proto_TableAttr message. Also converts values to other types if specified.
     * @param message proto_TableAttr
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_TableAttr, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_TableAttr to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cb_leave_table_req. */
export interface Iproto_cb_leave_table_req {
}

/** Represents a proto_cb_leave_table_req. */
export class proto_cb_leave_table_req implements Iproto_cb_leave_table_req {

    /**
     * Constructs a new proto_cb_leave_table_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cb_leave_table_req);

    /**
     * Creates a new proto_cb_leave_table_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cb_leave_table_req instance
     */
    public static create(properties?: Iproto_cb_leave_table_req): proto_cb_leave_table_req;

    /**
     * Encodes the specified proto_cb_leave_table_req message. Does not implicitly {@link proto_cb_leave_table_req.verify|verify} messages.
     * @param message proto_cb_leave_table_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cb_leave_table_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cb_leave_table_req message, length delimited. Does not implicitly {@link proto_cb_leave_table_req.verify|verify} messages.
     * @param message proto_cb_leave_table_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cb_leave_table_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cb_leave_table_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cb_leave_table_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cb_leave_table_req;

    /**
     * Decodes a proto_cb_leave_table_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cb_leave_table_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cb_leave_table_req;

    /**
     * Verifies a proto_cb_leave_table_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cb_leave_table_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cb_leave_table_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cb_leave_table_req;

    /**
     * Creates a plain object from a proto_cb_leave_table_req message. Also converts values to other types if specified.
     * @param message proto_cb_leave_table_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cb_leave_table_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cb_leave_table_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_leave_table_ack. */
export interface Iproto_bc_leave_table_ack {

    /** proto_bc_leave_table_ack ret */
    ret: number;

    /** proto_bc_leave_table_ack plyNickname */
    plyNickname: string;
}

/** Represents a proto_bc_leave_table_ack. */
export class proto_bc_leave_table_ack implements Iproto_bc_leave_table_ack {

    /**
     * Constructs a new proto_bc_leave_table_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_leave_table_ack);

    /** proto_bc_leave_table_ack ret. */
    public ret: number;

    /** proto_bc_leave_table_ack plyNickname. */
    public plyNickname: string;

    /**
     * Creates a new proto_bc_leave_table_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_leave_table_ack instance
     */
    public static create(properties?: Iproto_bc_leave_table_ack): proto_bc_leave_table_ack;

    /**
     * Encodes the specified proto_bc_leave_table_ack message. Does not implicitly {@link proto_bc_leave_table_ack.verify|verify} messages.
     * @param message proto_bc_leave_table_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_leave_table_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_leave_table_ack message, length delimited. Does not implicitly {@link proto_bc_leave_table_ack.verify|verify} messages.
     * @param message proto_bc_leave_table_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_leave_table_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_leave_table_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_leave_table_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_leave_table_ack;

    /**
     * Decodes a proto_bc_leave_table_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_leave_table_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_leave_table_ack;

    /**
     * Verifies a proto_bc_leave_table_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_leave_table_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_leave_table_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_leave_table_ack;

    /**
     * Creates a plain object from a proto_bc_leave_table_ack message. Also converts values to other types if specified.
     * @param message proto_bc_leave_table_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_leave_table_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_leave_table_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_ply_join_not. */
export interface Iproto_bc_ply_join_not {

    /** proto_bc_ply_join_not plyData */
    plyData: Iproto_PlyBaseData;
}

/** Represents a proto_bc_ply_join_not. */
export class proto_bc_ply_join_not implements Iproto_bc_ply_join_not {

    /**
     * Constructs a new proto_bc_ply_join_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_ply_join_not);

    /** proto_bc_ply_join_not plyData. */
    public plyData: Iproto_PlyBaseData;

    /**
     * Creates a new proto_bc_ply_join_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_ply_join_not instance
     */
    public static create(properties?: Iproto_bc_ply_join_not): proto_bc_ply_join_not;

    /**
     * Encodes the specified proto_bc_ply_join_not message. Does not implicitly {@link proto_bc_ply_join_not.verify|verify} messages.
     * @param message proto_bc_ply_join_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_ply_join_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_ply_join_not message, length delimited. Does not implicitly {@link proto_bc_ply_join_not.verify|verify} messages.
     * @param message proto_bc_ply_join_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_ply_join_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_ply_join_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_ply_join_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_ply_join_not;

    /**
     * Decodes a proto_bc_ply_join_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_ply_join_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_ply_join_not;

    /**
     * Verifies a proto_bc_ply_join_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_ply_join_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_ply_join_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_ply_join_not;

    /**
     * Creates a plain object from a proto_bc_ply_join_not message. Also converts values to other types if specified.
     * @param message proto_bc_ply_join_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_ply_join_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_ply_join_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_ply_leave_not. */
export interface Iproto_bc_ply_leave_not {

    /** proto_bc_ply_leave_not plyGuid */
    plyGuid: (number|Long);
}

/** Represents a proto_bc_ply_leave_not. */
export class proto_bc_ply_leave_not implements Iproto_bc_ply_leave_not {

    /**
     * Constructs a new proto_bc_ply_leave_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_ply_leave_not);

    /** proto_bc_ply_leave_not plyGuid. */
    public plyGuid: (number|Long);

    /**
     * Creates a new proto_bc_ply_leave_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_ply_leave_not instance
     */
    public static create(properties?: Iproto_bc_ply_leave_not): proto_bc_ply_leave_not;

    /**
     * Encodes the specified proto_bc_ply_leave_not message. Does not implicitly {@link proto_bc_ply_leave_not.verify|verify} messages.
     * @param message proto_bc_ply_leave_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_ply_leave_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_ply_leave_not message, length delimited. Does not implicitly {@link proto_bc_ply_leave_not.verify|verify} messages.
     * @param message proto_bc_ply_leave_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_ply_leave_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_ply_leave_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_ply_leave_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_ply_leave_not;

    /**
     * Decodes a proto_bc_ply_leave_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_ply_leave_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_ply_leave_not;

    /**
     * Verifies a proto_bc_ply_leave_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_ply_leave_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_ply_leave_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_ply_leave_not;

    /**
     * Creates a plain object from a proto_bc_ply_leave_not message. Also converts values to other types if specified.
     * @param message proto_bc_ply_leave_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_ply_leave_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_ply_leave_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cb_ready_req. */
export interface Iproto_cb_ready_req {
}

/** Represents a proto_cb_ready_req. */
export class proto_cb_ready_req implements Iproto_cb_ready_req {

    /**
     * Constructs a new proto_cb_ready_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cb_ready_req);

    /**
     * Creates a new proto_cb_ready_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cb_ready_req instance
     */
    public static create(properties?: Iproto_cb_ready_req): proto_cb_ready_req;

    /**
     * Encodes the specified proto_cb_ready_req message. Does not implicitly {@link proto_cb_ready_req.verify|verify} messages.
     * @param message proto_cb_ready_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cb_ready_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cb_ready_req message, length delimited. Does not implicitly {@link proto_cb_ready_req.verify|verify} messages.
     * @param message proto_cb_ready_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cb_ready_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cb_ready_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cb_ready_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cb_ready_req;

    /**
     * Decodes a proto_cb_ready_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cb_ready_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cb_ready_req;

    /**
     * Verifies a proto_cb_ready_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cb_ready_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cb_ready_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cb_ready_req;

    /**
     * Creates a plain object from a proto_cb_ready_req message. Also converts values to other types if specified.
     * @param message proto_cb_ready_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cb_ready_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cb_ready_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_ready_not. */
export interface Iproto_bc_ready_not {

    /** proto_bc_ready_not plyGuid */
    plyGuid: (number|Long);
}

/** Represents a proto_bc_ready_not. */
export class proto_bc_ready_not implements Iproto_bc_ready_not {

    /**
     * Constructs a new proto_bc_ready_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_ready_not);

    /** proto_bc_ready_not plyGuid. */
    public plyGuid: (number|Long);

    /**
     * Creates a new proto_bc_ready_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_ready_not instance
     */
    public static create(properties?: Iproto_bc_ready_not): proto_bc_ready_not;

    /**
     * Encodes the specified proto_bc_ready_not message. Does not implicitly {@link proto_bc_ready_not.verify|verify} messages.
     * @param message proto_bc_ready_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_ready_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_ready_not message, length delimited. Does not implicitly {@link proto_bc_ready_not.verify|verify} messages.
     * @param message proto_bc_ready_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_ready_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_ready_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_ready_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_ready_not;

    /**
     * Decodes a proto_bc_ready_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_ready_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_ready_not;

    /**
     * Verifies a proto_bc_ready_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_ready_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_ready_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_ready_not;

    /**
     * Creates a plain object from a proto_bc_ready_not message. Also converts values to other types if specified.
     * @param message proto_bc_ready_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_ready_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_ready_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cb_change_table_req. */
export interface Iproto_cb_change_table_req {
}

/** Represents a proto_cb_change_table_req. */
export class proto_cb_change_table_req implements Iproto_cb_change_table_req {

    /**
     * Constructs a new proto_cb_change_table_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cb_change_table_req);

    /**
     * Creates a new proto_cb_change_table_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cb_change_table_req instance
     */
    public static create(properties?: Iproto_cb_change_table_req): proto_cb_change_table_req;

    /**
     * Encodes the specified proto_cb_change_table_req message. Does not implicitly {@link proto_cb_change_table_req.verify|verify} messages.
     * @param message proto_cb_change_table_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cb_change_table_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cb_change_table_req message, length delimited. Does not implicitly {@link proto_cb_change_table_req.verify|verify} messages.
     * @param message proto_cb_change_table_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cb_change_table_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cb_change_table_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cb_change_table_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cb_change_table_req;

    /**
     * Decodes a proto_cb_change_table_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cb_change_table_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cb_change_table_req;

    /**
     * Verifies a proto_cb_change_table_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cb_change_table_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cb_change_table_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cb_change_table_req;

    /**
     * Creates a plain object from a proto_cb_change_table_req message. Also converts values to other types if specified.
     * @param message proto_cb_change_table_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cb_change_table_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cb_change_table_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_update_ply_data_not. */
export interface Iproto_bc_update_ply_data_not {

    /** proto_bc_update_ply_data_not plyGuid */
    plyGuid: (number|Long);

    /** proto_bc_update_ply_data_not uptReason */
    uptReason: number;

    /** proto_bc_update_ply_data_not uptType */
    uptType: number;

    /** proto_bc_update_ply_data_not variant */
    variant: number;

    /** proto_bc_update_ply_data_not amount */
    amount: (number|Long);
}

/** Represents a proto_bc_update_ply_data_not. */
export class proto_bc_update_ply_data_not implements Iproto_bc_update_ply_data_not {

    /**
     * Constructs a new proto_bc_update_ply_data_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_update_ply_data_not);

    /** proto_bc_update_ply_data_not plyGuid. */
    public plyGuid: (number|Long);

    /** proto_bc_update_ply_data_not uptReason. */
    public uptReason: number;

    /** proto_bc_update_ply_data_not uptType. */
    public uptType: number;

    /** proto_bc_update_ply_data_not variant. */
    public variant: number;

    /** proto_bc_update_ply_data_not amount. */
    public amount: (number|Long);

    /**
     * Creates a new proto_bc_update_ply_data_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_update_ply_data_not instance
     */
    public static create(properties?: Iproto_bc_update_ply_data_not): proto_bc_update_ply_data_not;

    /**
     * Encodes the specified proto_bc_update_ply_data_not message. Does not implicitly {@link proto_bc_update_ply_data_not.verify|verify} messages.
     * @param message proto_bc_update_ply_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_update_ply_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_update_ply_data_not message, length delimited. Does not implicitly {@link proto_bc_update_ply_data_not.verify|verify} messages.
     * @param message proto_bc_update_ply_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_update_ply_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_update_ply_data_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_update_ply_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_update_ply_data_not;

    /**
     * Decodes a proto_bc_update_ply_data_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_update_ply_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_update_ply_data_not;

    /**
     * Verifies a proto_bc_update_ply_data_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_update_ply_data_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_update_ply_data_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_update_ply_data_not;

    /**
     * Creates a plain object from a proto_bc_update_ply_data_not message. Also converts values to other types if specified.
     * @param message proto_bc_update_ply_data_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_update_ply_data_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_update_ply_data_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_message_not. */
export interface Iproto_bc_message_not {

    /** proto_bc_message_not type */
    type: number;

    /** proto_bc_message_not message */
    message: string;
}

/** Represents a proto_bc_message_not. */
export class proto_bc_message_not implements Iproto_bc_message_not {

    /**
     * Constructs a new proto_bc_message_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_message_not);

    /** proto_bc_message_not type. */
    public type: number;

    /** proto_bc_message_not message. */
    public message: string;

    /**
     * Creates a new proto_bc_message_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_message_not instance
     */
    public static create(properties?: Iproto_bc_message_not): proto_bc_message_not;

    /**
     * Encodes the specified proto_bc_message_not message. Does not implicitly {@link proto_bc_message_not.verify|verify} messages.
     * @param message proto_bc_message_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_message_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_message_not message, length delimited. Does not implicitly {@link proto_bc_message_not.verify|verify} messages.
     * @param message proto_bc_message_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_message_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_message_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_message_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_message_not;

    /**
     * Decodes a proto_bc_message_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_message_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_message_not;

    /**
     * Verifies a proto_bc_message_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_message_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_message_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_message_not;

    /**
     * Creates a plain object from a proto_bc_message_not message. Also converts values to other types if specified.
     * @param message proto_bc_message_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_message_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_message_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_bc_specify_item_update_not. */
export interface Iproto_bc_specify_item_update_not {

    /** proto_bc_specify_item_update_not plyGuid */
    plyGuid: (number|Long);

    /** proto_bc_specify_item_update_not index */
    index: number;

    /** proto_bc_specify_item_update_not num */
    num: number;
}

/** Represents a proto_bc_specify_item_update_not. */
export class proto_bc_specify_item_update_not implements Iproto_bc_specify_item_update_not {

    /**
     * Constructs a new proto_bc_specify_item_update_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_bc_specify_item_update_not);

    /** proto_bc_specify_item_update_not plyGuid. */
    public plyGuid: (number|Long);

    /** proto_bc_specify_item_update_not index. */
    public index: number;

    /** proto_bc_specify_item_update_not num. */
    public num: number;

    /**
     * Creates a new proto_bc_specify_item_update_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_bc_specify_item_update_not instance
     */
    public static create(properties?: Iproto_bc_specify_item_update_not): proto_bc_specify_item_update_not;

    /**
     * Encodes the specified proto_bc_specify_item_update_not message. Does not implicitly {@link proto_bc_specify_item_update_not.verify|verify} messages.
     * @param message proto_bc_specify_item_update_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_bc_specify_item_update_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_bc_specify_item_update_not message, length delimited. Does not implicitly {@link proto_bc_specify_item_update_not.verify|verify} messages.
     * @param message proto_bc_specify_item_update_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_bc_specify_item_update_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_bc_specify_item_update_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_bc_specify_item_update_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_bc_specify_item_update_not;

    /**
     * Decodes a proto_bc_specify_item_update_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_bc_specify_item_update_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_bc_specify_item_update_not;

    /**
     * Verifies a proto_bc_specify_item_update_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_bc_specify_item_update_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_bc_specify_item_update_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_bc_specify_item_update_not;

    /**
     * Creates a plain object from a proto_bc_specify_item_update_not message. Also converts values to other types if specified.
     * @param message proto_bc_specify_item_update_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_bc_specify_item_update_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_bc_specify_item_update_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_game_start_not. */
export interface Iproto_gc_game_start_not {

    /** proto_gc_game_start_not nGameMoney */
    nGameMoney: number;

    /** proto_gc_game_start_not nCardNum */
    nCardNum: number;

    /** proto_gc_game_start_not nLordPos */
    nLordPos: number;

    /** proto_gc_game_start_not cLordCard */
    cLordCard: Iproto_CCard;

    /** proto_gc_game_start_not nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_game_start_not. */
export class proto_gc_game_start_not implements Iproto_gc_game_start_not {

    /**
     * Constructs a new proto_gc_game_start_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_game_start_not);

    /** proto_gc_game_start_not nGameMoney. */
    public nGameMoney: number;

    /** proto_gc_game_start_not nCardNum. */
    public nCardNum: number;

    /** proto_gc_game_start_not nLordPos. */
    public nLordPos: number;

    /** proto_gc_game_start_not cLordCard. */
    public cLordCard: Iproto_CCard;

    /** proto_gc_game_start_not nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_game_start_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_game_start_not instance
     */
    public static create(properties?: Iproto_gc_game_start_not): proto_gc_game_start_not;

    /**
     * Encodes the specified proto_gc_game_start_not message. Does not implicitly {@link proto_gc_game_start_not.verify|verify} messages.
     * @param message proto_gc_game_start_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_game_start_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_game_start_not message, length delimited. Does not implicitly {@link proto_gc_game_start_not.verify|verify} messages.
     * @param message proto_gc_game_start_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_game_start_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_game_start_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_game_start_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_game_start_not;

    /**
     * Decodes a proto_gc_game_start_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_game_start_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_game_start_not;

    /**
     * Verifies a proto_gc_game_start_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_game_start_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_game_start_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_game_start_not;

    /**
     * Creates a plain object from a proto_gc_game_start_not message. Also converts values to other types if specified.
     * @param message proto_gc_game_start_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_game_start_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_game_start_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_counts_not1. */
export interface Iproto_gc_counts_not1 {

    /** proto_gc_counts_not1 countsNum */
    countsNum: number;
}

/** Represents a proto_gc_counts_not1. */
export class proto_gc_counts_not1 implements Iproto_gc_counts_not1 {

    /**
     * Constructs a new proto_gc_counts_not1.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_counts_not1);

    /** proto_gc_counts_not1 countsNum. */
    public countsNum: number;

    /**
     * Creates a new proto_gc_counts_not1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_counts_not1 instance
     */
    public static create(properties?: Iproto_gc_counts_not1): proto_gc_counts_not1;

    /**
     * Encodes the specified proto_gc_counts_not1 message. Does not implicitly {@link proto_gc_counts_not1.verify|verify} messages.
     * @param message proto_gc_counts_not1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_counts_not1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_counts_not1 message, length delimited. Does not implicitly {@link proto_gc_counts_not1.verify|verify} messages.
     * @param message proto_gc_counts_not1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_counts_not1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_counts_not1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_counts_not1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_counts_not1;

    /**
     * Decodes a proto_gc_counts_not1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_counts_not1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_counts_not1;

    /**
     * Verifies a proto_gc_counts_not1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_counts_not1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_counts_not1
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_counts_not1;

    /**
     * Creates a plain object from a proto_gc_counts_not1 message. Also converts values to other types if specified.
     * @param message proto_gc_counts_not1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_counts_not1, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_counts_not1 to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_req. */
export interface Iproto_sic_bet_req {

    /** proto_sic_bet_req cCellID */
    cCellID: number;

    /** proto_sic_bet_req nAmount */
    nAmount: number;
}

/** Represents a proto_sic_bet_req. */
export class proto_sic_bet_req implements Iproto_sic_bet_req {

    /**
     * Constructs a new proto_sic_bet_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_req);

    /** proto_sic_bet_req cCellID. */
    public cCellID: number;

    /** proto_sic_bet_req nAmount. */
    public nAmount: number;

    /**
     * Creates a new proto_sic_bet_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_req instance
     */
    public static create(properties?: Iproto_sic_bet_req): proto_sic_bet_req;

    /**
     * Encodes the specified proto_sic_bet_req message. Does not implicitly {@link proto_sic_bet_req.verify|verify} messages.
     * @param message proto_sic_bet_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_req message, length delimited. Does not implicitly {@link proto_sic_bet_req.verify|verify} messages.
     * @param message proto_sic_bet_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_req;

    /**
     * Decodes a proto_sic_bet_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_req;

    /**
     * Verifies a proto_sic_bet_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_req;

    /**
     * Creates a plain object from a proto_sic_bet_req message. Also converts values to other types if specified.
     * @param message proto_sic_bet_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_task_not. */
export interface Iproto_gc_task_not {

    /** proto_gc_task_not taskItem */
    taskItem: Iproto_TaskItem;
}

/** Represents a proto_gc_task_not. */
export class proto_gc_task_not implements Iproto_gc_task_not {

    /**
     * Constructs a new proto_gc_task_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_task_not);

    /** proto_gc_task_not taskItem. */
    public taskItem: Iproto_TaskItem;

    /**
     * Creates a new proto_gc_task_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_task_not instance
     */
    public static create(properties?: Iproto_gc_task_not): proto_gc_task_not;

    /**
     * Encodes the specified proto_gc_task_not message. Does not implicitly {@link proto_gc_task_not.verify|verify} messages.
     * @param message proto_gc_task_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_task_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_task_not message, length delimited. Does not implicitly {@link proto_gc_task_not.verify|verify} messages.
     * @param message proto_gc_task_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_task_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_task_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_task_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_task_not;

    /**
     * Decodes a proto_gc_task_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_task_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_task_not;

    /**
     * Verifies a proto_gc_task_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_task_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_task_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_task_not;

    /**
     * Creates a plain object from a proto_gc_task_not message. Also converts values to other types if specified.
     * @param message proto_gc_task_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_task_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_task_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_two_lord_card_not. */
export interface Iproto_gc_two_lord_card_not {

    /** proto_gc_two_lord_card_not cLord */
    cLord: number;

    /** proto_gc_two_lord_card_not vecCards */
    vecCards?: (Iproto_CCard[]|null);

    /** proto_gc_two_lord_card_not nLetNum */
    nLetNum: number;

    /** proto_gc_two_lord_card_not nLordLetNum */
    nLordLetNum: number;
}

/** Represents a proto_gc_two_lord_card_not. */
export class proto_gc_two_lord_card_not implements Iproto_gc_two_lord_card_not {

    /**
     * Constructs a new proto_gc_two_lord_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_two_lord_card_not);

    /** proto_gc_two_lord_card_not cLord. */
    public cLord: number;

    /** proto_gc_two_lord_card_not vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_two_lord_card_not nLetNum. */
    public nLetNum: number;

    /** proto_gc_two_lord_card_not nLordLetNum. */
    public nLordLetNum: number;

    /**
     * Creates a new proto_gc_two_lord_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_two_lord_card_not instance
     */
    public static create(properties?: Iproto_gc_two_lord_card_not): proto_gc_two_lord_card_not;

    /**
     * Encodes the specified proto_gc_two_lord_card_not message. Does not implicitly {@link proto_gc_two_lord_card_not.verify|verify} messages.
     * @param message proto_gc_two_lord_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_two_lord_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_two_lord_card_not message, length delimited. Does not implicitly {@link proto_gc_two_lord_card_not.verify|verify} messages.
     * @param message proto_gc_two_lord_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_two_lord_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_two_lord_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_two_lord_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_two_lord_card_not;

    /**
     * Decodes a proto_gc_two_lord_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_two_lord_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_two_lord_card_not;

    /**
     * Verifies a proto_gc_two_lord_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_two_lord_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_two_lord_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_two_lord_card_not;

    /**
     * Creates a plain object from a proto_gc_two_lord_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_two_lord_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_two_lord_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_two_lord_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_expression_not. */
export interface Iproto_gc_expression_not {

    /** proto_gc_expression_not expressionType */
    expressionType: number;

    /** proto_gc_expression_not expressionNum */
    expressionNum: number;
}

/** Represents a proto_gc_expression_not. */
export class proto_gc_expression_not implements Iproto_gc_expression_not {

    /**
     * Constructs a new proto_gc_expression_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_expression_not);

    /** proto_gc_expression_not expressionType. */
    public expressionType: number;

    /** proto_gc_expression_not expressionNum. */
    public expressionNum: number;

    /**
     * Creates a new proto_gc_expression_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_expression_not instance
     */
    public static create(properties?: Iproto_gc_expression_not): proto_gc_expression_not;

    /**
     * Encodes the specified proto_gc_expression_not message. Does not implicitly {@link proto_gc_expression_not.verify|verify} messages.
     * @param message proto_gc_expression_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_expression_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_expression_not message, length delimited. Does not implicitly {@link proto_gc_expression_not.verify|verify} messages.
     * @param message proto_gc_expression_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_expression_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_expression_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_expression_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_expression_not;

    /**
     * Decodes a proto_gc_expression_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_expression_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_expression_not;

    /**
     * Verifies a proto_gc_expression_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_expression_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_expression_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_expression_not;

    /**
     * Creates a plain object from a proto_gc_expression_not message. Also converts values to other types if specified.
     * @param message proto_gc_expression_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_expression_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_expression_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_use_card_recode_noti. */
export interface Iproto_gc_use_card_recode_noti {

    /** proto_gc_use_card_recode_noti cChairID */
    cChairID: number;

    /** proto_gc_use_card_recode_noti cReconnection */
    cReconnection: number;
}

/** Represents a proto_gc_use_card_recode_noti. */
export class proto_gc_use_card_recode_noti implements Iproto_gc_use_card_recode_noti {

    /**
     * Constructs a new proto_gc_use_card_recode_noti.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_use_card_recode_noti);

    /** proto_gc_use_card_recode_noti cChairID. */
    public cChairID: number;

    /** proto_gc_use_card_recode_noti cReconnection. */
    public cReconnection: number;

    /**
     * Creates a new proto_gc_use_card_recode_noti instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_use_card_recode_noti instance
     */
    public static create(properties?: Iproto_gc_use_card_recode_noti): proto_gc_use_card_recode_noti;

    /**
     * Encodes the specified proto_gc_use_card_recode_noti message. Does not implicitly {@link proto_gc_use_card_recode_noti.verify|verify} messages.
     * @param message proto_gc_use_card_recode_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_use_card_recode_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_use_card_recode_noti message, length delimited. Does not implicitly {@link proto_gc_use_card_recode_noti.verify|verify} messages.
     * @param message proto_gc_use_card_recode_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_use_card_recode_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_use_card_recode_noti message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_use_card_recode_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_use_card_recode_noti;

    /**
     * Decodes a proto_gc_use_card_recode_noti message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_use_card_recode_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_use_card_recode_noti;

    /**
     * Verifies a proto_gc_use_card_recode_noti message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_use_card_recode_noti message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_use_card_recode_noti
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_use_card_recode_noti;

    /**
     * Creates a plain object from a proto_gc_use_card_recode_noti message. Also converts values to other types if specified.
     * @param message proto_gc_use_card_recode_noti
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_use_card_recode_noti, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_use_card_recode_noti to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_card_recode_req. */
export interface Iproto_gc_card_recode_req {
}

/** Represents a proto_gc_card_recode_req. */
export class proto_gc_card_recode_req implements Iproto_gc_card_recode_req {

    /**
     * Constructs a new proto_gc_card_recode_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_card_recode_req);

    /**
     * Creates a new proto_gc_card_recode_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_card_recode_req instance
     */
    public static create(properties?: Iproto_gc_card_recode_req): proto_gc_card_recode_req;

    /**
     * Encodes the specified proto_gc_card_recode_req message. Does not implicitly {@link proto_gc_card_recode_req.verify|verify} messages.
     * @param message proto_gc_card_recode_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_card_recode_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_card_recode_req message, length delimited. Does not implicitly {@link proto_gc_card_recode_req.verify|verify} messages.
     * @param message proto_gc_card_recode_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_card_recode_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_card_recode_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_card_recode_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_card_recode_req;

    /**
     * Decodes a proto_gc_card_recode_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_card_recode_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_card_recode_req;

    /**
     * Verifies a proto_gc_card_recode_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_card_recode_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_card_recode_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_card_recode_req;

    /**
     * Creates a plain object from a proto_gc_card_recode_req message. Also converts values to other types if specified.
     * @param message proto_gc_card_recode_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_card_recode_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_card_recode_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_bomb_not. */
export interface Iproto_gc_bomb_not {

    /** proto_gc_bomb_not nDouble */
    nDouble: number;
}

/** Represents a proto_gc_bomb_not. */
export class proto_gc_bomb_not implements Iproto_gc_bomb_not {

    /**
     * Constructs a new proto_gc_bomb_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_bomb_not);

    /** proto_gc_bomb_not nDouble. */
    public nDouble: number;

    /**
     * Creates a new proto_gc_bomb_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_bomb_not instance
     */
    public static create(properties?: Iproto_gc_bomb_not): proto_gc_bomb_not;

    /**
     * Encodes the specified proto_gc_bomb_not message. Does not implicitly {@link proto_gc_bomb_not.verify|verify} messages.
     * @param message proto_gc_bomb_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_bomb_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_bomb_not message, length delimited. Does not implicitly {@link proto_gc_bomb_not.verify|verify} messages.
     * @param message proto_gc_bomb_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_bomb_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_bomb_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_bomb_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_bomb_not;

    /**
     * Decodes a proto_gc_bomb_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_bomb_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_bomb_not;

    /**
     * Verifies a proto_gc_bomb_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_bomb_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_bomb_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_bomb_not;

    /**
     * Creates a plain object from a proto_gc_bomb_not message. Also converts values to other types if specified.
     * @param message proto_gc_bomb_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_bomb_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_bomb_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_private_room_result_ack. */
export interface Iproto_gc_private_room_result_ack {

    /** proto_gc_private_room_result_ack vecGameStatiscs */
    vecGameStatiscs?: (Iproto_GameStatisc[]|null);
}

/** Represents a proto_gc_private_room_result_ack. */
export class proto_gc_private_room_result_ack implements Iproto_gc_private_room_result_ack {

    /**
     * Constructs a new proto_gc_private_room_result_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_private_room_result_ack);

    /** proto_gc_private_room_result_ack vecGameStatiscs. */
    public vecGameStatiscs: [ 'Array' ].<Iproto_GameStatisc>;

    /**
     * Creates a new proto_gc_private_room_result_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_private_room_result_ack instance
     */
    public static create(properties?: Iproto_gc_private_room_result_ack): proto_gc_private_room_result_ack;

    /**
     * Encodes the specified proto_gc_private_room_result_ack message. Does not implicitly {@link proto_gc_private_room_result_ack.verify|verify} messages.
     * @param message proto_gc_private_room_result_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_private_room_result_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_private_room_result_ack message, length delimited. Does not implicitly {@link proto_gc_private_room_result_ack.verify|verify} messages.
     * @param message proto_gc_private_room_result_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_private_room_result_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_private_room_result_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_private_room_result_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_private_room_result_ack;

    /**
     * Decodes a proto_gc_private_room_result_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_private_room_result_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_private_room_result_ack;

    /**
     * Verifies a proto_gc_private_room_result_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_private_room_result_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_private_room_result_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_private_room_result_ack;

    /**
     * Creates a plain object from a proto_gc_private_room_result_ack message. Also converts values to other types if specified.
     * @param message proto_gc_private_room_result_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_private_room_result_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_private_room_result_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_replay_data_not. */
export interface Iproto_gc_replay_data_not {

    /** proto_gc_replay_data_not vecChangeCards */
    vecChangeCards?: (Iproto_gc_refresh_card_not[]|null);
}

/** Represents a proto_gc_replay_data_not. */
export class proto_gc_replay_data_not implements Iproto_gc_replay_data_not {

    /**
     * Constructs a new proto_gc_replay_data_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_replay_data_not);

    /** proto_gc_replay_data_not vecChangeCards. */
    public vecChangeCards: [ 'Array' ].<Iproto_gc_refresh_card_not>;

    /**
     * Creates a new proto_gc_replay_data_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_replay_data_not instance
     */
    public static create(properties?: Iproto_gc_replay_data_not): proto_gc_replay_data_not;

    /**
     * Encodes the specified proto_gc_replay_data_not message. Does not implicitly {@link proto_gc_replay_data_not.verify|verify} messages.
     * @param message proto_gc_replay_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_replay_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_replay_data_not message, length delimited. Does not implicitly {@link proto_gc_replay_data_not.verify|verify} messages.
     * @param message proto_gc_replay_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_replay_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_replay_data_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_replay_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_replay_data_not;

    /**
     * Decodes a proto_gc_replay_data_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_replay_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_replay_data_not;

    /**
     * Verifies a proto_gc_replay_data_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_replay_data_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_replay_data_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_replay_data_not;

    /**
     * Creates a plain object from a proto_gc_replay_data_not message. Also converts values to other types if specified.
     * @param message proto_gc_replay_data_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_replay_data_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_replay_data_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_bet_lord_card_req. */
export interface Iproto_cg_bet_lord_card_req {

    /** proto_cg_bet_lord_card_req index */
    index: number;
}

/** Represents a proto_cg_bet_lord_card_req. */
export class proto_cg_bet_lord_card_req implements Iproto_cg_bet_lord_card_req {

    /**
     * Constructs a new proto_cg_bet_lord_card_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_bet_lord_card_req);

    /** proto_cg_bet_lord_card_req index. */
    public index: number;

    /**
     * Creates a new proto_cg_bet_lord_card_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_bet_lord_card_req instance
     */
    public static create(properties?: Iproto_cg_bet_lord_card_req): proto_cg_bet_lord_card_req;

    /**
     * Encodes the specified proto_cg_bet_lord_card_req message. Does not implicitly {@link proto_cg_bet_lord_card_req.verify|verify} messages.
     * @param message proto_cg_bet_lord_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_bet_lord_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_bet_lord_card_req message, length delimited. Does not implicitly {@link proto_cg_bet_lord_card_req.verify|verify} messages.
     * @param message proto_cg_bet_lord_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_bet_lord_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_bet_lord_card_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_bet_lord_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_bet_lord_card_req;

    /**
     * Decodes a proto_cg_bet_lord_card_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_bet_lord_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_bet_lord_card_req;

    /**
     * Verifies a proto_cg_bet_lord_card_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_bet_lord_card_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_bet_lord_card_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_bet_lord_card_req;

    /**
     * Creates a plain object from a proto_cg_bet_lord_card_req message. Also converts values to other types if specified.
     * @param message proto_cg_bet_lord_card_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_bet_lord_card_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_bet_lord_card_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_stUserData. */
export interface Iproto_stUserData {

    /** proto_stUserData cChairID */
    cChairID: number;

    /** proto_stUserData vecHandCards */
    vecHandCards?: (Iproto_CCard[]|null);

    /** proto_stUserData vecPutCards */
    vecPutCards?: (Iproto_CCard[]|null);
}

/** Represents a proto_stUserData. */
export class proto_stUserData implements Iproto_stUserData {

    /**
     * Constructs a new proto_stUserData.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_stUserData);

    /** proto_stUserData cChairID. */
    public cChairID: number;

    /** proto_stUserData vecHandCards. */
    public vecHandCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_stUserData vecPutCards. */
    public vecPutCards: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_stUserData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_stUserData instance
     */
    public static create(properties?: Iproto_stUserData): proto_stUserData;

    /**
     * Encodes the specified proto_stUserData message. Does not implicitly {@link proto_stUserData.verify|verify} messages.
     * @param message proto_stUserData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_stUserData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_stUserData message, length delimited. Does not implicitly {@link proto_stUserData.verify|verify} messages.
     * @param message proto_stUserData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_stUserData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_stUserData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_stUserData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_stUserData;

    /**
     * Decodes a proto_stUserData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_stUserData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_stUserData;

    /**
     * Verifies a proto_stUserData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_stUserData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_stUserData
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_stUserData;

    /**
     * Creates a plain object from a proto_stUserData message. Also converts values to other types if specified.
     * @param message proto_stUserData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_stUserData, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_stUserData to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_double_score_req. */
export interface Iproto_gc_double_score_req {

    /** proto_gc_double_score_req nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_double_score_req. */
export class proto_gc_double_score_req implements Iproto_gc_double_score_req {

    /**
     * Constructs a new proto_gc_double_score_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_double_score_req);

    /** proto_gc_double_score_req nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_double_score_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_double_score_req instance
     */
    public static create(properties?: Iproto_gc_double_score_req): proto_gc_double_score_req;

    /**
     * Encodes the specified proto_gc_double_score_req message. Does not implicitly {@link proto_gc_double_score_req.verify|verify} messages.
     * @param message proto_gc_double_score_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_double_score_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_double_score_req message, length delimited. Does not implicitly {@link proto_gc_double_score_req.verify|verify} messages.
     * @param message proto_gc_double_score_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_double_score_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_double_score_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_double_score_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_double_score_req;

    /**
     * Decodes a proto_gc_double_score_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_double_score_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_double_score_req;

    /**
     * Verifies a proto_gc_double_score_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_double_score_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_double_score_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_double_score_req;

    /**
     * Creates a plain object from a proto_gc_double_score_req message. Also converts values to other types if specified.
     * @param message proto_gc_double_score_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_double_score_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_double_score_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_game_result_not. */
export interface Iproto_gc_game_result_not {

    /** proto_gc_game_result_not bType */
    bType: number;

    /** proto_gc_game_result_not cDouble */
    cDouble: number;

    /** proto_gc_game_result_not cCallScore */
    cCallScore: number;

    /** proto_gc_game_result_not bShowCard */
    bShowCard: number;

    /** proto_gc_game_result_not nBombCount */
    nBombCount: number;

    /** proto_gc_game_result_not bSpring */
    bSpring: number;

    /** proto_gc_game_result_not bReverseSpring */
    bReverseSpring: number;

    /** proto_gc_game_result_not bRobLord */
    bRobLord: number;

    /** proto_gc_game_result_not vecUserResult */
    vecUserResult?: (Iproto_stUserResult[]|null);
}

/** Represents a proto_gc_game_result_not. */
export class proto_gc_game_result_not implements Iproto_gc_game_result_not {

    /**
     * Constructs a new proto_gc_game_result_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_game_result_not);

    /** proto_gc_game_result_not bType. */
    public bType: number;

    /** proto_gc_game_result_not cDouble. */
    public cDouble: number;

    /** proto_gc_game_result_not cCallScore. */
    public cCallScore: number;

    /** proto_gc_game_result_not bShowCard. */
    public bShowCard: number;

    /** proto_gc_game_result_not nBombCount. */
    public nBombCount: number;

    /** proto_gc_game_result_not bSpring. */
    public bSpring: number;

    /** proto_gc_game_result_not bReverseSpring. */
    public bReverseSpring: number;

    /** proto_gc_game_result_not bRobLord. */
    public bRobLord: number;

    /** proto_gc_game_result_not vecUserResult. */
    public vecUserResult: [ 'Array' ].<Iproto_stUserResult>;

    /**
     * Creates a new proto_gc_game_result_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_game_result_not instance
     */
    public static create(properties?: Iproto_gc_game_result_not): proto_gc_game_result_not;

    /**
     * Encodes the specified proto_gc_game_result_not message. Does not implicitly {@link proto_gc_game_result_not.verify|verify} messages.
     * @param message proto_gc_game_result_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_game_result_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_game_result_not message, length delimited. Does not implicitly {@link proto_gc_game_result_not.verify|verify} messages.
     * @param message proto_gc_game_result_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_game_result_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_game_result_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_game_result_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_game_result_not;

    /**
     * Decodes a proto_gc_game_result_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_game_result_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_game_result_not;

    /**
     * Verifies a proto_gc_game_result_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_game_result_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_game_result_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_game_result_not;

    /**
     * Creates a plain object from a proto_gc_game_result_not message. Also converts values to other types if specified.
     * @param message proto_gc_game_result_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_game_result_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_game_result_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_user_savestar_card_noti. */
export interface Iproto_gc_user_savestar_card_noti {
}

/** Represents a proto_gc_user_savestar_card_noti. */
export class proto_gc_user_savestar_card_noti implements Iproto_gc_user_savestar_card_noti {

    /**
     * Constructs a new proto_gc_user_savestar_card_noti.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_user_savestar_card_noti);

    /**
     * Creates a new proto_gc_user_savestar_card_noti instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_user_savestar_card_noti instance
     */
    public static create(properties?: Iproto_gc_user_savestar_card_noti): proto_gc_user_savestar_card_noti;

    /**
     * Encodes the specified proto_gc_user_savestar_card_noti message. Does not implicitly {@link proto_gc_user_savestar_card_noti.verify|verify} messages.
     * @param message proto_gc_user_savestar_card_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_user_savestar_card_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_user_savestar_card_noti message, length delimited. Does not implicitly {@link proto_gc_user_savestar_card_noti.verify|verify} messages.
     * @param message proto_gc_user_savestar_card_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_user_savestar_card_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_user_savestar_card_noti message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_user_savestar_card_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_user_savestar_card_noti;

    /**
     * Decodes a proto_gc_user_savestar_card_noti message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_user_savestar_card_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_user_savestar_card_noti;

    /**
     * Verifies a proto_gc_user_savestar_card_noti message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_user_savestar_card_noti message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_user_savestar_card_noti
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_user_savestar_card_noti;

    /**
     * Creates a plain object from a proto_gc_user_savestar_card_noti message. Also converts values to other types if specified.
     * @param message proto_gc_user_savestar_card_noti
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_user_savestar_card_noti, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_user_savestar_card_noti to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_counts_not. */
export interface Iproto_gc_counts_not {

    /** proto_gc_counts_not countsNum */
    countsNum: number;
}

/** Represents a proto_gc_counts_not. */
export class proto_gc_counts_not implements Iproto_gc_counts_not {

    /**
     * Constructs a new proto_gc_counts_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_counts_not);

    /** proto_gc_counts_not countsNum. */
    public countsNum: number;

    /**
     * Creates a new proto_gc_counts_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_counts_not instance
     */
    public static create(properties?: Iproto_gc_counts_not): proto_gc_counts_not;

    /**
     * Encodes the specified proto_gc_counts_not message. Does not implicitly {@link proto_gc_counts_not.verify|verify} messages.
     * @param message proto_gc_counts_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_counts_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_counts_not message, length delimited. Does not implicitly {@link proto_gc_counts_not.verify|verify} messages.
     * @param message proto_gc_counts_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_counts_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_counts_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_counts_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_counts_not;

    /**
     * Decodes a proto_gc_counts_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_counts_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_counts_not;

    /**
     * Verifies a proto_gc_counts_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_counts_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_counts_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_counts_not;

    /**
     * Creates a plain object from a proto_gc_counts_not message. Also converts values to other types if specified.
     * @param message proto_gc_counts_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_counts_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_counts_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_three_draw_req_data. */
export interface Iproto_cg_three_draw_req_data {
}

/** Represents a proto_cg_three_draw_req_data. */
export class proto_cg_three_draw_req_data implements Iproto_cg_three_draw_req_data {

    /**
     * Constructs a new proto_cg_three_draw_req_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_three_draw_req_data);

    /**
     * Creates a new proto_cg_three_draw_req_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_three_draw_req_data instance
     */
    public static create(properties?: Iproto_cg_three_draw_req_data): proto_cg_three_draw_req_data;

    /**
     * Encodes the specified proto_cg_three_draw_req_data message. Does not implicitly {@link proto_cg_three_draw_req_data.verify|verify} messages.
     * @param message proto_cg_three_draw_req_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_three_draw_req_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_three_draw_req_data message, length delimited. Does not implicitly {@link proto_cg_three_draw_req_data.verify|verify} messages.
     * @param message proto_cg_three_draw_req_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_three_draw_req_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_three_draw_req_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_three_draw_req_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_three_draw_req_data;

    /**
     * Decodes a proto_cg_three_draw_req_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_three_draw_req_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_three_draw_req_data;

    /**
     * Verifies a proto_cg_three_draw_req_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_three_draw_req_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_three_draw_req_data
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_three_draw_req_data;

    /**
     * Creates a plain object from a proto_cg_three_draw_req_data message. Also converts values to other types if specified.
     * @param message proto_cg_three_draw_req_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_three_draw_req_data, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_three_draw_req_data to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_starsky_update_item_noti. */
export interface Iproto_gc_starsky_update_item_noti {

    /** proto_gc_starsky_update_item_noti stamina */
    stamina: number;

    /** proto_gc_starsky_update_item_noti matchTicket */
    matchTicket: number;

    /** proto_gc_starsky_update_item_noti score */
    score: number;

    /** proto_gc_starsky_update_item_noti savestarCard */
    savestarCard: number;
}

/** Represents a proto_gc_starsky_update_item_noti. */
export class proto_gc_starsky_update_item_noti implements Iproto_gc_starsky_update_item_noti {

    /**
     * Constructs a new proto_gc_starsky_update_item_noti.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_starsky_update_item_noti);

    /** proto_gc_starsky_update_item_noti stamina. */
    public stamina: number;

    /** proto_gc_starsky_update_item_noti matchTicket. */
    public matchTicket: number;

    /** proto_gc_starsky_update_item_noti score. */
    public score: number;

    /** proto_gc_starsky_update_item_noti savestarCard. */
    public savestarCard: number;

    /**
     * Creates a new proto_gc_starsky_update_item_noti instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_starsky_update_item_noti instance
     */
    public static create(properties?: Iproto_gc_starsky_update_item_noti): proto_gc_starsky_update_item_noti;

    /**
     * Encodes the specified proto_gc_starsky_update_item_noti message. Does not implicitly {@link proto_gc_starsky_update_item_noti.verify|verify} messages.
     * @param message proto_gc_starsky_update_item_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_starsky_update_item_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_starsky_update_item_noti message, length delimited. Does not implicitly {@link proto_gc_starsky_update_item_noti.verify|verify} messages.
     * @param message proto_gc_starsky_update_item_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_starsky_update_item_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_starsky_update_item_noti message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_starsky_update_item_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_starsky_update_item_noti;

    /**
     * Decodes a proto_gc_starsky_update_item_noti message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_starsky_update_item_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_starsky_update_item_noti;

    /**
     * Verifies a proto_gc_starsky_update_item_noti message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_starsky_update_item_noti message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_starsky_update_item_noti
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_starsky_update_item_noti;

    /**
     * Creates a plain object from a proto_gc_starsky_update_item_noti message. Also converts values to other types if specified.
     * @param message proto_gc_starsky_update_item_noti
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_starsky_update_item_noti, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_starsky_update_item_noti to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_magic_emoji_noti. */
export interface Iproto_magic_emoji_noti {

    /** proto_magic_emoji_noti cIsError */
    cIsError: number;

    /** proto_magic_emoji_noti cEmojiIndex */
    cEmojiIndex: number;

    /** proto_magic_emoji_noti cFromChairID */
    cFromChairID: number;

    /** proto_magic_emoji_noti cToChairID */
    cToChairID: number;
}

/** Represents a proto_magic_emoji_noti. */
export class proto_magic_emoji_noti implements Iproto_magic_emoji_noti {

    /**
     * Constructs a new proto_magic_emoji_noti.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_magic_emoji_noti);

    /** proto_magic_emoji_noti cIsError. */
    public cIsError: number;

    /** proto_magic_emoji_noti cEmojiIndex. */
    public cEmojiIndex: number;

    /** proto_magic_emoji_noti cFromChairID. */
    public cFromChairID: number;

    /** proto_magic_emoji_noti cToChairID. */
    public cToChairID: number;

    /**
     * Creates a new proto_magic_emoji_noti instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_magic_emoji_noti instance
     */
    public static create(properties?: Iproto_magic_emoji_noti): proto_magic_emoji_noti;

    /**
     * Encodes the specified proto_magic_emoji_noti message. Does not implicitly {@link proto_magic_emoji_noti.verify|verify} messages.
     * @param message proto_magic_emoji_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_magic_emoji_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_magic_emoji_noti message, length delimited. Does not implicitly {@link proto_magic_emoji_noti.verify|verify} messages.
     * @param message proto_magic_emoji_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_magic_emoji_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_magic_emoji_noti message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_magic_emoji_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_magic_emoji_noti;

    /**
     * Decodes a proto_magic_emoji_noti message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_magic_emoji_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_magic_emoji_noti;

    /**
     * Verifies a proto_magic_emoji_noti message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_magic_emoji_noti message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_magic_emoji_noti
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_magic_emoji_noti;

    /**
     * Creates a plain object from a proto_magic_emoji_noti message. Also converts values to other types if specified.
     * @param message proto_magic_emoji_noti
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_magic_emoji_noti, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_magic_emoji_noti to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_complete_data_req. */
export interface Iproto_cg_complete_data_req {
}

/** Represents a proto_cg_complete_data_req. */
export class proto_cg_complete_data_req implements Iproto_cg_complete_data_req {

    /**
     * Constructs a new proto_cg_complete_data_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_complete_data_req);

    /**
     * Creates a new proto_cg_complete_data_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_complete_data_req instance
     */
    public static create(properties?: Iproto_cg_complete_data_req): proto_cg_complete_data_req;

    /**
     * Encodes the specified proto_cg_complete_data_req message. Does not implicitly {@link proto_cg_complete_data_req.verify|verify} messages.
     * @param message proto_cg_complete_data_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_complete_data_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_complete_data_req message, length delimited. Does not implicitly {@link proto_cg_complete_data_req.verify|verify} messages.
     * @param message proto_cg_complete_data_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_complete_data_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_complete_data_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_complete_data_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_complete_data_req;

    /**
     * Decodes a proto_cg_complete_data_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_complete_data_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_complete_data_req;

    /**
     * Verifies a proto_cg_complete_data_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_complete_data_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_complete_data_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_complete_data_req;

    /**
     * Creates a plain object from a proto_cg_complete_data_req message. Also converts values to other types if specified.
     * @param message proto_cg_complete_data_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_complete_data_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_complete_data_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_update_ack. */
export interface Iproto_sic_bet_update_ack {

    /** proto_sic_bet_update_ack nBetUpdateAckTag */
    nBetUpdateAckTag: number;

    /** proto_sic_bet_update_ack vecAmountCell */
    vecAmountCell?: (Iproto_st_sic_cell[]|null);
}

/** Represents a proto_sic_bet_update_ack. */
export class proto_sic_bet_update_ack implements Iproto_sic_bet_update_ack {

    /**
     * Constructs a new proto_sic_bet_update_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_update_ack);

    /** proto_sic_bet_update_ack nBetUpdateAckTag. */
    public nBetUpdateAckTag: number;

    /** proto_sic_bet_update_ack vecAmountCell. */
    public vecAmountCell: [ 'Array' ].<Iproto_st_sic_cell>;

    /**
     * Creates a new proto_sic_bet_update_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_update_ack instance
     */
    public static create(properties?: Iproto_sic_bet_update_ack): proto_sic_bet_update_ack;

    /**
     * Encodes the specified proto_sic_bet_update_ack message. Does not implicitly {@link proto_sic_bet_update_ack.verify|verify} messages.
     * @param message proto_sic_bet_update_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_update_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_update_ack message, length delimited. Does not implicitly {@link proto_sic_bet_update_ack.verify|verify} messages.
     * @param message proto_sic_bet_update_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_update_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_update_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_update_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_update_ack;

    /**
     * Decodes a proto_sic_bet_update_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_update_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_update_ack;

    /**
     * Verifies a proto_sic_bet_update_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_update_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_update_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_update_ack;

    /**
     * Creates a plain object from a proto_sic_bet_update_ack message. Also converts values to other types if specified.
     * @param message proto_sic_bet_update_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_update_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_update_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_bet_lord_card_ack. */
export interface Iproto_gc_bet_lord_card_ack {

    /** proto_gc_bet_lord_card_ack ret */
    ret: number;

    /** proto_gc_bet_lord_card_ack index */
    index: number;
}

/** Represents a proto_gc_bet_lord_card_ack. */
export class proto_gc_bet_lord_card_ack implements Iproto_gc_bet_lord_card_ack {

    /**
     * Constructs a new proto_gc_bet_lord_card_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_bet_lord_card_ack);

    /** proto_gc_bet_lord_card_ack ret. */
    public ret: number;

    /** proto_gc_bet_lord_card_ack index. */
    public index: number;

    /**
     * Creates a new proto_gc_bet_lord_card_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_bet_lord_card_ack instance
     */
    public static create(properties?: Iproto_gc_bet_lord_card_ack): proto_gc_bet_lord_card_ack;

    /**
     * Encodes the specified proto_gc_bet_lord_card_ack message. Does not implicitly {@link proto_gc_bet_lord_card_ack.verify|verify} messages.
     * @param message proto_gc_bet_lord_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_bet_lord_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_bet_lord_card_ack message, length delimited. Does not implicitly {@link proto_gc_bet_lord_card_ack.verify|verify} messages.
     * @param message proto_gc_bet_lord_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_bet_lord_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_bet_lord_card_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_bet_lord_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_bet_lord_card_ack;

    /**
     * Decodes a proto_gc_bet_lord_card_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_bet_lord_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_bet_lord_card_ack;

    /**
     * Verifies a proto_gc_bet_lord_card_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_bet_lord_card_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_bet_lord_card_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_bet_lord_card_ack;

    /**
     * Creates a plain object from a proto_gc_bet_lord_card_ack message. Also converts values to other types if specified.
     * @param message proto_gc_bet_lord_card_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_bet_lord_card_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_bet_lord_card_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_double_score_not. */
export interface Iproto_gc_double_score_not {

    /** proto_gc_double_score_not nDouble */
    nDouble: number;

    /** proto_gc_double_score_not nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_double_score_not. */
export class proto_gc_double_score_not implements Iproto_gc_double_score_not {

    /**
     * Constructs a new proto_gc_double_score_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_double_score_not);

    /** proto_gc_double_score_not nDouble. */
    public nDouble: number;

    /** proto_gc_double_score_not nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_double_score_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_double_score_not instance
     */
    public static create(properties?: Iproto_gc_double_score_not): proto_gc_double_score_not;

    /**
     * Encodes the specified proto_gc_double_score_not message. Does not implicitly {@link proto_gc_double_score_not.verify|verify} messages.
     * @param message proto_gc_double_score_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_double_score_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_double_score_not message, length delimited. Does not implicitly {@link proto_gc_double_score_not.verify|verify} messages.
     * @param message proto_gc_double_score_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_double_score_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_double_score_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_double_score_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_double_score_not;

    /**
     * Decodes a proto_gc_double_score_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_double_score_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_double_score_not;

    /**
     * Verifies a proto_gc_double_score_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_double_score_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_double_score_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_double_score_not;

    /**
     * Creates a plain object from a proto_gc_double_score_not message. Also converts values to other types if specified.
     * @param message proto_gc_double_score_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_double_score_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_double_score_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_new_round_not. */
export interface Iproto_sic_new_round_not {
}

/** Represents a proto_sic_new_round_not. */
export class proto_sic_new_round_not implements Iproto_sic_new_round_not {

    /**
     * Constructs a new proto_sic_new_round_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_new_round_not);

    /**
     * Creates a new proto_sic_new_round_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_new_round_not instance
     */
    public static create(properties?: Iproto_sic_new_round_not): proto_sic_new_round_not;

    /**
     * Encodes the specified proto_sic_new_round_not message. Does not implicitly {@link proto_sic_new_round_not.verify|verify} messages.
     * @param message proto_sic_new_round_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_new_round_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_new_round_not message, length delimited. Does not implicitly {@link proto_sic_new_round_not.verify|verify} messages.
     * @param message proto_sic_new_round_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_new_round_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_new_round_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_new_round_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_new_round_not;

    /**
     * Decodes a proto_sic_new_round_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_new_round_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_new_round_not;

    /**
     * Verifies a proto_sic_new_round_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_new_round_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_new_round_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_new_round_not;

    /**
     * Creates a plain object from a proto_sic_new_round_not message. Also converts values to other types if specified.
     * @param message proto_sic_new_round_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_new_round_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_new_round_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_st_sic_cell. */
export interface Iproto_st_sic_cell {

    /** proto_st_sic_cell cCellID */
    cCellID: number;

    /** proto_st_sic_cell nAmount */
    nAmount: number;
}

/** Represents a proto_st_sic_cell. */
export class proto_st_sic_cell implements Iproto_st_sic_cell {

    /**
     * Constructs a new proto_st_sic_cell.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_st_sic_cell);

    /** proto_st_sic_cell cCellID. */
    public cCellID: number;

    /** proto_st_sic_cell nAmount. */
    public nAmount: number;

    /**
     * Creates a new proto_st_sic_cell instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_st_sic_cell instance
     */
    public static create(properties?: Iproto_st_sic_cell): proto_st_sic_cell;

    /**
     * Encodes the specified proto_st_sic_cell message. Does not implicitly {@link proto_st_sic_cell.verify|verify} messages.
     * @param message proto_st_sic_cell message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_st_sic_cell, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_st_sic_cell message, length delimited. Does not implicitly {@link proto_st_sic_cell.verify|verify} messages.
     * @param message proto_st_sic_cell message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_st_sic_cell, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_st_sic_cell message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_st_sic_cell
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_st_sic_cell;

    /**
     * Decodes a proto_st_sic_cell message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_st_sic_cell
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_st_sic_cell;

    /**
     * Verifies a proto_st_sic_cell message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_st_sic_cell message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_st_sic_cell
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_st_sic_cell;

    /**
     * Creates a plain object from a proto_st_sic_cell message. Also converts values to other types if specified.
     * @param message proto_st_sic_cell
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_st_sic_cell, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_st_sic_cell to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_play_card_not. */
export interface Iproto_gc_play_card_not {

    /** proto_gc_play_card_not cChairID */
    cChairID: number;

    /** proto_gc_play_card_not vecCards */
    vecCards?: (Iproto_CCard[]|null);

    /** proto_gc_play_card_not cType */
    cType: Iproto_CCardsType;
}

/** Represents a proto_gc_play_card_not. */
export class proto_gc_play_card_not implements Iproto_gc_play_card_not {

    /**
     * Constructs a new proto_gc_play_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_play_card_not);

    /** proto_gc_play_card_not cChairID. */
    public cChairID: number;

    /** proto_gc_play_card_not vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_play_card_not cType. */
    public cType: Iproto_CCardsType;

    /**
     * Creates a new proto_gc_play_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_play_card_not instance
     */
    public static create(properties?: Iproto_gc_play_card_not): proto_gc_play_card_not;

    /**
     * Encodes the specified proto_gc_play_card_not message. Does not implicitly {@link proto_gc_play_card_not.verify|verify} messages.
     * @param message proto_gc_play_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_play_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_play_card_not message, length delimited. Does not implicitly {@link proto_gc_play_card_not.verify|verify} messages.
     * @param message proto_gc_play_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_play_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_play_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_play_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_play_card_not;

    /**
     * Decodes a proto_gc_play_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_play_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_play_card_not;

    /**
     * Verifies a proto_gc_play_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_play_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_play_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_play_card_not;

    /**
     * Creates a plain object from a proto_gc_play_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_play_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_play_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_play_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_item_info_not. */
export interface Iproto_gc_item_info_not {

    /** proto_gc_item_info_not nItemIndex */
    nItemIndex: number;

    /** proto_gc_item_info_not nItemCount */
    nItemCount: number;
}

/** Represents a proto_gc_item_info_not. */
export class proto_gc_item_info_not implements Iproto_gc_item_info_not {

    /**
     * Constructs a new proto_gc_item_info_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_item_info_not);

    /** proto_gc_item_info_not nItemIndex. */
    public nItemIndex: number;

    /** proto_gc_item_info_not nItemCount. */
    public nItemCount: number;

    /**
     * Creates a new proto_gc_item_info_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_item_info_not instance
     */
    public static create(properties?: Iproto_gc_item_info_not): proto_gc_item_info_not;

    /**
     * Encodes the specified proto_gc_item_info_not message. Does not implicitly {@link proto_gc_item_info_not.verify|verify} messages.
     * @param message proto_gc_item_info_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_item_info_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_item_info_not message, length delimited. Does not implicitly {@link proto_gc_item_info_not.verify|verify} messages.
     * @param message proto_gc_item_info_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_item_info_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_item_info_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_item_info_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_item_info_not;

    /**
     * Decodes a proto_gc_item_info_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_item_info_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_item_info_not;

    /**
     * Verifies a proto_gc_item_info_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_item_info_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_item_info_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_item_info_not;

    /**
     * Creates a plain object from a proto_gc_item_info_not message. Also converts values to other types if specified.
     * @param message proto_gc_item_info_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_item_info_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_item_info_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_stUserResult. */
export interface Iproto_stUserResult {

    /** proto_stUserResult nChairID */
    nChairID: number;

    /** proto_stUserResult nScore */
    nScore: number;
}

/** Represents a proto_stUserResult. */
export class proto_stUserResult implements Iproto_stUserResult {

    /**
     * Constructs a new proto_stUserResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_stUserResult);

    /** proto_stUserResult nChairID. */
    public nChairID: number;

    /** proto_stUserResult nScore. */
    public nScore: number;

    /**
     * Creates a new proto_stUserResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_stUserResult instance
     */
    public static create(properties?: Iproto_stUserResult): proto_stUserResult;

    /**
     * Encodes the specified proto_stUserResult message. Does not implicitly {@link proto_stUserResult.verify|verify} messages.
     * @param message proto_stUserResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_stUserResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_stUserResult message, length delimited. Does not implicitly {@link proto_stUserResult.verify|verify} messages.
     * @param message proto_stUserResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_stUserResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_stUserResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_stUserResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_stUserResult;

    /**
     * Decodes a proto_stUserResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_stUserResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_stUserResult;

    /**
     * Verifies a proto_stUserResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_stUserResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_stUserResult
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_stUserResult;

    /**
     * Creates a plain object from a proto_stUserResult message. Also converts values to other types if specified.
     * @param message proto_stUserResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_stUserResult, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_stUserResult to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_starsky_season_noti. */
export interface Iproto_cg_starsky_season_noti {

    /** proto_cg_starsky_season_noti season */
    season: number;
}

/** Represents a proto_cg_starsky_season_noti. */
export class proto_cg_starsky_season_noti implements Iproto_cg_starsky_season_noti {

    /**
     * Constructs a new proto_cg_starsky_season_noti.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_starsky_season_noti);

    /** proto_cg_starsky_season_noti season. */
    public season: number;

    /**
     * Creates a new proto_cg_starsky_season_noti instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_starsky_season_noti instance
     */
    public static create(properties?: Iproto_cg_starsky_season_noti): proto_cg_starsky_season_noti;

    /**
     * Encodes the specified proto_cg_starsky_season_noti message. Does not implicitly {@link proto_cg_starsky_season_noti.verify|verify} messages.
     * @param message proto_cg_starsky_season_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_starsky_season_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_starsky_season_noti message, length delimited. Does not implicitly {@link proto_cg_starsky_season_noti.verify|verify} messages.
     * @param message proto_cg_starsky_season_noti message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_starsky_season_noti, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_starsky_season_noti message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_starsky_season_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_starsky_season_noti;

    /**
     * Decodes a proto_cg_starsky_season_noti message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_starsky_season_noti
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_starsky_season_noti;

    /**
     * Verifies a proto_cg_starsky_season_noti message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_starsky_season_noti message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_starsky_season_noti
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_starsky_season_noti;

    /**
     * Creates a plain object from a proto_cg_starsky_season_noti message. Also converts values to other types if specified.
     * @param message proto_cg_starsky_season_noti
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_starsky_season_noti, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_starsky_season_noti to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_update_player_tokenmoney_not. */
export interface Iproto_gc_update_player_tokenmoney_not {

    /** proto_gc_update_player_tokenmoney_not plyChairid */
    plyChairid: number;

    /** proto_gc_update_player_tokenmoney_not itemInfo */
    itemInfo?: (Iproto_player_itemInfo[]|null);
}

/** Represents a proto_gc_update_player_tokenmoney_not. */
export class proto_gc_update_player_tokenmoney_not implements Iproto_gc_update_player_tokenmoney_not {

    /**
     * Constructs a new proto_gc_update_player_tokenmoney_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_update_player_tokenmoney_not);

    /** proto_gc_update_player_tokenmoney_not plyChairid. */
    public plyChairid: number;

    /** proto_gc_update_player_tokenmoney_not itemInfo. */
    public itemInfo: [ 'Array' ].<Iproto_player_itemInfo>;

    /**
     * Creates a new proto_gc_update_player_tokenmoney_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_update_player_tokenmoney_not instance
     */
    public static create(properties?: Iproto_gc_update_player_tokenmoney_not): proto_gc_update_player_tokenmoney_not;

    /**
     * Encodes the specified proto_gc_update_player_tokenmoney_not message. Does not implicitly {@link proto_gc_update_player_tokenmoney_not.verify|verify} messages.
     * @param message proto_gc_update_player_tokenmoney_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_update_player_tokenmoney_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_update_player_tokenmoney_not message, length delimited. Does not implicitly {@link proto_gc_update_player_tokenmoney_not.verify|verify} messages.
     * @param message proto_gc_update_player_tokenmoney_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_update_player_tokenmoney_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_update_player_tokenmoney_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_update_player_tokenmoney_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_update_player_tokenmoney_not;

    /**
     * Decodes a proto_gc_update_player_tokenmoney_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_update_player_tokenmoney_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_update_player_tokenmoney_not;

    /**
     * Verifies a proto_gc_update_player_tokenmoney_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_update_player_tokenmoney_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_update_player_tokenmoney_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_update_player_tokenmoney_not;

    /**
     * Creates a plain object from a proto_gc_update_player_tokenmoney_not message. Also converts values to other types if specified.
     * @param message proto_gc_update_player_tokenmoney_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_update_player_tokenmoney_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_update_player_tokenmoney_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_player_itemInfo. */
export interface Iproto_player_itemInfo {

    /** proto_player_itemInfo nItemIndex */
    nItemIndex: number;

    /** proto_player_itemInfo nItemNum */
    nItemNum: number;
}

/** Represents a proto_player_itemInfo. */
export class proto_player_itemInfo implements Iproto_player_itemInfo {

    /**
     * Constructs a new proto_player_itemInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_player_itemInfo);

    /** proto_player_itemInfo nItemIndex. */
    public nItemIndex: number;

    /** proto_player_itemInfo nItemNum. */
    public nItemNum: number;

    /**
     * Creates a new proto_player_itemInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_player_itemInfo instance
     */
    public static create(properties?: Iproto_player_itemInfo): proto_player_itemInfo;

    /**
     * Encodes the specified proto_player_itemInfo message. Does not implicitly {@link proto_player_itemInfo.verify|verify} messages.
     * @param message proto_player_itemInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_player_itemInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_player_itemInfo message, length delimited. Does not implicitly {@link proto_player_itemInfo.verify|verify} messages.
     * @param message proto_player_itemInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_player_itemInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_player_itemInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_player_itemInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_player_itemInfo;

    /**
     * Decodes a proto_player_itemInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_player_itemInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_player_itemInfo;

    /**
     * Verifies a proto_player_itemInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_player_itemInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_player_itemInfo
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_player_itemInfo;

    /**
     * Creates a plain object from a proto_player_itemInfo message. Also converts values to other types if specified.
     * @param message proto_player_itemInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_player_itemInfo, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_player_itemInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_common_not. */
export interface Iproto_gc_common_not {

    /** proto_gc_common_not nOp */
    nOp: number;

    /** proto_gc_common_not cChairID */
    cChairID: number;
}

/** Represents a proto_gc_common_not. */
export class proto_gc_common_not implements Iproto_gc_common_not {

    /**
     * Constructs a new proto_gc_common_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_common_not);

    /** proto_gc_common_not nOp. */
    public nOp: number;

    /** proto_gc_common_not cChairID. */
    public cChairID: number;

    /**
     * Creates a new proto_gc_common_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_common_not instance
     */
    public static create(properties?: Iproto_gc_common_not): proto_gc_common_not;

    /**
     * Encodes the specified proto_gc_common_not message. Does not implicitly {@link proto_gc_common_not.verify|verify} messages.
     * @param message proto_gc_common_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_common_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_common_not message, length delimited. Does not implicitly {@link proto_gc_common_not.verify|verify} messages.
     * @param message proto_gc_common_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_common_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_common_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_common_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_common_not;

    /**
     * Decodes a proto_gc_common_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_common_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_common_not;

    /**
     * Verifies a proto_gc_common_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_common_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_common_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_common_not;

    /**
     * Creates a plain object from a proto_gc_common_not message. Also converts values to other types if specified.
     * @param message proto_gc_common_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_common_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_common_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_complete_data_not. */
export interface Iproto_gc_complete_data_not {

    /** proto_gc_complete_data_not nGameMoney */
    nGameMoney: number;

    /** proto_gc_complete_data_not nDouble */
    nDouble: number;

    /** proto_gc_complete_data_not cLord */
    cLord: number;

    /** proto_gc_complete_data_not vecLordCards */
    vecLordCards?: (Iproto_CCard[]|null);

    /** proto_gc_complete_data_not vecData */
    vecData?: (Iproto_stUserData[]|null);
}

/** Represents a proto_gc_complete_data_not. */
export class proto_gc_complete_data_not implements Iproto_gc_complete_data_not {

    /**
     * Constructs a new proto_gc_complete_data_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_complete_data_not);

    /** proto_gc_complete_data_not nGameMoney. */
    public nGameMoney: number;

    /** proto_gc_complete_data_not nDouble. */
    public nDouble: number;

    /** proto_gc_complete_data_not cLord. */
    public cLord: number;

    /** proto_gc_complete_data_not vecLordCards. */
    public vecLordCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_complete_data_not vecData. */
    public vecData: [ 'Array' ].<Iproto_stUserData>;

    /**
     * Creates a new proto_gc_complete_data_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_complete_data_not instance
     */
    public static create(properties?: Iproto_gc_complete_data_not): proto_gc_complete_data_not;

    /**
     * Encodes the specified proto_gc_complete_data_not message. Does not implicitly {@link proto_gc_complete_data_not.verify|verify} messages.
     * @param message proto_gc_complete_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_complete_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_complete_data_not message, length delimited. Does not implicitly {@link proto_gc_complete_data_not.verify|verify} messages.
     * @param message proto_gc_complete_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_complete_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_complete_data_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_complete_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_complete_data_not;

    /**
     * Decodes a proto_gc_complete_data_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_complete_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_complete_data_not;

    /**
     * Verifies a proto_gc_complete_data_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_complete_data_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_complete_data_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_complete_data_not;

    /**
     * Creates a plain object from a proto_gc_complete_data_not message. Also converts values to other types if specified.
     * @param message proto_gc_complete_data_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_complete_data_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_complete_data_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_show_result_not. */
export interface Iproto_sic_show_result_not {
}

/** Represents a proto_sic_show_result_not. */
export class proto_sic_show_result_not implements Iproto_sic_show_result_not {

    /**
     * Constructs a new proto_sic_show_result_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_show_result_not);

    /**
     * Creates a new proto_sic_show_result_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_show_result_not instance
     */
    public static create(properties?: Iproto_sic_show_result_not): proto_sic_show_result_not;

    /**
     * Encodes the specified proto_sic_show_result_not message. Does not implicitly {@link proto_sic_show_result_not.verify|verify} messages.
     * @param message proto_sic_show_result_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_show_result_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_show_result_not message, length delimited. Does not implicitly {@link proto_sic_show_result_not.verify|verify} messages.
     * @param message proto_sic_show_result_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_show_result_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_show_result_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_show_result_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_show_result_not;

    /**
     * Decodes a proto_sic_show_result_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_show_result_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_show_result_not;

    /**
     * Verifies a proto_sic_show_result_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_show_result_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_show_result_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_show_result_not;

    /**
     * Creates a plain object from a proto_sic_show_result_not message. Also converts values to other types if specified.
     * @param message proto_sic_show_result_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_show_result_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_show_result_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_get_redpackets_award_ack. */
export interface Iproto_gc_get_redpackets_award_ack {

    /** proto_gc_get_redpackets_award_ack ret */
    ret: number;

    /** proto_gc_get_redpackets_award_ack curRounds */
    curRounds: number;

    /** proto_gc_get_redpackets_award_ack limitRounds */
    limitRounds: number;

    /** proto_gc_get_redpackets_award_ack nAmount */
    nAmount: number;

    /** proto_gc_get_redpackets_award_ack cItemtype */
    cItemtype: number;

    /** proto_gc_get_redpackets_award_ack taskId */
    taskId: number;

    /** proto_gc_get_redpackets_award_ack fakeItem */
    fakeItem?: (Iproto_player_itemInfo[]|null);
}

/** Represents a proto_gc_get_redpackets_award_ack. */
export class proto_gc_get_redpackets_award_ack implements Iproto_gc_get_redpackets_award_ack {

    /**
     * Constructs a new proto_gc_get_redpackets_award_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_get_redpackets_award_ack);

    /** proto_gc_get_redpackets_award_ack ret. */
    public ret: number;

    /** proto_gc_get_redpackets_award_ack curRounds. */
    public curRounds: number;

    /** proto_gc_get_redpackets_award_ack limitRounds. */
    public limitRounds: number;

    /** proto_gc_get_redpackets_award_ack nAmount. */
    public nAmount: number;

    /** proto_gc_get_redpackets_award_ack cItemtype. */
    public cItemtype: number;

    /** proto_gc_get_redpackets_award_ack taskId. */
    public taskId: number;

    /** proto_gc_get_redpackets_award_ack fakeItem. */
    public fakeItem: [ 'Array' ].<Iproto_player_itemInfo>;

    /**
     * Creates a new proto_gc_get_redpackets_award_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_get_redpackets_award_ack instance
     */
    public static create(properties?: Iproto_gc_get_redpackets_award_ack): proto_gc_get_redpackets_award_ack;

    /**
     * Encodes the specified proto_gc_get_redpackets_award_ack message. Does not implicitly {@link proto_gc_get_redpackets_award_ack.verify|verify} messages.
     * @param message proto_gc_get_redpackets_award_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_get_redpackets_award_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_get_redpackets_award_ack message, length delimited. Does not implicitly {@link proto_gc_get_redpackets_award_ack.verify|verify} messages.
     * @param message proto_gc_get_redpackets_award_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_get_redpackets_award_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_get_redpackets_award_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_get_redpackets_award_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_get_redpackets_award_ack;

    /**
     * Decodes a proto_gc_get_redpackets_award_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_get_redpackets_award_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_get_redpackets_award_ack;

    /**
     * Verifies a proto_gc_get_redpackets_award_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_get_redpackets_award_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_get_redpackets_award_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_get_redpackets_award_ack;

    /**
     * Creates a plain object from a proto_gc_get_redpackets_award_ack message. Also converts values to other types if specified.
     * @param message proto_gc_get_redpackets_award_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_get_redpackets_award_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_get_redpackets_award_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_get_redpackets_award_req. */
export interface Iproto_cg_get_redpackets_award_req {

    /** proto_cg_get_redpackets_award_req type */
    type: number;
}

/** Represents a proto_cg_get_redpackets_award_req. */
export class proto_cg_get_redpackets_award_req implements Iproto_cg_get_redpackets_award_req {

    /**
     * Constructs a new proto_cg_get_redpackets_award_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_get_redpackets_award_req);

    /** proto_cg_get_redpackets_award_req type. */
    public type: number;

    /**
     * Creates a new proto_cg_get_redpackets_award_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_get_redpackets_award_req instance
     */
    public static create(properties?: Iproto_cg_get_redpackets_award_req): proto_cg_get_redpackets_award_req;

    /**
     * Encodes the specified proto_cg_get_redpackets_award_req message. Does not implicitly {@link proto_cg_get_redpackets_award_req.verify|verify} messages.
     * @param message proto_cg_get_redpackets_award_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_get_redpackets_award_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_get_redpackets_award_req message, length delimited. Does not implicitly {@link proto_cg_get_redpackets_award_req.verify|verify} messages.
     * @param message proto_cg_get_redpackets_award_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_get_redpackets_award_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_get_redpackets_award_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_get_redpackets_award_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_get_redpackets_award_req;

    /**
     * Decodes a proto_cg_get_redpackets_award_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_get_redpackets_award_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_get_redpackets_award_req;

    /**
     * Verifies a proto_cg_get_redpackets_award_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_get_redpackets_award_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_get_redpackets_award_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_get_redpackets_award_req;

    /**
     * Creates a plain object from a proto_cg_get_redpackets_award_req message. Also converts values to other types if specified.
     * @param message proto_cg_get_redpackets_award_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_get_redpackets_award_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_get_redpackets_award_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_send_dizhu_not. */
export interface Iproto_gc_send_dizhu_not {

    /** proto_gc_send_dizhu_not nGameMoney */
    nGameMoney: number;
}

/** Represents a proto_gc_send_dizhu_not. */
export class proto_gc_send_dizhu_not implements Iproto_gc_send_dizhu_not {

    /**
     * Constructs a new proto_gc_send_dizhu_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_send_dizhu_not);

    /** proto_gc_send_dizhu_not nGameMoney. */
    public nGameMoney: number;

    /**
     * Creates a new proto_gc_send_dizhu_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_send_dizhu_not instance
     */
    public static create(properties?: Iproto_gc_send_dizhu_not): proto_gc_send_dizhu_not;

    /**
     * Encodes the specified proto_gc_send_dizhu_not message. Does not implicitly {@link proto_gc_send_dizhu_not.verify|verify} messages.
     * @param message proto_gc_send_dizhu_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_send_dizhu_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_send_dizhu_not message, length delimited. Does not implicitly {@link proto_gc_send_dizhu_not.verify|verify} messages.
     * @param message proto_gc_send_dizhu_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_send_dizhu_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_send_dizhu_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_send_dizhu_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_send_dizhu_not;

    /**
     * Decodes a proto_gc_send_dizhu_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_send_dizhu_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_send_dizhu_not;

    /**
     * Verifies a proto_gc_send_dizhu_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_send_dizhu_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_send_dizhu_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_send_dizhu_not;

    /**
     * Creates a plain object from a proto_gc_send_dizhu_not message. Also converts values to other types if specified.
     * @param message proto_gc_send_dizhu_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_send_dizhu_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_send_dizhu_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_ju_count_not. */
export interface Iproto_gc_ju_count_not {

    /** proto_gc_ju_count_not nJuCount */
    nJuCount: number;
}

/** Represents a proto_gc_ju_count_not. */
export class proto_gc_ju_count_not implements Iproto_gc_ju_count_not {

    /**
     * Constructs a new proto_gc_ju_count_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_ju_count_not);

    /** proto_gc_ju_count_not nJuCount. */
    public nJuCount: number;

    /**
     * Creates a new proto_gc_ju_count_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_ju_count_not instance
     */
    public static create(properties?: Iproto_gc_ju_count_not): proto_gc_ju_count_not;

    /**
     * Encodes the specified proto_gc_ju_count_not message. Does not implicitly {@link proto_gc_ju_count_not.verify|verify} messages.
     * @param message proto_gc_ju_count_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_ju_count_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_ju_count_not message, length delimited. Does not implicitly {@link proto_gc_ju_count_not.verify|verify} messages.
     * @param message proto_gc_ju_count_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_ju_count_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_ju_count_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_ju_count_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_ju_count_not;

    /**
     * Decodes a proto_gc_ju_count_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_ju_count_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_ju_count_not;

    /**
     * Verifies a proto_gc_ju_count_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_ju_count_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_ju_count_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_ju_count_not;

    /**
     * Creates a plain object from a proto_gc_ju_count_not message. Also converts values to other types if specified.
     * @param message proto_gc_ju_count_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_ju_count_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_ju_count_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_update_req. */
export interface Iproto_sic_bet_update_req {

    /** proto_sic_bet_update_req nBetUpdateAckTag */
    nBetUpdateAckTag: number;
}

/** Represents a proto_sic_bet_update_req. */
export class proto_sic_bet_update_req implements Iproto_sic_bet_update_req {

    /**
     * Constructs a new proto_sic_bet_update_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_update_req);

    /** proto_sic_bet_update_req nBetUpdateAckTag. */
    public nBetUpdateAckTag: number;

    /**
     * Creates a new proto_sic_bet_update_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_update_req instance
     */
    public static create(properties?: Iproto_sic_bet_update_req): proto_sic_bet_update_req;

    /**
     * Encodes the specified proto_sic_bet_update_req message. Does not implicitly {@link proto_sic_bet_update_req.verify|verify} messages.
     * @param message proto_sic_bet_update_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_update_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_update_req message, length delimited. Does not implicitly {@link proto_sic_bet_update_req.verify|verify} messages.
     * @param message proto_sic_bet_update_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_update_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_update_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_update_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_update_req;

    /**
     * Decodes a proto_sic_bet_update_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_update_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_update_req;

    /**
     * Verifies a proto_sic_bet_update_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_update_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_update_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_update_req;

    /**
     * Creates a plain object from a proto_sic_bet_update_req message. Also converts values to other types if specified.
     * @param message proto_sic_bet_update_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_update_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_update_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_extra_double_score_not. */
export interface Iproto_gc_extra_double_score_not {

    /** proto_gc_extra_double_score_not nDouble */
    nDouble: number;

    /** proto_gc_extra_double_score_not nLordDouble */
    nLordDouble: number;

    /** proto_gc_extra_double_score_not nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_extra_double_score_not. */
export class proto_gc_extra_double_score_not implements Iproto_gc_extra_double_score_not {

    /**
     * Constructs a new proto_gc_extra_double_score_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_extra_double_score_not);

    /** proto_gc_extra_double_score_not nDouble. */
    public nDouble: number;

    /** proto_gc_extra_double_score_not nLordDouble. */
    public nLordDouble: number;

    /** proto_gc_extra_double_score_not nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_extra_double_score_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_extra_double_score_not instance
     */
    public static create(properties?: Iproto_gc_extra_double_score_not): proto_gc_extra_double_score_not;

    /**
     * Encodes the specified proto_gc_extra_double_score_not message. Does not implicitly {@link proto_gc_extra_double_score_not.verify|verify} messages.
     * @param message proto_gc_extra_double_score_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_extra_double_score_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_extra_double_score_not message, length delimited. Does not implicitly {@link proto_gc_extra_double_score_not.verify|verify} messages.
     * @param message proto_gc_extra_double_score_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_extra_double_score_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_extra_double_score_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_extra_double_score_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_extra_double_score_not;

    /**
     * Decodes a proto_gc_extra_double_score_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_extra_double_score_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_extra_double_score_not;

    /**
     * Verifies a proto_gc_extra_double_score_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_extra_double_score_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_extra_double_score_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_extra_double_score_not;

    /**
     * Creates a plain object from a proto_gc_extra_double_score_not message. Also converts values to other types if specified.
     * @param message proto_gc_extra_double_score_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_extra_double_score_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_extra_double_score_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_had_start_not. */
export interface Iproto_gc_had_start_not {
}

/** Represents a proto_gc_had_start_not. */
export class proto_gc_had_start_not implements Iproto_gc_had_start_not {

    /**
     * Constructs a new proto_gc_had_start_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_had_start_not);

    /**
     * Creates a new proto_gc_had_start_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_had_start_not instance
     */
    public static create(properties?: Iproto_gc_had_start_not): proto_gc_had_start_not;

    /**
     * Encodes the specified proto_gc_had_start_not message. Does not implicitly {@link proto_gc_had_start_not.verify|verify} messages.
     * @param message proto_gc_had_start_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_had_start_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_had_start_not message, length delimited. Does not implicitly {@link proto_gc_had_start_not.verify|verify} messages.
     * @param message proto_gc_had_start_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_had_start_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_had_start_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_had_start_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_had_start_not;

    /**
     * Decodes a proto_gc_had_start_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_had_start_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_had_start_not;

    /**
     * Verifies a proto_gc_had_start_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_had_start_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_had_start_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_had_start_not;

    /**
     * Creates a plain object from a proto_gc_had_start_not message. Also converts values to other types if specified.
     * @param message proto_gc_had_start_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_had_start_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_had_start_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_pause_game_not. */
export interface Iproto_gc_pause_game_not {

    /** proto_gc_pause_game_not nFlag */
    nFlag: number;

    /** proto_gc_pause_game_not nMinTime */
    nMinTime: number;

    /** proto_gc_pause_game_not nSecTime */
    nSecTime: number;

    /** proto_gc_pause_game_not cChairId */
    cChairId: number;

    /** proto_gc_pause_game_not sNickName */
    sNickName: string;
}

/** Represents a proto_gc_pause_game_not. */
export class proto_gc_pause_game_not implements Iproto_gc_pause_game_not {

    /**
     * Constructs a new proto_gc_pause_game_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_pause_game_not);

    /** proto_gc_pause_game_not nFlag. */
    public nFlag: number;

    /** proto_gc_pause_game_not nMinTime. */
    public nMinTime: number;

    /** proto_gc_pause_game_not nSecTime. */
    public nSecTime: number;

    /** proto_gc_pause_game_not cChairId. */
    public cChairId: number;

    /** proto_gc_pause_game_not sNickName. */
    public sNickName: string;

    /**
     * Creates a new proto_gc_pause_game_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_pause_game_not instance
     */
    public static create(properties?: Iproto_gc_pause_game_not): proto_gc_pause_game_not;

    /**
     * Encodes the specified proto_gc_pause_game_not message. Does not implicitly {@link proto_gc_pause_game_not.verify|verify} messages.
     * @param message proto_gc_pause_game_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_pause_game_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_pause_game_not message, length delimited. Does not implicitly {@link proto_gc_pause_game_not.verify|verify} messages.
     * @param message proto_gc_pause_game_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_pause_game_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_pause_game_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_pause_game_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_pause_game_not;

    /**
     * Decodes a proto_gc_pause_game_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_pause_game_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_pause_game_not;

    /**
     * Verifies a proto_gc_pause_game_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_pause_game_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_pause_game_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_pause_game_not;

    /**
     * Creates a plain object from a proto_gc_pause_game_not message. Also converts values to other types if specified.
     * @param message proto_gc_pause_game_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_pause_game_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_pause_game_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_private_room_result_not. */
export interface Iproto_gc_private_room_result_not {

    /** proto_gc_private_room_result_not ret */
    ret: number;

    /** proto_gc_private_room_result_not vecGameStatiscs */
    vecGameStatiscs?: (Iproto_GameStatisc[]|null);
}

/** Represents a proto_gc_private_room_result_not. */
export class proto_gc_private_room_result_not implements Iproto_gc_private_room_result_not {

    /**
     * Constructs a new proto_gc_private_room_result_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_private_room_result_not);

    /** proto_gc_private_room_result_not ret. */
    public ret: number;

    /** proto_gc_private_room_result_not vecGameStatiscs. */
    public vecGameStatiscs: [ 'Array' ].<Iproto_GameStatisc>;

    /**
     * Creates a new proto_gc_private_room_result_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_private_room_result_not instance
     */
    public static create(properties?: Iproto_gc_private_room_result_not): proto_gc_private_room_result_not;

    /**
     * Encodes the specified proto_gc_private_room_result_not message. Does not implicitly {@link proto_gc_private_room_result_not.verify|verify} messages.
     * @param message proto_gc_private_room_result_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_private_room_result_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_private_room_result_not message, length delimited. Does not implicitly {@link proto_gc_private_room_result_not.verify|verify} messages.
     * @param message proto_gc_private_room_result_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_private_room_result_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_private_room_result_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_private_room_result_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_private_room_result_not;

    /**
     * Decodes a proto_gc_private_room_result_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_private_room_result_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_private_room_result_not;

    /**
     * Verifies a proto_gc_private_room_result_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_private_room_result_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_private_room_result_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_private_room_result_not;

    /**
     * Creates a plain object from a proto_gc_private_room_result_not message. Also converts values to other types if specified.
     * @param message proto_gc_private_room_result_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_private_room_result_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_private_room_result_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_get_card_ack. */
export interface Iproto_gc_get_card_ack {

    /** proto_gc_get_card_ack num */
    num: number;

    /** proto_gc_get_card_ack vecCards0 */
    vecCards0?: (Iproto_CCard[]|null);

    /** proto_gc_get_card_ack vecCards1 */
    vecCards1?: (Iproto_CCard[]|null);

    /** proto_gc_get_card_ack vecCards2 */
    vecCards2?: (Iproto_CCard[]|null);
}

/** Represents a proto_gc_get_card_ack. */
export class proto_gc_get_card_ack implements Iproto_gc_get_card_ack {

    /**
     * Constructs a new proto_gc_get_card_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_get_card_ack);

    /** proto_gc_get_card_ack num. */
    public num: number;

    /** proto_gc_get_card_ack vecCards0. */
    public vecCards0: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_get_card_ack vecCards1. */
    public vecCards1: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_get_card_ack vecCards2. */
    public vecCards2: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_gc_get_card_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_get_card_ack instance
     */
    public static create(properties?: Iproto_gc_get_card_ack): proto_gc_get_card_ack;

    /**
     * Encodes the specified proto_gc_get_card_ack message. Does not implicitly {@link proto_gc_get_card_ack.verify|verify} messages.
     * @param message proto_gc_get_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_get_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_get_card_ack message, length delimited. Does not implicitly {@link proto_gc_get_card_ack.verify|verify} messages.
     * @param message proto_gc_get_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_get_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_get_card_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_get_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_get_card_ack;

    /**
     * Decodes a proto_gc_get_card_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_get_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_get_card_ack;

    /**
     * Verifies a proto_gc_get_card_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_get_card_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_get_card_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_get_card_ack;

    /**
     * Creates a plain object from a proto_gc_get_card_ack message. Also converts values to other types if specified.
     * @param message proto_gc_get_card_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_get_card_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_get_card_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_private_room_result_req. */
export interface Iproto_cg_private_room_result_req {
}

/** Represents a proto_cg_private_room_result_req. */
export class proto_cg_private_room_result_req implements Iproto_cg_private_room_result_req {

    /**
     * Constructs a new proto_cg_private_room_result_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_private_room_result_req);

    /**
     * Creates a new proto_cg_private_room_result_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_private_room_result_req instance
     */
    public static create(properties?: Iproto_cg_private_room_result_req): proto_cg_private_room_result_req;

    /**
     * Encodes the specified proto_cg_private_room_result_req message. Does not implicitly {@link proto_cg_private_room_result_req.verify|verify} messages.
     * @param message proto_cg_private_room_result_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_private_room_result_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_private_room_result_req message, length delimited. Does not implicitly {@link proto_cg_private_room_result_req.verify|verify} messages.
     * @param message proto_cg_private_room_result_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_private_room_result_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_private_room_result_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_private_room_result_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_private_room_result_req;

    /**
     * Decodes a proto_cg_private_room_result_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_private_room_result_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_private_room_result_req;

    /**
     * Verifies a proto_cg_private_room_result_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_private_room_result_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_private_room_result_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_private_room_result_req;

    /**
     * Creates a plain object from a proto_cg_private_room_result_req message. Also converts values to other types if specified.
     * @param message proto_cg_private_room_result_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_private_room_result_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_private_room_result_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_GameStatisc. */
export interface Iproto_GameStatisc {

    /** proto_GameStatisc cChairID */
    cChairID: number;

    /** proto_GameStatisc nCallTimes */
    nCallTimes: number;

    /** proto_GameStatisc nLordTimes */
    nLordTimes: number;

    /** proto_GameStatisc nWinTimes */
    nWinTimes: number;

    /** proto_GameStatisc nZhanJi */
    nZhanJi: (number|Long);
}

/** Represents a proto_GameStatisc. */
export class proto_GameStatisc implements Iproto_GameStatisc {

    /**
     * Constructs a new proto_GameStatisc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_GameStatisc);

    /** proto_GameStatisc cChairID. */
    public cChairID: number;

    /** proto_GameStatisc nCallTimes. */
    public nCallTimes: number;

    /** proto_GameStatisc nLordTimes. */
    public nLordTimes: number;

    /** proto_GameStatisc nWinTimes. */
    public nWinTimes: number;

    /** proto_GameStatisc nZhanJi. */
    public nZhanJi: (number|Long);

    /**
     * Creates a new proto_GameStatisc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_GameStatisc instance
     */
    public static create(properties?: Iproto_GameStatisc): proto_GameStatisc;

    /**
     * Encodes the specified proto_GameStatisc message. Does not implicitly {@link proto_GameStatisc.verify|verify} messages.
     * @param message proto_GameStatisc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_GameStatisc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_GameStatisc message, length delimited. Does not implicitly {@link proto_GameStatisc.verify|verify} messages.
     * @param message proto_GameStatisc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_GameStatisc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_GameStatisc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_GameStatisc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_GameStatisc;

    /**
     * Decodes a proto_GameStatisc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_GameStatisc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_GameStatisc;

    /**
     * Verifies a proto_GameStatisc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_GameStatisc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_GameStatisc
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_GameStatisc;

    /**
     * Creates a plain object from a proto_GameStatisc message. Also converts values to other types if specified.
     * @param message proto_GameStatisc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_GameStatisc, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_GameStatisc to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_two_show_card_not. */
export interface Iproto_gc_two_show_card_not {

    /** proto_gc_two_show_card_not cChairID */
    cChairID: number;

    /** proto_gc_two_show_card_not nLordPos */
    nLordPos: number;

    /** proto_gc_two_show_card_not cLordCard */
    cLordCard: Iproto_CCard;
}

/** Represents a proto_gc_two_show_card_not. */
export class proto_gc_two_show_card_not implements Iproto_gc_two_show_card_not {

    /**
     * Constructs a new proto_gc_two_show_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_two_show_card_not);

    /** proto_gc_two_show_card_not cChairID. */
    public cChairID: number;

    /** proto_gc_two_show_card_not nLordPos. */
    public nLordPos: number;

    /** proto_gc_two_show_card_not cLordCard. */
    public cLordCard: Iproto_CCard;

    /**
     * Creates a new proto_gc_two_show_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_two_show_card_not instance
     */
    public static create(properties?: Iproto_gc_two_show_card_not): proto_gc_two_show_card_not;

    /**
     * Encodes the specified proto_gc_two_show_card_not message. Does not implicitly {@link proto_gc_two_show_card_not.verify|verify} messages.
     * @param message proto_gc_two_show_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_two_show_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_two_show_card_not message, length delimited. Does not implicitly {@link proto_gc_two_show_card_not.verify|verify} messages.
     * @param message proto_gc_two_show_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_two_show_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_two_show_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_two_show_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_two_show_card_not;

    /**
     * Decodes a proto_gc_two_show_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_two_show_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_two_show_card_not;

    /**
     * Verifies a proto_gc_two_show_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_two_show_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_two_show_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_two_show_card_not;

    /**
     * Creates a plain object from a proto_gc_two_show_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_two_show_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_two_show_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_two_show_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_two_complete_data_not. */
export interface Iproto_gc_two_complete_data_not {

    /** proto_gc_two_complete_data_not nGameMoney */
    nGameMoney: number;

    /** proto_gc_two_complete_data_not nDouble */
    nDouble: number;

    /** proto_gc_two_complete_data_not cLord */
    cLord: number;

    /** proto_gc_two_complete_data_not vecLordCards */
    vecLordCards?: (Iproto_CCard[]|null);

    /** proto_gc_two_complete_data_not vecData */
    vecData?: (Iproto_stUserData[]|null);

    /** proto_gc_two_complete_data_not nLetNum */
    nLetNum: number;

    /** proto_gc_two_complete_data_not nStart */
    nStart: number;
}

/** Represents a proto_gc_two_complete_data_not. */
export class proto_gc_two_complete_data_not implements Iproto_gc_two_complete_data_not {

    /**
     * Constructs a new proto_gc_two_complete_data_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_two_complete_data_not);

    /** proto_gc_two_complete_data_not nGameMoney. */
    public nGameMoney: number;

    /** proto_gc_two_complete_data_not nDouble. */
    public nDouble: number;

    /** proto_gc_two_complete_data_not cLord. */
    public cLord: number;

    /** proto_gc_two_complete_data_not vecLordCards. */
    public vecLordCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_two_complete_data_not vecData. */
    public vecData: [ 'Array' ].<Iproto_stUserData>;

    /** proto_gc_two_complete_data_not nLetNum. */
    public nLetNum: number;

    /** proto_gc_two_complete_data_not nStart. */
    public nStart: number;

    /**
     * Creates a new proto_gc_two_complete_data_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_two_complete_data_not instance
     */
    public static create(properties?: Iproto_gc_two_complete_data_not): proto_gc_two_complete_data_not;

    /**
     * Encodes the specified proto_gc_two_complete_data_not message. Does not implicitly {@link proto_gc_two_complete_data_not.verify|verify} messages.
     * @param message proto_gc_two_complete_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_two_complete_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_two_complete_data_not message, length delimited. Does not implicitly {@link proto_gc_two_complete_data_not.verify|verify} messages.
     * @param message proto_gc_two_complete_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_two_complete_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_two_complete_data_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_two_complete_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_two_complete_data_not;

    /**
     * Decodes a proto_gc_two_complete_data_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_two_complete_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_two_complete_data_not;

    /**
     * Verifies a proto_gc_two_complete_data_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_two_complete_data_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_two_complete_data_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_two_complete_data_not;

    /**
     * Creates a plain object from a proto_gc_two_complete_data_not message. Also converts values to other types if specified.
     * @param message proto_gc_two_complete_data_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_two_complete_data_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_two_complete_data_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_stUserResult1. */
export interface Iproto_stUserResult1 {

    /** proto_stUserResult1 nChairID */
    nChairID: number;

    /** proto_stUserResult1 nScore */
    nScore: number;

    /** proto_stUserResult1 nJifen */
    nJifen: number;
}

/** Represents a proto_stUserResult1. */
export class proto_stUserResult1 implements Iproto_stUserResult1 {

    /**
     * Constructs a new proto_stUserResult1.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_stUserResult1);

    /** proto_stUserResult1 nChairID. */
    public nChairID: number;

    /** proto_stUserResult1 nScore. */
    public nScore: number;

    /** proto_stUserResult1 nJifen. */
    public nJifen: number;

    /**
     * Creates a new proto_stUserResult1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_stUserResult1 instance
     */
    public static create(properties?: Iproto_stUserResult1): proto_stUserResult1;

    /**
     * Encodes the specified proto_stUserResult1 message. Does not implicitly {@link proto_stUserResult1.verify|verify} messages.
     * @param message proto_stUserResult1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_stUserResult1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_stUserResult1 message, length delimited. Does not implicitly {@link proto_stUserResult1.verify|verify} messages.
     * @param message proto_stUserResult1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_stUserResult1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_stUserResult1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_stUserResult1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_stUserResult1;

    /**
     * Decodes a proto_stUserResult1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_stUserResult1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_stUserResult1;

    /**
     * Verifies a proto_stUserResult1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_stUserResult1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_stUserResult1
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_stUserResult1;

    /**
     * Creates a plain object from a proto_stUserResult1 message. Also converts values to other types if specified.
     * @param message proto_stUserResult1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_stUserResult1, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_stUserResult1 to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_two_let_card_not. */
export interface Iproto_gc_two_let_card_not {

    /** proto_gc_two_let_card_not nLetNum */
    nLetNum: number;
}

/** Represents a proto_gc_two_let_card_not. */
export class proto_gc_two_let_card_not implements Iproto_gc_two_let_card_not {

    /**
     * Constructs a new proto_gc_two_let_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_two_let_card_not);

    /** proto_gc_two_let_card_not nLetNum. */
    public nLetNum: number;

    /**
     * Creates a new proto_gc_two_let_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_two_let_card_not instance
     */
    public static create(properties?: Iproto_gc_two_let_card_not): proto_gc_two_let_card_not;

    /**
     * Encodes the specified proto_gc_two_let_card_not message. Does not implicitly {@link proto_gc_two_let_card_not.verify|verify} messages.
     * @param message proto_gc_two_let_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_two_let_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_two_let_card_not message, length delimited. Does not implicitly {@link proto_gc_two_let_card_not.verify|verify} messages.
     * @param message proto_gc_two_let_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_two_let_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_two_let_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_two_let_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_two_let_card_not;

    /**
     * Decodes a proto_gc_two_let_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_two_let_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_two_let_card_not;

    /**
     * Verifies a proto_gc_two_let_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_two_let_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_two_let_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_two_let_card_not;

    /**
     * Creates a plain object from a proto_gc_two_let_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_two_let_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_two_let_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_two_let_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_get_card_req. */
export interface Iproto_cg_get_card_req {

    /** proto_cg_get_card_req nSerialID */
    nSerialID: number;
}

/** Represents a proto_cg_get_card_req. */
export class proto_cg_get_card_req implements Iproto_cg_get_card_req {

    /**
     * Constructs a new proto_cg_get_card_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_get_card_req);

    /** proto_cg_get_card_req nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_cg_get_card_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_get_card_req instance
     */
    public static create(properties?: Iproto_cg_get_card_req): proto_cg_get_card_req;

    /**
     * Encodes the specified proto_cg_get_card_req message. Does not implicitly {@link proto_cg_get_card_req.verify|verify} messages.
     * @param message proto_cg_get_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_get_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_get_card_req message, length delimited. Does not implicitly {@link proto_cg_get_card_req.verify|verify} messages.
     * @param message proto_cg_get_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_get_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_get_card_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_get_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_get_card_req;

    /**
     * Decodes a proto_cg_get_card_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_get_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_get_card_req;

    /**
     * Verifies a proto_cg_get_card_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_get_card_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_get_card_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_get_card_req;

    /**
     * Creates a plain object from a proto_cg_get_card_req message. Also converts values to other types if specified.
     * @param message proto_cg_get_card_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_get_card_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_get_card_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_lord_card_lottery_info. */
export interface Iproto_gc_lord_card_lottery_info {

    /** proto_gc_lord_card_lottery_info fee */
    fee: number;

    /** proto_gc_lord_card_lottery_info vecReward */
    vecReward?: (number[]|null);
}

/** Represents a proto_gc_lord_card_lottery_info. */
export class proto_gc_lord_card_lottery_info implements Iproto_gc_lord_card_lottery_info {

    /**
     * Constructs a new proto_gc_lord_card_lottery_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_lord_card_lottery_info);

    /** proto_gc_lord_card_lottery_info fee. */
    public fee: number;

    /** proto_gc_lord_card_lottery_info vecReward. */
    public vecReward: [ 'Array' ].<number>;

    /**
     * Creates a new proto_gc_lord_card_lottery_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_lord_card_lottery_info instance
     */
    public static create(properties?: Iproto_gc_lord_card_lottery_info): proto_gc_lord_card_lottery_info;

    /**
     * Encodes the specified proto_gc_lord_card_lottery_info message. Does not implicitly {@link proto_gc_lord_card_lottery_info.verify|verify} messages.
     * @param message proto_gc_lord_card_lottery_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_lord_card_lottery_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_lord_card_lottery_info message, length delimited. Does not implicitly {@link proto_gc_lord_card_lottery_info.verify|verify} messages.
     * @param message proto_gc_lord_card_lottery_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_lord_card_lottery_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_lord_card_lottery_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_lord_card_lottery_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_lord_card_lottery_info;

    /**
     * Decodes a proto_gc_lord_card_lottery_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_lord_card_lottery_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_lord_card_lottery_info;

    /**
     * Verifies a proto_gc_lord_card_lottery_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_lord_card_lottery_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_lord_card_lottery_info
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_lord_card_lottery_info;

    /**
     * Creates a plain object from a proto_gc_lord_card_lottery_info message. Also converts values to other types if specified.
     * @param message proto_gc_lord_card_lottery_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_lord_card_lottery_info, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_lord_card_lottery_info to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_get_lord_card_reward. */
export interface Iproto_gc_get_lord_card_reward {

    /** proto_gc_get_lord_card_reward index */
    index: number;

    /** proto_gc_get_lord_card_reward money */
    money: number;
}

/** Represents a proto_gc_get_lord_card_reward. */
export class proto_gc_get_lord_card_reward implements Iproto_gc_get_lord_card_reward {

    /**
     * Constructs a new proto_gc_get_lord_card_reward.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_get_lord_card_reward);

    /** proto_gc_get_lord_card_reward index. */
    public index: number;

    /** proto_gc_get_lord_card_reward money. */
    public money: number;

    /**
     * Creates a new proto_gc_get_lord_card_reward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_get_lord_card_reward instance
     */
    public static create(properties?: Iproto_gc_get_lord_card_reward): proto_gc_get_lord_card_reward;

    /**
     * Encodes the specified proto_gc_get_lord_card_reward message. Does not implicitly {@link proto_gc_get_lord_card_reward.verify|verify} messages.
     * @param message proto_gc_get_lord_card_reward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_get_lord_card_reward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_get_lord_card_reward message, length delimited. Does not implicitly {@link proto_gc_get_lord_card_reward.verify|verify} messages.
     * @param message proto_gc_get_lord_card_reward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_get_lord_card_reward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_get_lord_card_reward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_get_lord_card_reward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_get_lord_card_reward;

    /**
     * Decodes a proto_gc_get_lord_card_reward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_get_lord_card_reward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_get_lord_card_reward;

    /**
     * Verifies a proto_gc_get_lord_card_reward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_get_lord_card_reward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_get_lord_card_reward
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_get_lord_card_reward;

    /**
     * Creates a plain object from a proto_gc_get_lord_card_reward message. Also converts values to other types if specified.
     * @param message proto_gc_get_lord_card_reward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_get_lord_card_reward, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_get_lord_card_reward to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_game_model. */
export interface Iproto_gc_game_model {

    /** proto_gc_game_model cModelType */
    cModelType: number;
}

/** Represents a proto_gc_game_model. */
export class proto_gc_game_model implements Iproto_gc_game_model {

    /**
     * Constructs a new proto_gc_game_model.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_game_model);

    /** proto_gc_game_model cModelType. */
    public cModelType: number;

    /**
     * Creates a new proto_gc_game_model instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_game_model instance
     */
    public static create(properties?: Iproto_gc_game_model): proto_gc_game_model;

    /**
     * Encodes the specified proto_gc_game_model message. Does not implicitly {@link proto_gc_game_model.verify|verify} messages.
     * @param message proto_gc_game_model message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_game_model, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_game_model message, length delimited. Does not implicitly {@link proto_gc_game_model.verify|verify} messages.
     * @param message proto_gc_game_model message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_game_model, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_game_model message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_game_model
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_game_model;

    /**
     * Decodes a proto_gc_game_model message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_game_model
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_game_model;

    /**
     * Verifies a proto_gc_game_model message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_game_model message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_game_model
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_game_model;

    /**
     * Creates a plain object from a proto_gc_game_model message. Also converts values to other types if specified.
     * @param message proto_gc_game_model
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_game_model, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_game_model to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_three_draw_ack_card. */
export interface Iproto_gc_three_draw_ack_card {

    /** proto_gc_three_draw_ack_card ret */
    ret: number;

    /** proto_gc_three_draw_ack_card vecCards */
    vecCards?: (Iproto_CCard[]|null);

    /** proto_gc_three_draw_ack_card vecRates */
    vecRates?: (number[]|null);

    /** proto_gc_three_draw_ack_card nMoney */
    nMoney: (number|Long);

    /** proto_gc_three_draw_ack_card nDiZhu */
    nDiZhu: (number|Long);

    /** proto_gc_three_draw_ack_card fRate */
    fRate: number;
}

/** Represents a proto_gc_three_draw_ack_card. */
export class proto_gc_three_draw_ack_card implements Iproto_gc_three_draw_ack_card {

    /**
     * Constructs a new proto_gc_three_draw_ack_card.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_three_draw_ack_card);

    /** proto_gc_three_draw_ack_card ret. */
    public ret: number;

    /** proto_gc_three_draw_ack_card vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_three_draw_ack_card vecRates. */
    public vecRates: [ 'Array' ].<number>;

    /** proto_gc_three_draw_ack_card nMoney. */
    public nMoney: (number|Long);

    /** proto_gc_three_draw_ack_card nDiZhu. */
    public nDiZhu: (number|Long);

    /** proto_gc_three_draw_ack_card fRate. */
    public fRate: number;

    /**
     * Creates a new proto_gc_three_draw_ack_card instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_three_draw_ack_card instance
     */
    public static create(properties?: Iproto_gc_three_draw_ack_card): proto_gc_three_draw_ack_card;

    /**
     * Encodes the specified proto_gc_three_draw_ack_card message. Does not implicitly {@link proto_gc_three_draw_ack_card.verify|verify} messages.
     * @param message proto_gc_three_draw_ack_card message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_three_draw_ack_card, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_three_draw_ack_card message, length delimited. Does not implicitly {@link proto_gc_three_draw_ack_card.verify|verify} messages.
     * @param message proto_gc_three_draw_ack_card message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_three_draw_ack_card, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_three_draw_ack_card message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_three_draw_ack_card
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_three_draw_ack_card;

    /**
     * Decodes a proto_gc_three_draw_ack_card message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_three_draw_ack_card
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_three_draw_ack_card;

    /**
     * Verifies a proto_gc_three_draw_ack_card message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_three_draw_ack_card message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_three_draw_ack_card
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_three_draw_ack_card;

    /**
     * Creates a plain object from a proto_gc_three_draw_ack_card message. Also converts values to other types if specified.
     * @param message proto_gc_three_draw_ack_card
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_three_draw_ack_card, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_three_draw_ack_card to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_ack. */
export interface Iproto_sic_bet_ack {

    /** proto_sic_bet_ack bAllow */
    bAllow: number;

    /** proto_sic_bet_ack cCellID */
    cCellID: number;

    /** proto_sic_bet_ack nAmountCell */
    nAmountCell: number;

    /** proto_sic_bet_ack nAmountCellTotal */
    nAmountCellTotal: number;
}

/** Represents a proto_sic_bet_ack. */
export class proto_sic_bet_ack implements Iproto_sic_bet_ack {

    /**
     * Constructs a new proto_sic_bet_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_ack);

    /** proto_sic_bet_ack bAllow. */
    public bAllow: number;

    /** proto_sic_bet_ack cCellID. */
    public cCellID: number;

    /** proto_sic_bet_ack nAmountCell. */
    public nAmountCell: number;

    /** proto_sic_bet_ack nAmountCellTotal. */
    public nAmountCellTotal: number;

    /**
     * Creates a new proto_sic_bet_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_ack instance
     */
    public static create(properties?: Iproto_sic_bet_ack): proto_sic_bet_ack;

    /**
     * Encodes the specified proto_sic_bet_ack message. Does not implicitly {@link proto_sic_bet_ack.verify|verify} messages.
     * @param message proto_sic_bet_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_ack message, length delimited. Does not implicitly {@link proto_sic_bet_ack.verify|verify} messages.
     * @param message proto_sic_bet_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_ack;

    /**
     * Decodes a proto_sic_bet_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_ack;

    /**
     * Verifies a proto_sic_bet_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_ack;

    /**
     * Creates a plain object from a proto_sic_bet_ack message. Also converts values to other types if specified.
     * @param message proto_sic_bet_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_lord_card_lottery_info. */
export interface Iproto_cg_lord_card_lottery_info {
}

/** Represents a proto_cg_lord_card_lottery_info. */
export class proto_cg_lord_card_lottery_info implements Iproto_cg_lord_card_lottery_info {

    /**
     * Constructs a new proto_cg_lord_card_lottery_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_lord_card_lottery_info);

    /**
     * Creates a new proto_cg_lord_card_lottery_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_lord_card_lottery_info instance
     */
    public static create(properties?: Iproto_cg_lord_card_lottery_info): proto_cg_lord_card_lottery_info;

    /**
     * Encodes the specified proto_cg_lord_card_lottery_info message. Does not implicitly {@link proto_cg_lord_card_lottery_info.verify|verify} messages.
     * @param message proto_cg_lord_card_lottery_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_lord_card_lottery_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_lord_card_lottery_info message, length delimited. Does not implicitly {@link proto_cg_lord_card_lottery_info.verify|verify} messages.
     * @param message proto_cg_lord_card_lottery_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_lord_card_lottery_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_lord_card_lottery_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_lord_card_lottery_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_lord_card_lottery_info;

    /**
     * Decodes a proto_cg_lord_card_lottery_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_lord_card_lottery_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_lord_card_lottery_info;

    /**
     * Verifies a proto_cg_lord_card_lottery_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_lord_card_lottery_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_lord_card_lottery_info
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_lord_card_lottery_info;

    /**
     * Creates a plain object from a proto_cg_lord_card_lottery_info message. Also converts values to other types if specified.
     * @param message proto_cg_lord_card_lottery_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_lord_card_lottery_info, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_lord_card_lottery_info to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_CCard. */
export interface Iproto_CCard {

    /** proto_CCard mNColor */
    mNColor: number;

    /** proto_CCard mNValue */
    mNValue: number;

    /** proto_CCard mNCard_Baovalue */
    mNCard_Baovalue: number;
}

/** Represents a proto_CCard. */
export class proto_CCard implements Iproto_CCard {

    /**
     * Constructs a new proto_CCard.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_CCard);

    /** proto_CCard mNColor. */
    public mNColor: number;

    /** proto_CCard mNValue. */
    public mNValue: number;

    /** proto_CCard mNCard_Baovalue. */
    public mNCard_Baovalue: number;

    /**
     * Creates a new proto_CCard instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_CCard instance
     */
    public static create(properties?: Iproto_CCard): proto_CCard;

    /**
     * Encodes the specified proto_CCard message. Does not implicitly {@link proto_CCard.verify|verify} messages.
     * @param message proto_CCard message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_CCard, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_CCard message, length delimited. Does not implicitly {@link proto_CCard.verify|verify} messages.
     * @param message proto_CCard message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_CCard, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_CCard message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_CCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_CCard;

    /**
     * Decodes a proto_CCard message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_CCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_CCard;

    /**
     * Verifies a proto_CCard message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_CCard message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_CCard
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_CCard;

    /**
     * Creates a plain object from a proto_CCard message. Also converts values to other types if specified.
     * @param message proto_CCard
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_CCard, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_CCard to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_three_draw_req_card. */
export interface Iproto_cg_three_draw_req_card {
}

/** Represents a proto_cg_three_draw_req_card. */
export class proto_cg_three_draw_req_card implements Iproto_cg_three_draw_req_card {

    /**
     * Constructs a new proto_cg_three_draw_req_card.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_three_draw_req_card);

    /**
     * Creates a new proto_cg_three_draw_req_card instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_three_draw_req_card instance
     */
    public static create(properties?: Iproto_cg_three_draw_req_card): proto_cg_three_draw_req_card;

    /**
     * Encodes the specified proto_cg_three_draw_req_card message. Does not implicitly {@link proto_cg_three_draw_req_card.verify|verify} messages.
     * @param message proto_cg_three_draw_req_card message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_three_draw_req_card, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_three_draw_req_card message, length delimited. Does not implicitly {@link proto_cg_three_draw_req_card.verify|verify} messages.
     * @param message proto_cg_three_draw_req_card message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_three_draw_req_card, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_three_draw_req_card message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_three_draw_req_card
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_three_draw_req_card;

    /**
     * Decodes a proto_cg_three_draw_req_card message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_three_draw_req_card
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_three_draw_req_card;

    /**
     * Verifies a proto_cg_three_draw_req_card message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_three_draw_req_card message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_three_draw_req_card
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_three_draw_req_card;

    /**
     * Creates a plain object from a proto_cg_three_draw_req_card message. Also converts values to other types if specified.
     * @param message proto_cg_three_draw_req_card
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_three_draw_req_card, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_three_draw_req_card to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_three_draw_ack_data. */
export interface Iproto_gc_three_draw_ack_data {

    /** proto_gc_three_draw_ack_data ret */
    ret: number;

    /** proto_gc_three_draw_ack_data vecMoneyDiZhus */
    vecMoneyDiZhus?: (Iproto_Money_DiZhu[]|null);

    /** proto_gc_three_draw_ack_data vecKindRates */
    vecKindRates?: (Iproto_Kind_Rate[]|null);

    /** proto_gc_three_draw_ack_data nBaoDiMoney */
    nBaoDiMoney: number;

    /** proto_gc_three_draw_ack_data nBaoDiRate */
    nBaoDiRate: number;

    /** proto_gc_three_draw_ack_data fMinRate */
    fMinRate: number;
}

/** Represents a proto_gc_three_draw_ack_data. */
export class proto_gc_three_draw_ack_data implements Iproto_gc_three_draw_ack_data {

    /**
     * Constructs a new proto_gc_three_draw_ack_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_three_draw_ack_data);

    /** proto_gc_three_draw_ack_data ret. */
    public ret: number;

    /** proto_gc_three_draw_ack_data vecMoneyDiZhus. */
    public vecMoneyDiZhus: [ 'Array' ].<Iproto_Money_DiZhu>;

    /** proto_gc_three_draw_ack_data vecKindRates. */
    public vecKindRates: [ 'Array' ].<Iproto_Kind_Rate>;

    /** proto_gc_three_draw_ack_data nBaoDiMoney. */
    public nBaoDiMoney: number;

    /** proto_gc_three_draw_ack_data nBaoDiRate. */
    public nBaoDiRate: number;

    /** proto_gc_three_draw_ack_data fMinRate. */
    public fMinRate: number;

    /**
     * Creates a new proto_gc_three_draw_ack_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_three_draw_ack_data instance
     */
    public static create(properties?: Iproto_gc_three_draw_ack_data): proto_gc_three_draw_ack_data;

    /**
     * Encodes the specified proto_gc_three_draw_ack_data message. Does not implicitly {@link proto_gc_three_draw_ack_data.verify|verify} messages.
     * @param message proto_gc_three_draw_ack_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_three_draw_ack_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_three_draw_ack_data message, length delimited. Does not implicitly {@link proto_gc_three_draw_ack_data.verify|verify} messages.
     * @param message proto_gc_three_draw_ack_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_three_draw_ack_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_three_draw_ack_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_three_draw_ack_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_three_draw_ack_data;

    /**
     * Decodes a proto_gc_three_draw_ack_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_three_draw_ack_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_three_draw_ack_data;

    /**
     * Verifies a proto_gc_three_draw_ack_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_three_draw_ack_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_three_draw_ack_data
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_three_draw_ack_data;

    /**
     * Creates a plain object from a proto_gc_three_draw_ack_data message. Also converts values to other types if specified.
     * @param message proto_gc_three_draw_ack_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_three_draw_ack_data, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_three_draw_ack_data to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_Kind_Rate. */
export interface Iproto_Kind_Rate {

    /** proto_Kind_Rate strKind */
    strKind: string;

    /** proto_Kind_Rate strRate */
    strRate: string;
}

/** Represents a proto_Kind_Rate. */
export class proto_Kind_Rate implements Iproto_Kind_Rate {

    /**
     * Constructs a new proto_Kind_Rate.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_Kind_Rate);

    /** proto_Kind_Rate strKind. */
    public strKind: string;

    /** proto_Kind_Rate strRate. */
    public strRate: string;

    /**
     * Creates a new proto_Kind_Rate instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_Kind_Rate instance
     */
    public static create(properties?: Iproto_Kind_Rate): proto_Kind_Rate;

    /**
     * Encodes the specified proto_Kind_Rate message. Does not implicitly {@link proto_Kind_Rate.verify|verify} messages.
     * @param message proto_Kind_Rate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_Kind_Rate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_Kind_Rate message, length delimited. Does not implicitly {@link proto_Kind_Rate.verify|verify} messages.
     * @param message proto_Kind_Rate message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_Kind_Rate, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_Kind_Rate message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_Kind_Rate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_Kind_Rate;

    /**
     * Decodes a proto_Kind_Rate message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_Kind_Rate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_Kind_Rate;

    /**
     * Verifies a proto_Kind_Rate message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_Kind_Rate message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_Kind_Rate
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_Kind_Rate;

    /**
     * Creates a plain object from a proto_Kind_Rate message. Also converts values to other types if specified.
     * @param message proto_Kind_Rate
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_Kind_Rate, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_Kind_Rate to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cli_my_req. */
export interface Iproto_cli_my_req {

    /** proto_cli_my_req a */
    a: number;
}

/** Represents a proto_cli_my_req. */
export class proto_cli_my_req implements Iproto_cli_my_req {

    /**
     * Constructs a new proto_cli_my_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cli_my_req);

    /** proto_cli_my_req a. */
    public a: number;

    /**
     * Creates a new proto_cli_my_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cli_my_req instance
     */
    public static create(properties?: Iproto_cli_my_req): proto_cli_my_req;

    /**
     * Encodes the specified proto_cli_my_req message. Does not implicitly {@link proto_cli_my_req.verify|verify} messages.
     * @param message proto_cli_my_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cli_my_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cli_my_req message, length delimited. Does not implicitly {@link proto_cli_my_req.verify|verify} messages.
     * @param message proto_cli_my_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cli_my_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cli_my_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cli_my_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cli_my_req;

    /**
     * Decodes a proto_cli_my_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cli_my_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cli_my_req;

    /**
     * Verifies a proto_cli_my_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cli_my_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cli_my_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cli_my_req;

    /**
     * Creates a plain object from a proto_cli_my_req message. Also converts values to other types if specified.
     * @param message proto_cli_my_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cli_my_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cli_my_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_Money_DiZhu. */
export interface Iproto_Money_DiZhu {

    /** proto_Money_DiZhu nMoney */
    nMoney: (number|Long);

    /** proto_Money_DiZhu nDiZhu */
    nDiZhu: (number|Long);
}

/** Represents a proto_Money_DiZhu. */
export class proto_Money_DiZhu implements Iproto_Money_DiZhu {

    /**
     * Constructs a new proto_Money_DiZhu.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_Money_DiZhu);

    /** proto_Money_DiZhu nMoney. */
    public nMoney: (number|Long);

    /** proto_Money_DiZhu nDiZhu. */
    public nDiZhu: (number|Long);

    /**
     * Creates a new proto_Money_DiZhu instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_Money_DiZhu instance
     */
    public static create(properties?: Iproto_Money_DiZhu): proto_Money_DiZhu;

    /**
     * Encodes the specified proto_Money_DiZhu message. Does not implicitly {@link proto_Money_DiZhu.verify|verify} messages.
     * @param message proto_Money_DiZhu message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_Money_DiZhu, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_Money_DiZhu message, length delimited. Does not implicitly {@link proto_Money_DiZhu.verify|verify} messages.
     * @param message proto_Money_DiZhu message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_Money_DiZhu, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_Money_DiZhu message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_Money_DiZhu
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_Money_DiZhu;

    /**
     * Decodes a proto_Money_DiZhu message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_Money_DiZhu
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_Money_DiZhu;

    /**
     * Verifies a proto_Money_DiZhu message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_Money_DiZhu message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_Money_DiZhu
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_Money_DiZhu;

    /**
     * Creates a plain object from a proto_Money_DiZhu message. Also converts values to other types if specified.
     * @param message proto_Money_DiZhu
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_Money_DiZhu, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_Money_DiZhu to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_card_count_ack1. */
export interface Iproto_gc_card_count_ack1 {

    /** proto_gc_card_count_ack1 countsNum */
    countsNum: number;

    /** proto_gc_card_count_ack1 mVecPutCard */
    mVecPutCard?: (Iproto_CCard[]|null);
}

/** Represents a proto_gc_card_count_ack1. */
export class proto_gc_card_count_ack1 implements Iproto_gc_card_count_ack1 {

    /**
     * Constructs a new proto_gc_card_count_ack1.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_card_count_ack1);

    /** proto_gc_card_count_ack1 countsNum. */
    public countsNum: number;

    /** proto_gc_card_count_ack1 mVecPutCard. */
    public mVecPutCard: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_gc_card_count_ack1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_card_count_ack1 instance
     */
    public static create(properties?: Iproto_gc_card_count_ack1): proto_gc_card_count_ack1;

    /**
     * Encodes the specified proto_gc_card_count_ack1 message. Does not implicitly {@link proto_gc_card_count_ack1.verify|verify} messages.
     * @param message proto_gc_card_count_ack1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_card_count_ack1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_card_count_ack1 message, length delimited. Does not implicitly {@link proto_gc_card_count_ack1.verify|verify} messages.
     * @param message proto_gc_card_count_ack1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_card_count_ack1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_card_count_ack1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_card_count_ack1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_card_count_ack1;

    /**
     * Decodes a proto_gc_card_count_ack1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_card_count_ack1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_card_count_ack1;

    /**
     * Verifies a proto_gc_card_count_ack1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_card_count_ack1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_card_count_ack1
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_card_count_ack1;

    /**
     * Creates a plain object from a proto_gc_card_count_ack1 message. Also converts values to other types if specified.
     * @param message proto_gc_card_count_ack1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_card_count_ack1, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_card_count_ack1 to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_mj_completedata_req. */
export interface Iproto_mj_completedata_req {
}

/** Represents a proto_mj_completedata_req. */
export class proto_mj_completedata_req implements Iproto_mj_completedata_req {

    /**
     * Constructs a new proto_mj_completedata_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_mj_completedata_req);

    /**
     * Creates a new proto_mj_completedata_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_mj_completedata_req instance
     */
    public static create(properties?: Iproto_mj_completedata_req): proto_mj_completedata_req;

    /**
     * Encodes the specified proto_mj_completedata_req message. Does not implicitly {@link proto_mj_completedata_req.verify|verify} messages.
     * @param message proto_mj_completedata_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_mj_completedata_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_mj_completedata_req message, length delimited. Does not implicitly {@link proto_mj_completedata_req.verify|verify} messages.
     * @param message proto_mj_completedata_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_mj_completedata_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_mj_completedata_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_mj_completedata_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_mj_completedata_req;

    /**
     * Decodes a proto_mj_completedata_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_mj_completedata_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_mj_completedata_req;

    /**
     * Verifies a proto_mj_completedata_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_mj_completedata_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_mj_completedata_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_mj_completedata_req;

    /**
     * Creates a plain object from a proto_mj_completedata_req message. Also converts values to other types if specified.
     * @param message proto_mj_completedata_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_mj_completedata_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_mj_completedata_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_CCardsType. */
export interface Iproto_CCardsType {

    /** proto_CCardsType mNTypeBomb */
    mNTypeBomb: number;

    /** proto_CCardsType mNTypeNum */
    mNTypeNum: number;

    /** proto_CCardsType mNTypeValue */
    mNTypeValue: number;
}

/** Represents a proto_CCardsType. */
export class proto_CCardsType implements Iproto_CCardsType {

    /**
     * Constructs a new proto_CCardsType.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_CCardsType);

    /** proto_CCardsType mNTypeBomb. */
    public mNTypeBomb: number;

    /** proto_CCardsType mNTypeNum. */
    public mNTypeNum: number;

    /** proto_CCardsType mNTypeValue. */
    public mNTypeValue: number;

    /**
     * Creates a new proto_CCardsType instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_CCardsType instance
     */
    public static create(properties?: Iproto_CCardsType): proto_CCardsType;

    /**
     * Encodes the specified proto_CCardsType message. Does not implicitly {@link proto_CCardsType.verify|verify} messages.
     * @param message proto_CCardsType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_CCardsType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_CCardsType message, length delimited. Does not implicitly {@link proto_CCardsType.verify|verify} messages.
     * @param message proto_CCardsType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_CCardsType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_CCardsType message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_CCardsType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_CCardsType;

    /**
     * Decodes a proto_CCardsType message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_CCardsType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_CCardsType;

    /**
     * Verifies a proto_CCardsType message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_CCardsType message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_CCardsType
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_CCardsType;

    /**
     * Creates a plain object from a proto_CCardsType message. Also converts values to other types if specified.
     * @param message proto_CCardsType
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_CCardsType, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_CCardsType to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_svr_test_not. */
export interface Iproto_svr_test_not {

    /** proto_svr_test_not cTest */
    cTest: number;

    /** proto_svr_test_not nTest */
    nTest: number;

    /** proto_svr_test_not vecTest */
    vecTest?: (number[]|null);
}

/** Represents a proto_svr_test_not. */
export class proto_svr_test_not implements Iproto_svr_test_not {

    /**
     * Constructs a new proto_svr_test_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_svr_test_not);

    /** proto_svr_test_not cTest. */
    public cTest: number;

    /** proto_svr_test_not nTest. */
    public nTest: number;

    /** proto_svr_test_not vecTest. */
    public vecTest: [ 'Array' ].<number>;

    /**
     * Creates a new proto_svr_test_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_svr_test_not instance
     */
    public static create(properties?: Iproto_svr_test_not): proto_svr_test_not;

    /**
     * Encodes the specified proto_svr_test_not message. Does not implicitly {@link proto_svr_test_not.verify|verify} messages.
     * @param message proto_svr_test_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_svr_test_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_svr_test_not message, length delimited. Does not implicitly {@link proto_svr_test_not.verify|verify} messages.
     * @param message proto_svr_test_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_svr_test_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_svr_test_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_svr_test_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_svr_test_not;

    /**
     * Decodes a proto_svr_test_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_svr_test_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_svr_test_not;

    /**
     * Verifies a proto_svr_test_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_svr_test_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_svr_test_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_svr_test_not;

    /**
     * Creates a plain object from a proto_svr_test_not message. Also converts values to other types if specified.
     * @param message proto_svr_test_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_svr_test_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_svr_test_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_clear_ack. */
export interface Iproto_sic_bet_clear_ack {

    /** proto_sic_bet_clear_ack nBetUpdateAckTag */
    nBetUpdateAckTag: number;

    /** proto_sic_bet_clear_ack nAmountBack */
    nAmountBack: number;

    /** proto_sic_bet_clear_ack nAmountTotal */
    nAmountTotal: number;
}

/** Represents a proto_sic_bet_clear_ack. */
export class proto_sic_bet_clear_ack implements Iproto_sic_bet_clear_ack {

    /**
     * Constructs a new proto_sic_bet_clear_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_clear_ack);

    /** proto_sic_bet_clear_ack nBetUpdateAckTag. */
    public nBetUpdateAckTag: number;

    /** proto_sic_bet_clear_ack nAmountBack. */
    public nAmountBack: number;

    /** proto_sic_bet_clear_ack nAmountTotal. */
    public nAmountTotal: number;

    /**
     * Creates a new proto_sic_bet_clear_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_clear_ack instance
     */
    public static create(properties?: Iproto_sic_bet_clear_ack): proto_sic_bet_clear_ack;

    /**
     * Encodes the specified proto_sic_bet_clear_ack message. Does not implicitly {@link proto_sic_bet_clear_ack.verify|verify} messages.
     * @param message proto_sic_bet_clear_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_clear_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_clear_ack message, length delimited. Does not implicitly {@link proto_sic_bet_clear_ack.verify|verify} messages.
     * @param message proto_sic_bet_clear_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_clear_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_clear_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_clear_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_clear_ack;

    /**
     * Decodes a proto_sic_bet_clear_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_clear_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_clear_ack;

    /**
     * Verifies a proto_sic_bet_clear_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_clear_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_clear_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_clear_ack;

    /**
     * Creates a plain object from a proto_sic_bet_clear_ack message. Also converts values to other types if specified.
     * @param message proto_sic_bet_clear_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_clear_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_clear_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_refresh_card_not. */
export interface Iproto_gc_refresh_card_not {

    /** proto_gc_refresh_card_not cChairID */
    cChairID: number;

    /** proto_gc_refresh_card_not vecCards */
    vecCards?: (Iproto_CCard[]|null);
}

/** Represents a proto_gc_refresh_card_not. */
export class proto_gc_refresh_card_not implements Iproto_gc_refresh_card_not {

    /**
     * Constructs a new proto_gc_refresh_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_refresh_card_not);

    /** proto_gc_refresh_card_not cChairID. */
    public cChairID: number;

    /** proto_gc_refresh_card_not vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_gc_refresh_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_refresh_card_not instance
     */
    public static create(properties?: Iproto_gc_refresh_card_not): proto_gc_refresh_card_not;

    /**
     * Encodes the specified proto_gc_refresh_card_not message. Does not implicitly {@link proto_gc_refresh_card_not.verify|verify} messages.
     * @param message proto_gc_refresh_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_refresh_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_refresh_card_not message, length delimited. Does not implicitly {@link proto_gc_refresh_card_not.verify|verify} messages.
     * @param message proto_gc_refresh_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_refresh_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_refresh_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_refresh_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_refresh_card_not;

    /**
     * Decodes a proto_gc_refresh_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_refresh_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_refresh_card_not;

    /**
     * Verifies a proto_gc_refresh_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_refresh_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_refresh_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_refresh_card_not;

    /**
     * Creates a plain object from a proto_gc_refresh_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_refresh_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_refresh_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_refresh_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_show_card_req. */
export interface Iproto_gc_show_card_req {

    /** proto_gc_show_card_req nSerialID */
    nSerialID: number;

    /** proto_gc_show_card_req nShowCardType */
    nShowCardType: number;

    /** proto_gc_show_card_req nShowCardBet */
    nShowCardBet: number;
}

/** Represents a proto_gc_show_card_req. */
export class proto_gc_show_card_req implements Iproto_gc_show_card_req {

    /**
     * Constructs a new proto_gc_show_card_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_show_card_req);

    /** proto_gc_show_card_req nSerialID. */
    public nSerialID: number;

    /** proto_gc_show_card_req nShowCardType. */
    public nShowCardType: number;

    /** proto_gc_show_card_req nShowCardBet. */
    public nShowCardBet: number;

    /**
     * Creates a new proto_gc_show_card_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_show_card_req instance
     */
    public static create(properties?: Iproto_gc_show_card_req): proto_gc_show_card_req;

    /**
     * Encodes the specified proto_gc_show_card_req message. Does not implicitly {@link proto_gc_show_card_req.verify|verify} messages.
     * @param message proto_gc_show_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_show_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_show_card_req message, length delimited. Does not implicitly {@link proto_gc_show_card_req.verify|verify} messages.
     * @param message proto_gc_show_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_show_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_show_card_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_show_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_show_card_req;

    /**
     * Decodes a proto_gc_show_card_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_show_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_show_card_req;

    /**
     * Verifies a proto_gc_show_card_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_show_card_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_show_card_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_show_card_req;

    /**
     * Creates a plain object from a proto_gc_show_card_req message. Also converts values to other types if specified.
     * @param message proto_gc_show_card_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_show_card_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_show_card_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_auto_req. */
export interface Iproto_cg_auto_req {

    /** proto_cg_auto_req cAuto */
    cAuto: number;
}

/** Represents a proto_cg_auto_req. */
export class proto_cg_auto_req implements Iproto_cg_auto_req {

    /**
     * Constructs a new proto_cg_auto_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_auto_req);

    /** proto_cg_auto_req cAuto. */
    public cAuto: number;

    /**
     * Creates a new proto_cg_auto_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_auto_req instance
     */
    public static create(properties?: Iproto_cg_auto_req): proto_cg_auto_req;

    /**
     * Encodes the specified proto_cg_auto_req message. Does not implicitly {@link proto_cg_auto_req.verify|verify} messages.
     * @param message proto_cg_auto_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_auto_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_auto_req message, length delimited. Does not implicitly {@link proto_cg_auto_req.verify|verify} messages.
     * @param message proto_cg_auto_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_auto_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_auto_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_auto_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_auto_req;

    /**
     * Decodes a proto_cg_auto_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_auto_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_auto_req;

    /**
     * Verifies a proto_cg_auto_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_auto_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_auto_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_auto_req;

    /**
     * Creates a plain object from a proto_cg_auto_req message. Also converts values to other types if specified.
     * @param message proto_cg_auto_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_auto_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_auto_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_history_req. */
export interface Iproto_sic_history_req {
}

/** Represents a proto_sic_history_req. */
export class proto_sic_history_req implements Iproto_sic_history_req {

    /**
     * Constructs a new proto_sic_history_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_history_req);

    /**
     * Creates a new proto_sic_history_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_history_req instance
     */
    public static create(properties?: Iproto_sic_history_req): proto_sic_history_req;

    /**
     * Encodes the specified proto_sic_history_req message. Does not implicitly {@link proto_sic_history_req.verify|verify} messages.
     * @param message proto_sic_history_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_history_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_history_req message, length delimited. Does not implicitly {@link proto_sic_history_req.verify|verify} messages.
     * @param message proto_sic_history_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_history_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_history_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_history_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_history_req;

    /**
     * Decodes a proto_sic_history_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_history_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_history_req;

    /**
     * Verifies a proto_sic_history_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_history_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_history_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_history_req;

    /**
     * Creates a plain object from a proto_sic_history_req message. Also converts values to other types if specified.
     * @param message proto_sic_history_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_history_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_history_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_card_count_req. */
export interface Iproto_cg_card_count_req {
}

/** Represents a proto_cg_card_count_req. */
export class proto_cg_card_count_req implements Iproto_cg_card_count_req {

    /**
     * Constructs a new proto_cg_card_count_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_card_count_req);

    /**
     * Creates a new proto_cg_card_count_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_card_count_req instance
     */
    public static create(properties?: Iproto_cg_card_count_req): proto_cg_card_count_req;

    /**
     * Encodes the specified proto_cg_card_count_req message. Does not implicitly {@link proto_cg_card_count_req.verify|verify} messages.
     * @param message proto_cg_card_count_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_card_count_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_card_count_req message, length delimited. Does not implicitly {@link proto_cg_card_count_req.verify|verify} messages.
     * @param message proto_cg_card_count_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_card_count_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_card_count_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_card_count_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_card_count_req;

    /**
     * Decodes a proto_cg_card_count_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_card_count_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_card_count_req;

    /**
     * Verifies a proto_cg_card_count_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_card_count_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_card_count_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_card_count_req;

    /**
     * Creates a plain object from a proto_cg_card_count_req message. Also converts values to other types if specified.
     * @param message proto_cg_card_count_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_card_count_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_card_count_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_task_complete_not. */
export interface Iproto_gc_task_complete_not {

    /** proto_gc_task_complete_not chairId */
    chairId: number;

    /** proto_gc_task_complete_not taskStatus */
    taskStatus: number;
}

/** Represents a proto_gc_task_complete_not. */
export class proto_gc_task_complete_not implements Iproto_gc_task_complete_not {

    /**
     * Constructs a new proto_gc_task_complete_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_task_complete_not);

    /** proto_gc_task_complete_not chairId. */
    public chairId: number;

    /** proto_gc_task_complete_not taskStatus. */
    public taskStatus: number;

    /**
     * Creates a new proto_gc_task_complete_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_task_complete_not instance
     */
    public static create(properties?: Iproto_gc_task_complete_not): proto_gc_task_complete_not;

    /**
     * Encodes the specified proto_gc_task_complete_not message. Does not implicitly {@link proto_gc_task_complete_not.verify|verify} messages.
     * @param message proto_gc_task_complete_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_task_complete_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_task_complete_not message, length delimited. Does not implicitly {@link proto_gc_task_complete_not.verify|verify} messages.
     * @param message proto_gc_task_complete_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_task_complete_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_task_complete_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_task_complete_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_task_complete_not;

    /**
     * Decodes a proto_gc_task_complete_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_task_complete_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_task_complete_not;

    /**
     * Verifies a proto_gc_task_complete_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_task_complete_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_task_complete_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_task_complete_not;

    /**
     * Creates a plain object from a proto_gc_task_complete_not message. Also converts values to other types if specified.
     * @param message proto_gc_task_complete_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_task_complete_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_task_complete_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_call_score_ack. */
export interface Iproto_cg_call_score_ack {

    /** proto_cg_call_score_ack nScore */
    nScore: number;

    /** proto_cg_call_score_ack nSerialID */
    nSerialID: number;
}

/** Represents a proto_cg_call_score_ack. */
export class proto_cg_call_score_ack implements Iproto_cg_call_score_ack {

    /**
     * Constructs a new proto_cg_call_score_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_call_score_ack);

    /** proto_cg_call_score_ack nScore. */
    public nScore: number;

    /** proto_cg_call_score_ack nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_cg_call_score_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_call_score_ack instance
     */
    public static create(properties?: Iproto_cg_call_score_ack): proto_cg_call_score_ack;

    /**
     * Encodes the specified proto_cg_call_score_ack message. Does not implicitly {@link proto_cg_call_score_ack.verify|verify} messages.
     * @param message proto_cg_call_score_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_call_score_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_call_score_ack message, length delimited. Does not implicitly {@link proto_cg_call_score_ack.verify|verify} messages.
     * @param message proto_cg_call_score_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_call_score_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_call_score_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_call_score_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_call_score_ack;

    /**
     * Decodes a proto_cg_call_score_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_call_score_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_call_score_ack;

    /**
     * Verifies a proto_cg_call_score_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_call_score_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_call_score_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_call_score_ack;

    /**
     * Creates a plain object from a proto_cg_call_score_ack message. Also converts values to other types if specified.
     * @param message proto_cg_call_score_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_call_score_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_call_score_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_show_light_cell_not. */
export interface Iproto_sic_show_light_cell_not {
}

/** Represents a proto_sic_show_light_cell_not. */
export class proto_sic_show_light_cell_not implements Iproto_sic_show_light_cell_not {

    /**
     * Constructs a new proto_sic_show_light_cell_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_show_light_cell_not);

    /**
     * Creates a new proto_sic_show_light_cell_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_show_light_cell_not instance
     */
    public static create(properties?: Iproto_sic_show_light_cell_not): proto_sic_show_light_cell_not;

    /**
     * Encodes the specified proto_sic_show_light_cell_not message. Does not implicitly {@link proto_sic_show_light_cell_not.verify|verify} messages.
     * @param message proto_sic_show_light_cell_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_show_light_cell_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_show_light_cell_not message, length delimited. Does not implicitly {@link proto_sic_show_light_cell_not.verify|verify} messages.
     * @param message proto_sic_show_light_cell_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_show_light_cell_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_show_light_cell_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_show_light_cell_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_show_light_cell_not;

    /**
     * Decodes a proto_sic_show_light_cell_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_show_light_cell_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_show_light_cell_not;

    /**
     * Verifies a proto_sic_show_light_cell_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_show_light_cell_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_show_light_cell_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_show_light_cell_not;

    /**
     * Creates a plain object from a proto_sic_show_light_cell_not message. Also converts values to other types if specified.
     * @param message proto_sic_show_light_cell_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_show_light_cell_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_show_light_cell_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_call_score_req. */
export interface Iproto_gc_call_score_req {

    /** proto_gc_call_score_req nScore */
    nScore: number;

    /** proto_gc_call_score_req nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_call_score_req. */
export class proto_gc_call_score_req implements Iproto_gc_call_score_req {

    /**
     * Constructs a new proto_gc_call_score_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_call_score_req);

    /** proto_gc_call_score_req nScore. */
    public nScore: number;

    /** proto_gc_call_score_req nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_call_score_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_call_score_req instance
     */
    public static create(properties?: Iproto_gc_call_score_req): proto_gc_call_score_req;

    /**
     * Encodes the specified proto_gc_call_score_req message. Does not implicitly {@link proto_gc_call_score_req.verify|verify} messages.
     * @param message proto_gc_call_score_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_call_score_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_call_score_req message, length delimited. Does not implicitly {@link proto_gc_call_score_req.verify|verify} messages.
     * @param message proto_gc_call_score_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_call_score_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_call_score_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_call_score_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_call_score_req;

    /**
     * Decodes a proto_gc_call_score_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_call_score_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_call_score_req;

    /**
     * Verifies a proto_gc_call_score_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_call_score_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_call_score_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_call_score_req;

    /**
     * Creates a plain object from a proto_gc_call_score_req message. Also converts values to other types if specified.
     * @param message proto_gc_call_score_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_call_score_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_call_score_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_clear_req. */
export interface Iproto_sic_bet_clear_req {
}

/** Represents a proto_sic_bet_clear_req. */
export class proto_sic_bet_clear_req implements Iproto_sic_bet_clear_req {

    /**
     * Constructs a new proto_sic_bet_clear_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_clear_req);

    /**
     * Creates a new proto_sic_bet_clear_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_clear_req instance
     */
    public static create(properties?: Iproto_sic_bet_clear_req): proto_sic_bet_clear_req;

    /**
     * Encodes the specified proto_sic_bet_clear_req message. Does not implicitly {@link proto_sic_bet_clear_req.verify|verify} messages.
     * @param message proto_sic_bet_clear_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_clear_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_clear_req message, length delimited. Does not implicitly {@link proto_sic_bet_clear_req.verify|verify} messages.
     * @param message proto_sic_bet_clear_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_clear_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_clear_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_clear_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_clear_req;

    /**
     * Decodes a proto_sic_bet_clear_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_clear_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_clear_req;

    /**
     * Verifies a proto_sic_bet_clear_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_clear_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_clear_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_clear_req;

    /**
     * Creates a plain object from a proto_sic_bet_clear_req message. Also converts values to other types if specified.
     * @param message proto_sic_bet_clear_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_clear_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_clear_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_clienttimer_not. */
export interface Iproto_gc_clienttimer_not {

    /** proto_gc_clienttimer_not chairId */
    chairId: number;

    /** proto_gc_clienttimer_not sPeriod */
    sPeriod: number;
}

/** Represents a proto_gc_clienttimer_not. */
export class proto_gc_clienttimer_not implements Iproto_gc_clienttimer_not {

    /**
     * Constructs a new proto_gc_clienttimer_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_clienttimer_not);

    /** proto_gc_clienttimer_not chairId. */
    public chairId: number;

    /** proto_gc_clienttimer_not sPeriod. */
    public sPeriod: number;

    /**
     * Creates a new proto_gc_clienttimer_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_clienttimer_not instance
     */
    public static create(properties?: Iproto_gc_clienttimer_not): proto_gc_clienttimer_not;

    /**
     * Encodes the specified proto_gc_clienttimer_not message. Does not implicitly {@link proto_gc_clienttimer_not.verify|verify} messages.
     * @param message proto_gc_clienttimer_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_clienttimer_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_clienttimer_not message, length delimited. Does not implicitly {@link proto_gc_clienttimer_not.verify|verify} messages.
     * @param message proto_gc_clienttimer_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_clienttimer_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_clienttimer_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_clienttimer_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_clienttimer_not;

    /**
     * Decodes a proto_gc_clienttimer_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_clienttimer_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_clienttimer_not;

    /**
     * Verifies a proto_gc_clienttimer_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_clienttimer_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_clienttimer_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_clienttimer_not;

    /**
     * Creates a plain object from a proto_gc_clienttimer_not message. Also converts values to other types if specified.
     * @param message proto_gc_clienttimer_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_clienttimer_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_clienttimer_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_TaskItem. */
export interface Iproto_TaskItem {

    /** proto_TaskItem taskId */
    taskId: number;

    /** proto_TaskItem taskDesc */
    taskDesc: string;

    /** proto_TaskItem taskMission */
    taskMission: string;

    /** proto_TaskItem taskMoneyType */
    taskMoneyType: number;

    /** proto_TaskItem taskMoney */
    taskMoney: number;

    /** proto_TaskItem taskRate */
    taskRate: number;
}

/** Represents a proto_TaskItem. */
export class proto_TaskItem implements Iproto_TaskItem {

    /**
     * Constructs a new proto_TaskItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_TaskItem);

    /** proto_TaskItem taskId. */
    public taskId: number;

    /** proto_TaskItem taskDesc. */
    public taskDesc: string;

    /** proto_TaskItem taskMission. */
    public taskMission: string;

    /** proto_TaskItem taskMoneyType. */
    public taskMoneyType: number;

    /** proto_TaskItem taskMoney. */
    public taskMoney: number;

    /** proto_TaskItem taskRate. */
    public taskRate: number;

    /**
     * Creates a new proto_TaskItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_TaskItem instance
     */
    public static create(properties?: Iproto_TaskItem): proto_TaskItem;

    /**
     * Encodes the specified proto_TaskItem message. Does not implicitly {@link proto_TaskItem.verify|verify} messages.
     * @param message proto_TaskItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_TaskItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_TaskItem message, length delimited. Does not implicitly {@link proto_TaskItem.verify|verify} messages.
     * @param message proto_TaskItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_TaskItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_TaskItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_TaskItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_TaskItem;

    /**
     * Decodes a proto_TaskItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_TaskItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_TaskItem;

    /**
     * Verifies a proto_TaskItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_TaskItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_TaskItem
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_TaskItem;

    /**
     * Creates a plain object from a proto_TaskItem message. Also converts values to other types if specified.
     * @param message proto_TaskItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_TaskItem, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_TaskItem to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_three_draw_notify. */
export interface Iproto_gc_three_draw_notify {

    /** proto_gc_three_draw_notify message */
    message: string;
}

/** Represents a proto_gc_three_draw_notify. */
export class proto_gc_three_draw_notify implements Iproto_gc_three_draw_notify {

    /**
     * Constructs a new proto_gc_three_draw_notify.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_three_draw_notify);

    /** proto_gc_three_draw_notify message. */
    public message: string;

    /**
     * Creates a new proto_gc_three_draw_notify instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_three_draw_notify instance
     */
    public static create(properties?: Iproto_gc_three_draw_notify): proto_gc_three_draw_notify;

    /**
     * Encodes the specified proto_gc_three_draw_notify message. Does not implicitly {@link proto_gc_three_draw_notify.verify|verify} messages.
     * @param message proto_gc_three_draw_notify message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_three_draw_notify, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_three_draw_notify message, length delimited. Does not implicitly {@link proto_gc_three_draw_notify.verify|verify} messages.
     * @param message proto_gc_three_draw_notify message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_three_draw_notify, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_three_draw_notify message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_three_draw_notify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_three_draw_notify;

    /**
     * Decodes a proto_gc_three_draw_notify message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_three_draw_notify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_three_draw_notify;

    /**
     * Verifies a proto_gc_three_draw_notify message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_three_draw_notify message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_three_draw_notify
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_three_draw_notify;

    /**
     * Creates a plain object from a proto_gc_three_draw_notify message. Also converts values to other types if specified.
     * @param message proto_gc_three_draw_notify
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_three_draw_notify, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_three_draw_notify to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_laizi_not. */
export interface Iproto_gc_laizi_not {

    /** proto_gc_laizi_not cardValue */
    cardValue: number;
}

/** Represents a proto_gc_laizi_not. */
export class proto_gc_laizi_not implements Iproto_gc_laizi_not {

    /**
     * Constructs a new proto_gc_laizi_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_laizi_not);

    /** proto_gc_laizi_not cardValue. */
    public cardValue: number;

    /**
     * Creates a new proto_gc_laizi_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_laizi_not instance
     */
    public static create(properties?: Iproto_gc_laizi_not): proto_gc_laizi_not;

    /**
     * Encodes the specified proto_gc_laizi_not message. Does not implicitly {@link proto_gc_laizi_not.verify|verify} messages.
     * @param message proto_gc_laizi_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_laizi_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_laizi_not message, length delimited. Does not implicitly {@link proto_gc_laizi_not.verify|verify} messages.
     * @param message proto_gc_laizi_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_laizi_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_laizi_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_laizi_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_laizi_not;

    /**
     * Decodes a proto_gc_laizi_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_laizi_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_laizi_not;

    /**
     * Verifies a proto_gc_laizi_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_laizi_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_laizi_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_laizi_not;

    /**
     * Creates a plain object from a proto_gc_laizi_not message. Also converts values to other types if specified.
     * @param message proto_gc_laizi_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_laizi_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_laizi_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_magic_emoji_req. */
export interface Iproto_magic_emoji_req {

    /** proto_magic_emoji_req cEmojiIndex */
    cEmojiIndex: number;

    /** proto_magic_emoji_req cToChairID */
    cToChairID: number;

    /** proto_magic_emoji_req cCostType */
    cCostType: number;
}

/** Represents a proto_magic_emoji_req. */
export class proto_magic_emoji_req implements Iproto_magic_emoji_req {

    /**
     * Constructs a new proto_magic_emoji_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_magic_emoji_req);

    /** proto_magic_emoji_req cEmojiIndex. */
    public cEmojiIndex: number;

    /** proto_magic_emoji_req cToChairID. */
    public cToChairID: number;

    /** proto_magic_emoji_req cCostType. */
    public cCostType: number;

    /**
     * Creates a new proto_magic_emoji_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_magic_emoji_req instance
     */
    public static create(properties?: Iproto_magic_emoji_req): proto_magic_emoji_req;

    /**
     * Encodes the specified proto_magic_emoji_req message. Does not implicitly {@link proto_magic_emoji_req.verify|verify} messages.
     * @param message proto_magic_emoji_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_magic_emoji_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_magic_emoji_req message, length delimited. Does not implicitly {@link proto_magic_emoji_req.verify|verify} messages.
     * @param message proto_magic_emoji_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_magic_emoji_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_magic_emoji_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_magic_emoji_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_magic_emoji_req;

    /**
     * Decodes a proto_magic_emoji_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_magic_emoji_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_magic_emoji_req;

    /**
     * Verifies a proto_magic_emoji_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_magic_emoji_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_magic_emoji_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_magic_emoji_req;

    /**
     * Creates a plain object from a proto_magic_emoji_req message. Also converts values to other types if specified.
     * @param message proto_magic_emoji_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_magic_emoji_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_magic_emoji_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_double_score_ack. */
export interface Iproto_cg_double_score_ack {

    /** proto_cg_double_score_ack nScore */
    nScore: number;

    /** proto_cg_double_score_ack nSerialID */
    nSerialID: number;
}

/** Represents a proto_cg_double_score_ack. */
export class proto_cg_double_score_ack implements Iproto_cg_double_score_ack {

    /**
     * Constructs a new proto_cg_double_score_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_double_score_ack);

    /** proto_cg_double_score_ack nScore. */
    public nScore: number;

    /** proto_cg_double_score_ack nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_cg_double_score_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_double_score_ack instance
     */
    public static create(properties?: Iproto_cg_double_score_ack): proto_cg_double_score_ack;

    /**
     * Encodes the specified proto_cg_double_score_ack message. Does not implicitly {@link proto_cg_double_score_ack.verify|verify} messages.
     * @param message proto_cg_double_score_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_double_score_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_double_score_ack message, length delimited. Does not implicitly {@link proto_cg_double_score_ack.verify|verify} messages.
     * @param message proto_cg_double_score_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_double_score_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_double_score_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_double_score_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_double_score_ack;

    /**
     * Decodes a proto_cg_double_score_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_double_score_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_double_score_ack;

    /**
     * Verifies a proto_cg_double_score_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_double_score_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_double_score_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_double_score_ack;

    /**
     * Creates a plain object from a proto_cg_double_score_ack message. Also converts values to other types if specified.
     * @param message proto_cg_double_score_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_double_score_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_double_score_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_play_card_ack. */
export interface Iproto_cg_play_card_ack {

    /** proto_cg_play_card_ack nSerialID */
    nSerialID: number;

    /** proto_cg_play_card_ack cTimeOut */
    cTimeOut: number;

    /** proto_cg_play_card_ack vecCards */
    vecCards?: (Iproto_CCard[]|null);
}

/** Represents a proto_cg_play_card_ack. */
export class proto_cg_play_card_ack implements Iproto_cg_play_card_ack {

    /**
     * Constructs a new proto_cg_play_card_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_play_card_ack);

    /** proto_cg_play_card_ack nSerialID. */
    public nSerialID: number;

    /** proto_cg_play_card_ack cTimeOut. */
    public cTimeOut: number;

    /** proto_cg_play_card_ack vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_cg_play_card_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_play_card_ack instance
     */
    public static create(properties?: Iproto_cg_play_card_ack): proto_cg_play_card_ack;

    /**
     * Encodes the specified proto_cg_play_card_ack message. Does not implicitly {@link proto_cg_play_card_ack.verify|verify} messages.
     * @param message proto_cg_play_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_play_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_play_card_ack message, length delimited. Does not implicitly {@link proto_cg_play_card_ack.verify|verify} messages.
     * @param message proto_cg_play_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_play_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_play_card_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_play_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_play_card_ack;

    /**
     * Decodes a proto_cg_play_card_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_play_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_play_card_ack;

    /**
     * Verifies a proto_cg_play_card_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_play_card_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_play_card_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_play_card_ack;

    /**
     * Creates a plain object from a proto_cg_play_card_ack message. Also converts values to other types if specified.
     * @param message proto_cg_play_card_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_play_card_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_play_card_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_bet_begin_not. */
export interface Iproto_sic_bet_begin_not {
}

/** Represents a proto_sic_bet_begin_not. */
export class proto_sic_bet_begin_not implements Iproto_sic_bet_begin_not {

    /**
     * Constructs a new proto_sic_bet_begin_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_bet_begin_not);

    /**
     * Creates a new proto_sic_bet_begin_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_bet_begin_not instance
     */
    public static create(properties?: Iproto_sic_bet_begin_not): proto_sic_bet_begin_not;

    /**
     * Encodes the specified proto_sic_bet_begin_not message. Does not implicitly {@link proto_sic_bet_begin_not.verify|verify} messages.
     * @param message proto_sic_bet_begin_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_bet_begin_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_bet_begin_not message, length delimited. Does not implicitly {@link proto_sic_bet_begin_not.verify|verify} messages.
     * @param message proto_sic_bet_begin_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_bet_begin_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_bet_begin_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_bet_begin_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_bet_begin_not;

    /**
     * Decodes a proto_sic_bet_begin_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_bet_begin_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_bet_begin_not;

    /**
     * Verifies a proto_sic_bet_begin_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_bet_begin_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_bet_begin_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_bet_begin_not;

    /**
     * Creates a plain object from a proto_sic_bet_begin_not message. Also converts values to other types if specified.
     * @param message proto_sic_bet_begin_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_bet_begin_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_bet_begin_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_get_lord_card_reward. */
export interface Iproto_cg_get_lord_card_reward {

    /** proto_cg_get_lord_card_reward index */
    index: number;
}

/** Represents a proto_cg_get_lord_card_reward. */
export class proto_cg_get_lord_card_reward implements Iproto_cg_get_lord_card_reward {

    /**
     * Constructs a new proto_cg_get_lord_card_reward.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_get_lord_card_reward);

    /** proto_cg_get_lord_card_reward index. */
    public index: number;

    /**
     * Creates a new proto_cg_get_lord_card_reward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_get_lord_card_reward instance
     */
    public static create(properties?: Iproto_cg_get_lord_card_reward): proto_cg_get_lord_card_reward;

    /**
     * Encodes the specified proto_cg_get_lord_card_reward message. Does not implicitly {@link proto_cg_get_lord_card_reward.verify|verify} messages.
     * @param message proto_cg_get_lord_card_reward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_get_lord_card_reward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_get_lord_card_reward message, length delimited. Does not implicitly {@link proto_cg_get_lord_card_reward.verify|verify} messages.
     * @param message proto_cg_get_lord_card_reward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_get_lord_card_reward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_get_lord_card_reward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_get_lord_card_reward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_get_lord_card_reward;

    /**
     * Decodes a proto_cg_get_lord_card_reward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_get_lord_card_reward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_get_lord_card_reward;

    /**
     * Verifies a proto_cg_get_lord_card_reward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_get_lord_card_reward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_get_lord_card_reward
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_get_lord_card_reward;

    /**
     * Creates a plain object from a proto_cg_get_lord_card_reward message. Also converts values to other types if specified.
     * @param message proto_cg_get_lord_card_reward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_get_lord_card_reward, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_get_lord_card_reward to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_bet_lord_card_result_ack. */
export interface Iproto_gc_bet_lord_card_result_ack {

    /** proto_gc_bet_lord_card_result_ack ret */
    ret: number;

    /** proto_gc_bet_lord_card_result_ack money */
    money: number;
}

/** Represents a proto_gc_bet_lord_card_result_ack. */
export class proto_gc_bet_lord_card_result_ack implements Iproto_gc_bet_lord_card_result_ack {

    /**
     * Constructs a new proto_gc_bet_lord_card_result_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_bet_lord_card_result_ack);

    /** proto_gc_bet_lord_card_result_ack ret. */
    public ret: number;

    /** proto_gc_bet_lord_card_result_ack money. */
    public money: number;

    /**
     * Creates a new proto_gc_bet_lord_card_result_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_bet_lord_card_result_ack instance
     */
    public static create(properties?: Iproto_gc_bet_lord_card_result_ack): proto_gc_bet_lord_card_result_ack;

    /**
     * Encodes the specified proto_gc_bet_lord_card_result_ack message. Does not implicitly {@link proto_gc_bet_lord_card_result_ack.verify|verify} messages.
     * @param message proto_gc_bet_lord_card_result_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_bet_lord_card_result_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_bet_lord_card_result_ack message, length delimited. Does not implicitly {@link proto_gc_bet_lord_card_result_ack.verify|verify} messages.
     * @param message proto_gc_bet_lord_card_result_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_bet_lord_card_result_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_bet_lord_card_result_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_bet_lord_card_result_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_bet_lord_card_result_ack;

    /**
     * Decodes a proto_gc_bet_lord_card_result_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_bet_lord_card_result_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_bet_lord_card_result_ack;

    /**
     * Verifies a proto_gc_bet_lord_card_result_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_bet_lord_card_result_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_bet_lord_card_result_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_bet_lord_card_result_ack;

    /**
     * Creates a plain object from a proto_gc_bet_lord_card_result_ack message. Also converts values to other types if specified.
     * @param message proto_gc_bet_lord_card_result_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_bet_lord_card_result_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_bet_lord_card_result_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_svr_my_ack. */
export interface Iproto_svr_my_ack {

    /** proto_svr_my_ack b */
    b: number;
}

/** Represents a proto_svr_my_ack. */
export class proto_svr_my_ack implements Iproto_svr_my_ack {

    /**
     * Constructs a new proto_svr_my_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_svr_my_ack);

    /** proto_svr_my_ack b. */
    public b: number;

    /**
     * Creates a new proto_svr_my_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_svr_my_ack instance
     */
    public static create(properties?: Iproto_svr_my_ack): proto_svr_my_ack;

    /**
     * Encodes the specified proto_svr_my_ack message. Does not implicitly {@link proto_svr_my_ack.verify|verify} messages.
     * @param message proto_svr_my_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_svr_my_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_svr_my_ack message, length delimited. Does not implicitly {@link proto_svr_my_ack.verify|verify} messages.
     * @param message proto_svr_my_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_svr_my_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_svr_my_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_svr_my_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_svr_my_ack;

    /**
     * Decodes a proto_svr_my_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_svr_my_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_svr_my_ack;

    /**
     * Verifies a proto_svr_my_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_svr_my_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_svr_my_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_svr_my_ack;

    /**
     * Creates a plain object from a proto_svr_my_ack message. Also converts values to other types if specified.
     * @param message proto_svr_my_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_svr_my_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_svr_my_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_game_result_not1. */
export interface Iproto_gc_game_result_not1 {

    /** proto_gc_game_result_not1 bType */
    bType: number;

    /** proto_gc_game_result_not1 cDouble */
    cDouble: number;

    /** proto_gc_game_result_not1 cCallScore */
    cCallScore: number;

    /** proto_gc_game_result_not1 bShowCard */
    bShowCard: number;

    /** proto_gc_game_result_not1 nBombCount */
    nBombCount: number;

    /** proto_gc_game_result_not1 bSpring */
    bSpring: number;

    /** proto_gc_game_result_not1 bReverseSpring */
    bReverseSpring: number;

    /** proto_gc_game_result_not1 bRobLord */
    bRobLord: number;

    /** proto_gc_game_result_not1 vecUserResult1 */
    vecUserResult1?: (Iproto_stUserResult1[]|null);
}

/** Represents a proto_gc_game_result_not1. */
export class proto_gc_game_result_not1 implements Iproto_gc_game_result_not1 {

    /**
     * Constructs a new proto_gc_game_result_not1.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_game_result_not1);

    /** proto_gc_game_result_not1 bType. */
    public bType: number;

    /** proto_gc_game_result_not1 cDouble. */
    public cDouble: number;

    /** proto_gc_game_result_not1 cCallScore. */
    public cCallScore: number;

    /** proto_gc_game_result_not1 bShowCard. */
    public bShowCard: number;

    /** proto_gc_game_result_not1 nBombCount. */
    public nBombCount: number;

    /** proto_gc_game_result_not1 bSpring. */
    public bSpring: number;

    /** proto_gc_game_result_not1 bReverseSpring. */
    public bReverseSpring: number;

    /** proto_gc_game_result_not1 bRobLord. */
    public bRobLord: number;

    /** proto_gc_game_result_not1 vecUserResult1. */
    public vecUserResult1: [ 'Array' ].<Iproto_stUserResult1>;

    /**
     * Creates a new proto_gc_game_result_not1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_game_result_not1 instance
     */
    public static create(properties?: Iproto_gc_game_result_not1): proto_gc_game_result_not1;

    /**
     * Encodes the specified proto_gc_game_result_not1 message. Does not implicitly {@link proto_gc_game_result_not1.verify|verify} messages.
     * @param message proto_gc_game_result_not1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_game_result_not1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_game_result_not1 message, length delimited. Does not implicitly {@link proto_gc_game_result_not1.verify|verify} messages.
     * @param message proto_gc_game_result_not1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_game_result_not1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_game_result_not1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_game_result_not1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_game_result_not1;

    /**
     * Decodes a proto_gc_game_result_not1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_game_result_not1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_game_result_not1;

    /**
     * Verifies a proto_gc_game_result_not1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_game_result_not1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_game_result_not1
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_game_result_not1;

    /**
     * Creates a plain object from a proto_gc_game_result_not1 message. Also converts values to other types if specified.
     * @param message proto_gc_game_result_not1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_game_result_not1, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_game_result_not1 to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_play_card_req. */
export interface Iproto_gc_play_card_req {

    /** proto_gc_play_card_req cAuto */
    cAuto: number;

    /** proto_gc_play_card_req nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_play_card_req. */
export class proto_gc_play_card_req implements Iproto_gc_play_card_req {

    /**
     * Constructs a new proto_gc_play_card_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_play_card_req);

    /** proto_gc_play_card_req cAuto. */
    public cAuto: number;

    /** proto_gc_play_card_req nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_play_card_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_play_card_req instance
     */
    public static create(properties?: Iproto_gc_play_card_req): proto_gc_play_card_req;

    /**
     * Encodes the specified proto_gc_play_card_req message. Does not implicitly {@link proto_gc_play_card_req.verify|verify} messages.
     * @param message proto_gc_play_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_play_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_play_card_req message, length delimited. Does not implicitly {@link proto_gc_play_card_req.verify|verify} messages.
     * @param message proto_gc_play_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_play_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_play_card_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_play_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_play_card_req;

    /**
     * Decodes a proto_gc_play_card_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_play_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_play_card_req;

    /**
     * Verifies a proto_gc_play_card_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_play_card_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_play_card_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_play_card_req;

    /**
     * Creates a plain object from a proto_gc_play_card_req message. Also converts values to other types if specified.
     * @param message proto_gc_play_card_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_play_card_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_play_card_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_lord_card_lottery_base. */
export interface Iproto_gc_lord_card_lottery_base {

    /** proto_gc_lord_card_lottery_base ret */
    ret: number;

    /** proto_gc_lord_card_lottery_base index */
    index: number;
}

/** Represents a proto_gc_lord_card_lottery_base. */
export class proto_gc_lord_card_lottery_base implements Iproto_gc_lord_card_lottery_base {

    /**
     * Constructs a new proto_gc_lord_card_lottery_base.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_lord_card_lottery_base);

    /** proto_gc_lord_card_lottery_base ret. */
    public ret: number;

    /** proto_gc_lord_card_lottery_base index. */
    public index: number;

    /**
     * Creates a new proto_gc_lord_card_lottery_base instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_lord_card_lottery_base instance
     */
    public static create(properties?: Iproto_gc_lord_card_lottery_base): proto_gc_lord_card_lottery_base;

    /**
     * Encodes the specified proto_gc_lord_card_lottery_base message. Does not implicitly {@link proto_gc_lord_card_lottery_base.verify|verify} messages.
     * @param message proto_gc_lord_card_lottery_base message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_lord_card_lottery_base, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_lord_card_lottery_base message, length delimited. Does not implicitly {@link proto_gc_lord_card_lottery_base.verify|verify} messages.
     * @param message proto_gc_lord_card_lottery_base message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_lord_card_lottery_base, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_lord_card_lottery_base message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_lord_card_lottery_base
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_lord_card_lottery_base;

    /**
     * Decodes a proto_gc_lord_card_lottery_base message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_lord_card_lottery_base
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_lord_card_lottery_base;

    /**
     * Verifies a proto_gc_lord_card_lottery_base message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_lord_card_lottery_base message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_lord_card_lottery_base
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_lord_card_lottery_base;

    /**
     * Creates a plain object from a proto_gc_lord_card_lottery_base message. Also converts values to other types if specified.
     * @param message proto_gc_lord_card_lottery_base
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_lord_card_lottery_base, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_lord_card_lottery_base to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_auto_not. */
export interface Iproto_gc_auto_not {

    /** proto_gc_auto_not cChairID */
    cChairID: number;

    /** proto_gc_auto_not cAuto */
    cAuto: number;
}

/** Represents a proto_gc_auto_not. */
export class proto_gc_auto_not implements Iproto_gc_auto_not {

    /**
     * Constructs a new proto_gc_auto_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_auto_not);

    /** proto_gc_auto_not cChairID. */
    public cChairID: number;

    /** proto_gc_auto_not cAuto. */
    public cAuto: number;

    /**
     * Creates a new proto_gc_auto_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_auto_not instance
     */
    public static create(properties?: Iproto_gc_auto_not): proto_gc_auto_not;

    /**
     * Encodes the specified proto_gc_auto_not message. Does not implicitly {@link proto_gc_auto_not.verify|verify} messages.
     * @param message proto_gc_auto_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_auto_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_auto_not message, length delimited. Does not implicitly {@link proto_gc_auto_not.verify|verify} messages.
     * @param message proto_gc_auto_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_auto_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_auto_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_auto_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_auto_not;

    /**
     * Decodes a proto_gc_auto_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_auto_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_auto_not;

    /**
     * Verifies a proto_gc_auto_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_auto_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_auto_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_auto_not;

    /**
     * Creates a plain object from a proto_gc_auto_not message. Also converts values to other types if specified.
     * @param message proto_gc_auto_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_auto_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_auto_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_card_count_ack. */
export interface Iproto_gc_card_count_ack {

    /** proto_gc_card_count_ack countsNum */
    countsNum: number;

    /** proto_gc_card_count_ack mVecPutCard */
    mVecPutCard?: (Iproto_CCard[]|null);
}

/** Represents a proto_gc_card_count_ack. */
export class proto_gc_card_count_ack implements Iproto_gc_card_count_ack {

    /**
     * Constructs a new proto_gc_card_count_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_card_count_ack);

    /** proto_gc_card_count_ack countsNum. */
    public countsNum: number;

    /** proto_gc_card_count_ack mVecPutCard. */
    public mVecPutCard: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_gc_card_count_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_card_count_ack instance
     */
    public static create(properties?: Iproto_gc_card_count_ack): proto_gc_card_count_ack;

    /**
     * Encodes the specified proto_gc_card_count_ack message. Does not implicitly {@link proto_gc_card_count_ack.verify|verify} messages.
     * @param message proto_gc_card_count_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_card_count_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_card_count_ack message, length delimited. Does not implicitly {@link proto_gc_card_count_ack.verify|verify} messages.
     * @param message proto_gc_card_count_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_card_count_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_card_count_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_card_count_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_card_count_ack;

    /**
     * Decodes a proto_gc_card_count_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_card_count_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_card_count_ack;

    /**
     * Verifies a proto_gc_card_count_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_card_count_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_card_count_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_card_count_ack;

    /**
     * Creates a plain object from a proto_gc_card_count_ack message. Also converts values to other types if specified.
     * @param message proto_gc_card_count_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_card_count_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_card_count_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_rob_lord_req. */
export interface Iproto_gc_rob_lord_req {

    /** proto_gc_rob_lord_req cDefaultLord */
    cDefaultLord: number;

    /** proto_gc_rob_lord_req nSerialID */
    nSerialID: number;
}

/** Represents a proto_gc_rob_lord_req. */
export class proto_gc_rob_lord_req implements Iproto_gc_rob_lord_req {

    /**
     * Constructs a new proto_gc_rob_lord_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_rob_lord_req);

    /** proto_gc_rob_lord_req cDefaultLord. */
    public cDefaultLord: number;

    /** proto_gc_rob_lord_req nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_gc_rob_lord_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_rob_lord_req instance
     */
    public static create(properties?: Iproto_gc_rob_lord_req): proto_gc_rob_lord_req;

    /**
     * Encodes the specified proto_gc_rob_lord_req message. Does not implicitly {@link proto_gc_rob_lord_req.verify|verify} messages.
     * @param message proto_gc_rob_lord_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_rob_lord_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_rob_lord_req message, length delimited. Does not implicitly {@link proto_gc_rob_lord_req.verify|verify} messages.
     * @param message proto_gc_rob_lord_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_rob_lord_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_rob_lord_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_rob_lord_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_rob_lord_req;

    /**
     * Decodes a proto_gc_rob_lord_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_rob_lord_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_rob_lord_req;

    /**
     * Verifies a proto_gc_rob_lord_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_rob_lord_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_rob_lord_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_rob_lord_req;

    /**
     * Creates a plain object from a proto_gc_rob_lord_req message. Also converts values to other types if specified.
     * @param message proto_gc_rob_lord_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_rob_lord_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_rob_lord_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_history_ack. */
export interface Iproto_sic_history_ack {

    /** proto_sic_history_ack bIsFounder */
    bIsFounder: number;

    /** proto_sic_history_ack nPlayerMoneyBefore */
    nPlayerMoneyBefore: number;

    /** proto_sic_history_ack vecHistory */
    vecHistory?: (string[]|null);

    /** proto_sic_history_ack nChipType */
    nChipType: number;

    /** proto_sic_history_ack vecChipValue */
    vecChipValue?: (number[]|null);

    /** proto_sic_history_ack nAmountMax */
    nAmountMax: number;

    /** proto_sic_history_ack fNextRoundTimeWait */
    fNextRoundTimeWait: number;

    /** proto_sic_history_ack vecPeriod */
    vecPeriod?: (number[]|null);
}

/** Represents a proto_sic_history_ack. */
export class proto_sic_history_ack implements Iproto_sic_history_ack {

    /**
     * Constructs a new proto_sic_history_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_history_ack);

    /** proto_sic_history_ack bIsFounder. */
    public bIsFounder: number;

    /** proto_sic_history_ack nPlayerMoneyBefore. */
    public nPlayerMoneyBefore: number;

    /** proto_sic_history_ack vecHistory. */
    public vecHistory: [ 'Array' ].<string>;

    /** proto_sic_history_ack nChipType. */
    public nChipType: number;

    /** proto_sic_history_ack vecChipValue. */
    public vecChipValue: [ 'Array' ].<number>;

    /** proto_sic_history_ack nAmountMax. */
    public nAmountMax: number;

    /** proto_sic_history_ack fNextRoundTimeWait. */
    public fNextRoundTimeWait: number;

    /** proto_sic_history_ack vecPeriod. */
    public vecPeriod: [ 'Array' ].<number>;

    /**
     * Creates a new proto_sic_history_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_history_ack instance
     */
    public static create(properties?: Iproto_sic_history_ack): proto_sic_history_ack;

    /**
     * Encodes the specified proto_sic_history_ack message. Does not implicitly {@link proto_sic_history_ack.verify|verify} messages.
     * @param message proto_sic_history_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_history_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_history_ack message, length delimited. Does not implicitly {@link proto_sic_history_ack.verify|verify} messages.
     * @param message proto_sic_history_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_history_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_history_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_history_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_history_ack;

    /**
     * Decodes a proto_sic_history_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_history_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_history_ack;

    /**
     * Verifies a proto_sic_history_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_history_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_history_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_history_ack;

    /**
     * Creates a plain object from a proto_sic_history_ack message. Also converts values to other types if specified.
     * @param message proto_sic_history_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_history_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_history_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_rob_lord_ack. */
export interface Iproto_cg_rob_lord_ack {

    /** proto_cg_rob_lord_ack cRob */
    cRob: number;

    /** proto_cg_rob_lord_ack nSerialID */
    nSerialID: number;
}

/** Represents a proto_cg_rob_lord_ack. */
export class proto_cg_rob_lord_ack implements Iproto_cg_rob_lord_ack {

    /**
     * Constructs a new proto_cg_rob_lord_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_rob_lord_ack);

    /** proto_cg_rob_lord_ack cRob. */
    public cRob: number;

    /** proto_cg_rob_lord_ack nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_cg_rob_lord_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_rob_lord_ack instance
     */
    public static create(properties?: Iproto_cg_rob_lord_ack): proto_cg_rob_lord_ack;

    /**
     * Encodes the specified proto_cg_rob_lord_ack message. Does not implicitly {@link proto_cg_rob_lord_ack.verify|verify} messages.
     * @param message proto_cg_rob_lord_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_rob_lord_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_rob_lord_ack message, length delimited. Does not implicitly {@link proto_cg_rob_lord_ack.verify|verify} messages.
     * @param message proto_cg_rob_lord_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_rob_lord_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_rob_lord_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_rob_lord_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_rob_lord_ack;

    /**
     * Decodes a proto_cg_rob_lord_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_rob_lord_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_rob_lord_ack;

    /**
     * Verifies a proto_cg_rob_lord_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_rob_lord_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_rob_lord_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_rob_lord_ack;

    /**
     * Creates a plain object from a proto_cg_rob_lord_ack message. Also converts values to other types if specified.
     * @param message proto_cg_rob_lord_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_rob_lord_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_rob_lord_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_show_card_not. */
export interface Iproto_gc_show_card_not {

    /** proto_gc_show_card_not nChairID */
    nChairID: number;

    /** proto_gc_show_card_not vecCards */
    vecCards?: (Iproto_CCard[]|null);
}

/** Represents a proto_gc_show_card_not. */
export class proto_gc_show_card_not implements Iproto_gc_show_card_not {

    /**
     * Constructs a new proto_gc_show_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_show_card_not);

    /** proto_gc_show_card_not nChairID. */
    public nChairID: number;

    /** proto_gc_show_card_not vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_gc_show_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_show_card_not instance
     */
    public static create(properties?: Iproto_gc_show_card_not): proto_gc_show_card_not;

    /**
     * Encodes the specified proto_gc_show_card_not message. Does not implicitly {@link proto_gc_show_card_not.verify|verify} messages.
     * @param message proto_gc_show_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_show_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_show_card_not message, length delimited. Does not implicitly {@link proto_gc_show_card_not.verify|verify} messages.
     * @param message proto_gc_show_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_show_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_show_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_show_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_show_card_not;

    /**
     * Decodes a proto_gc_show_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_show_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_show_card_not;

    /**
     * Verifies a proto_gc_show_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_show_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_show_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_show_card_not;

    /**
     * Creates a plain object from a proto_gc_show_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_show_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_show_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_show_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_sic_result_data_not. */
export interface Iproto_sic_result_data_not {

    /** proto_sic_result_data_not vecDice */
    vecDice?: (number[]|null);

    /** proto_sic_result_data_not nWinMoney */
    nWinMoney: number;

    /** proto_sic_result_data_not nPlayerMoneyAfter */
    nPlayerMoneyAfter: number;

    /** proto_sic_result_data_not vecWinCells */
    vecWinCells?: (number[]|null);

    /** proto_sic_result_data_not vecPlayerWinCells */
    vecPlayerWinCells?: (number[]|null);

    /** proto_sic_result_data_not vecHitAward */
    vecHitAward?: (string[]|null);

    /** proto_sic_result_data_not vecRank */
    vecRank?: (string[]|null);
}

/** Represents a proto_sic_result_data_not. */
export class proto_sic_result_data_not implements Iproto_sic_result_data_not {

    /**
     * Constructs a new proto_sic_result_data_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_sic_result_data_not);

    /** proto_sic_result_data_not vecDice. */
    public vecDice: [ 'Array' ].<number>;

    /** proto_sic_result_data_not nWinMoney. */
    public nWinMoney: number;

    /** proto_sic_result_data_not nPlayerMoneyAfter. */
    public nPlayerMoneyAfter: number;

    /** proto_sic_result_data_not vecWinCells. */
    public vecWinCells: [ 'Array' ].<number>;

    /** proto_sic_result_data_not vecPlayerWinCells. */
    public vecPlayerWinCells: [ 'Array' ].<number>;

    /** proto_sic_result_data_not vecHitAward. */
    public vecHitAward: [ 'Array' ].<string>;

    /** proto_sic_result_data_not vecRank. */
    public vecRank: [ 'Array' ].<string>;

    /**
     * Creates a new proto_sic_result_data_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_sic_result_data_not instance
     */
    public static create(properties?: Iproto_sic_result_data_not): proto_sic_result_data_not;

    /**
     * Encodes the specified proto_sic_result_data_not message. Does not implicitly {@link proto_sic_result_data_not.verify|verify} messages.
     * @param message proto_sic_result_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_sic_result_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_sic_result_data_not message, length delimited. Does not implicitly {@link proto_sic_result_data_not.verify|verify} messages.
     * @param message proto_sic_result_data_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_sic_result_data_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_sic_result_data_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_sic_result_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_sic_result_data_not;

    /**
     * Decodes a proto_sic_result_data_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_sic_result_data_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_sic_result_data_not;

    /**
     * Verifies a proto_sic_result_data_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_sic_result_data_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_sic_result_data_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_sic_result_data_not;

    /**
     * Creates a plain object from a proto_sic_result_data_not message. Also converts values to other types if specified.
     * @param message proto_sic_result_data_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_sic_result_data_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_sic_result_data_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_show_card_ack. */
export interface Iproto_cg_show_card_ack {

    /** proto_cg_show_card_ack cShowCard */
    cShowCard: number;

    /** proto_cg_show_card_ack nSerialID */
    nSerialID: number;

    /** proto_cg_show_card_ack nShowCardBet */
    nShowCardBet: number;

    /** proto_cg_show_card_ack nShowCardType */
    nShowCardType: number;
}

/** Represents a proto_cg_show_card_ack. */
export class proto_cg_show_card_ack implements Iproto_cg_show_card_ack {

    /**
     * Constructs a new proto_cg_show_card_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_show_card_ack);

    /** proto_cg_show_card_ack cShowCard. */
    public cShowCard: number;

    /** proto_cg_show_card_ack nSerialID. */
    public nSerialID: number;

    /** proto_cg_show_card_ack nShowCardBet. */
    public nShowCardBet: number;

    /** proto_cg_show_card_ack nShowCardType. */
    public nShowCardType: number;

    /**
     * Creates a new proto_cg_show_card_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_show_card_ack instance
     */
    public static create(properties?: Iproto_cg_show_card_ack): proto_cg_show_card_ack;

    /**
     * Encodes the specified proto_cg_show_card_ack message. Does not implicitly {@link proto_cg_show_card_ack.verify|verify} messages.
     * @param message proto_cg_show_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_show_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_show_card_ack message, length delimited. Does not implicitly {@link proto_cg_show_card_ack.verify|verify} messages.
     * @param message proto_cg_show_card_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_show_card_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_show_card_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_show_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_show_card_ack;

    /**
     * Decodes a proto_cg_show_card_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_show_card_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_show_card_ack;

    /**
     * Verifies a proto_cg_show_card_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_show_card_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_show_card_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_show_card_ack;

    /**
     * Creates a plain object from a proto_cg_show_card_ack message. Also converts values to other types if specified.
     * @param message proto_cg_show_card_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_show_card_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_show_card_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_send_card_ok_ack. */
export interface Iproto_cg_send_card_ok_ack {

    /** proto_cg_send_card_ok_ack nSerialID */
    nSerialID: number;
}

/** Represents a proto_cg_send_card_ok_ack. */
export class proto_cg_send_card_ok_ack implements Iproto_cg_send_card_ok_ack {

    /**
     * Constructs a new proto_cg_send_card_ok_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_send_card_ok_ack);

    /** proto_cg_send_card_ok_ack nSerialID. */
    public nSerialID: number;

    /**
     * Creates a new proto_cg_send_card_ok_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_send_card_ok_ack instance
     */
    public static create(properties?: Iproto_cg_send_card_ok_ack): proto_cg_send_card_ok_ack;

    /**
     * Encodes the specified proto_cg_send_card_ok_ack message. Does not implicitly {@link proto_cg_send_card_ok_ack.verify|verify} messages.
     * @param message proto_cg_send_card_ok_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_send_card_ok_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_send_card_ok_ack message, length delimited. Does not implicitly {@link proto_cg_send_card_ok_ack.verify|verify} messages.
     * @param message proto_cg_send_card_ok_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_send_card_ok_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_send_card_ok_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_send_card_ok_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_send_card_ok_ack;

    /**
     * Decodes a proto_cg_send_card_ok_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_send_card_ok_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_send_card_ok_ack;

    /**
     * Verifies a proto_cg_send_card_ok_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_send_card_ok_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_send_card_ok_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_send_card_ok_ack;

    /**
     * Creates a plain object from a proto_cg_send_card_ok_ack message. Also converts values to other types if specified.
     * @param message proto_cg_send_card_ok_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_send_card_ok_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_send_card_ok_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_lord_card_not. */
export interface Iproto_gc_lord_card_not {

    /** proto_gc_lord_card_not cLord */
    cLord: number;

    /** proto_gc_lord_card_not vecCards */
    vecCards?: (Iproto_CCard[]|null);
}

/** Represents a proto_gc_lord_card_not. */
export class proto_gc_lord_card_not implements Iproto_gc_lord_card_not {

    /**
     * Constructs a new proto_gc_lord_card_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_lord_card_not);

    /** proto_gc_lord_card_not cLord. */
    public cLord: number;

    /** proto_gc_lord_card_not vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /**
     * Creates a new proto_gc_lord_card_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_lord_card_not instance
     */
    public static create(properties?: Iproto_gc_lord_card_not): proto_gc_lord_card_not;

    /**
     * Encodes the specified proto_gc_lord_card_not message. Does not implicitly {@link proto_gc_lord_card_not.verify|verify} messages.
     * @param message proto_gc_lord_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_lord_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_lord_card_not message, length delimited. Does not implicitly {@link proto_gc_lord_card_not.verify|verify} messages.
     * @param message proto_gc_lord_card_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_lord_card_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_lord_card_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_lord_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_lord_card_not;

    /**
     * Decodes a proto_gc_lord_card_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_lord_card_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_lord_card_not;

    /**
     * Verifies a proto_gc_lord_card_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_lord_card_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_lord_card_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_lord_card_not;

    /**
     * Creates a plain object from a proto_gc_lord_card_not message. Also converts values to other types if specified.
     * @param message proto_gc_lord_card_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_lord_card_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_lord_card_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_get_redpackets_88yuan_award_ack. */
export interface Iproto_gc_get_redpackets_88yuan_award_ack {

    /** proto_gc_get_redpackets_88yuan_award_ack ret */
    ret: number;

    /** proto_gc_get_redpackets_88yuan_award_ack curRounds */
    curRounds: number;

    /** proto_gc_get_redpackets_88yuan_award_ack limitRounds */
    limitRounds: number;

    /** proto_gc_get_redpackets_88yuan_award_ack nAmount */
    nAmount: number;

    /** proto_gc_get_redpackets_88yuan_award_ack cItemtype */
    cItemtype: number;

    /** proto_gc_get_redpackets_88yuan_award_ack taskId */
    taskId: number;
}

/** Represents a proto_gc_get_redpackets_88yuan_award_ack. */
export class proto_gc_get_redpackets_88yuan_award_ack implements Iproto_gc_get_redpackets_88yuan_award_ack {

    /**
     * Constructs a new proto_gc_get_redpackets_88yuan_award_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_get_redpackets_88yuan_award_ack);

    /** proto_gc_get_redpackets_88yuan_award_ack ret. */
    public ret: number;

    /** proto_gc_get_redpackets_88yuan_award_ack curRounds. */
    public curRounds: number;

    /** proto_gc_get_redpackets_88yuan_award_ack limitRounds. */
    public limitRounds: number;

    /** proto_gc_get_redpackets_88yuan_award_ack nAmount. */
    public nAmount: number;

    /** proto_gc_get_redpackets_88yuan_award_ack cItemtype. */
    public cItemtype: number;

    /** proto_gc_get_redpackets_88yuan_award_ack taskId. */
    public taskId: number;

    /**
     * Creates a new proto_gc_get_redpackets_88yuan_award_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_get_redpackets_88yuan_award_ack instance
     */
    public static create(properties?: Iproto_gc_get_redpackets_88yuan_award_ack): proto_gc_get_redpackets_88yuan_award_ack;

    /**
     * Encodes the specified proto_gc_get_redpackets_88yuan_award_ack message. Does not implicitly {@link proto_gc_get_redpackets_88yuan_award_ack.verify|verify} messages.
     * @param message proto_gc_get_redpackets_88yuan_award_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_get_redpackets_88yuan_award_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_get_redpackets_88yuan_award_ack message, length delimited. Does not implicitly {@link proto_gc_get_redpackets_88yuan_award_ack.verify|verify} messages.
     * @param message proto_gc_get_redpackets_88yuan_award_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_get_redpackets_88yuan_award_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_get_redpackets_88yuan_award_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_get_redpackets_88yuan_award_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_get_redpackets_88yuan_award_ack;

    /**
     * Decodes a proto_gc_get_redpackets_88yuan_award_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_get_redpackets_88yuan_award_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_get_redpackets_88yuan_award_ack;

    /**
     * Verifies a proto_gc_get_redpackets_88yuan_award_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_get_redpackets_88yuan_award_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_get_redpackets_88yuan_award_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_get_redpackets_88yuan_award_ack;

    /**
     * Creates a plain object from a proto_gc_get_redpackets_88yuan_award_ack message. Also converts values to other types if specified.
     * @param message proto_gc_get_redpackets_88yuan_award_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_get_redpackets_88yuan_award_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_get_redpackets_88yuan_award_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_get_redpackets_88yuan_award_req. */
export interface Iproto_cg_get_redpackets_88yuan_award_req {

    /** proto_cg_get_redpackets_88yuan_award_req type */
    type: number;
}

/** Represents a proto_cg_get_redpackets_88yuan_award_req. */
export class proto_cg_get_redpackets_88yuan_award_req implements Iproto_cg_get_redpackets_88yuan_award_req {

    /**
     * Constructs a new proto_cg_get_redpackets_88yuan_award_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_get_redpackets_88yuan_award_req);

    /** proto_cg_get_redpackets_88yuan_award_req type. */
    public type: number;

    /**
     * Creates a new proto_cg_get_redpackets_88yuan_award_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_get_redpackets_88yuan_award_req instance
     */
    public static create(properties?: Iproto_cg_get_redpackets_88yuan_award_req): proto_cg_get_redpackets_88yuan_award_req;

    /**
     * Encodes the specified proto_cg_get_redpackets_88yuan_award_req message. Does not implicitly {@link proto_cg_get_redpackets_88yuan_award_req.verify|verify} messages.
     * @param message proto_cg_get_redpackets_88yuan_award_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_get_redpackets_88yuan_award_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_get_redpackets_88yuan_award_req message, length delimited. Does not implicitly {@link proto_cg_get_redpackets_88yuan_award_req.verify|verify} messages.
     * @param message proto_cg_get_redpackets_88yuan_award_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_get_redpackets_88yuan_award_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_get_redpackets_88yuan_award_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_get_redpackets_88yuan_award_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_get_redpackets_88yuan_award_req;

    /**
     * Decodes a proto_cg_get_redpackets_88yuan_award_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_get_redpackets_88yuan_award_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_get_redpackets_88yuan_award_req;

    /**
     * Verifies a proto_cg_get_redpackets_88yuan_award_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_get_redpackets_88yuan_award_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_get_redpackets_88yuan_award_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_get_redpackets_88yuan_award_req;

    /**
     * Creates a plain object from a proto_cg_get_redpackets_88yuan_award_req message. Also converts values to other types if specified.
     * @param message proto_cg_get_redpackets_88yuan_award_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_get_redpackets_88yuan_award_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_get_redpackets_88yuan_award_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_emojiConfig. */
export interface Iproto_emojiConfig {

    /** proto_emojiConfig cEmojiIndex */
    cEmojiIndex: number;

    /** proto_emojiConfig cCostType */
    cCostType: number;

    /** proto_emojiConfig cCostValue */
    cCostValue: number;
}

/** Represents a proto_emojiConfig. */
export class proto_emojiConfig implements Iproto_emojiConfig {

    /**
     * Constructs a new proto_emojiConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_emojiConfig);

    /** proto_emojiConfig cEmojiIndex. */
    public cEmojiIndex: number;

    /** proto_emojiConfig cCostType. */
    public cCostType: number;

    /** proto_emojiConfig cCostValue. */
    public cCostValue: number;

    /**
     * Creates a new proto_emojiConfig instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_emojiConfig instance
     */
    public static create(properties?: Iproto_emojiConfig): proto_emojiConfig;

    /**
     * Encodes the specified proto_emojiConfig message. Does not implicitly {@link proto_emojiConfig.verify|verify} messages.
     * @param message proto_emojiConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_emojiConfig, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_emojiConfig message, length delimited. Does not implicitly {@link proto_emojiConfig.verify|verify} messages.
     * @param message proto_emojiConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_emojiConfig, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_emojiConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_emojiConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_emojiConfig;

    /**
     * Decodes a proto_emojiConfig message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_emojiConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_emojiConfig;

    /**
     * Verifies a proto_emojiConfig message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_emojiConfig message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_emojiConfig
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_emojiConfig;

    /**
     * Creates a plain object from a proto_emojiConfig message. Also converts values to other types if specified.
     * @param message proto_emojiConfig
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_emojiConfig, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_emojiConfig to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_magic_emoji_config_not. */
export interface Iproto_gc_magic_emoji_config_not {

    /** proto_gc_magic_emoji_config_not emojiConfigs */
    emojiConfigs?: (Iproto_emojiConfig[]|null);
}

/** Represents a proto_gc_magic_emoji_config_not. */
export class proto_gc_magic_emoji_config_not implements Iproto_gc_magic_emoji_config_not {

    /**
     * Constructs a new proto_gc_magic_emoji_config_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_magic_emoji_config_not);

    /** proto_gc_magic_emoji_config_not emojiConfigs. */
    public emojiConfigs: [ 'Array' ].<Iproto_emojiConfig>;

    /**
     * Creates a new proto_gc_magic_emoji_config_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_magic_emoji_config_not instance
     */
    public static create(properties?: Iproto_gc_magic_emoji_config_not): proto_gc_magic_emoji_config_not;

    /**
     * Encodes the specified proto_gc_magic_emoji_config_not message. Does not implicitly {@link proto_gc_magic_emoji_config_not.verify|verify} messages.
     * @param message proto_gc_magic_emoji_config_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_magic_emoji_config_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_magic_emoji_config_not message, length delimited. Does not implicitly {@link proto_gc_magic_emoji_config_not.verify|verify} messages.
     * @param message proto_gc_magic_emoji_config_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_magic_emoji_config_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_magic_emoji_config_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_magic_emoji_config_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_magic_emoji_config_not;

    /**
     * Decodes a proto_gc_magic_emoji_config_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_magic_emoji_config_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_magic_emoji_config_not;

    /**
     * Verifies a proto_gc_magic_emoji_config_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_magic_emoji_config_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_magic_emoji_config_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_magic_emoji_config_not;

    /**
     * Creates a plain object from a proto_gc_magic_emoji_config_not message. Also converts values to other types if specified.
     * @param message proto_gc_magic_emoji_config_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_magic_emoji_config_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_magic_emoji_config_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_play_card_private_not. */
export interface Iproto_gc_play_card_private_not {

    /** proto_gc_play_card_private_not cChairID */
    cChairID: number;

    /** proto_gc_play_card_private_not vecCards */
    vecCards?: (Iproto_CCard[]|null);

    /** proto_gc_play_card_private_not cType */
    cType: Iproto_CCardsType;
}

/** Represents a proto_gc_play_card_private_not. */
export class proto_gc_play_card_private_not implements Iproto_gc_play_card_private_not {

    /**
     * Constructs a new proto_gc_play_card_private_not.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_play_card_private_not);

    /** proto_gc_play_card_private_not cChairID. */
    public cChairID: number;

    /** proto_gc_play_card_private_not vecCards. */
    public vecCards: [ 'Array' ].<Iproto_CCard>;

    /** proto_gc_play_card_private_not cType. */
    public cType: Iproto_CCardsType;

    /**
     * Creates a new proto_gc_play_card_private_not instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_play_card_private_not instance
     */
    public static create(properties?: Iproto_gc_play_card_private_not): proto_gc_play_card_private_not;

    /**
     * Encodes the specified proto_gc_play_card_private_not message. Does not implicitly {@link proto_gc_play_card_private_not.verify|verify} messages.
     * @param message proto_gc_play_card_private_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_play_card_private_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_play_card_private_not message, length delimited. Does not implicitly {@link proto_gc_play_card_private_not.verify|verify} messages.
     * @param message proto_gc_play_card_private_not message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_play_card_private_not, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_play_card_private_not message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_play_card_private_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_play_card_private_not;

    /**
     * Decodes a proto_gc_play_card_private_not message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_play_card_private_not
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_play_card_private_not;

    /**
     * Verifies a proto_gc_play_card_private_not message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_play_card_private_not message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_play_card_private_not
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_play_card_private_not;

    /**
     * Creates a plain object from a proto_gc_play_card_private_not message. Also converts values to other types if specified.
     * @param message proto_gc_play_card_private_not
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_play_card_private_not, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_play_card_private_not to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_look_lord_card_req. */
export interface Iproto_cg_look_lord_card_req {
}

/** Represents a proto_cg_look_lord_card_req. */
export class proto_cg_look_lord_card_req implements Iproto_cg_look_lord_card_req {

    /**
     * Constructs a new proto_cg_look_lord_card_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_look_lord_card_req);

    /**
     * Creates a new proto_cg_look_lord_card_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_look_lord_card_req instance
     */
    public static create(properties?: Iproto_cg_look_lord_card_req): proto_cg_look_lord_card_req;

    /**
     * Encodes the specified proto_cg_look_lord_card_req message. Does not implicitly {@link proto_cg_look_lord_card_req.verify|verify} messages.
     * @param message proto_cg_look_lord_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_look_lord_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_look_lord_card_req message, length delimited. Does not implicitly {@link proto_cg_look_lord_card_req.verify|verify} messages.
     * @param message proto_cg_look_lord_card_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_look_lord_card_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_look_lord_card_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_look_lord_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_look_lord_card_req;

    /**
     * Decodes a proto_cg_look_lord_card_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_look_lord_card_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_look_lord_card_req;

    /**
     * Verifies a proto_cg_look_lord_card_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_look_lord_card_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_look_lord_card_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_look_lord_card_req;

    /**
     * Creates a plain object from a proto_cg_look_lord_card_req message. Also converts values to other types if specified.
     * @param message proto_cg_look_lord_card_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_look_lord_card_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_look_lord_card_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_beishu_info_ack. */
export interface Iproto_gc_beishu_info_ack {

    /** proto_gc_beishu_info_ack vecBeiShuInfo */
    vecBeiShuInfo?: (number[]|null);

    /** proto_gc_beishu_info_ack vecPlayerBeiShu */
    vecPlayerBeiShu?: (number[]|null);
}

/** Represents a proto_gc_beishu_info_ack. */
export class proto_gc_beishu_info_ack implements Iproto_gc_beishu_info_ack {

    /**
     * Constructs a new proto_gc_beishu_info_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_beishu_info_ack);

    /** proto_gc_beishu_info_ack vecBeiShuInfo. */
    public vecBeiShuInfo: [ 'Array' ].<number>;

    /** proto_gc_beishu_info_ack vecPlayerBeiShu. */
    public vecPlayerBeiShu: [ 'Array' ].<number>;

    /**
     * Creates a new proto_gc_beishu_info_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_beishu_info_ack instance
     */
    public static create(properties?: Iproto_gc_beishu_info_ack): proto_gc_beishu_info_ack;

    /**
     * Encodes the specified proto_gc_beishu_info_ack message. Does not implicitly {@link proto_gc_beishu_info_ack.verify|verify} messages.
     * @param message proto_gc_beishu_info_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_beishu_info_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_beishu_info_ack message, length delimited. Does not implicitly {@link proto_gc_beishu_info_ack.verify|verify} messages.
     * @param message proto_gc_beishu_info_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_beishu_info_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_beishu_info_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_beishu_info_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_beishu_info_ack;

    /**
     * Decodes a proto_gc_beishu_info_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_beishu_info_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_beishu_info_ack;

    /**
     * Verifies a proto_gc_beishu_info_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_beishu_info_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_beishu_info_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_beishu_info_ack;

    /**
     * Creates a plain object from a proto_gc_beishu_info_ack message. Also converts values to other types if specified.
     * @param message proto_gc_beishu_info_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_beishu_info_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_beishu_info_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_beishu_info_req. */
export interface Iproto_cg_beishu_info_req {
}

/** Represents a proto_cg_beishu_info_req. */
export class proto_cg_beishu_info_req implements Iproto_cg_beishu_info_req {

    /**
     * Constructs a new proto_cg_beishu_info_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_beishu_info_req);

    /**
     * Creates a new proto_cg_beishu_info_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_beishu_info_req instance
     */
    public static create(properties?: Iproto_cg_beishu_info_req): proto_cg_beishu_info_req;

    /**
     * Encodes the specified proto_cg_beishu_info_req message. Does not implicitly {@link proto_cg_beishu_info_req.verify|verify} messages.
     * @param message proto_cg_beishu_info_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_beishu_info_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_beishu_info_req message, length delimited. Does not implicitly {@link proto_cg_beishu_info_req.verify|verify} messages.
     * @param message proto_cg_beishu_info_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_beishu_info_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_beishu_info_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_beishu_info_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_beishu_info_req;

    /**
     * Decodes a proto_cg_beishu_info_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_beishu_info_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_beishu_info_req;

    /**
     * Verifies a proto_cg_beishu_info_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_beishu_info_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_beishu_info_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_beishu_info_req;

    /**
     * Creates a plain object from a proto_cg_beishu_info_req message. Also converts values to other types if specified.
     * @param message proto_cg_beishu_info_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_beishu_info_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_beishu_info_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_regain_lose_score_req. */
export interface Iproto_cg_regain_lose_score_req {

    /** proto_cg_regain_lose_score_req nOp */
    nOp: number;
}

/** Represents a proto_cg_regain_lose_score_req. */
export class proto_cg_regain_lose_score_req implements Iproto_cg_regain_lose_score_req {

    /**
     * Constructs a new proto_cg_regain_lose_score_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_regain_lose_score_req);

    /** proto_cg_regain_lose_score_req nOp. */
    public nOp: number;

    /**
     * Creates a new proto_cg_regain_lose_score_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_regain_lose_score_req instance
     */
    public static create(properties?: Iproto_cg_regain_lose_score_req): proto_cg_regain_lose_score_req;

    /**
     * Encodes the specified proto_cg_regain_lose_score_req message. Does not implicitly {@link proto_cg_regain_lose_score_req.verify|verify} messages.
     * @param message proto_cg_regain_lose_score_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_regain_lose_score_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_regain_lose_score_req message, length delimited. Does not implicitly {@link proto_cg_regain_lose_score_req.verify|verify} messages.
     * @param message proto_cg_regain_lose_score_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_regain_lose_score_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_regain_lose_score_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_regain_lose_score_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_regain_lose_score_req;

    /**
     * Decodes a proto_cg_regain_lose_score_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_regain_lose_score_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_regain_lose_score_req;

    /**
     * Verifies a proto_cg_regain_lose_score_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_regain_lose_score_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_regain_lose_score_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_regain_lose_score_req;

    /**
     * Creates a plain object from a proto_cg_regain_lose_score_req message. Also converts values to other types if specified.
     * @param message proto_cg_regain_lose_score_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_regain_lose_score_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_regain_lose_score_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_regain_lose_score_ack. */
export interface Iproto_gc_regain_lose_score_ack {

    /** proto_gc_regain_lose_score_ack nRet */
    nRet: number;

    /** proto_gc_regain_lose_score_ack nTime */
    nTime: number;

    /** proto_gc_regain_lose_score_ack nValue */
    nValue?: (number[]|null);

    /** proto_gc_regain_lose_score_ack nCurCount */
    nCurCount: number;
}

/** Represents a proto_gc_regain_lose_score_ack. */
export class proto_gc_regain_lose_score_ack implements Iproto_gc_regain_lose_score_ack {

    /**
     * Constructs a new proto_gc_regain_lose_score_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_regain_lose_score_ack);

    /** proto_gc_regain_lose_score_ack nRet. */
    public nRet: number;

    /** proto_gc_regain_lose_score_ack nTime. */
    public nTime: number;

    /** proto_gc_regain_lose_score_ack nValue. */
    public nValue: [ 'Array' ].<number>;

    /** proto_gc_regain_lose_score_ack nCurCount. */
    public nCurCount: number;

    /**
     * Creates a new proto_gc_regain_lose_score_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_regain_lose_score_ack instance
     */
    public static create(properties?: Iproto_gc_regain_lose_score_ack): proto_gc_regain_lose_score_ack;

    /**
     * Encodes the specified proto_gc_regain_lose_score_ack message. Does not implicitly {@link proto_gc_regain_lose_score_ack.verify|verify} messages.
     * @param message proto_gc_regain_lose_score_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_regain_lose_score_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_regain_lose_score_ack message, length delimited. Does not implicitly {@link proto_gc_regain_lose_score_ack.verify|verify} messages.
     * @param message proto_gc_regain_lose_score_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_regain_lose_score_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_regain_lose_score_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_regain_lose_score_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_regain_lose_score_ack;

    /**
     * Decodes a proto_gc_regain_lose_score_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_regain_lose_score_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_regain_lose_score_ack;

    /**
     * Verifies a proto_gc_regain_lose_score_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_regain_lose_score_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_regain_lose_score_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_regain_lose_score_ack;

    /**
     * Creates a plain object from a proto_gc_regain_lose_score_ack message. Also converts values to other types if specified.
     * @param message proto_gc_regain_lose_score_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_regain_lose_score_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_regain_lose_score_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_cg_enable_invincible_req. */
export interface Iproto_cg_enable_invincible_req {

    /** proto_cg_enable_invincible_req nOp */
    nOp: number;
}

/** Represents a proto_cg_enable_invincible_req. */
export class proto_cg_enable_invincible_req implements Iproto_cg_enable_invincible_req {

    /**
     * Constructs a new proto_cg_enable_invincible_req.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_cg_enable_invincible_req);

    /** proto_cg_enable_invincible_req nOp. */
    public nOp: number;

    /**
     * Creates a new proto_cg_enable_invincible_req instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_cg_enable_invincible_req instance
     */
    public static create(properties?: Iproto_cg_enable_invincible_req): proto_cg_enable_invincible_req;

    /**
     * Encodes the specified proto_cg_enable_invincible_req message. Does not implicitly {@link proto_cg_enable_invincible_req.verify|verify} messages.
     * @param message proto_cg_enable_invincible_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_cg_enable_invincible_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_cg_enable_invincible_req message, length delimited. Does not implicitly {@link proto_cg_enable_invincible_req.verify|verify} messages.
     * @param message proto_cg_enable_invincible_req message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_cg_enable_invincible_req, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_cg_enable_invincible_req message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_cg_enable_invincible_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_cg_enable_invincible_req;

    /**
     * Decodes a proto_cg_enable_invincible_req message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_cg_enable_invincible_req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_cg_enable_invincible_req;

    /**
     * Verifies a proto_cg_enable_invincible_req message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_cg_enable_invincible_req message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_cg_enable_invincible_req
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_cg_enable_invincible_req;

    /**
     * Creates a plain object from a proto_cg_enable_invincible_req message. Also converts values to other types if specified.
     * @param message proto_cg_enable_invincible_req
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_cg_enable_invincible_req, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_cg_enable_invincible_req to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a proto_gc_enable_invincible_ack. */
export interface Iproto_gc_enable_invincible_ack {

    /** proto_gc_enable_invincible_ack nRet */
    nRet: number;
}

/** Represents a proto_gc_enable_invincible_ack. */
export class proto_gc_enable_invincible_ack implements Iproto_gc_enable_invincible_ack {

    /**
     * Constructs a new proto_gc_enable_invincible_ack.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iproto_gc_enable_invincible_ack);

    /** proto_gc_enable_invincible_ack nRet. */
    public nRet: number;

    /**
     * Creates a new proto_gc_enable_invincible_ack instance using the specified properties.
     * @param [properties] Properties to set
     * @returns proto_gc_enable_invincible_ack instance
     */
    public static create(properties?: Iproto_gc_enable_invincible_ack): proto_gc_enable_invincible_ack;

    /**
     * Encodes the specified proto_gc_enable_invincible_ack message. Does not implicitly {@link proto_gc_enable_invincible_ack.verify|verify} messages.
     * @param message proto_gc_enable_invincible_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iproto_gc_enable_invincible_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified proto_gc_enable_invincible_ack message, length delimited. Does not implicitly {@link proto_gc_enable_invincible_ack.verify|verify} messages.
     * @param message proto_gc_enable_invincible_ack message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iproto_gc_enable_invincible_ack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a proto_gc_enable_invincible_ack message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns proto_gc_enable_invincible_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto_gc_enable_invincible_ack;

    /**
     * Decodes a proto_gc_enable_invincible_ack message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns proto_gc_enable_invincible_ack
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto_gc_enable_invincible_ack;

    /**
     * Verifies a proto_gc_enable_invincible_ack message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a proto_gc_enable_invincible_ack message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns proto_gc_enable_invincible_ack
     */
    public static fromObject(object: [ 'object' ].<string, any>): proto_gc_enable_invincible_ack;

    /**
     * Creates a plain object from a proto_gc_enable_invincible_ack message. Also converts values to other types if specified.
     * @param message proto_gc_enable_invincible_ack
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: proto_gc_enable_invincible_ack, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this proto_gc_enable_invincible_ack to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}
