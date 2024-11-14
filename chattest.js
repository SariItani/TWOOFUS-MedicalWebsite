const axios = require('axios');
const baseUrl = 'http://localhost:5000/api/chat';
const authUrl = 'http://localhost:5000/api';
let userToken, doctorToken, newdoctorToken, chatId, newchatId;
let user, doctor, newdoctor;

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

    try {
        await axios.post(`${authUrl}/auth/signup`, {username: "newdoctor", email: "newdoctor@example.com", password: "password123", role: "doctor"});
        const newdoctorResponse = await axios.post(`${authUrl}/auth/login`, { email: 'newdoctor@example.com', password: 'password123' });
        newdoctorToken = newdoctorResponse.data.token;
        newdoctor = await axios.get(`${authUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${newdoctorToken}` }
        });
        console.log("New Doctor login successful.");
    } 
    catch (error) {
        console.error("Could not Login:", error.response ? error.response.data : error.message);
    }

    console.log("\nTesting Chat Functionality between:");
    console.log(`${doctor.data} and ${user.data}`);

    // Step 1: Initiate a chat with the same doctor as before to see what might happen
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

    // Step 1 (new): Initiate a chat with the new doctor
    try {
        const initiateResponse = await axios.post(
            `${baseUrl}/initiate`,
            { doctorId: `${newdoctor.data._id}` },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        newchatId = initiateResponse.data.chatId;
        console.log("New Chat initiated:", initiateResponse.data);
    } catch (error) {
        console.error("New Chat initiation failed:", error.response ? error.response.data : error.message);
        return;
    }

    // Step 2: Fetch chat history (as the user)
    try {
        const chatHistoryUser = await axios.get(`${baseUrl}/${chatId}`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User accessed chat history:", chatHistoryUser.data);
    } catch (error) {
        console.error("User access to chat history failed:", error.response ? error.response.data : error.message);
    }

    // Step 3: Fetch chat history (as the doctor)
    try {
        const chatHistoryDoctor = await axios.get(`${baseUrl}/${chatId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed chat history:", chatHistoryDoctor.data);
    } catch (error) {
        console.error("Doctor access to chat history failed:", error.response ? error.response.data : error.message);
    }

    // Step 4: Send a message in the new chat (user to new doctor)
    try {
        const userMessage = await axios.post(
            `${baseUrl}/${newchatId}/message`,
            { content: "Hello new Doctor, I need help with my symptoms." },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        console.log("User sent new message:", userMessage.data);
    } catch (error) {
        console.error("User new message failed:", error.response ? error.response.data : error.message);
    }

    // Step 5: Send a message in the new chat (new doctor to user)
    try {
        const doctorMessage = await axios.post(
            `${baseUrl}/${newchatId}/message`,
            { content: "Hello, how can I assist you today new?" },
            { headers: { Authorization: `Bearer ${newdoctorToken}` } }
        );
        console.log("New Doctor sent message:", doctorMessage.data);
    } catch (error) {
        console.error("New Doctor message failed:", error.response ? error.response.data : error.message);
    }

    // Step 6: Fetch updated chat history (user)
    try {
        const updatedChatHistoryUser = await axios.get(`${baseUrl}/${chatId}`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User accessed updated chat history:", updatedChatHistoryUser.data);
    } catch (error) {
        console.error("User access to updated chat history failed:", error.response ? error.response.data : error.message);
    }

    // Step 6 new: Fetch updated chat history (user with new)
    try {
        const updatedChatHistoryUser = await axios.get(`${baseUrl}/${newchatId}`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User accessed updated chat history:", updatedChatHistoryUser.data);
    } catch (error) {
        console.error("User access to updated chat history failed:", error.response ? error.response.data : error.message);
    }

    // Step 6 doctor: Fetch updated chat history (doctor)
    try {
        const updatedChatHistoryUser = await axios.get(`${baseUrl}/${chatId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("User accessed updated chat history:", updatedChatHistoryUser.data);
    } catch (error) {
        console.error("User access to updated chat history failed:", error.response ? error.response.data : error.message);
    }

    // Step 7 new doctor: Fetch updated chat history (new doctor)
    try {
        const updatedChatHistoryUser = await axios.get(`${baseUrl}/${newchatId}`, {
            headers: { Authorization: `Bearer ${newdoctorToken}` }
        });
        console.log("User accessed updated chat history:", updatedChatHistoryUser.data);
    } catch (error) {
        console.error("User access to updated chat history failed:", error.response ? error.response.data : error.message);
    }
}

testChat();
