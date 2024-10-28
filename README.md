# Quiz App

A responsive quiz application built with React that allows users to select a topic, answer questions, and track their progress and score in real-time. The app includes a timer for each question and saves the user's high score.

## Features

- **Dynamic Topic Selection**: Users can choose a quiz topic, which dynamically loads questions for the selected topic from an external API.
- **Timer**: A countdown timer is implemented for each question, with the quiz ending if the timer reaches zero.
- **State Management**: `useReducer` is used for handling complex application state changes.
- **Responsive Design**: Styled with pure CSS for a responsive and visually appealing interface.
- **Error Handling**: Handles API errors gracefully by showing an error message if questions cannot be fetched.

## Components

- **App**: Root component that initializes state, handles data fetching, and manages the main application flow.
- **Header**: Displays the header content of the app.
- **Main**: Wraps the main content of the app.
- **Loader**: A loading spinner displayed while fetching data.
- **Error**: Displays an error message when data fetching fails.
- **StartScreen**: Initial screen where users can select a topic to start the quiz.
- **Question**: Displays each question along with answer options.
- **NextQuestion**: Button for moving to the next question.
- **Progress**: Shows the current progress of the quiz, including points and remaining questions.
- **FinishedScreen**: Final screen displaying the user’s score and high score.
- **Timer**: Countdown timer for each question.
- **Footer**: Contains the timer and next question components.

## State Management

The app uses a `useReducer` hook with the following actions:

- `dataReceived`: Updates the state when questions are successfully fetched.
- `dataFailed`: Updates the state when fetching data fails.
- `start`: Starts the quiz, initializing the countdown.
- `newAnswer`: Updates the state when a user submits an answer.
- `nextQuestion`: Moves to the next question in the quiz.
- `finish`: Ends the quiz, updating the high score if applicable.
- `restart`: Resets the quiz state for a new game.
- `tick`: Decrements the timer countdown.
- `selectTopic`: Sets the selected quiz topic and triggers data fetching.

## API Integration

Questions are fetched from an API based on the selected topic:

```javascript
fetch(`https://questions-1.onrender.com/${selectedTopic}`);
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Deployment

For deployment, build the application:

```bash
npm run build
```

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Pure CSS**: Used for styling without any CSS frameworks.
- **Fetch API**: Used to retrieve questions from an external API.

## License

This project is licensed under the MIT License.

## Author

Developed by [Faisal Al-Thuwaini](https://www.linkedin.com/in/faisal-al-thuwaini/).
