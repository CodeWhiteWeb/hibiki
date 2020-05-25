/*
  Hibiki © 2018-2020 smolespi & resolved.
  Source licensed under the GNU AGPLv3 or later.
*/

const { cfg, options, rethink } = require("./config");
const db = require("rethinkdbdash")(rethink);
const Verniy = require("./lib/Verniy");

// Sets Eris options & creates an instance
const bot = new Verniy(cfg.token, options, db);

// Loads any modules
bot.loadCommands("cmds");
bot.loadEvents("events");
bot.loadExtensions("ext");

// Logs into Discord
bot.connect();
