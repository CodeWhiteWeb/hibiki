const Command = require("../../lib/structures/Command");
const fetch = require("node-fetch");

class yuriCommand extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sends a NSFW yuri image.",
      nsfw: true,
      cooldown: 3,
    });
  }

  async run(msg) {
    // Fetches the API
    const body = await fetch("https://nekos.life/api/v2/img/yuri").then(async res => await res.json().catch(() => {}));
    if (!body) return msg.channel.createMessage(this.bot.embed("❌ Error", "Couldn't send the image. Try again later.", "error"));

    // Sends the embed
    await msg.channel.createMessage({
      embed: {
        title: "🏳️‍🌈 Yuri",
        color: this.bot.embed.color("general"),
        image: {
          url: body.url,
        },
      },
    });
  }
}

module.exports = yuriCommand;
