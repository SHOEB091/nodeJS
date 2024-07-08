const {Client,GatewayIntentBits} = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });


//directly use commands on mesage 
client.on('messageCreate',(message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url = message.content.split('create')[1];
        return message.reply({
            content: "Generating Short Id for " + url, 
        });
    }
    message.reply({
        content: "Hi From Bot",
    })
    
})

//for interaction using "/" 

client.on("interactionCreate",interaction =>{
    console.log(interaction);
    interaction.reply("Pong!!");
})

client.login("") 