/*CMD
  command: on_check_group_result
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

if (!options) return;

if (!options.ok) {
  Api.sendMessage({
    chat_id: chat.chatid,
    text: "⚠️ <b>গ্রুপ তথ্য যাচাইয়ে সমস্যা:</b> " + (options.description || "অজানা ত্রুটি।"),
    parse_mode: "HTML"
  });
  return;
}

var result = options.result;
var st = result ? result.status : "";
var isGroupMember = (st === "member" || st === "administrator" || st === "creator" || (st === "restricted" && result.is_member === true));

if (!isGroupMember) {
  Api.sendMessage({
    chat_id: chat.chatid,
    text: "🌸 <b>প্রিয় সদস্য</b>, আপনি চ্যানেলে জয়েন করেছেন কিন্তু আমাদের <b>গ্রুপে</b> (@ayofficialbdchat) এখনো যুক্ত হননি!\n\nঅনুগ্রহ করে গ্রুপে জয়েন করে আবার ভেরিফাই বাটনে চাপুন।",
    parse_mode: "HTML"
  });
  return;
}

// ================= ভেরিফিকেশন সফল ও রেফারারকে কয়েন প্রদান =================
var targetUserId = user.telegramid;
var isAlreadyVerified = Bot.getProperty("already_verified_" + targetUserId);

if (!isAlreadyVerified) {
  Bot.setProperty("already_verified_" + targetUserId, true, "boolean");

  var referrerId = Bot.getProperty("pending_ref_for_" + targetUserId);

  if (referrerId) {
    referrerId = parseInt(referrerId);
    
    if (referrerId !== targetUserId) {
      var currentCoins = parseInt(Bot.getProperty("coins_" + referrerId) || 0);
      var currentRefs = parseInt(Bot.getProperty("ref_count_" + referrerId) || 0);

      var newRefs = currentRefs + 1;
      var addedCoins = 15;

      var isMilestoneClaimed = Bot.getProperty("milestone_15_" + referrerId);
      if (newRefs === 15 && !isMilestoneClaimed) {
        addedCoins += 75;
        Bot.setProperty("milestone_15_" + referrerId, true, "boolean");

        Api.sendMessage({
          chat_id: referrerId,
          text: "🎊 <b>অভিনন্দন! মেগা মাইলস্টোন অর্জিত হয়েছে!</b> 🎉\n━━━━━━━━━━━━━━━━━━━━━\n" +
                "আপনি সফলভাবে <b>১৫টি রেফার</b> পূর্ণ করেছেন!\n" +
                "🎁 আপনাকে অতিরিক্ত <b>৭৫ কয়েন বোনাস</b> দেওয়া হলো!\n\n" +
                "💰 <b>আপনার মোট ব্যালেন্স:</b> " + (currentCoins + addedCoins) + " কয়েন!",
          parse_mode: "HTML"
        });
      }

      var finalCoins = currentCoins + addedCoins;
      Bot.setProperty("coins_" + referrerId, finalCoins, "integer");
      Bot.setProperty("ref_count_" + referrerId, newRefs, "integer");
      Bot.setProperty("referred_by_" + targetUserId, referrerId, "string");

      Api.sendMessage({
        chat_id: referrerId,
        text: "🎉 <b>দারুণ খবর! আপনার একজন বন্ধু জয়েন করেছেন!</b> ✨\n━━━━━━━━━━━━━━━━━━━━━\n" +
              "➕ <b>অর্জিত রিওয়ার্ড:</b> +" + addedCoins + " কয়েন!\n" +
              "💰 <b>বর্তমান ব্যালেন্স:</b> " + finalCoins + " কয়েন\n" +
              "👥 <b>মোট সফল রেফার:</b> " + newRefs + " টি\n━━━━━━━━━━━━━━━━━━━━━",
        parse_mode: "HTML"
      });
    }
  }
}

// ইউজারকে মেনু কিবোর্ড পাঠানো
var menuKeyboard = [
  [{ text: "👤 My Profile" }, { text: "🔗 Refer Link" }],
  [{ text: "🛍️ Redeem Store" }, { text: "💬 Group Task" }],
  [{ text: "🎁 Claim VIP Group" }]
];

Api.sendMessage({
  chat_id: targetUserId,
  text: "✅ <b>ভেরিফিকেশন সফল হয়েছে!</b> 🌸\n\nনিচের মেনু ব্যবহার করে আপনার কার্যক্রম শুরু করুন:",
  parse_mode: "HTML",
  reply_markup: {
    keyboard: menuKeyboard,
    resize_keyboard: true,
    is_persistent: true
  }
});
