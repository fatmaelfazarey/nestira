// services/chatService.ts
import { ref, set, onValue, Unsubscribe, get, update } from "firebase/database";
import { db, realtimeDB } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";


// -------------------------------------------------------
// SEND MESSAGE
// -------------------------------------------------------
// export const addMessage = async (
//     senderId: string,
//     receiverId: string,
//     message: string,
//     chatType: string,
//     isHuman: boolean = true
// ): Promise<boolean> => {
//     try {
//         if (!senderId || !receiverId) throw new Error("User IDs are required");

//         const timestamp = Date.now();
//         const messageId = timestamp.toString();

//         // Always read for sender
//         const senderMessage = {
//             id: messageId,
//             senderId,
//             message,
//             timestamp,
//             read: true,
//             isHuman: true
//         };

//         // Receiver gets unread
//         const receiverMessage = {
//             ...senderMessage,
//             read: false
//         };

//         console.log("Sending message:", { senderId, receiverId, message, chatType });

//         // -------------------------
//         // Update Sender Chat Meta
//         // -------------------------
//         const senderChatRef = ref(realtimeDB, `userChats/${senderId}/${receiverId}`);
//         const senderChatSnap = await get(senderChatRef);

//         if (!senderChatSnap.exists()) {
//             await set(senderChatRef, {
//                 participant: receiverId,
//                 lastMessage: message,
//                 lastTimestamp: timestamp,
//                 chatType,
//                 createdAt: timestamp,
//                 lastMessageReaded: true,
//                 isStart: false
//             });
//         } else {
//             await update(senderChatRef, {
//                 lastMessage: message,
//                 lastTimestamp: timestamp,
//                 chatType,
//                 lastMessageReaded: true,
//                 isStart: false
//             });
//         }

//         // -------------------------
//         // Update Receiver Chat Meta
//         // -------------------------
//         const receiverChatRef = ref(realtimeDB, `userChats/${receiverId}/${senderId}`);
//         const receiverChatSnap = await get(receiverChatRef);

//         if (!receiverChatSnap.exists()) {
//             await set(receiverChatRef, {
//                 participant: senderId,
//                 lastMessage: message,
//                 lastTimestamp: timestamp,
//                 chatType,
//                 createdAt: timestamp,
//                 lastMessageReaded: false,
//                 isStart: false
//             });
//         } else {
//             await update(receiverChatRef, {
//                 lastMessage: message,
//                 lastTimestamp: timestamp,
//                 chatType,
//                 lastMessageReaded: false,
//                 isStart: false
//             });
//         }

//         // -------------------------
//         // Save Messages
//         // -------------------------
//         await set(
//             ref(realtimeDB, `userChats/${senderId}/${receiverId}/messages/${messageId}`),
//             senderMessage
//         );

//         await set(
//             ref(realtimeDB, `userChats/${receiverId}/${senderId}/messages/${messageId}`),
//             receiverMessage
//         );

//         console.log("Message sent successfully");
//         return true;

