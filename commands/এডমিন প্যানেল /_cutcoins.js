/*CMD
  command: /cutcoins
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
if (p.length < 2) return Bot.sendMessage("❌ ফরম্যাট: <code>/cutcoins USER_ID AMOUNT</code>", { parse_mode: "HTML" });
var c = parseInt(Bot.getProperty("coins_" + p[0]) || 0);
Bot.setProperty("coins_" + p[0], Math.max(0, c - parseInt(p[1])), "integer");
Bot.sendMessage("✅ ইউজার <code>" + p[0] + "</code> এর একাউন্ট থেকে <b>" + p[1] + "</b> কয়েন কাটা হয়েছে।", { parse_mode: "HTML" });
