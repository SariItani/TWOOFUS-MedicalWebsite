#!/bin/zsh

# Define the directory structure
dirs=(
    "src/components/Auth"
    "src/components/Chat"
    "src/pages"
    "src/services"
    "src/utils"
    "src/styles"
)

# Define the files to create
files=(
    "src/components/Auth/Login.js"
    "src/components/Auth/Signup.js"
    "src/components/Auth/AuthForm.css"
    "src/components/Navbar.js"
    "src/components/Footer.js"
    "src/components/Chat/ChatWindow.js"
    "src/components/Chat/ChatMessage.js"
    "src/components/Chat/ChatInput.js"
    "src/pages/Home.js"
    "src/pages/Dashboard.js"
    "src/pages/Profile.js"
    "src/pages/Diagnosis.js"
    "src/pages/Search.js"
    "src/pages/DoctorDashboard.js"
    "src/pages/NotFound.js"
    "src/services/api.js"
    "src/services/auth.js"
    "src/utils/validations.js"
    "src/utils/formatDate.js"
    "src/utils/constants.js"
    "src/styles/index.css"
    "src/styles/variables.css"
    "src/styles/theme.css"
    "src/App.js"
    "src/index.js"
    "src/reportWebVitals.js"
    "src/setupTests.js"
)

# Create directories
for dir in "${dirs[@]}"; do
    mkdir -p "$dir"
done

# Create files
for file in "${files[@]}"; do
    touch "$file"
done

echo "Directory structure and files created successfully."