//     } catch (error) {
//         console.error("Error sending message:", error);
//         throw error;
//     }
// };
export const addMessage = async (
    senderId: string,
    receiverId: string,
    message: string,
    chatType: string,
    isHuman: boolean = true // الباراميتر الجديد
): Promise<boolean> => {
    try {
        if (!senderId || !receiverId) throw new Error("User IDs are required");

        const timestamp = Date.now();
        const messageId = timestamp.toString();

        // Always read for sender - استخدام الباراميتر isHuman
        const senderMessage = {
            id: messageId,
            senderId,
            message,
            timestamp,
            read: true,
            isHuman: isHuman // هنا التصحيح - استخدام الباراميتر
        };

        // Receiver gets unread - استخدام الباراميتر isHuman
        const receiverMessage = {
            ...senderMessage,
            read: false
        };

        console.log("Sending message:", { senderId, receiverId, message, chatType, isHuman });

        // -------------------------
        // Update Sender Chat Meta
        // -------------------------
        const senderChatRef = ref(realtimeDB, `userChats/${senderId}/${receiverId}`);
        const senderChatSnap = await get(senderChatRef);

        if (!senderChatSnap.exists()) {
            await set(senderChatRef, {
                participant: receiverId,
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                createdAt: timestamp,
                lastMessageReaded: true,
                isStart: false
            });
        } else {
            await update(senderChatRef, {
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                lastMessageReaded: true,
                isStart: false
            });
        }

        // -------------------------
        // Update Receiver Chat Meta
        // -------------------------
        const receiverChatRef = ref(realtimeDB, `userChats/${receiverId}/${senderId}`);
        const receiverChatSnap = await get(receiverChatRef);

        if (!receiverChatSnap.exists()) {
            await set(receiverChatRef, {
                participant: senderId,
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                createdAt: timestamp,
                lastMessageReaded: false,
                isStart: false
            });
        } else {
            await update(receiverChatRef, {
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                lastMessageReaded: false,
                isStart: false
            });
        }

        // -------------------------
        // Save Messages
        // -------------------------
        await set(
            ref(realtimeDB, `userChats/${senderId}/${receiverId}/messages/${messageId}`),
            senderMessage
        );

        await set(
            ref(realtimeDB, `userChats/${receiverId}/${senderId}/messages/${messageId}`),
            receiverMessage
        );

        console.log("Message sent successfully");
        return true;

    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};


// -------------------------------------------------------
// REALTIME MESSAGE STREAM
// -------------------------------------------------------
export const subscribeMessages = (
    userId: string,
    chatWithId: string,
    callback: (messages: any[], chatType?: string) => void
): Unsubscribe => {
    try {
        const chatRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}`);

        return onValue(
            chatRef,
            (snapshot) => {
                const data = snapshot.val();

                if (!data) return callback([]);

                const chatType = data.chatType || "work";

                const messages = data.messages
                    ? Object.entries(data.messages)
                        .map(([key, msg]: any) => ({ id: key, ...msg }))
                        .sort((a, b) => a.timestamp - b.timestamp)
                    : [];

                callback(messages, chatType);
            },
            (err) => {
                console.error("subscribeMessages error:", err);
                callback([]);
            }
        );

    } catch (error) {
        console.error("Error setting up subscription:", error);
        return () => { };
    }
};



// -------------------------------------------------------
// GET CHAT TYPE
// -------------------------------------------------------
export const getChatType = async (userId: string, chatWithId: string) => {
    try {
        const chatRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}`);
        const snap = await get(chatRef);

        return snap.exists()
            ? snap.val().chatType || "work"
            : "work";

    } catch {
        return "work";
    }
};



// -------------------------------------------------------
// UPDATE CHAT TYPE
// -------------------------------------------------------
export const updateChatType = async (userId: string, chatWithId: string, chatType: string) => {
    try {
        const timestamp = Date.now();

        await update(
            ref(realtimeDB, `userChats/${userId}/${chatWithId}`),
            { chatType, lastUpdated: timestamp }
        );

        await update(
            ref(realtimeDB, `userChats/${chatWithId}/${userId}`),
            { chatType, lastUpdated: timestamp }
        );

        return true;

    } catch (error) {
        console.error("Error updating chat type:", error);
        throw error;
    }
};



