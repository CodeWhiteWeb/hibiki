const Command = require("../../lib/structures/Command");

class pingcmd extends Command {
  constructor(...args) {
    super(...args);
  }

  async run(msg) {
    // Sends the original latency message
    let message = await msg.channel.createMessage(this.bot.embed("🏓 Ping", `API Latency: ${msg.channel.guild.shard.latency}ms`, "general"));
    // Edits the message
    message.edit({
      embed: {
        title: "🏓 Ping",
        description: `This message took ${message.timestamp - msg.timestamp}ms.`,
        color: this.bot.embed.colour("general"),
      }
    });
  }
}

module.exports = pingcmd;
