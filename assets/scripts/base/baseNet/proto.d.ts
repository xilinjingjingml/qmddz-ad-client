interface Iproto_ping {
    now: number
}

interface Iproto_pong {
    now: number
}

interface Iproto_lc_use_protocol_proto_ack {
    opcode: 'proto_lc_use_protocol_proto_ack'
}

interface Iproto_cl_use_protocol_proto_req {
    opcode: 'proto_cl_use_protocol_proto_req'
}

interface Iproto_cb_send_disconnect_req {
    opcode: 'proto_cb_send_disconnect_req'
}