// -------------------------------------------------------
// READ ALL MESSAGES IN CHAT
// -------------------------------------------------------
export const markMessagesAsRead = async (userId: string, chatWithId: string) => {
    try {
        const messagesRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}/messages`);
        const snap = await get(messagesRef);

        if (!snap.exists()) return;

        const updates: any = {};

        Object.entries(snap.val()).forEach(([id, msg]: any) => {
            if (msg.read === false && msg.senderId !== userId) {
                updates[`${id}/read`] = true;
            }
        });

        if (Object.keys(updates).length > 0) {
            await update(messagesRef, updates);
        }

        await update(ref(realtimeDB, `userChats/${userId}/${chatWithId}`), {
            lastMessageReaded: true
        });

    } catch (err) {
        console.error("Error marking read:", err);
    }
};



// -------------------------------------------------------
// GET USER CHAT LIST
// -------------------------------------------------------
// export const getUserChats = async (userId: string): Promise<any[]> => {
//     try {
//         const userChatsRef = ref(realtimeDB, `userChats/${userId}`);
//         const snapshot = await get(userChatsRef);

//         if (!snapshot.exists()) return [];

//         const chats = snapshot.val();

//         const chatArray = await Promise.all(
//             Object.entries(chats).map(async ([otherUserId, data]: any) => {

//                 const userDoc = await getDoc(doc(db, "users", otherUserId));
//                 const userData = userDoc.exists() ? userDoc.data() : {};

//                 return {
//                     chatWith: otherUserId,
//                     sender: userData?.basicInfo?.fullName || userData?.personalInfo?.fullName,
//                     role: userData?.basicInfo?.role || userData?.personalInfo?.rolePosition,
//                     participant: data.participant,
//                     lastMessage: data.lastMessage || "",
//                     lastTimestamp: data.lastTimestamp || data.createdAt,
//                     chatType: data.chatType || "work",
//                     createdAt: data.createdAt,
//                     lastMessageReaded: data.lastMessageReaded,
//                     isStart: data.isStart || false
//                 };
//             })
//         );

//         return chatArray.sort((a, b) => b.lastTimestamp - a.lastTimestamp);

//     } catch (error) {
//         console.error("Error getting chats:", error);
//         return [];
//     }
// };
export const getUserChats = async (userId: string): Promise<any[]> => {
    try {
        const userChatsRef = ref(realtimeDB, `userChats/${userId}`);
        const snapshot = await get(userChatsRef);

        if (!snapshot.exists()) return [];

        const chats = snapshot.val();

        const chatArray = await Promise.all(
            Object.entries(chats).map(async ([otherUserId, data]: any) => {

                const userDoc = await getDoc(doc(db, "users", otherUserId));
                const userData = userDoc.exists() ? userDoc.data() : {};

                return {
                    chatWith: otherUserId,
                    sender: userData?.basicInfo?.fullName || userData?.personalInfo?.fullName || userData?.fullName,
                    role: userData?.basicInfo?.role || userData?.personalInfo?.rolePosition || userData?.rolePosition,
                    profilePhoto: userData?.basicInfo?.profilePhoto || userData?.personalInfo?.profilePhoto || userData?.profilePhoto,
                    participant: data.participant,
                    lastMessage: data.lastMessage || "",
                    lastTimestamp: data.lastTimestamp || data.createdAt,
                    chatType: data.chatType || "work",
                    createdAt: data.createdAt,
                    lastMessageReaded: data.lastMessageReaded,
                    isStart: data.isStart || false
                };
            })
        );


        const filteredChats = chatArray.filter(chat => chat.chatType !== "help");

        return filteredChats.sort((a, b) => b.lastTimestamp - a.lastTimestamp);

    } catch (error) {
        console.error("Error getting chats:", error);
        return [];
    }
};


export const toggleStartChat = async (
    userId: string,
    chatWithId: string,
    isStart: boolean
) => {
    try {
        const chatRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}`);
        await update(chatRef, { isStart });
        console.log(`Chat with ${chatWithId} isStart updated to`, isStart);
    } catch (err) {
        console.error("Error toggling start chat:", err);
    }
};


