import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather,MaterialIcons,Ionicons,FontAwesome5  } from '@expo/vector-icons';
import AuthScreen from '../screen/AuthFlow/AuthScreen'
import TopicSelectionPage from '../screen/AuthFlow/TopicSelectionScreen';
import HomeScreen from '../screen/MainFlow/HomeScreen';
import ProfileScreen from '../screen/MainFlow/ProfileScreen';
import { colors } from '../Constants/theme';

const AuthStack = createStackNavigator();

const MyAuth =()=> {
  return (
    <AuthStack.Navigator  screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="AuthScreen" component={AuthScreen} /> 
    <AuthStack.Screen name="TopicSelection" component={TopicSelectionPage} /> 
    </AuthStack.Navigator>
  );
}





const Tab = createMaterialBottomTabNavigator()

const BottomStack = () => {
    
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primary}
        barStyle={{ backgroundColor: colors.navBarBackground }}
        shifting={true}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );

}

const MainStack = createStackNavigator();



const FlowStack = createStackNavigator()
const AppNav = () => {
    return(
        <NavigationContainer>
            <FlowStack.Navigator screenOptions={{headerShown:false}}>
            <FlowStack.Screen name='Auth' component={MyAuth}  />
            <FlowStack.Screen name='Main' component={BottomStack}  />
            </FlowStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNav