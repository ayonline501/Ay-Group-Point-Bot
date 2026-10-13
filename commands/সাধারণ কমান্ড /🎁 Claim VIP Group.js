/*CMD
  command: 🎁 Claim VIP Group
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

var refCount = parseInt(Bot.getProperty("ref_count_" + user.telegramid) || 0);
var coins = parseInt(Bot.getProperty("coins_" + user.telegramid) || 0);

// 🎯 প্রাইভেট গ্রুপের লিংক
var VIP_GROUP_LINK = "https://t.me/+VBRHFeYrVOcyYjZl"; 

if (refCount >= 15 || coins >= 300) {
  var winMsg = "🎉 <b>অভিনন্দন প্রিয় সদস্য! আপনার টার্গেট সফলভাবে সম্পন্ন হয়েছে!</b> 🏆\n\n" +
  "👇 নিচের লিংকে ক্লিক করে আমাদের ভিআইপি প্রাইভেট গ্রুপে <b>Join Request</b> পাঠান। বট স্বয়ংক্রিয়ভাবে আপনার ডাটা যাচাই করে এক্সেপ্ট করে নেবে:\n\n" +
  "🔗 <a href=\"" + VIP_GROUP_LINK + "\">ভিআইপি গ্রুপে জয়েন রিকোয়েস্ট পাঠান</a>\n\n" +
  "<i>(গ্রুপে ২০টি মেগা এডিটিং প্যাকেজ ও প্রয়োজনীয় সফটওয়্যার পিন করা আছে)</i> ✨";

  Bot.sendMessage(winMsg, { parse_mode: "HTML", disable_web_page_preview: true });
} else {
  var need = 15 - refCount;
  var needCoins = 300 - coins;
  Bot.sendMessage("🌸 <b>প্রিয় সদস্য, আপনার এখনো টার্গেট পূর্ণ হয়নি!</b>\n\n" +
                 "👥 <b>বর্তমান রেফার:</b> " + refCount + " / ১৫ টি (আর " + need + " টি বাকি)\n" +
                 "💰 <b>বর্তমান কয়েন:</b> " + coins + " / ৩০০ টি (আর " + needCoins + " টি বাকি)\n\n" +
                 "<i>দয়া করে মন খারাপ করবেন না! বন্ধুদের রেফার করে খুব সহজেই টার্গেট পূরণ করে নিন। শুভকামনা আপনার জন্য!</i> 💖", { parse_mode: "HTML" });
}
