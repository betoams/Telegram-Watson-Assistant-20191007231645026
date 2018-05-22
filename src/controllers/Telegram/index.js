import {
  load
} from "dotenv"
import axios from "axios"
import TelegramBot from 'node-telegram-bot-api'
import {
  chat
} from '../WatsonAssistant'
import {
  stt
} from '../SpeechToText'
import {
  tts
} from '../TextToSpeech'
import  fs  from "fs";

load()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {

  if (msg.text) {

    try {
      let assistantResp = await chat(msg.text, msg.chat.id.toString())
      bot.sendMessage(msg.chat.id, assistantResp.output.text[0]);
    } catch (error) {
      bot.sendMessage(msg.chat.id, 'Desculpe, estou tendo problemas com o sistema da central de atendimento...Tente novamente mais tarde!');
    }

  } else if (msg.voice) {

    try {
      let voice = await getVoice(msg.voice.file_id)
      if (!voice.err) {
        let transcript = await stt(voice.buffer)

        if (!transcript.err) {
          let assistantResp = await chat(transcript.transcript, msg.chat.id.toString())
          var audioResponse = await tts(assistantResp.output.text[0])
          const audioOptions = {
            contentType: 'audio/wav',
          };
          bot.sendVoice(msg.chat.id, audioResponse);
          fs.unlink(audioResponse)
        } else {
          bot.sendMessage(msg.chat.id, transcript.transcript);
        }

      } else {
        bot.sendMessage(msg.chat.id, 'Desculpe...Eu não entendi, poderia falar mais perto?');
      }

    } catch (error) {
      console.log(error)
      bot.sendMessage(msg.chat.id, 'Desculpe, estou tendo problemas com o sistema da central de atendimento...Tente novamente mais tarde!');
    }

  }
});


const getVoice = async (voiceFileId) => {
  return new Promise((resolve, reject) => {
    axios.get('https://api.telegram.org/bot' + process.env.TELEGRAM_KEY + '/getFile?file_id=' + voiceFileId)
      .then((resp) => {
        console.log('1')
        axios.request({
            responseType: 'arraybuffer',
            url: ('https://api.telegram.org/file/bot'+  process.env.TELEGRAM_KEY + '/' + resp.data.result.file_path),
            method: 'get',
            headers: {
              'Content-Type': 'audio/mpeg',
            },
          })
          .then((result) => {
            resolve({
              err: false,
              buffer: result.data
            });
          })
          .catch((error) => {
            resolve({
              err: true
            });
          });

      }).catch((erro) => {
        console.log(erro)
        resolve({
          err: true
        });
      })

  })

}