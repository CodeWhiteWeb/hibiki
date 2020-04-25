const Command = require("../../lib/structures/Command");
const fetch = require("node-fetch");

class cuddleCommand extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["snug", "snuggle"],
      args: "<member:member&strict>",
      description: "Cuddles a member.",
      cooldown: 3,
    });
  }

  async run(msg, args, pargs) {
    // Sets weebsh auth & image type
    const res = await fetch("https://api.weeb.sh/images/random?type=cuddle", { headers: { Authorization: `Wolke ${this.bot.key.weebsh}` } });
    const body = await res.json();

    // Sends the embed
    msg.channel.createMessage({
      embed: {
        description: `❤ **${msg.author.username}** is cuddling **${pargs[0].value.username}**!`,
        color: this.bot.embed.colour("general"),
        image: {
          url: body.url,
        },
        footer: {
          icon_url: this.bot.user.dynamicAvatarURL(),
          text: "Powered by weeb.sh",
        },
      },
    });
  }
}

module.exports = cuddleCommand;
