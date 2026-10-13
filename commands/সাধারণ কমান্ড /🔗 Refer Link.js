/*CMD
  command: 🔗 Refer Link
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

var refLink = "https://t.me/" + bot.name + "?start=" + user.telegramid;

var msg = "🔗 <b>আপনার পার্সোনাল রেফারেল লিংক:</b>\n" +
"<code>" + refLink + "</code>\n\n" +
"📌 <b>কয়েন উপার্জনের নিয়মাবলী:</b>\n" +
"• প্রতি সফল রেফারে পাবেন: <b>১৫ কয়েন</b>।\n" +
"• ১০টি রেফার করলেই পাবেন: <b>১৫০ কয়েন</b> (যেকোনো গিফট আনলক করার সুযোগ)।\n" +
"• ১৫টি রেফার পূর্ণ হলে মেগা বোনাস সহ মোট: <b>৩০০ কয়েন</b> ও ভিআইপি গ্রুপ!\n" +
"• আমন্ত্রিত সদস্য লিভ নিলে একাউন্ট থেকে <b>৫ কয়েন কাটা হবে</b>।\n\n" +
"<i>লিংকটি কপি করে বন্ধুদের সাথে শেয়ার করুন এবং জিতে নিন আকর্ষণীয় সব পুরস্কার!</i> ✨";

Api.sendMessage({
    chat_id: chat.chatid,
    text: msg,
    parse_mode: "HTML",
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: " রেফারেল লিংক কপি করুন",
                    copy_text: {
                        text: refLink
                    }
                }
            ]
        ]
    }
});
