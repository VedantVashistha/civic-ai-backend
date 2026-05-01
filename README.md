# 🚀 Civic AI Backend

AI-powered backend for classifying civic issues by severity and expected resolution time.

---

## 🔧 Tech Stack

* Node.js
* Express.js
* Google Gemini API
* Render (deployment)

---

## 📌 Features

* Classifies civic issues into:

  * Low
  * Medium
  * High
  * Critical
* Predicts expected resolution time (in hours)
* REST API endpoint for integration with Android app

---

## 📡 API Endpoint

### POST `/analyze`

#### Request Body

```json
{
  "description": "Gas leak in building basement"
}
```

#### Response

```json
{
  "severity": "Critical",
  "hours": 1
}
```

---

## ⚙️ Setup (Local)

### 1. Clone repo

```bash
git clone https://github.com/your-username/civic-ai-backend.git
cd civic-ai-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Run server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## ☁️ Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set:

   * Build Command: `npm install`
   * Start Command: `npm start`
4. Add Environment Variable:

   ```
   GEMINI_API_KEY=your_api_key
   ```

---

## 🔗 Example cURL

```bash
curl -X POST http://localhost:5000/analyze \
-H "Content-Type: application/json" \
-d '{"description":"electric pole sparking"}'
```

---

## 📱 Integration

Used in CivicTrack Android app to:

* Analyze issue severity before saving
* Improve prioritization of civic complaints

---

## ⚠️ Notes

* Render free tier may have cold start delay (~20–30 sec)
* Ensure valid JSON response handling on client side

---

## 👨‍💻 Author

Vedant Vashistha
