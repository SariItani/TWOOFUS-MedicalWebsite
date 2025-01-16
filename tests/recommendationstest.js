const axios = require('axios');

const baseUrl = 'http://localhost:5000/api';

(async () => {
    try {
        // // Signup as a user
        // await axios.post(`${baseUrl}/auth/signup`, {
        //     // username, email, password, role
        //     username: 'sariitani',
        //     email: 'sariitani101@gmail.com',
        //     password: 'password123',
        //     role: 'user'
        // });
        // // Signup as a doctor
        // await axios.post(`${baseUrl}/auth/signup`, {
        //     username: 'sirsri',
        //     email: 'sirsri101@gmail.com',
        //     password: 'password123',
        //     role: 'doctor',
        // });

        // Log in as a user
        const userLogin = await axios.post(`${baseUrl}/auth/login`, {
            email: 'sariitani101@gmail.com',
            password: 'password123'
        });
        const userToken = userLogin.data.token;
        console.log('User login successful:', userLogin.data);

        // Log in as a doctor
        const doctorLogin = await axios.post(`${baseUrl}/auth/login`, {
            email: 'sirsri101@gmail.com',
            password: 'password123'
        });
        const doctorToken = doctorLogin.data.token;
        console.log('Doctor login successful:', doctorLogin.data);

        // // Create a medical profile for the user
        // const createMedicalProfile = await axios.post(
        //     `${baseUrl}/medical-Profile`,
        //     {
        //         dob: '1990-01-01',
        //         sex: 'Male',
        //         conditions: 'Cardiology',
        //         allergies: 'Peanuts',
        //         medications: 'Ibuprofen',
        //         emergencyContactName: 'Jane Doe',
        //         emergencyContactPhone: '123456789',
        //         bloodType: 'O+',
        //         smokingStatus: false
        //     },
        //     { headers: { Authorization: `Bearer ${userToken}` } }
        // );
        // console.log('User medical profile created:', createMedicalProfile.data);

        // // Create doctor profiles
        // const doctorProfiles = [
        //     {
        //         specialization: 'Cardiology',
        //         experience: 10,
        //         availability: 'Monday-Friday',
        //         license: '/home/sari-itani/Documents/GitHub/TWOOFUS-MedicalWebsite/static/11915072_16.pdf'
        //     },
        //     {
        //         specialization: 'Neurology',
        //         experience: 5,
        //         availability: 'Weekends',
        //         license: '/home/sari-itani/Documents/GitHub/TWOOFUS-MedicalWebsite/static/11915072_16.pdf'
        //     },
        //     {
        //         specialization: 'Dermatology',
        //         experience: 8,
        //         availability: 'Monday-Friday'
        //         // No license
        //     }
        // ];

        // for (const profile of doctorProfiles) {
        //     const createDoctorProfile = await axios.post(
        //         `${baseUrl}/doctor-dashboard/profile`,
        //         profile,
        //         { headers: { Authorization: `Bearer ${doctorToken}` } }
        //     );
        //     console.log('Doctor profile created:', createDoctorProfile.data);
        // }

        // Search doctors by specialization
        const searchDoctors = await axios.get(
            `${baseUrl}/search`,
            {
                params: { specialization: 'Cardiology' },
                headers: { Authorization: `Bearer ${userToken}` }
            }
        );
        console.log('Doctors matching specialization "Cardiology":', searchDoctors.data);

        const recommendations = await axios.get(`${baseUrl}/search/recommend`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('Doctor recommendations:', recommendations.data);
    } catch (error) {
        console.error('Error during tests:', error.response ? error.response.data : error.message);
    }
})();
