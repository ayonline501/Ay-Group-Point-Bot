/*CMD
  command: /start
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

// ১. ইউজার যে বট স্টার্ট করেছে তা নিশ্চিত করা (যাতে গ্রুপে মেসেজ কাউন্ট হয়)
Bot.setProperty("has_started_bot_" + user.telegramid, true, "boolean");

// ২. ব্রডকাস্টের জন্য ইউজার ডাটাবেজ সংরক্ষণ (নিরাপদ অ্যারে চেক সহ)
var userList = Bot.getProperty("all_bot_users");
if (!Array.isArray(userList)) {
  userList = [];
}

if (!userList.includes(user.telegramid)) {
  userList.push(user.telegramid);
  Bot.setProperty("all_bot_users", userList, "json");
  Bot.setProperty("total_users_count", userList.length, "integer");
}

Bot.setProperty("user_name_" + user.telegramid, user.first_name, "string");

// সেফলি প্যারামিটার বা রেফারেন্স আইডি রিড করা
var refId = null;
if (typeof params !== 'undefined' && params) {
  refId = params.trim();
}

// নিজেকে নিজে রেফার করা প্রতিরোধ
if (refId && refId == user.telegramid.toString()) {
  refId = null;
}

// 🎯 রেফারার আইডি গ্লোবাল ডাটাবেজে স্থায়ীভাবে সেভ (বাগ ফিক্স)
var alreadyVerified = Bot.getProperty("already_verified_" + user.telegramid);
if (!alreadyVerified && refId) {
  Bot.setProperty("pending_ref_for_" + user.telegramid, refId, "string");
}

var welcomeText = "🌸 <b>আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ্!</b> 💖\n\n" +
"🌟 <b>আমাদের Ay Group Point বটে আপনাকে আন্তরিক স্বাগতম!</b> 🤖\n\n" +
"📢 বটের সকল চমৎকার ফিচার ও আকর্ষণীয় গিফট  আনলক করতে আমাদের অফিসিয়াল <b>চ্যানেল</b> এবং <b>গ্রুপে</b> যুক্ত হওয়া আবশ্যক।\n\n" +
"✅ <b>চ্যানেলে জয়েন করুন</b>\n" +
"✅ <b>গ্রুপে জয়েন করুন</b>\n" +
"✨ তারপর নিচের বাটনে চাপ দিয়ে ভেরিফাই সম্পন্ন করুন!\n\n" +
"💙 <b>আপনাদের ভালোবাসা ও সাপোর্টই আমাদের অনুপ্রেরণা!</b> 💙";

var inlineKeyboard = [
  [{ text: "📢 আমাদের চ্যানেল", url: "https://t.me/ayofficialbd" }],
  [{ text: "💬 আমাদের গ্রুপ", url: "https://t.me/ayofficialbdchat" }],
  [{ text: "✅ Verify & Continue", callback_data: "check_channels" }]
];

Api.sendMessage({
  chat_id: chat.chatid,
  text: welcomeText,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: inlineKeyboard }
});
