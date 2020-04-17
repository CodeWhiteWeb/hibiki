const Command = require("../../lib/structures/Command");

class coolCommand extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["calculatecool", "coolness", "howcool"],
      args: "[user:member&fallback]",
      description: "Calculates how cool a member is.",
    });
  }

  run(msg, args, pargs) {
    let user = pargs[0].value;
    // Random 1 - 100%
    let random = Math.floor(Math.random() * 99) + 1
    if (user.id === "150628341316059136") return msg.channel.createMessage(this.bot.embed("😎 Not Cool", `Despite the fact that a **${user.username}** is not gay, a **${user.username}** cannot be cool as a side effect from that.`));
    if (user.id === "284432595905675264") return msg.channel.createMessage(this.bot.embed("😎 CEO", `**${user.username}** is **CEO**`));
    msg.channel.createMessage(this.bot.embed("😎 Cool", `**${user.username}** is **${random}%** cool!`));
  }
}

module.exports = coolCommand;
