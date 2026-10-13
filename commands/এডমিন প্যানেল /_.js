/*CMD
  command: *
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

if (!request) return;

// Bots.Business স্ট্রিং বাগ ফিক্স
if (typeof request === "string") {
  try {
    request = JSON.parse(request);
  } catch (e) {}
}

let info = request.chat_join_request;

if (info) {
  let targetChatId = info.chat.id;
  let requesterId = info.from.id;
  let requesterName = ((info.from.first_name || "") + " " + (info.from.last_name || "")).trim() || "ইউজার";

  let refCount = parseInt(Bot.getProperty("ref_count_" + requesterId) || 0);
  let userCoins = parseInt(Bot.getProperty("coins_" + requesterId) || 0);
  let adminNotifyId = 8825649789; // এডমিন আইডি

  // ১৫ রেফার অথবা ৩০০ কয়েন থাকলে সরাসরি এক্সেপ্ট
  if (refCount >= 15 || userCoins >= 300) {
    Api.approveChatJoinRequest({
      chat_id: targetChatId,
      user_id: requesterId
    });

    Api.sendMessage({
      chat_id: requesterId,
      text: "🎉 <b>অভিনন্দন প্রিয় " + requesterName + "!</b> 💖\n\n" +
            "আপনার রিকোয়েস্ট সফলভাবে যাচাই হয়েছে। আমাদের <b>ভিআইপি প্রাইভেট গ্রুপে</b> আপনাকে স্বাগতম! ✨",
      parse_mode: "HTML"
    });

    Api.sendMessage({
      chat_id: adminNotifyId,
      text: "✅ <b>ভিআইপি জয়েন এক্সেপ্ট হয়েছে!</b>\n\n👤 ইউজার: " + requesterName + " (<code>" + requesterId + "</code>)\n👥 রেফার: " + refCount + " টি | 💰 কয়েন: " + userCoins,
      parse_mode: "HTML"
    });

  } else {
    // শর্ত পূরণ না হলে বিনীতভাবে রিজেক্ট করা
    Api.declineChatJoinRequest({
      chat_id: targetChatId,
      user_id: requesterId
    });

    Api.sendMessage({
      chat_id: requesterId,
      text: "🌸 <b>প্রিয় " + requesterName + "!</b>\n\n" +
            "আপনার এখনো ১৫টি রেফার বা ৩০০ কয়েন পূর্ণ হয়নি (বর্তমান সম্পন্ন: " + refCount + "/১৫)।\n" +
            "তাই জয়েন রিকোয়েস্টটি আপাতত বাতিল করা হয়েছে। মন খারাপ করবেন না, দয়া করে রেফার সম্পন্ন করে পুনরায় রিকোয়েস্ট পাঠান! শুভকামনা আপনার জন্য। 💖",
      parse_mode: "HTML"
    });

    Api.sendMessage({
      chat_id: adminNotifyId,
      text: "🚫 <b>জয়েন রিকোয়েস্ট বাতিল করা হয়েছে!</b>\n\n👤 ইউজার: " + requesterName + " (<code>" + requesterId + "</code>)\n👥 রেফার: " + refCount + "/১৫ টি (শর্ত অপূর্ণ)",
      parse_mode: "HTML"
    });
  }
  return;
}


// ==================================================================
// ১. মেম্বার লিভ নিলে ৫ কয়েন জরিমানা (মার্জিত ভাষায় নোটিফিকেশন)
// ==================================================================
if (request && request.chat_member) {
  let cm = request.chat_member;
  let oldStatus = cm.old_chat_member.status;
  let newStatus = cm.new_chat_member.status;

  if ((oldStatus == "member" || oldStatus == "restricted") && (newStatus == "left" || newStatus == "kicked")) {
    let leftUserId = cm.old_chat_member.user.id;
    let referrerId = Bot.getProperty("referred_by_" + leftUserId);
    let isAlreadyPenalized = Bot.getProperty("penalized_" + leftUserId);

    if (referrerId && !isAlreadyPenalized) {
      Bot.setProperty("penalized_" + leftUserId, true, "boolean");

      referrerId = parseInt(referrerId);
      let c = parseInt(Bot.getProperty("coins_" + referrerId) || 0);
      let rc = parseInt(Bot.getProperty("ref_count_" + referrerId) || 0);

      let newCoins = Math.max(0, c - 5);
      let newRefs = Math.max(0, rc - 1);

      Bot.setProperty("coins_" + referrerId, newCoins, "integer");
      Bot.setProperty("ref_count_" + referrerId, newRefs, "integer");

      Api.sendMessage({
        chat_id: referrerId,
        text: "🌸 <b>সম্মানিত সদস্য</b>, একটি বিশেষ নোটিশ!\n\n" +
              "আপনার রেফারেল লিংকের মাধ্যমে যুক্ত একজন সদস্য আমাদের গ্রুপ/চ্যানেল ত্যাগ করেছেন।\n" +
              "নিয়মানুযায়ী আপনার ব্যালেন্স থেকে <b>৫টি কয়েন</b> এবং ১টি রেফার সমন্বয় করা হয়েছে।\n\n" +
              "<i>দয়া করে মন খারাপ করবেন না! নতুন বন্ধুদের ইনভাইট করে আপনি খুব সহজেই কয়েন বাড়িয়ে নিতে পারেন। আপনার জন্য শুভকামনা!</i> 💖",
        parse_mode: "HTML"
      });
    }
  }
}

// ==================================================================
// 🎯 ২. গ্রুপে ২০টি মেসেজ = ২০ কয়েন (কেবলমাত্র যারা বট স্টার্ট করেছে)
// ==================================================================
if (chat && (chat.chat_type == "group" || chat.chat_type == "supergroup")) {
  if (user && !user.is_bot) {
    
    // 🎯 যারা বট স্টার্ট করেনি তাদের মেসেজ কাউন্ট হবে না
    var hasStarted = Bot.getProperty("has_started_bot_" + user.telegramid);
    if (!hasStarted) {
      return; // বট স্টার্ট না থাকলে কোড এখান থেকেই থেমে যাবে
    }

    let currentMsgCount = parseInt(Bot.getProperty("msg_count_" + user.telegramid) || 0) + 1;

    if (currentMsgCount >= 20) {
      let currentCoins = parseInt(Bot.getProperty("coins_" + user.telegramid) || 0);
      Bot.setProperty("coins_" + user.telegramid, currentCoins + 20, "integer");

      // কাউন্টার আবার ০ থেকে শুরু
      Bot.setProperty("msg_count_" + user.telegramid, 0, "integer");

      Api.sendMessage({
        chat_id: chat.chatid,
        text: "🎉 <b>অভিনন্দন প্রিয়</b> <a href=\"tg://user?id=" + user.telegramid + "\">" + user.first_name + "</a>! ✨\n\n" +
              "আপনি আমাদের গ্রুপে ২০টি মেসেজ সম্পন্ন করায় অর্জন করেছেন <b>+২০ কয়েন</b> রিওয়ার্ড! 💰\n\n" +
              "🔄 <i>আপনার মেসেজ কাউন্ট আবার নতুন করে (০ থেকে) শুরু হয়েছে। দারুণ আড্ডা দিন ও কয়েন জিতুন!</i> 💖",
        parse_mode: "HTML",
        reply_to_message_id: request.message_id
      });
    } else {
      Bot.setProperty("msg_count_" + user.telegramid, currentMsgCount, "integer");
    }
  }
}