export const deleteChatForUser = async (userId: string, chatWithId: string) => {
    try {
        const chatRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}`);
        await set(chatRef, null); // Remove entire chat only for this user

        console.log(`Chat between ${userId} and ${chatWithId} deleted for user ${userId}`);
        return true;

    } catch (err) {
        console.error("Error deleting chat for user:", err);
        return false;
    }
};

export const deleteSingleMessage = async (
    userId: string,
    chatWithId: string,
    messageId: string
) => {
    try {
        const userMsgRef = ref(
            realtimeDB,
            `userChats/${userId}/${chatWithId}/messages/${messageId}`
        );

        const snapshot = await get(userMsgRef);
        if (!snapshot.exists()) return;

        const msg = snapshot.val();

        // ---------------------------
        // CASE 1: User is the sender
        // ---------------------------
        if (msg.senderId === userId) {
            // Remove message from sender
            await set(
                ref(realtimeDB, `userChats/${userId}/${chatWithId}/messages/${messageId}`),
                null
            );

            // Remove message from receiver
            await set(
                ref(realtimeDB, `userChats/${chatWithId}/${userId}/messages/${messageId}`),
                null
            );

            console.log("Message deleted for both users");
            return true;
        }

        // ---------------------------
        // CASE 2: User is NOT the sender
        // Remove only for this user
        // ---------------------------
        await set(
            ref(realtimeDB, `userChats/${userId}/${chatWithId}/messages/${messageId}`),
            null
        );

        console.log("Message deleted only for current user");
        return true;

    } catch (err) {
        console.error("Error deleting single message:", err);
        return false;
    }
};




/// adminnnnnn

// services/chatService.ts - إضافة دوال جديدة

// -------------------------------------------------------
// GET ALL HELP CHATS FOR EMPLOYER
// -------------------------------------------------------
// services/chatService.ts - تصحيح دالة getHelpChatsForEmployer

// -------------------------------------------------------
// GET ALL HELP CHATS FOR EMPLOYER
// -------------------------------------------------------
export const getHelpChatsForEmployer = async (employerId: string): Promise<any[]> => {
    try {
        const userChatsRef = ref(realtimeDB, `userChats/${employerId}`);
        const snapshot = await get(userChatsRef);

        if (!snapshot.exists()) return [];

        const chats = snapshot.val();
        const helpChats = [];

        // استخدام Object.entries بشكل صحيح
        const chatEntries = Object.entries(chats);

        for (let i = 0; i < chatEntries.length; i++) {
            const [otherUserId, chatData] = chatEntries[i] as [string, any];

            // تصفية الشاتس اللي نوعها help فقط
            if (chatData.chatType === 'help') {
                // جلب بيانات المستخدم الآخر (الـ admin)
                const userDoc = await getDoc(doc(db, "users", otherUserId));
                const userData = userDoc.exists() ? userDoc.data() : {};

                const unreadCount = await getUnreadCount(employerId, otherUserId);

                helpChats.push({
                    chatWithId: otherUserId,
                    participantName: userData?.basicInfo?.fullName || 'Help Assistant',
                    role: userData?.basicInfo?.role || 'Support',
                    lastMessage: chatData.lastMessage || "",
                    lastTimestamp: chatData.lastTimestamp || chatData.createdAt,
                    chatType: chatData.chatType,
                    createdAt: chatData.createdAt,
                    lastMessageReaded: chatData.lastMessageReaded || false,
                    unreadCount: unreadCount
                });
            }
        }

        return helpChats.sort((a, b) => b.lastTimestamp - a.lastTimestamp);

    } catch (error) {
        console.error("Error getting help chats:", error);
        return [];
    }
};
// -------------------------------------------------------
// GET UNREAD MESSAGES COUNT
// -------------------------------------------------------
export const getUnreadCount = async (userId: string, chatWithId: string): Promise<number> => {
    try {
        const messagesRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}/messages`);
        const snapshot = await get(messagesRef);

        if (!snapshot.exists()) return 0;

        const messages = snapshot.val();
        let unreadCount = 0;

        Object.values(messages).forEach((msg: any) => {
            if (!msg.read && msg.senderId !== userId) {
                unreadCount++;
            }
        });

        return unreadCount;
    } catch (error) {
        console.error("Error getting unread count:", error);
        return 0;
    }
};

