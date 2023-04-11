const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, setPosition, } = require('discord.js');
const fs = require('fs');
const { relative } = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createrole')
		.setDescription('Creates a new role')
        .addStringOption(option =>
            option
            .setName('role-name')
            .setDescription('the role name to create')
            .setRequired(true),
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const Random1 = Math.floor(Math.random()*256)
        const Random2 = Math.floor(Math.random()*256)
        const Random3 = Math.floor(Math.random()*256)
        console.log(Random1);
        console.log(Random2);
        console.log(Random3);
        const Color = [Random1, Random2, Random3];
        interaction.guild.roles.create({
            name: interaction.options.data[0].value + ' Student',
            permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageNicknames],
            color: Color,
            reason: 'Role created',
        });
        const ColorD = [Random1 -Random1*0.15, Random2 -Random2*0.15, Random2 -Random2*0.15];
        interaction.guild.roles.create({
            name: interaction.options.data[0].value + ' Veteran',
            permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageNicknames],
            color: ColorD,
            reason: 'Veteran Role created',
        });

        interaction.reply('Role has been created!');
        interaction.options.data[0].value = '';
    },
};