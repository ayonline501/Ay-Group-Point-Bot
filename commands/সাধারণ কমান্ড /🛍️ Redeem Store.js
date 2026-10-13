/*CMD
  command: 🛍️ Redeem Store
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

// =================================================================
// 🎯 প্রতিটি গিফটের আলাদা আলাদা বিস্তারিত লিংক (এখানে লিংক বসাবেন)
// =================================================================
var link1  = "https://t.me/unknowndevloper04/37?single"; // 👈 ১ম গিফটের লিংক
var link2  = "https://t.me/unknowndevloper04/38"; // ২য় গিফট
var link3  = "https://t.me/ayofficialbd"; // ৩য় গিফট
var link4  = "https://t.me/ayofficialbd"; // ৪র্থ গিফট
var link5  = "https://t.me/ayofficialbd"; // ৫ম গিফট
var link6  = "https://t.me/ayofficialbd"; // ৬ষ্ঠ গিফট
var link7  = "https://t.me/ayofficialbd"; // ৭ম গিফট
var link8  = "https://t.me/ayofficialbd"; // ৮ম গিফট
var link9  = "https://t.me/ayofficialbd"; // ৯ম গিফট
var link10 = "https://t.me/ayofficialbd"; // ১০ম গিফট
var link11 = "https://t.me/ayofficialbd"; // ১১তম গিফট
var link12 = "https://t.me/ayofficialbd"; // ১২তম গিফট
var link13 = "https://t.me/ayofficialbd"; // ১৩তম গিফট
var link14 = "https://t.me/ayofficialbd"; // ১৪তম গিফট
var link15 = "https://t.me/ayofficialbd"; // ১৫তম গিফট
// =================================================================

var storeText = "🛍️ <b>Ay Point - প্রিমিয়াম গিফট স্টোর</b> 🎁\n" +
"━━━━━━━━━━━━━━━━━━━━━\n" +
"💰 <b>আপনার বর্তমান ব্যালেন্স:</b> " + coins + " কয়েন\n\n" +
"✨ <b>আমাদের স্পেশাল ১৫টি প্রিমিয়াম গিফট প্যাকেজ:</b>\n" +
"━━━━━━━━━━━━━━━━━━━━━\n" +
"1️⃣ <b>গিফট ১:</b> 🚀 একটি সফটওয়্যারেই 80+ কাজ করার সুবিধা! — <a href=\"" + link1 + "\">বিস্তারিত 📄</a>\n\n" +
"2️⃣ <b>গিফট ২:</b> 🚀 YouTube Unlimited View & Watch Time Software 🎬🔥\n📦 Sketchware Pro-এর SWB File — <a href=\"" + link2 + "\">বিস্তারিত 📄</a>\n\n" +
"3️⃣ <b>গিফট ৩:</b> Coming Soon...... — <a href=\"" + link3 + "\">বিস্তারিত 📄</a>\n\n" +
"4️⃣ <b>গিফট ৪:</b> Coming Soon...... — <a href=\"" + link4 + "\">বিস্তারিত 📄</a>\n\n" +
"5️⃣ <b>গিফট ৫:</b> Coming Soon...... — <a href=\"" + link5 + "\">বিস্তারিত 📄</a>\n\n" +
"6️⃣ <b>গিফট ৬:</b> Coming Soon...... — <a href=\"" + link6 + "\">বিস্তারিত 📄</a>\n\n" +
"7️⃣ <b>গিফট ৭:</b> Coming Soon...... — <a href=\"" + link7 + "\">বিস্তারিত 📄</a>\n\n" +
"8️⃣ <b>গিফট ৮:</b> Coming Soon...... — <a href=\"" + link8 + "\">বিস্তারিত 📄</a>\n\n" +
"9️⃣ <b>গিফট ৯:</b> Coming Soon...... — <a href=\"" + link9 + "\">বিস্তারিত 📄</a>\n\n" +
"🔟 <b>গিফট ১০:</b> Coming Soon...... — <a href=\"" + link10 + "\">বিস্তারিত 📄</a>\n\n" +
"1️⃣1️⃣ <b>গিফট ১১:</b> Coming Soon...... — <a href=\"" + link11 + "\">বিস্তারিত 📄</a>\n\n" +
"1️⃣2️⃣ <b>গিফট ১২:</b> Coming Soon...... — <a href=\"" + link12 + "\">বিস্তারিত 📄</a>\n\n" +
"1️⃣3️⃣ <b>গিফট ১৩:</b> Coming Soon...... — <a href=\"" + link13 + "\">বিস্তারিত 📄</a>\n\n" +
"1️⃣4️⃣ <b>গিফট ১৪:</b> Coming Soon...... — <a href=\"" + link14 + "\">বিস্তারিত 📄</a>\n\n" +
"1️⃣5️⃣ <b>গিফট ১৫:</b> Coming Soon...... — <a href=\"" + link15 + "\">বিস্তারিত 📄</a>\n\n" +
"━━━━━━━━━━━━━━━━━━━━━\n" +
"👇 <b>যে গিফটটি নিতে চান নিচের বাটনে চাপ দিন:</b>";

// 🎯 ১ থেকে ১৫ পর্যন্ত সাজানো বাটন
var storeButtons = [
  [
    { text: "🎁 গিফট ১", callback_data: "gift1" },
    { text: "🎁 গিফট ২", callback_data: "gift2" },
    { text: "🎁 গিফট ৩", callback_data: "gift3" }
  ],
  [
    { text: "🎁 গিফট ৪", callback_data: "gift4" },
    { text: "🎁 গিফট ৫", callback_data: "gift5" },
    { text: "🎁 গিফট ৬", callback_data: "gift6" }
  ],
  [
    { text: "🎁 গিফট ৭", callback_data: "gift7" },
    { text: "🎁 গিফট ৮", callback_data: "gift8" },
    { text: "🎁 গিফট ৯", callback_data: "gift9" }
  ],
  [
    { text: "🎁 গিফট ১০", callback_data: "gift10" },
    { text: "🎁 গিফট ১১", callback_data: "gift11" },
    { text: "🎁 গিফট ১২", callback_data: "gift12" }
  ],
  [
    { text: "🎁 গিফট ১৩", callback_data: "gift13" },
    { text: "🎁 গিফট ১৪", callback_data: "gift14" },
    { text: "🎁 গিফট ১৫", callback_data: "gift15" }
  ]
];

Api.sendMessage({
  chat_id: chat.chatid,
  text: storeText,
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: { inline_keyboard: storeButtons }
});
