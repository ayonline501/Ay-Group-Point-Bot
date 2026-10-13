/*CMD
  command: 💬 Group Task
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

var msgCount = parseInt(Bot.getProperty("msg_count_" + user.telegramid) || 0);

var taskMsg = "💬 <b>গ্রুপ মেসেজ রিওয়ার্ড টাস্ক:</b> 🎁\n" +
"━━━━━━━━━━━━━━━━━━━━━\n" +
"আমাদের অফিসিয়াল গ্রুপে (@ayofficialbdchat) আড্ডা দিয়েও খুব সহজে কয়েন আয় করতে পারেন!\n\n" +
"🎯 <b>নিয়ম:</b> গ্রুপে প্রতি ২০টি সাধারণ মেসেজের জন্য পাবেন <b>২০ কয়েন</b>।\n" +
"📊 <b>আপনার বর্তমান অগ্রগতি:</b> " + msgCount + " / ২০টি মেসেজ সম্পন্ন।\n" +
"━━━━━━━━━━━━━━━━━━━━━\n" +
"<i>নোট: ২০টি মেসেজ পূর্ণ হলেই সাথে সাথে ২০ কয়েন পাবেন এবং আপনার মেসেজ কাউন্ট আবার নতুন করে (০ থেকে) শুরু হবে!</i> 💖";

Bot.sendMessage(taskMsg, { parse_mode: "HTML" });
