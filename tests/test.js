const axios = require('axios');
const baseUrl = 'http://localhost:5000/api';
let userToken, doctorToken, profileId;

async function runTests() {
    try {
        await testAuth();
        await testUserProfile();
        await testMedicalProfile();
        await testDiagnosis();
        await testDashboard();
        await testDoctorDashboard();
    } catch (error) {
        console.error("Error during testing:", error.response ? error.response.data : error.message);
    }
}

// Test Authentication
async function testAuth() {
    console.log("\nTesting Authentication:");
    try {
        const userResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'sariitani101@gmail.com', password: 'password123' });
        userToken = userResponse.data.token;
        console.log("User login successful.");

        const doctorResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'sirsri101@gmail.com', password: 'password123' });
        doctorToken = doctorResponse.data.token;
        console.log("Doctor login successful.");
    } catch (error) {
        console.error("Authentication test failed:", error.response ? error.response.data : error.message);
    }
}

// Test User Profile
async function testUserProfile() {
    console.log("\nTesting User Profile:");

    try {
        const userProfile = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User profile accessed:", userProfile.data);
    } catch (error) {
        console.error("User profile access failed:", error.response ? error.response.data : error.message);
    }

    try {
        const doctorProfile = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed user profile:", doctorProfile.data);
    } catch (error) {
        console.error("Doctor profile access failed:", error.response ? error.response.data : error.message);
    }
}

// Test Medical Profile
async function testMedicalProfile() {
    console.log("\nTesting Medical Profile:");

    try {
        const medicalProfile = await axios.get(`${baseUrl}/medical-profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User medical profile retrieved:", medicalProfile.data);
        profileId = medicalProfile.data._id;
    } catch (error) {
        console.error("User medical profile retrieval failed:", error.response ? error.response.data : error.message);
    }

    try {
        const doctorAccessProfile = await axios.get(`${baseUrl}/medical-profile/${profileId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed user medical profile:", doctorAccessProfile.data);
    } catch (error) {
        console.error("Doctor access to user medical profile failed:", error.response ? error.response.data : error.message);
    }
}

// Test Diagnosis
async function testDiagnosis() {
    console.log("\nTesting Diagnosis:");

    try {
        const diagnosisResponse = await axios.post(
            `${baseUrl}/diagnosis/diagnose`,
            { symptoms: ["headache", "fever"] },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        console.log("Diagnosis created:", diagnosisResponse.data);
    } catch (error) {
        console.error("Diagnosis submission failed:", error.response ? error.response.data : error.message);
    }

    try {
        const user = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const historyResponseUser = await axios.get(`${baseUrl}/diagnosis/history/${user.data._id}`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User accessed diagnosis history:", historyResponseUser.data);
    } catch (error) {
        console.error("User accessed diagnosis history failed:", error.response ? error.response.data : error.message);
    }

    try {
        const user = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        const historyResponseDoctor = await axios.get(`${baseUrl}/diagnosis/history/${user.data._id}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed diagnosis history:", historyResponseDoctor.data);
    } catch (error) {
        console.error("Doctor accessed diagnosis history failed:", error.response ? error.response.data : error.message);
    }
}

// Test Dashboard
async function testDashboard() {
    console.log("\nTesting Dashboard Access:");

    try {
        const userDashboard = await axios.get(`${baseUrl}/dashboard/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User dashboard accessed:", userDashboard.data);
    } catch (error) {
        console.error("User dashboard access failed:", error.response ? error.response.data : error.message);
    }

    try {
        const doctorDashboard = await axios.get(`${baseUrl}/doctor-dashboard/patients`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed patients list:", doctorDashboard.data);
    } catch (error) {
        console.error("Doctor dashboard patients list access failed:", error.response ? error.response.data : error.message);
    }

    try {
        const diagnosisHistory = await axios.get(`${baseUrl}/dashboard/diagnosis-history`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("Diagnoisis History accessed:", diagnosisHistory.data);
    } catch (error) {
        console.error("User dashboard access failed:", error.response ? error.response.data : error.message);
    }
}

// Test Doctor Dashboard
async function testDoctorDashboard() {
    console.log("\nTesting Doctor Dashboard:");

    try {
        const doctorProfileResponse = await axios.post(
            `${baseUrl}/doctor-dashboard/profile`,
            {
                experience: "10 years",
                field: "Cardiology",
                availability: "Monday-Friday",
                cv: "static/11915072_16.pdf",
                license: "static/11915072_16.pdf"
            },
            { headers: { Authorization: `Bearer ${doctorToken}` } }
        );
        console.log("Doctor profile created or updated:", doctorProfileResponse.data);
        // nested try catch
        try {
            const availabilityFetch = await axios.get(`${baseUrl}/doctor-dashboard/availability/${doctorProfileResponse.data.userId}`, {
                headers: { Authorization: `Bearer ${doctorToken}` }
            });
            console.log("Doctor availability fetched:", availabilityFetch.data);
        } catch (error) {
            console.error("Fetching doctor availability failed:", error.response ? error.response.data : error.message);
        }
    
        try {
            const doctorProfileFetch = await axios.get(`${baseUrl}/doctor-dashboard/profile/${doctorProfileResponse.data.userId}`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            console.log("Doctor profile fetched:", doctorProfileFetch.data);
        } catch (error) { // we should fail not succeed
            console.error("Fetching doctor profile as user failed:", error.response ? error.response.data : error.message);
        }

    } catch (error) {
        console.error("Doctor profile creation or update failed:", error.response ? error.response.data : error.message);
    }

    try {
        const patientDetails = await axios.get(`${baseUrl}/doctor-dashboard/patients/${profileId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed patient details:", patientDetails.data);
    } catch (error) {
        console.error("Doctor access to patient details failed:", error.response ? error.response.data : error.message);
    }
}

runTests();