// -------------------------------------------------------
// SEND MESSAGE AS EMPLOYER (REPLY)
// -------------------------------------------------------
export const sendEmployerReply = async (
    employerId: string,
    message: string,
    chatType: string = "help"
): Promise<boolean> => {
    try {
        const ADMIN_ID = 'D9vaCiM22aaRQpxsTxjuz57gKmi1'; // Admin user ID

        if (!employerId || !ADMIN_ID) throw new Error("User IDs are required");

        const timestamp = Date.now();
        const messageId = timestamp.toString();

        // Employer message (sender)
        const employerMessage = {
            id: messageId,
            senderId: employerId,
            message,
            timestamp,
            read: true,
            isHuman: true // Employer replies are always human
        };

        // Admin message (receiver - unread)
        const adminMessage = {
            ...employerMessage,
            read: false
        };

        console.log("Sending employer reply:", { employerId, ADMIN_ID, message, chatType });

        // -------------------------
        // Update Employer Chat Meta
        // -------------------------
        const employerChatRef = ref(realtimeDB, `userChats/${employerId}/${ADMIN_ID}`);
        const employerChatSnap = await get(employerChatRef);

        if (!employerChatSnap.exists()) {
            await set(employerChatRef, {
                participant: ADMIN_ID,
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                createdAt: timestamp,
                lastMessageReaded: true,
                isStart: false
            });
        } else {
            await update(employerChatRef, {
                lastMessage: message,
                lastTimestamp: timestamp,
                lastMessageReaded: true
            });
        }

        // -------------------------
        // Update Admin Chat Meta
        // -------------------------
        const adminChatRef = ref(realtimeDB, `userChats/${ADMIN_ID}/${employerId}`);
        const adminChatSnap = await get(adminChatRef);

        if (!adminChatSnap.exists()) {
            await set(adminChatRef, {
                participant: employerId,
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                createdAt: timestamp,
                lastMessageReaded: false,
                isStart: false
            });
        } else {
            await update(adminChatRef, {
                lastMessage: message,
                lastTimestamp: timestamp,
                lastMessageReaded: false
            });
        }

        // -------------------------
        // Save Messages
        // -------------------------
        await set(
            ref(realtimeDB, `userChats/${employerId}/${ADMIN_ID}/messages/${messageId}`),
            employerMessage
        );

        await set(
            ref(realtimeDB, `userChats/${ADMIN_ID}/${employerId}/messages/${messageId}`),
            adminMessage
        );

        console.log("Employer reply sent successfully");
        return true;

    } catch (error) {
        console.error("Error sending employer reply:", error);
        throw error;
    }
};

// -------------------------------------------------------
// GET CHAT HISTORY
// -------------------------------------------------------
export const getChatHistory = async (userId: string, chatWithId: string): Promise<any[]> => {
    try {
        const messagesRef = ref(realtimeDB, `userChats/${userId}/${chatWithId}/messages`);
        const snapshot = await get(messagesRef);

        if (!snapshot.exists()) return [];

        const messages = snapshot.val();
        const messageArray = Object.entries(messages).map(([id, msg]: [string, any]) => ({
            id,
            ...msg
        }));

        return messageArray.sort((a, b) => a.timestamp - b.timestamp);

    } catch (error) {
        console.error("Error getting chat history:", error);
        return [];
    }
};


// services/chatService.ts - إضافة دالة للرد كـ Admin

