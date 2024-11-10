import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const DirectMessage = () => {
    const router = useRouter();
    const thread_id = parseInt(router.query.thread_id as string, 10);
    const userId = sessionStorage.getItem("userId");

    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ id: number; text: string; sender: string; createdAt?: string }[]>([
        // { id: 1, text: "Welcome to The 6ix, guys! Thought  could have a space to talk about everything Toronto and, of course, Drake.", sender: "user" },
        // { id: 2, text: "Sounds great! Can't wait to chat about all things Toronto.", sender: "other" }
    ]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8888/thread/getmessages?threadID=${thread_id}`);
            const data = await response.json();
            const formattedMessages = data.map((msg: any) => ({
                id: msg.message_id,
                text: msg.content,
                sender: msg.user_id === userId ? "user" : "other",
                createdAt: msg.created_at,
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
                console.log("Setting up interval to fetch messages...");

        const interval = setInterval(fetchMessages, 1000);
        return () => clearInterval(interval);
    }, [thread_id]);

    const sendMessageToAPI = async (messageContent: string) => {
        try {
            const response = await fetch('http://localhost:8888/message/addmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userId, // Replace with actual user ID
                    threadID: thread_id,
                    content: messageContent,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to send message:', response.status, errorText);
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            // console.log("Sending message:", message);   
            // const newMessage = { text: message, sender: "user" }; // Generate a unique ID for the new message
            sendMessageToAPI(message);
            setMessage('');
        }
    };

    return (
        <div className="h-screen w-screen max-w-md mx-auto flex flex-col bg-[#282828]" style={{ minHeight: '100vh' }}>
            <Head>
                <title>Direct Message</title>
                <meta name="description" content="Direct Message"/>
                <link rel="icon" href="/matchify_logo.svg" type="image/gif" sizes="16x16" />
            </Head>

            {/* Header */}
            <div className="flex items-center p-4 bg-[#1E1E1E] border-b border-gray-700">
                <button onClick={handleHomeRedirect} className="mr-4">
                    <img src="/left_arrow.svg" alt="Back" className="w-6 h-6" />
                </button>
                <h1 className="text-white text-lg font-semibold">Benjamin Smith, Gabriel Wilson</h1>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-scroll p-4 space-y-2 bg-[#282828]" style={{ scrollbarWidth: 'none' }}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`inline-block max-w-[80%] rounded-3xl px-4 py-2 text-sm ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-700 text-white"}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center p-3 bg-[#1E1E1E] border-t border-gray-700">
                <div className="flex items-center justify-center w-10 h-10 bg-[#1DB954] rounded-full mr-3">
                    <img src="/camera_icon.svg" alt="Camera" className="w-6 h-6" />
                </div>
                <input
                    type="text"
                    placeholder="Message..."
                    className="flex-grow p-2 bg-gray-800 text-white rounded-full outline-none text-sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} className="flex items-center justify-center w-10 h-10 bg-[#1DB954] rounded-full ml-3">
                    <img src={message.trim() ? "/send_icon.svg" : "/microphone_icon.svg"} alt="Send" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default DirectMessage;
