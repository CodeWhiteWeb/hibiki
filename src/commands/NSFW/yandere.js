const Command = require("../../lib/structures/Command");
const fetch = require("node-fetch");

class yandereCommand extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["yande", "yd"],
      args: "[tags:string]",
      description: "Sends an image from Yande.re.",
      nsfw: true,
      cooldown: 3,
    });
  }

  async run(msg, args) {
    const body = await fetch(`https://yande.re/post.json?api_version=2&tags=${encodeURIComponent(args.join(" "))}`)
      .then(async res => await res.json().catch(() => {}));
    if (!body || !body.posts.length) return msg.channel.createMessage(this.bot.embed("❌ Error", "No images were found.", "error"));
    const random = Math.floor(Math.random() * body.posts.length);

    await msg.channel.createMessage({
      embed: {
        title: "🔞 Yande.re",
        color: 0xEE8887,
        image: {
          url: body.posts[random].sample_url,
        },
      },
    });
  }
}

module.exports = yandereCommand;
