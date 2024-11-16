const axios = require('axios');
const baseUrl = 'http://localhost:5000/api';
let userToken, doctorToken, chatId;

async function testChat() {

    console.log("\nLogging in...");
    try {
        const userResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'sariitani101@gmail.com', password: 'password123' });
        userToken = userResponse.data.token;
        user = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User login successful.");
    } 
    catch (error) {
        console.error("Could not Login:", error.response ? error.response.data : error.message);
    }

    try {
        const doctorResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'sirsri101@gmail.com', password: 'password123' });
        doctorToken = doctorResponse.data.token;
        doctor = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor login successful.");
    } 
    catch (error) {
        console.error("Could not Login:", error.response ? error.response.data : error.message);
    }

    console.log("\nTesting Chat Functionality between:");
    console.log(`${doctor.data._id} and ${user.data._id}`);

    // Step 1: get the chat with the doctor
    try {
        const initiateResponse = await axios.post(
            `${baseUrl}/chat/initiate`,
            { doctorId: `${doctor.data._id}` },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        chatId = initiateResponse.data.chatId;
        console.log("Chat initiated:", initiateResponse.data);
    } catch (error) {
        console.error("Chat initiation failed:", error.response ? error.response.data : error.message);
        return;
    }

    // Doctor sends a message
    try {
        const messageResponse = await axios.post(
            `${baseUrl}/chat/${chatId}/message`,
            {
                chatId: chatId,
                content: 'So about your previous diagnosis, please talk to me once you get this notification.',
            },
            { headers: { Authorization: `Bearer ${doctorToken}` } }
        );
        console.log("Doctor sent message:", messageResponse.data);
    } catch (error) {
        console.error("Sending message failed:", error.response ? error.response.data : error.message);
        return;
    }
}

testChat();
