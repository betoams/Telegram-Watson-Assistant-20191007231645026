import { speechToText } from "./config";
import uuid  from "uuid";
import fs from 'fs'
import mkdirp from 'mkdirp'


export const stt = async(voice) =>{
    return new Promise((resolve, reject) =>{

        mkdirp('server/tmp', ()=>{
            console.log(`imprimir aqui porra ${__dirname}`);
            const outputFilename = 'server/tmp/' + uuid() + '.oga';
            fs.writeFileSync(outputFilename, voice);
       
      
        
        var params = {
            // From file
            audio: fs.createReadStream(outputFilename),
            content_type: 'audio/ogg',
            model:'pt-BR_BroadbandModel'
        };
        
        speechToText.recognize(params, (error,text)=>{
            if(!error && text.results.length > 0){
                fs.unlink(outputFilename)
                resolve({err:false, transcript: text.results[0].alternatives[0].transcript})
            }else{
                resolve({err:true, transcript: "Desculpe...Eu não entendi, poderia falar mais perto?"})
            }
            
        })
    })
    })
}

