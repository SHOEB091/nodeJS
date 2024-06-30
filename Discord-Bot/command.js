const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'create',
    description: 'Creates a new short URL',
  },
];

const rest = new REST({ version: '10' }).setToken("MTI1NjY5NjAwOTE5MTMyOTg1Mg.GTAQUi.mdflCNtylxwKeEAVy9g887vVvp7V6aHi8cNmZ4");

async function main() {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1256696009191329852"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

main();