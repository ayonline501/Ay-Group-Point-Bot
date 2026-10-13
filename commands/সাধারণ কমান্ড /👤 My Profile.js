/*CMD
  command: 👤 My Profile
  help: 
  need_reply: false
  auto_retry_time: 
  folder: সাধারণ কমান্ড 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var coins = parseInt(Bot.getProperty("coins_" + user.telegramid) || 0);
var refCount = parseInt(Bot.getProperty("ref_count_" + user.telegramid) || 0);
var msgCount = parseInt(Bot.getProperty("msg_count_" + user.telegramid) || 0);

// নিরাপদ নাম এবং ফরম্যাটিং
var userName = user.first_name ? user.first_name : "ਸ সদস্য";
var userId = user.telegramid ? user.telegramid : "N/A";

var profileText = "╔════════════════════╗\n" +
                  "     👤 <b>ইউজার প্রোফাইল ইনফো</b>     \n" +
                  "╚════════════════════╝\n\n" +
                  "┏ <b>নাম:</b> " + userName + "\n" +
                  "┣ <b>ইউজার আইডি:</b> <code>" + userId + "</code>\n" +
                  "┣ <b>টোটাল ব্যালেন্স:</b> 💎 <b>" + coins + "</b> কয়েন\n" +
                  "┣ <b>সফল রেফারেল:</b> 👥 <b>" + refCount + "</b> / ১৫ টি\n" +
                  "┗ <b>মেসেজ টাস্ক:</b> 💬 <b>" + msgCount + "</b> / ২০ টি\n\n" +
                  "━━━━━━━━━━━━━━━━━━━━━━\n";

if (refCount >= 15) {
  profileText += "🎉 <b>অসাধারণ সাফল্য!</b>\n" +
                 "আপনার ১৫টি রেফার সফলভাবে সম্পন্ন হয়েছে।\n" +
                 "👉 <i>নিচের '🎁 Claim VIP Group' বাটনে ক্লিক করে দ্রুত আপনার ভিআইপি গ্রুপে জয়েন করে নিন!</i> ✨";
} else {
  var remainingRef = 15 - refCount;
  profileText += "🚀 <b>ভিআইপি গ্রুপের স্ট্যাটাস:</b>\n" +
                 "লক খুলতে আর মাত্র <b>" + remainingRef + "</b> টি রেফার প্রয়োজন!\n" +
                 "👉 <i>আপনার রেফার লিংক শেয়ার করে দ্রুত টার্গেট পূরণ করুন।</i> 🔗";
}

// BJS স্ট্যান্ডার্ড অনুযায়ী Api.sendMessage ব্যবহার করা নিরাপদ
Api.sendMessage({
  chat_id: chat.chatid,
  text: profileText,
  parse_mode: "HTML"
});
