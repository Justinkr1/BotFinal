require("dotenv").config()
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, EmbedBuilder,Events, PermissionsBitField, Permissions, SlashCommandBuilder } = require(`discord.js`);
const prefix = '!';
const CLIENT_ID = process.env.client_Id;
const GUILD_ID = process.env.guild_Id;

const client = new Client({ intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,] });


client.on("ready", () => {
    console.log("Bot is online!");

    client.user.setActivity(`IDK`, {type: "IDK" });

})
// testing slash command builder
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
//end of slash command builder


// testing event builder
const comds = [];
client.comds = new Collection();
// Finds all events
const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventsFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, comds));
    }
	else {
        client.on(event.name, (...args) => event.execute(...args, comds));
	}
}
// end of event builder

client.on("messageCreate", (message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    //message array

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];
    const guild = message.guild;
    //COMMANDS

// test command

if (command === 'createRole')(message)=> {
    message.channel.send("If you are in class CSC-325 React with :one:!");
    createRole(message);
    message = " ";
}
function createRole(message) {
    const guild = message.guild;
    const role = guild.roles.cache.has(role => role.name === "student");
  
    if (message.content === '!createRole' && message.reactions.cache.has('1️⃣')) {
      const member = message.member;
      member.roles.add(role);
      message.channel.send('You have been assigned the "student" role!');
    }
  }



    }));
//testing poll
//!poll What's your favorite color?, Red, Blue, Green, @Voters, #polls
//updated on March 6, 2023
client.on('messageCreate', async message => {
  if (message.content.startsWith('!poll')) {
    const args = message.content.toString().slice(5).trim().split(',');
    const question = args[0].trim();
    const options = args.slice(1).map(option => option.trim());

    const pollEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(question)
      //.setDescription(`React with the corresponding emoji to vote!\n\n${options.map((option, index) => `${index + 1}️⃣ ${option}`).join('\n')}`);
      .setDescription(`React with the corresponding emoji to vote!\n\n${options.map((option, index) => `${index + 1}️⃣ ${option} - 0`).join('\n')}`);

    const channelOption = options.find(option => option.startsWith('#'));

    let channel;

    if (channelOption) {
      const channelName = channelOption.slice(1).trim();
      channel = message.guild.channels.cache.find(channel => channel.name === channelName && channel.type === 'GUILD_TEXT');
      if (!channel) {
        return message.reply(`Couldn't find a channel with name "${channelName}"`);
      }
    } else {
      channel = message.channel;
    }

    const pollMessage = await channel.send({ embeds: [pollEmbed] });

    for (let i = 0; i < options.length; i++) {
      await pollMessage.react(`${i + 1}️⃣`);
    }

    const roleOption = options.find(option => option.startsWith('@'));
    let role;

    if (roleOption) {
      const roleName = roleOption.slice(1);
      role = message.guild.roles.cache.find(role => role.name === roleName);
    }

    if (role) {
      const filter = (reaction, user) => {
        return options.includes(`${reaction.emoji.name}`) && !user.bot;
      };

      const collector = pollMessage.createReactionCollector({ filter, time: 60000 });

      collector.on('collect', (reaction, user) => {
        const member = message.guild.members.cache.get(user.id);
        member.roles.add(role);
      });

      collector.on('end', collected => {
        channel.send(`Poll has ended! ${role} has been granted to ${collected.size} user(s)`);
      });
    }
  }
});

client.login(process.env.token);