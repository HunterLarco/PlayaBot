const { SlashCommandBuilder } = require('@discordjs/builders');

const kSlashCommand = new SlashCommandBuilder()
  .setName('rsvp')
  .setDescription('RSVP for Burning Man 2022')
  .setDMPermission(true)
  .addStringOption((option) =>
    option
      .setName('status')
      .setDescription('Set/update your RSVP for Take It Easy 2022.')
      .addChoices(
        { name: 'Going', value: 'going' },
        { name: 'Undecided', value: 'undecided' },
        { name: 'Not Going', value: 'not_going' }
      )
      .setRequired(true)
  );

async function handler(environment, client, interaction) {
  await interaction.reply({ content: 'Pong!', ephemeral: true });
}

module.exports = {
  kSlashCommand,
  handler,
};
