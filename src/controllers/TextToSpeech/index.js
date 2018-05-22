import { textToSpeech } from "./config";
import fs from 'fs'
import uuid  from "uuid";

export const tts = async (text) =>{
    return new Promise((resolve,reject) =>{

        var params = {
            text,
            voice: 'pt-BR_IsabelaVoice',
            accept: 'audio/wav'
          };
    
      // Synthesize speech, correct the wav header, then save to disk
      // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
      textToSpeech.synthesize(params, function(err, audio) {
          if (err) {
            console.log(err);
            return;
          }
          textToSpeech.repairWavHeader(audio);
          let filePath ='server/tmp/' + uuid() + '.wav' ;
          fs.writeFileSync(filePath, audio);
          resolve(filePath)
      });

    })
}

 