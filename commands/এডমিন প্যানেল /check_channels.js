/*CMD
  command: check_channels
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

// ১. প্রথমে চ্যানেল চেক করা
Api.getChatMember({
  chat_id: "@ayofficialbd",
  user_id: user.telegramid,
  on_result: "on_check_channel_result"
});
