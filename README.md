# StreamSentry



<!-- activate virtual environment -->
source venv/Scripts/activate

uvicorn server:app --reload

uvicorn server:app --reload --log-level debug


python3 -m pip install uvicorn socketio fastapi

<!-- web server -->

npm init
npm install cors express socket-io-client
npm i socket.io --save
