const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const kOptionValues = {
  NotGoing: 'NotGoing',
  Going: 'Going',
};

const kSlashCommand = new SlashCommandBuilder()
  .setName('rsvp')
  .setDescription('RSVP for Burning Man 2022')
  .setDMPermission(true)
  .addStringOption((option) =>
    option
      .setName('status')
      .setDescription('Set/update your RSVP for Take It Easy 2022.')
      .addChoices(
        { name: 'Going', value: kOptionValues.Going },
        { name: 'Not Going', value: kOptionValues.NotGoing }
      )
      .setRequired(true)
  );

async function handler(environment, client, interaction) {
  const status = interaction.options.getString('status');

  await interaction.reply({
    content: status == kOptionValues.Going ? 'Thanks!' : 'Too bad',
    embeds: [
      new MessageEmbed()
        .setTitle('Some title')
        .setDescription('Some description here'),
    ],
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('going')
          .setLabel('Going!')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('no_going')
          .setLabel('Not Going')
          .setStyle('DANGER')
      ),
    ],
    ephemeral: true,
  });
}

module.exports = {
  kSlashCommand,
  handler,
};
