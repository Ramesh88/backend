# Fraud Detection Backend API

## Overview
This is the backend API for the Fraud Detection mobile application. It provides endpoints for analyzing calls, SMS, links, QR codes, and managing family protection features.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Call Analysis
- `POST /api/calls/analyze` - Analyze incoming call
  - Body: `{ phoneNumber, callerName }`
- `GET /api/calls/history` - Get call history
- `GET /api/calls/stats` - Get scam call statistics

### SMS Analysis
- `POST /api/sms/analyze` - Analyze SMS message
  - Body: `{ message, sender }`
- `GET /api/sms/history` - Get SMS history

### Link Safety
- `POST /api/links/analyze` - Analyze URL/Link
  - Body: `{ url }`
- `GET /api/links/phishing-domains` - Get known phishing domains

### QR Code Safety
- `POST /api/qr/analyze` - Analyze QR code
  - Body: `{ qrContent, imageData }`
- `POST /api/qr/verify-payment` - Verify GPay screenshot
  - Body: `{ imageData, amount, merchantName }`

### Family Protection
- `GET /api/family/members` - Get family members
- `POST /api/family/members` - Add family member
  - Body: `{ name, phone, relation, protectionLevel }`
- `GET /api/family/alerts/:memberId` - Get alerts for member
- `POST /api/family/sos` - Send SOS alert
  - Body: `{ memberId, type, details }`

### Education
- `GET /api/education/lessons` - Get all lessons
- `GET /api/education/lessons/:id` - Get specific lesson
- `GET /api/education/quiz/:lessonId` - Get quiz for lesson
- `POST /api/education/quiz/submit` - Submit quiz answers
  - Body: `{ quizId, answers }`
- `GET /api/education/stories` - Get fraud stories

## Current Implementation

### Phase 1 - Static JSON (Current)
All endpoints currently return static JSON data from the `data/` folder. This allows the frontend to be developed and tested without external API dependencies.

### Phase 2 - AI Integration (Future)
The following integrations are planned:

1. **Call Analysis**: OpenAI Whisper V3 + Audio API
2. **SMS Analysis**: GPT-5.1 with fine-tuned classifier
3. **Link Analysis**: GPT-5.1 Vision + URL analysis
4. **QR Code Analysis**: Vision models for tampering detection
5. **Payment Verification**: GPT-5.1 Vision for screenshot analysis
6. **Education**: OpenAI Realtime API for interactive learning

## Data Structure

### Static JSON Files
- `callData.json` - Scam call patterns and history
- `smsData.json` - Fraud SMS patterns and history
- `linkData.json` - Phishing indicators and domains
- `qrData.json` - QR fraud indicators and history
- `familyData.json` - Family protection data
- `educationData.json` - Lessons, quizzes, and stories

## Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:3000/api/health

# Analyze a call
curl -X POST http://localhost:3000/api/calls/analyze \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+91-9912345678","callerName":"Bank Officer"}'

# Analyze SMS
curl -X POST http://localhost:3000/api/sms/analyze \
  -H "Content-Type: application/json" \
  -d '{"message":"Your electricity will be cut. Pay now","sender":"EC-123456"}'
```

## License
MIT






