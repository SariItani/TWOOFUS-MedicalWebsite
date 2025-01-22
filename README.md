Hello, in order to run the application:
Ensure to change your credentials in an .env file, they should include:

DOMAIN= # hostname
PORT= # main port for the application
PyPORT= # port for python ai models backend
CHAT= # port for chatrooms
MONGO_URI= # connection string (you will have to create a new cluster on mongo db and get its connection string)
JWT_SECRET= # a bunch of random characters like my_super_secret_jwt_key_12345
EMAIL_USER= # admin email
EMAIL_PASS= # admin email app password (get it from google applications from your google account)

Run the python backend, open a terminal in the same location as "diagnosis_api.py" and run:
`uvicorn diagnosis_api:app --host 0.0.0.0 --port <PyPORT> --reload`

When it's fully loaded, you can run the main script:
`node server.js`
which loads both the backend API services and the React frontend on the same port and host, but all api services start like this instead to avoid clashing: <DOMAIN>/<PORT>/api/...

Navigate to http://localhost:5000 and enjoy :)
