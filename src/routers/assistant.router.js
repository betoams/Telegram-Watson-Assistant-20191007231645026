// `use strict`

// import { chat } from '../controllers/WatsonAssistant'
// import { Router } from 'express'
// // --- Import controllers ---

// var router = Router()

// const initRouter = () => {
//     router.route('/')
//         .post(callChat)

//     return router
// }

// // --- Functions ---

// const callChat = async (req, res) => {

//     const body = req.body
//     let MsgSender = body.entry !== undefined
//     && body.entry.length !== 0 
//     && body.entry[0].messaging !== undefined
//     && body.entry[0].messaging.length !== 0
//     && body.entry[0].messaging[0].sender !== undefined
//     && body.entry[0].messaging[0].sender.id !== undefined 
//     ? body.entry[0].messaging[0].sender.id : null

//     let MsgSenderText = body.entry !== undefined 
//     && body.entry.length !== 0 
//     && body.entry[0].messaging !== undefined
//     && body.entry[0].messaging.length !== 0
//     && body.entry[0].messaging[0].message !== undefined
//     && body.entry[0].messaging[0].message.text !== undefined 
//      ? body.entry[0].messaging[0].message.text : null

//      console.log(MsgSender+"   "+MsgSenderText)

//     if (MsgSender !== null && MsgSenderText !== null) {
//         try {
//             console.log("Aqui dentro: " + MsgSender);
//             var assistantResponse = await chat(MsgSenderText, MsgSender);
//             console.log("Passou do chat");
//             await sendMessage(MsgSender,assistantResponse.output.text[0]);
//             res.send({err:false}) 
//         } catch (error) {
//             res.send({err:true})
//         }
//     }else{
//         res.send({err:true})
//     }

//     console.log()
// }

// // -----------------

// export default initRouter()