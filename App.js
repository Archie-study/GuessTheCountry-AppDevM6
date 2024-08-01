import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import HomeScreen from "./src/screens/HomeScreen";
import GuessTheCountryScreen from "./src/screens/GuessTheCountryScreen";


const App = () => {
  return (
    <SafeAreaProvider>
      <GuessTheCountryScreen />
    </SafeAreaProvider>
  )
}

export default App;