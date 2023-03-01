export interface proto_ping {
    now: number
}

export interface proto_pong {
    now: number
}

export interface proto_lc_use_protocol_proto_ack {
    opcode: "proto_lc_use_protocol_proto_ack"
}

export interface proto_cl_use_protocol_proto_req {
    opcode: "proto_cl_use_protocol_proto_req"
}

export interface proto_cb_send_disconnect_req {
    opcode: "proto_cb_send_disconnect_req"
}
