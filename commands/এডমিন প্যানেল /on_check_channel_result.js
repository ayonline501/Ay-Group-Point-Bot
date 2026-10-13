/*CMD
  command: on_check_channel_result
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
    text: "⚠️ <b>চ্যানেল তথ্য যাচাইয়ে সমস্যা:</b> " + (options.description || "অজানা ত্রুটি।"),
    parse_mode: "HTML"
  });
  return;
}

var result = options.result;
var st = result ? result.status : "";
var isChannelMember = (st === "member" || st === "administrator" || st === "creator" || (st === "restricted" && result.is_member === true));

if (!isChannelMember) {
  Api.sendMessage({
    chat_id: chat.chatid,
    text: "🌸 <b>প্রিয় সদস্য</b>, আপনি এখনো আমাদের <b>চ্যানেলে</b> (@ayofficialbd) যুক্ত হননি!\n\nদয়া করে চ্যানেলে জয়েন করে পুনরায় <b>Verify & Continue</b> বাটনে চাপ দিন।",
    parse_mode: "HTML"
  });
  return;
}

// চ্যানেল ঠিক থাকলে এবার গ্রুপ চেক করতে পাঠাবে
Api.getChatMember({
  chat_id: "@ayofficialbdchat",
  user_id: user.telegramid,
  on_result: "on_check_group_result"
});
