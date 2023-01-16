module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        // Not all interactions are slash commands
        if (!interaction.isChatInputCommand()) return;
        //console.log(interaction);
        // get matching command 
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        // call commands execute method
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
}