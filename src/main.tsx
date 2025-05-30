import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot for React 18+

/**
 * Defines the functional component for our simple idle game.
 * `React.FC` is a type definition for functional components in TypeScript.
 */
const App: React.FC = () => {
  /**
   * `useState` hook is used to manage the 'coins' state.
   * It returns an array with the current state value (`coins`) and a function to update it (`setCoins`).
   * We explicitly type `useState` to `number` for clarity.
   */
  const [coins, setCoins] = useState<number>(0);

  /**
   * A constant for coins gained per click.
   * Explicitly typed as `number`.
   */
  const coinsPerClick: number = 1;

  /**
   * Event handler function for the button click.
   * `setCoins` is called with a function that receives the previous state (`prevCoins`)
   * and returns the new state. This is good practice for updates based on previous state.
   */
  const handleClick = () => {
    setCoins(prevCoins => prevCoins + coinsPerClick);
  };

  return (
    // The main container for the game, styled with Tailwind CSS for responsiveness and aesthetics.
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 text-white p-4">
      {/* Game content card with rounded corners, transparency, and shadow */}
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30 w-full max-w-md text-center">
        {/* Game title */}
        <h1 className="text-5xl font-bold mb-6 text-shadow-lg">React Idle Clicker</h1>
        {/* Coins display */}
        <p className="text-3xl mb-8">Coins: <span className="font-extrabold text-yellow-300">{coins}</span></p>
        {/* Click button */}
        <button
          onClick={handleClick} /* React uses camelCase for event handlers */
          className="bg-yellow-400 hover:bg-yellow-500 text-teal-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl"
        >
          Click for {coinsPerClick} Coin{coinsPerClick === 1 ? '' : 's'}
        </button>
      </div>
    </div>
  );
};

// Get the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');

// Check if the root element exists to prevent errors.
if (rootElement) {
  // Create a React root using ReactDOM.createRoot (for React 18+ concurrent mode features).
  const root = ReactDOM.createRoot(rootElement);
  // Render the `App` component into the root.
  // `React.StrictMode` is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found, which would prevent the app from loading.
  console.error('Root element not found! Make sure your index.html has a div with id="root".');
}