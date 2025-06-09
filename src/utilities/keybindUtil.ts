import game from '../setup';

export const handleGlobalKeyPress = (event: { key: string; }) => {
    if (event.key === 'm' || event.key === 'M') {
        // console.log('Global "A" key pressed!');
        game.buyMax();
        // Prevent default browser behavior if needed, e.g., if 'A' is part of a shortcut
        // event.preventDefault();
    }
    // You can add more conditions for other keys here
    if (event.key === 'Escape') {
        console.log('Escape key pressed globally!');
    }
};