const Command = require("structures/Command");

class slotsCommand extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["dick", "penissize"],
      args: "<member:member&fallback>",
      description: "Returns a member's dick size.",
    });
  }

  async run(msg, args, pargs) {
    const member = pargs[0].value;
    const inches = member.id % 7.1;

    if (member.bot) {
      return this.bot.embed("❌ Error", `I don't think **${member.username}** has a dick.`, msg, "error");
    }

    const suffix = a => {
      return a > 1 || a < 0 || a === 0 ? "es" : "";
    };

    const thedick = `8${"=".repeat(Math.round(inches.toFixed(2) / 2))}D`;
    this.bot.embed("🍆 Dicksize", `**${member.username}**'s dicksize is **${inches.toFixed(1)} inch${suffix(inches)}**.\n ${thedick}`, msg);
  }
}

module.exports = slotsCommand;
