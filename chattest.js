const axios = require('axios');
const baseUrl = 'http://localhost:5000/api/chat';
const authUrl = 'http://localhost:5000/api';
let userToken, doctorToken, chatId;
let user, doctor;

async function testChat() {

    console.log("\nLogging in...");
    try {
        const userResponse = await axios.post(`${authUrl}/auth/login`, { email: 'sariitani101@gmail.com', password: 'password123' });
        userToken = userResponse.data.token;
        user = await axios.get(`${authUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User login successful.");
    } 
    catch (error) {
        console.error("Could not Login:", error.response ? error.response.data : error.message);
    }

    try {
        const doctorResponse = await axios.post(`${authUrl}/auth/login`, { email: 'sirsri101@gmail.com', password: 'password123' });
        doctorToken = doctorResponse.data.token;
        doctor = await axios.get(`${authUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor login successful.");
    } 
    catch (error) {
        console.error("Could not Login:", error.response ? error.response.data : error.message);
    }

    console.log("\nTesting Chat Functionality between:");
    console.log(`${doctor.data} and ${user.data}`);

    // Step 1: get the chat with the doctor
    try {
        const initiateResponse = await axios.post(
            `${baseUrl}/initiate`,
            { doctorId: `${doctor.data._id}` },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        chatId = initiateResponse.data.chatId;
        console.log("Chat initiated:", initiateResponse.data);
    } catch (error) {
        console.error("Chat initiation failed:", error.response ? error.response.data : error.message);
        return;
    }

    // Step 2: Doctor sending an image to User
    try {
        const imagePath = "static/1703611662265.png";
        const response = await axios.post(
            `${baseUrl}/${chatId}/message`,  // Changed endpoint
            {
                content: "Here is an image attachment.",
                attachments: [imagePath]
            },
            { headers: { Authorization: `Bearer ${doctorToken}` } }
        );
        console.log("Doctor sent image to User:", response.data);
    } catch (error) {
        console.error("Error sending image from Doctor to User:", error.response ? error.response.data : error.message);
    }
    
    // Step 3: User sending a PDF to Doctor
    try {
        const pdfPath = "static/11915072_16.pdf";
        const response = await axios.post(
            `${baseUrl}/${chatId}/message`,  // Changed endpoint
            {
                content: "Here is a PDF attachment.",
                attachments: [pdfPath]
            },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        console.log("User sent PDF to Doctor:", response.data);
    } catch (error) {
        console.error("Error sending PDF from User to Doctor:", error.response ? error.response.data : error.message);
    }    

    // Step 4: Fetch chat history (user)
    try {
        const updatedChatHistoryUser = await axios.get(`${baseUrl}/${chatId}`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User accessed updated chat history:", updatedChatHistoryUser.data);
    } catch (error) {
        console.error("User access to updated chat history failed:", error.response ? error.response.data : error.message);
    }

    // Step 5: Fetch chat history (doctor)
    try {
        const updatedChatHistoryUser = await axios.get(`${baseUrl}/${chatId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("User accessed updated chat history:", updatedChatHistoryUser.data);
    } catch (error) {
        console.error("User access to updated chat history failed:", error.response ? error.response.data : error.message);
    }
}

testChat();
