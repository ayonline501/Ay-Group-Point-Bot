/*CMD
  command: /resetall
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
if (!params) return Bot.sendMessage("❌ মেসেজ লিখুন: <code>/broadcast আপনার নোটিশ</code>", { parse_mode: "HTML" });
var allUsers = Bot.getProperty("all_bot_users") || [];
var broadcastMsg = "📢 <b>অফিসিয়াল ঘোষণা</b> 🌟\n━━━━━━━━━━━━━━━━━━━━━\n" + params;
for (var i = 0; i < allUsers.length; i++) {
  Api.sendMessage({ chat_id: allUsers[i], text: broadcastMsg, parse_mode: "HTML" });
}
Bot.sendMessage("✅ সফলভাবে <b>" + allUsers.length + "</b> জন ইউজারের কাছে নোটিশ পাঠানো হয়েছে!", { parse_mode: "HTML" });
