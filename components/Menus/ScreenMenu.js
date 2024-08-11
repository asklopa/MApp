import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import HeaderMenu from "./HeaderMenu";
import Details from "../../screens/Details";
import Search from "../../screens/Search";

const ScreenMenu = () => {

  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName="">
      
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Netflix App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      
    </Stack.Navigator>
  );
};

export default ScreenMenu;