const { Command } = require('discord.js-commando');
const translator = require('custom-translate');
const { dictionary } = require('./temmiewords.json');

module.exports = class TemmieCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'temmie',
			group: 'textedit',
			memberName: 'temmie',
			description: 'Translate text to Temmie speak. (;temmie I am Temmie)',
			examples: [';temmie I am Temmie.'],
			args: [{
                key: 'text',
                prompt: 'What text would you like to convert to Temmie speak?',
                type: 'string',
                validate: content => {
                	if (translator.wordTrans(content, dictionary).length > 1950) {
                		return 'Your message content is too long.';
                	}
                	return true;
                },
                parse: text => {
                	return translator.wordTrans(text, dictionary);
                }
            }]
		});
	}

	run(message, args) {
		if (message.channel.type !== 'dm') {
			if (!message.channel.permissionsFor(this.client.user).hasPermission(['SEND_MESSAGES', 'READ_MESSAGES'])) return;
		}
		const { text } = args;
		return message.say(`\u180E${text}`);
	}
};
