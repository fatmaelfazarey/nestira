import React, { useEffect, useState, useContext } from "react";
import { addMessage, subscribeMessages } from "@/services/chatService";
import { useAuth } from "@/contexts/AuthContext";
import ChatButton from "./Chat/ChatButton";
// import { addMessage, subscribeMessages } from "./ChatTestService";
// import { authContext } from "./authContext"; // لو عندك Auth Context


const ChatTest = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    // const { user } = useContext(authContext); // المستخدم الحالي

    const { currentUser } = useAuth();

    console.log(currentUser)


    // {
    //     "uid": "w2Rd7bjEcPQJDv4BGbXM8dwWFGh2",
    //     "email": "hr@gmail.com",
    //     "emailVerified": false,
    //     "isAnonymous": false,
    //     "providerData": [
    //         {
    //             "providerId": "password",
    //             "uid": "hr@gmail.com",
    //             "displayName": null,
    //             "email": "hr@gmail.com",
    //             "phoneNumber": null,
    //             "photoURL": null
    //         }
    //     ],
    //     "stsTokenManager": {
    //         "refreshToken": "AMf-vBwrs2LrKKfD6Rhl1_x8e6K4oB12wcyqP8_M_w9F1SM7sTLThfcwf8iJP75YEwsSrbaOmiCLC6HckUbmd9RRAywWki9V8oRnspHX9E5juS-zFgWC6tFYf3Axmtjf9FU10tLfCGWymGLivTs9HV1_ln_6G8nIPKSc7O7VXIyRLe6bFxyDD7-oHRzQUucTltxF1iWmtgCZ",
    //         "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1YTZjMGMyYjgwMDcxN2EzNGQ1Y2JiYmYzOWI4NGI2NzYxMjgyNjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVpc3RyYS1lNjhlZSIsImF1ZCI6Im5laXN0cmEtZTY4ZWUiLCJhdXRoX3RpbWUiOjE3NjMzODM4MjksInVzZXJfaWQiOiJ3MlJkN2JqRWNQUUpEdjRCR2JYTThkd1dGR2gyIiwic3ViIjoidzJSZDdiakVjUFFKRHY0QkdiWE04ZHdXRkdoMiIsImlhdCI6MTc2MzM4MzgyOSwiZXhwIjoxNzYzMzg3NDI5LCJlbWFpbCI6ImhyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJockBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.K1ZdM8dG-MhUGSYWJHgCacTknjXtA8rGugEhGtvTnxeyOMpCdWM6YqNbvLwFZIl8DI0lYumo31Xpw_l_kCk2wta-NxIJVi75PH2tUw9XAC_yqEuGQp-Yhsu9-SW41CXGQ_mbs1pn2MUHsxvdSC6Op_H8FwluVPP2F3rqqVxSDNfDe3ybBK--P_qVi13VO4j1s0h5JGfkHFfphidrVJgjzX9k10v8hNULHMXZO69U5gfSfTQ9eP3XQYDpxvFBFvbgTfJ8APO-7BN5XTlY2-A24D86TGr_JfjT4wsFI1pEF8j1xtt0OPzbHa37fdOZFDyxLoqhZPeT31UwnUYQY-H9TQ",
    //         "expirationTime": 1763387429669
    //     },
    //     "createdAt": "1760963307996",
    //     "lastLoginAt": "1763383829544",
    //     "apiKey": "AIzaSyDXyN2RU9o4iBWzQiZ2vWaA8dylMygbdbo",
    //     "appName": "[DEFAULT]"
    // }



    // useEffect(() => {
    //     subscribeMessages(setMessages);
    // }, []);

    const chatWithId = "candidateUID2"; 
    useEffect(() => {
        if (!currentUser) return;


        subscribeMessages(currentUser.uid, chatWithId, setMessages);
    }, [currentUser]);


    const handleSend = () => {
        if (!newMessage.trim() || !currentUser) return;
        addMessage(currentUser.uid, chatWithId, newMessage.trim());
        setNewMessage("");
    };

    return (
        <div>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <b>{msg.userId}</b>: {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatTest;
