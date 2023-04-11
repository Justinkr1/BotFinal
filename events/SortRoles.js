const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(role) {
        const roleArray = [];
        const positionArray = [];
        const finalArray = [];
        let i = 0;
        if (role.name.toLowerCase().includes('student') || role.name.toLowerCase().includes('veteran')) {

        const roles = role.guild.roles.cache.entries();

        for (const id of roles) {

            if (id[1].name.toLowerCase().includes('student')) {

            const roleNumArr = id[1].name.split(' ');
            
            roleArray[i] = { number: roleNumArr[1], id: id[1].id, position: id[1].position, sub: 'Student' };

            positionArray[i] = id[1].position;
            
            i++;
            }

            else if (id[1].name.toLowerCase().includes('veteran')) {

            const roleNumArr = id[1].name.split(' ');

            roleArray[i] = { number: roleNumArr[1], id: id[1].id, position: id[1].position, sub: 'Veteran' };

            positionArray[i] = id[1].position;
            i++;
            }
        }

        const priority = {
            Student: 1,
            Veteran: 2,
        };

        roleArray.sort((z, y) => {
            return priority[z.sub] - priority[y.sub] ||
                y.number - z.number;
        });


        positionArray.sort((z, y) => {
            return y - z;
        });

        for (let x = 0; x < roleArray.length; x++) {
            finalArray[x] = { role: roleArray[x].id, position: positionArray[x] };
        }

        try {
         await role.guild.roles.setPositions(finalArray);
        }
        catch (error) {
            console.error(error);
        }
   }
   },
 };