// -------------------------------------------------------
// SEND MESSAGE AS ADMIN (REPLY TO EXISTING CHAT)
// -------------------------------------------------------
export const sendAdminReply = async (
    employerId: string, // الـ Employer اللي بيترد عليه
    message: string,
    chatType: string = "help"
): Promise<boolean> => {
    try {
        const ADMIN_ID = 'D9vaCiM22aaRQpxsTxjuz57gKmi1'; // Admin user ID

        if (!ADMIN_ID || !employerId) throw new Error("User IDs are required");

        const timestamp = Date.now();
        const messageId = timestamp.toString();

        // Admin message (sender) - isHuman: true لأن الرد من Admin حقيقي
        const adminMessage = {
            id: messageId,
            senderId: ADMIN_ID,
            message,
            timestamp,
            read: true, // Admin شايف الرسالة
            isHuman: true // الرد من Admin بشري
        };

        // Employer message (receiver - unread)
        const employerMessage = {
            ...adminMessage,
            read: false // Employer مش شايف الرسالة لسه
        };

        console.log("Sending admin reply:", { ADMIN_ID, employerId, message, chatType });

        // -------------------------
        // Update Admin Chat Meta
        // -------------------------
        const adminChatRef = ref(realtimeDB, `userChats/${ADMIN_ID}/${employerId}`);
        const adminChatSnap = await get(adminChatRef);

        if (!adminChatSnap.exists()) {
            // لو مفيش شات، نعمله جديد
            await set(adminChatRef, {
                participant: employerId,
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                createdAt: timestamp,
                lastMessageReaded: true,
                isStart: false
            });
        } else {
            // لو فيه شات موجود، نعدل عليه
            await update(adminChatRef, {
                lastMessage: message,
                lastTimestamp: timestamp,
                lastMessageReaded: true
            });
        }

        // -------------------------
        // Update Employer Chat Meta
        // -------------------------
        const employerChatRef = ref(realtimeDB, `userChats/${employerId}/${ADMIN_ID}`);
        const employerChatSnap = await get(employerChatRef);

        if (!employerChatSnap.exists()) {
            await set(employerChatRef, {
                participant: ADMIN_ID,
                lastMessage: message,
                lastTimestamp: timestamp,
                chatType,
                createdAt: timestamp,
                lastMessageReaded: false,
                isStart: false
            });
        } else {
            await update(employerChatRef, {
                lastMessage: message,
                lastTimestamp: timestamp,
                lastMessageReaded: false
            });
        }

        // -------------------------
        // Save Messages
        // -------------------------
        await set(
            ref(realtimeDB, `userChats/${ADMIN_ID}/${employerId}/messages/${messageId}`),
            adminMessage
        );

        await set(
            ref(realtimeDB, `userChats/${employerId}/${ADMIN_ID}/messages/${messageId}`),
            employerMessage
        );

        console.log("Admin reply sent successfully");
        return true;

    } catch (error) {
        console.error("Error sending admin reply:", error);
        throw error;
    }
};


// -------------------------------------------------------
// DELETE HELP CHAT FOR BOTH USERS (Admin or Employer)
// -------------------------------------------------------
export const deleteHelpChatForBothUsers = async (deleterUserId: string, otherUserId: string): Promise<boolean> => {
    try {
        // Validate input parameters
        if (!deleterUserId || !otherUserId) {
            throw new Error("Both user IDs are required");
        }

        console.log(`Deleting help chat between ${deleterUserId} and ${otherUserId} for both users`);

        // Delete chat for the user who initiated deletion (deleterUserId)
        const deleterChatRef = ref(realtimeDB, `userChats/${deleterUserId}/${otherUserId}`);
        await set(deleterChatRef, null);

        // Delete chat for the other user (otherUserId)
        const otherUserChatRef = ref(realtimeDB, `userChats/${otherUserId}/${deleterUserId}`);
        await set(otherUserChatRef, null);

        console.log(`✅ Help chat successfully deleted for both users`);
        console.log(`   - Deleted for: ${deleterUserId}`);
        console.log(`   - Deleted for: ${otherUserId}`);

        return true;

    } catch (err) {
        console.error("❌ Error deleting help chat for both users:", err);
        return false;
    }
};
