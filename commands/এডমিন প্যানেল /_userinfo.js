/*CMD
  command: /userinfo
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
if (!params) return Bot.sendMessage("❌ ফরম্যাট: <code>/userinfo USER_ID</code>", { parse_mode: "HTML" });
var targetId = params.trim();
var c = Bot.getProperty("coins_" + targetId) || 0;
var rc = Bot.getProperty("ref_count_" + targetId) || 0;
var mc = Bot.getProperty("msg_count_" + targetId) || 0;
var st = Bot.getProperty("has_started_bot_" + targetId) ? "হ্যাঁ (সক্রিয়)" : "না (স্টার্ট করেনি)";
var txt = "📋 <b>ইউজার ডাটাবেজ তথ্য:</b>\n━━━━━━━━━━━━━━━━━━━━━\n🆔 <b>আইডি:</b> <code>" + targetId + "</code>\n🤖 <b>বট স্টার্ট স্ট্যাটাস:</b> " + st + "\n💰 <b>কয়েন:</b> " + c + "\n👥 <b>রেফারেল:</b> " + rc + "\n💬 <b>মেসেজ সংখ্যা:</b> " + mc + "\n━━━━━━━━━━━━━━━━━━━━━";
Bot.sendMessage(txt, { parse_mode: "HTML" });
