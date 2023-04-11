const { Client,SlashCommandBuilder, ChannelType, PermissionFlagsBits,GatewayIntentBits } = require('discord.js');

//intents
const client = new Client({
    intents: [
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.Guilds,
    ],
  });
//end of intents

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cohab')
		.setDescription('Creates a channel')
        .addStringOption(option => option
            .setName('coursename')
            .setDescription('the new channel to create')
            .setRequired(true),
            )
        .addStringOption(option => option
            .setName('cohabitant')
            .setDescription('cohabitated class')
            .setRequired(true),
            )

        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        if(interaction.options.data[1] === null)
        {
            const Name = interaction.options.data[0].value;
            console.log(Name);
            const student = interaction.guild.roles.cache.find(role => role.name === Name + ' Student');
            console.log(student.id)
    
    
            // console.log(interaction.options.data[0].value);
            if (interaction.options.data[0] === undefined) {
                interaction.guild.channels.create({
                    name: interaction.options.data[0].value,
                    type: ChannelType.GuildText,
                });
            }
            else {
                const temp = await interaction.guild.channels.create({
                    name: interaction.options.data[0].value,
                    type: ChannelType.GuildCategory,
                });
                await interaction.guild.channels.create({
                    name: "announcements-"+interaction.options.data[0].value.toString() ,
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel],
                          deny: [PermissionFlagsBits.SendMessages],
                        },
                      ],
                });
                await interaction.guild.channels.create({
                    name: "zoom-meeting-info-"+interaction.options.data[0].value.toString(),
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel],
                          deny: [PermissionFlagsBits.SendMessages],
                        },
                      ],
                });
                // Create 'how-to-make-a-video' channel and send messages from 'howto' array
                const howto = [
                    "https://imgur.com/p1nC9Yc",
                    "https://imgur.com/jTtfWvW",
                    "https://imgur.com/u2ERyT6",
                    "https://imgur.com/laKGkX5",
                    "https://imgur.com/lAvTioI",
                    "https://imgur.com/DzLyAg7",
                    "https://imgur.com/FhZKSZz",
                    "https://imgur.com/VwUKFzS",
                    "https://imgur.com/tNYIaEI",
                    "Have it to record to the Zoom Cloud, and then you will just need to share that link after it uploads.",
                    "Also a video tutorial courtesy of Jeremy J:",
                    "https://cdn.discordapp.com/attachments/1060069376000282624/1060069829899460669/How_to_create_videos_on_Zoom.mp4"
                ];
                await interaction.guild.channels.create({
                    name: 'how-to-make-a-video',
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: student.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                        },
                    ]
                }).then(channel => {
                    for(i in howto) {
                        channel.send(howto[i])
                    }
                });
                await interaction.guild.channels.create({
                    name: "introduce-yourself",
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                        },
                      ],
                });
                await interaction.guild.channels.create({
                    name: "chat",
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages ],
                        },
                      ],
                });
                }
                await interaction.reply('Course has been created!');
        }
        else 
        {
            const second = interaction.options.data[1].value;
            console.log('second class ' + second);
            const Name = interaction.options.data[0].value;
            console.log(Name);
            const student = interaction.guild.roles.cache.find(role => role.name === Name + ' Student');
            console.log(student.id)
            const secondStd = interaction.guild.roles.cache.find(role => role.name === second + ' Student');
    
    
            // console.log(interaction.options.data[0].value);
            if (interaction.options.data[0] === undefined) {
                interaction.guild.channels.create({
                    name: interaction.options.data[0].value,
                    type: ChannelType.GuildText,
                });
            }
            else {
                const temp = await interaction.guild.channels.create({
                    name: interaction.options.data[0].value + ' + ' + second,
                    type: ChannelType.GuildCategory,
                });
                await interaction.guild.channels.create({
                    name: "announcements-"+interaction.options.data[0].value.toString() ,
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel],
                          deny: [PermissionFlagsBits.SendMessages],
                        },
                        {
                            id: secondStd.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                          },
                      ],
                });
                await interaction.guild.channels.create({
                    name: "zoom-meeting-info-"+interaction.options.data[0].value.toString(),
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel],
                          deny: [PermissionFlagsBits.SendMessages],
                        },
                        {
                            id: secondStd.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                          },
                      ],
                });
                // Create 'how-to-make-a-video' channel and send messages from 'howto' array
                const howto = [
                    "https://imgur.com/p1nC9Yc",
                    "https://imgur.com/jTtfWvW",
                    "https://imgur.com/u2ERyT6",
                    "https://imgur.com/laKGkX5",
                    "https://imgur.com/lAvTioI",
                    "https://imgur.com/DzLyAg7",
                    "https://imgur.com/FhZKSZz",
                    "https://imgur.com/VwUKFzS",
                    "https://imgur.com/tNYIaEI",
                    "Have it to record to the Zoom Cloud, and then you will just need to share that link after it uploads.",
                    "Also a video tutorial courtesy of Jeremy J:",
                    "https://cdn.discordapp.com/attachments/1060069376000282624/1060069829899460669/How_to_create_videos_on_Zoom.mp4"
                ];
                await interaction.guild.channels.create({
                    name: 'how-to-make-a-video',
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: student.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                        },
                        {
                            id: secondStd.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                          },
                    ]
                }).then(channel => {
                    for(i in howto) {
                        channel.send(howto[i])
                    }
                });
                await interaction.guild.channels.create({
                    name: "introduce-yourself",
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                        },
                        {
                            id: secondStd.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                          },
                      ],
                });
                await interaction.guild.channels.create({
                    name: "chat",
                    type: ChannelType.GuildText,
                    parent: temp,
                    permissionOverwrites: [
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                          id: student.id,
                          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages ],
                        },
                        {
                            id: secondStd.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                            deny: [PermissionFlagsBits.SendMessages],
                          },
                      ],
                });
                }
                await interaction.reply(' Cohab courses have been created!');
            
        }

        
    },
};