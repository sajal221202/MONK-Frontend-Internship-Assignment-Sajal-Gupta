# Sentence Builder

An interactive "Sentence Construction" tool built with React, TypeScript, and Tailwind CSS. This application presents users with incomplete sentences and a set of word options. Users must place these words in the correct blanks to complete the sentences.

## Features

- Interactive fill-in-the-blanks sentences
- 30-second timer for each question
- Responsive design for all screen sizes
- Option to unselect words by clicking on the filled blanks
- Auto-navigation to the next question when the timer ends
- Detailed feedback screen showing correct and incorrect answers
- Score calculation at the end of the quiz

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- JSON Server (for development data management)
- Vercel Serverless Functions (for production)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the JSON Server (for development):
   ```bash
   npm run json-server
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. Fill in the blanks with the correct words from the options provided
2. You have 30 seconds to answer each question
3. Click on a filled blank to remove your selection
4. Complete all 10 questions to see your score

## Deployment

### Local Build

To build the project for production locally:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploying to Vercel

The project is configured for deployment on Vercel with serverless functions to provide the question data:

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy the project:
   ```bash
   vercel
   ```

This will deploy both the front-end application and the serverless API that provides question data.

#### Key Configuration Files for Deployment

- `vercel.json` - Contains configuration for routing and serverless functions
- `api/data.js` - Serverless function that provides question data in production

## Troubleshooting

- **Development Mode**: If you see "Failed to load questions" in development mode, make sure your JSON Server is running on port 3001.
- **Production Deployment**: If you encounter 500 Internal Server Error on Vercel, check the function logs in the Vercel dashboard.
