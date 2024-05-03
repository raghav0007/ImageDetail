import React from "react";
import {

} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Main from "../screens/Main";
import Details from "../screens/Details";

const Stack = createStackNavigator();

export function StackNavigator(){
    return(

    <Stack.Navigator
    screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Details" component={Details}/>
    </Stack.Navigator>
    )

}