/*CMD
  command: /addref
  help: 
  need_reply: false
  auto_retry_time: 
  folder: এডমিন প্যানেল 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var adminIDs = [8825649789, 8718182111];
if (!adminIDs.includes(user.telegramid)) return;
var p = params ? params.trim().split(/\s+/) : [];
if (p.length < 2) return Bot.sendMessage("❌ ফরম্যাট: <code>/addref USER_ID COUNT</code>", { parse_mode: "HTML" });
var r = parseInt(Bot.getProperty("ref_count_" + p[0]) || 0);
Bot.setProperty("ref_count_" + p[0], r + parseInt(p[1]), "integer");
Bot.sendMessage("✅ ইউজার <code>" + p[0] + "</code> এর সাথে <b>" + p[1] + "</b> টি রেফার যোগ করা হয়েছে।", { parse_mode: "HTML" });
