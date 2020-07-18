import React from 'react';
import './App.css';
import MapScreen from './ui/modules/pages/MapScreen';
const ThemeContext = React.createContext('light');

function App() {
    return ( <ThemeContext.Provider value = "dark" >
        <MapScreen />
        </ThemeContext.Provider>
    );
}

export default App;