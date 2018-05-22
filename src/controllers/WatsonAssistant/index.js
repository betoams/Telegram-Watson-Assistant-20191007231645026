import {
    assistant,
    workspace
} from './config.js'
import {
    resolve
} from 'url';
const userDAO = require('../DAO');

export const chat = async (text, sender) => {
    var userContext = ""
    let contex = await pegaContext(sender, userContext);
    let assistantResponse = await chamaAssistant(sender, contex, text);
    return assistantResponse;

}

const chamaAssistant = (sender, contex, text) => {
    return new Promise((resolve, reject) => {
        assistant.message({
            workspace_id: workspace,
            input: {
                text
            },
            headers: {},
            context: contex
        }, function (err, result, response) {
            if (err)
                reject(err)
            else {
                userDAO.updateUser(sender, result.context).then((resultFinal) => {
                    resolve(result)
                })
            }
        });
    })

}

const pegaContext = async (sender, userContext) => {
    return new Promise((resolve, reject) => {
        userDAO.getUserById(sender).then((resultado) => {
            if (resultado[0] == null) {
                userContext = {
                    conversation_id: "023b8ecf-c7b9-4fc1-93b2-45f92e685270",
                    "system": {
                        "dialog_stack": [{
                            "dialog_node": "root"
                        }],
                        "dialog_turn_counter": 1,
                        "dialog_request_counter": 1,
                        "_node_output_map": {
                            "node_2_1526056249898": [0]
                        },
                        "branch_exited": true,
                        "branch_exited_reason": "completed"
                    }
                }
                var user = {
                    "_id": sender,
                    "context": userContext,
                }
                userDAO.insertUser(user).then((resultadoInsert) => {
                    resolve(resultadoInsert);
                })
            } else {
                resolve(resultado[0].context);
            }
        })

    })

}