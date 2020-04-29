const Command = require("../../lib/structures/Command");
const fetch = require("node-fetch");

class biteCommand extends Command {
  constructor(...args) {
    super(...args, {
      args: "<member:member>",
      description: "Bites a member.",
      cooldown: 3,
    });
  }

  async run(msg, args, pargs) {
    // Sets weebsh auth & image type
    const res = await fetch("https://api.weeb.sh/images/random?type=bite", { headers: { Authorization: `Wolke ${this.bot.key.weebsh}` } });
    const body = await res.json();
    let image;

    // Fallback image
    if (body.status !== 200) image = "https://cdn.weeb.sh/images/ry3pQGraW.gif";
    else if (body.status === 200) image = body.url;

    // Sends the embed
    msg.channel.createMessage({
      embed: {
        description: `♥ **${msg.author.username}** bit **${pargs[0].value.username}**!`,
        color: this.bot.embed.colour("general"),
        image: {
          url: image,
        },
        footer: {
          icon_url: this.bot.user.dynamicAvatarURL(),
          text: "Powered by weeb.sh",
        },
      },
    });
  }
}

module.exports = biteCommand;
