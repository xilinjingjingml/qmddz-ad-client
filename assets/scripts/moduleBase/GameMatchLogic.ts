import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { gobackToMain, goBackToMatch } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import MatchInfo from "../moduleLobby/MatchInfo"

export let GameMatchLogic = {

    extendFunction: {
        proto_bc_login_ack_handler(gameSceneInstance, funName, event) {
            if (typeof (gameSceneInstance[funName + "_old"]) != "undefined") {
                gameSceneInstance[funName + "_old"](event)
            }

            const message = event.packet
            if (message.ret == 0) {
                gameSceneInstance.proto_cb_join_match_req_sender(gameSceneInstance)
            }
        },

        proto_cb_join_match_req_sender(gameSceneInstance) {
            const matchInfo = DataManager.Instance.matchMap[DataManager.CommonData["gameServer"]["matchType"]]
            if (matchInfo && matchInfo.type == 2) {
                gameSceneInstance["gameLogic"].sendMessage({
                    opcode: 'proto_cb_match_join_flow_match_req',
                    matchType: DataManager.CommonData["gameServer"]["matchType"] || 0,
                    matchMinNum: matchInfo.minNum
                })
            } else {
                gameSceneInstance["gameLogic"].sendMessage({
                    opcode: 'proto_cb_join_match_req',
                    matchId: DataManager.CommonData["gameServer"]["matchId"] || 0,
                    matchTypeId: DataManager.CommonData["gameServer"]["matchType"] || 0
                })
            }
        },

        proto_bc_match_sign_num_not(gameSceneInstance, funName, event) {
            this.sign_event = event
        },

        proto_bc_join_match_ack(gameSceneInstance, funName, event) {
            const message = event.packet
            cc.log("proto_bc_join_match_ack", message)
            if (message.ret == 0) {
                DataManager.CommonData["gameServer"]["matchId"] = message.matchId
                DataManager.CommonData["gameServer"]["matchType"] = message.matchType
                if (message.matchStatus < 2) {
                    gameSceneInstance["gameLogic"].messageJoinMatchAck = message
                    SceneManager.Instance.sendMessageToScene("updateMatchReady")
                    SceneManager.Instance.popScene("moduleBaseRes", "MatchReady", { matchId: message.matchId, matchType: message.matchType, gameLogic: gameSceneInstance["gameLogic"] })
                }
            } else {
                goBackToMatch({ msg: "该比赛已开始 请报名下一场比赛", matchInfo: { matchType: DataManager.CommonData["gameServer"]["matchType"] } })
            }
        }
    }
}