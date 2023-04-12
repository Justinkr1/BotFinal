const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(role) {
        if (role.name.toLowerCase().includes('veteran')) {
            const roles = role.guild.roles.cache.filter(role.name.toLowerCase().includes('veteran'));
            const roleArray = roles.map(r => {
                const roleNumArr = r.name.split(' ');
                return {
                    number: roleNumArr[1],
                    id: r.id,
                    position: r.position,
                    sub: r.name.toLowerCase().includes('student') ? 'Student' : 'Veteran'
                };
            });

            const priority = {
                Student: 1,
                Veteran: 2,
            };

            roleArray.sort((a, b) => priority[a.sub] - priority[b.sub] || b.number - a.number);

            const finalArray = roleArray.map((r, i) => ({ role: r.id, position: roles.size - i }));

            try {
                await role.guild.roles.setPositions(finalArray);
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return;
        }
    },
};