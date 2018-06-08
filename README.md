## NodeJS Telegram Bot with Speech to text, Text to Speech and Watson Assistant
This project aims to facilitate and democratize the development of Chat Bots for people who do not have any programming skills

## Motivation
This project was created from a request from a salesperson in the company where I work, he needed a ChatBot but he did not understand programming, so I decided to create this project where he just needs to put the credentials of the necessary services and develop the conversation on the Watson Assistant platform

## Screenshots

## Sample Screenshot of the bot in Telegram using text, and audio functionalities
<img src="https://user-images.githubusercontent.com/23619646/41172332-f0791854-6b29-11e8-948a-cb57219460a9.jpeg" height="500px">


## Built with
- [Node.JS](https://nodejs.org/en/)
- [IBM Cloud](https://www.ibm.com/cloud/)

## Features
- [Watson Assistant](https://console.bluemix.net/catalog/services/watson-assistant-formerly-conversation)
- [Text to Speech](https://console.bluemix.net/catalog/services/text-to-speech)
- [Speech to Text](https://console.bluemix.net/catalog/services/speech-to-text)
- [Cloudant NoSQL DB](https://console.bluemix.net/catalog/services/cloudant-nosql-db)

## Installation
1. Deploy the following services to your IBM Cloud Account and write down in a notepad📑 their credentials (you will need them later)
    - [Watson Assistant](https://console.bluemix.net/catalog/services/watson-assistant-formerly-conversation)
(Dont forget to create an Workspace inside this Service and get the Workspace ID)
    - [Text to Speech](https://console.bluemix.net/catalog/services/text-to-speech)
    - [Speech to Text](https://console.bluemix.net/catalog/services/speech-to-text)
    - [Cloudant NoSQL DB](https://console.bluemix.net/catalog/services/cloudant-nosql-db)

2. Crete a Telegram bot and get his token

    2.1 Enter in the Telegram app and speak with @BotFather

    2.2 Use the /newbot command to create a new bot. The BotFather will ask you for a name and username, then generate an authorization token for your new bot.

    2.3 The name of your bot is displayed in contact details and elsewhere.

    2.4 The Username is a short name, to be used in mentions and telegram.me links. Usernames are 5-32 characters long and are case insensitive, but may only include Latin characters, numbers, and underscores. Your bot's username must end in ‘bot’, e.g. ‘tetris_bot’ or ‘TetrisBot’.

    2.5 The token is a string along the lines of 110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw that is required to authorize the bot and send requests to the Bot API.

    2.6 Write down his token in the notepad📑 as well.

3. Create your bot BackEnd in IBM Cloud by clicking in "Deploy to IBM Cloud" button.
    3.1 Fill up the form with the credentials that you obtained by creating the services you was previously requested

<a href="https://bluemix.net/deploy?repository=https://github.com/BrunoTCouto/Watson-assistant-Telegram-with-STT-TTS"
    target="_blank"><img src="http://bluemix.net/deploy/button.png" alt="Bluemix button"/></a>

4. After filling up the form for the pipeline, wait for the application being deployed

    4.1 You can see the Deployment status by following these steps
    <img src="https://user-images.githubusercontent.com/23619646/41173989-2a8fda78-6b2f-11e8-914d-1ef6c010a297.png" height="300px">
    <img src="https://user-images.githubusercontent.com/23619646/41174226-e85fa7ea-6b2f-11e8-9e74-bf0a8d9d6397.png" height="300px">

5. When both being green you can use your bot! 🎉🎉🎉

## How to use?
Start a conversation with your bot in telegram, you can chat with him by text and voice

## Credits
Special thanks for [Rabah Zeineddine](https://www.linkedin.com/in/rabahzeineddine/) & [Gabriel Marote](https://www.linkedin.com/in/gamarote/) for helping with the pipeline creation


## License
Apache License 2.0
A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

Apache 2.0 © [Bruno Couto](https://www.linkedin.com/in/brunotc/)
