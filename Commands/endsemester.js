const { Client, SlashCommandBuilder, ChannelType, PermissionFlagsBits, PermissionBitField, GatewayIntentBits} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
  ],
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('endclass')
		.setDescription('Ends the semester')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
            .addStringOption(option =>
            option
            .setName('class-name')
            .setDescription('the class name to archive')
            .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
	async execute(interaction) {
    //start
    const filter = m => m.author.id === interaction.user.id;
  await interaction.reply({ content: 'Are you sure you want to end the semester? This action cannot be undone. (yes/no)', fetchReply: true });
  const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 });
  const confirmation = collected.first().content.toLowerCase();
  if (confirmation === 'yes') {
    // code to end the semester
    const Name = interaction.options.data[0].value;
      console.log(Name);

      const student = interaction.guild.roles.cache.find(role => role.name === Name + ' Student');
      const veteran = interaction.guild.roles.cache.find(role => role.name === Name + ' Veteran');

      console.log('veteran ' + veteran)
      console.log('student ' + student)
      console.log(student)

      const list = await interaction.guild.members.fetch();
      console.log('list made');
			var rolesChanged = 0;
      console.log('roles changed ' + rolesChanged);
			 for( i = 0; i < list.size; i++){ //loop through all students who have the student role
        console.log('inside for loop');
				var member = list.at(i); 
        if (member.roles.cache.some(role => role.name === Name + ' Student')) {
          console.log('inside if statement');
					member.roles.add(veteran); //add veteran role
					member.roles.remove(student);//remove student role
					rolesChanged = rolesChanged + 1;
          console.log(rolesChanged);
				}
      else {
        console.log('Did not have student role');
      }}
      interaction.followUp('Semester Ended!');

  } else {
    interaction.followUp('Action cancelled.');
  }
//finish
	},
};
