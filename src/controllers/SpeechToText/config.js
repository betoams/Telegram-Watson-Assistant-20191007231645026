import { SpeechToTextV1 } from 'watson-developer-cloud'
import { load } from "dotenv"

load()

export const speechToText = new SpeechToTextV1({
  username: process.env.STT_USERNAME,
  password: process.env.STT_PASSWORD,
  url: 'https://stream.watsonplatform.net/speech-to-text/api/'
});

