const Command = require("../../lib/structures/Command");
const format = require("../../lib/scripts/Format");

class roleinfoCommand extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["rinfo"],
      args: "<role:role>",
      description: "Returns information about a role.",
      cooldown: 3,
    });
  }

  run(msg, args, pargs) {
    let role = pargs[0].value;
    // Member role amount
    let mems = 0;
    msg.channel.guild.members.forEach(m => {
      if (m.roles.includes(role.id)) mems++;
    });

    // Sets the description
    let desc = [];
    let settings = [];
    if (role.mentionable) settings.push("Mentionable");
    if (role.hoist) settings.push("Hoisted");
    if (role.managed) settings.push("Managed by an integration");
    if (role.color != 0) desc.push({ name: "🖍", value: `#${role.color.toString(16)}`, });
    if (settings) desc.push({ name: "⚙", value: `${settings.join(", ")}`, });
    desc.push({ name: "📆", value: `${format.date(role.createdAt)} (${format.dateParse(new Date() / 1000 - role.createdAt / 1000)} ago)`, });
    desc.push({ name: "📝", value: `${mems} members have this role, and it's in position ${role.position}`, });
    desc.push({ name: "🆔", value: role.id, });

    // Sends the embed
    msg.channel.createMessage({
      embed: {
        description: desc.map(t => `${t.name} ${t.value}`).join("\n"),
        color: role.color == 0 ? this.bot.embed.colour("general") : role.color,
        author: {
          icon_url: msg.channel.guild.iconURL || "https://cdn.discordapp.com/embed/avatars/0.png",
          name: `Info for the ${role.name} role`,
        },
      },
    });
  }
}

module.exports = roleinfoCommand;
