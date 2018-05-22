import { TextToSpeechV1 } from 'watson-developer-cloud'
import { load } from "dotenv"

load()

export const textToSpeech = new TextToSpeechV1({
  username: process.env.TTS_USERNAME,
  password: process.env.TTS_PASSWORD,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});