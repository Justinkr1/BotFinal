const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, PermissionsBitField } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('enroll')
    .setDescription('This is the reaction role command')
    .addRoleOption(option => option.setName('class1').setDescription('This is the first class you want to set up').setRequired(true))
    .addRoleOption(option => option.setName('class2').setDescription('This is the first class you want to set up').setRequired(true))
    .addRoleOption(option => option.setName('class3').setDescription('This is the first class you want to set up').setRequired(true))
    .addRoleOption(option => option.setName('class4').setDescription('This is the first class you want to set up').setRequired(true)),

    async execute(interaction,client) {


        const role1 = interaction.options.getRole('class1')
        const role2 = interaction.options.getRole('class2')
        const role3 = interaction.options.getRole('class3')
        const role4 = interaction.options.getRole('class4')
       // const role5 = interaction.options.getRole('class5')

        const class1 = role1.name;
        const class2 = role2.name;
        const class3 = role3.name;
        const class4 = role4.name;
       // class5 = role5.name
        console.log(role1.name);

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({contnent: "You must have admin perm to use command", ephemeral: true});

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button1')
            .setLabel(class1)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('button2')
            .setLabel(class2)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('button3')
            .setLabel(class3)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('button4')
            .setLabel(class4)
            .setStyle(ButtonStyle.Secondary),

            /*new ButtonBuilder()
            .setCustomId('button5')
            .setLabel(class5)
            //.setLabel(`${role5.name}`)
            .setStyle(ButtonStyle.Secondary),*/
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Reaction Roles`)
        .setDescription(`React with the buttons below to get the class role!) (${class1}, ${class2}, ${class3}, ${class4},`)
        await interaction.reply({embeds:[embed], components: [button]});

        const collector = await interaction.channel.createMessageComponentCollector();
		const channel = interaction.channel;
		if (channel && !(channel instanceof Discord.TextChannel || channel instanceof Discord.NewsChannel)) {
			return;
		}
		

        collector.on('collect', async (i) => {
		const member = interaction.member;
        if (i.customId === 'button1') {
            member.roles.add(role1);
            i.reply({content: `You now have the role :${class1}`, ephemeral:true});
        }
        if (i.customId === 'button2') {
            member.roles.add(role2);
            i.reply({content: `You now have the role :${class2}`, ephemeral:true});
        }
        if (i.customId === 'button3') {
            member.roles.add(role3);
            i.reply({content: `You now have the role :${class3}`, ephemeral:true});
        }

        if (i.customId === 'button4') {
            member.roles.add(role4);
            i.reply({content: `You now have the role :${class4}`, ephemeral:true});
        }
        /*if (i.customId === 'button5') {
            member.roles.add(role5);
            i.reply({content: `You now have the role :${role5.name}`, ephemeral:true});
        }*/
    })
    }

}