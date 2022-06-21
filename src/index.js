const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rsvp = require('./commands/rsvp.js');
const environment = require('./environment/index.js');
const { createServer } = require('./server/index.js');

const intents = new Intents();
const client = new Client({ intents });

const rest = new REST({ version: '9' }).setToken(environment.discord.kToken);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        environment.discord.kClientId,
        environment.discord.kGuildId
      ),
      { body: [rsvp.kSlashCommand.toJSON()] }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    await rsvp.handler(environment, client, interaction);
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  await createServer(environment, client);

  client.login(environment.discord.kToken);
})();
