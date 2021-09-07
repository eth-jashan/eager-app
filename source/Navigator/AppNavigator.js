import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather,MaterialIcons,Ionicons  } from '@expo/vector-icons';
import AuthScreen from '../screen/AuthFlow/AuthScreen'
import TopicSelectionPage from '../screen/AuthFlow/TopicSelectionScreen';

const AuthStack = createStackNavigator();

const MyAuth =()=> {
  return (
    <AuthStack.Navigator  screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="Login" component={AuthScreen} /> 
    <AuthStack.Screen name="TopicSelection" component={TopicSelectionPage} /> 
    </AuthStack.Navigator>
  );
}





const Tab = createMaterialBottomTabNavigator()

const BottomStack = () => {
    
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#08818a"
          barStyle={{ backgroundColor: 'white' }}
          shifting={true}
          screenOptions={{headerShown:false}}

        >
          {/* <Tab.Screen
            
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="PosStats"
            component={PosStats}
            options={{
              tabBarLabel: 'Stats',
              tabBarIcon: ({ color }) => (
              <View>                
                <Entypo name="area-graph" size={24} color={color} />
              </View>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
              <View>                
                <Ionicons name="person-circle-outline" size={24} color={color} />
              </View>
              ),
            }}
          /> */}
        </Tab.Navigator>)

}

const MainStack = createStackNavigator();

const MainComp = () => {

  return(
    <MainStack.Navigator screenOptions={{headerShown:false}}>
      <MainStack.Screen name='TopicSelection' component={TopicSelectionPage}  />
    </MainStack.Navigator>
  )

} 


const FlowStack = createStackNavigator()
const AppNav = () => {
    return(
        <NavigationContainer>
            <FlowStack.Navigator screenOptions={{headerShown:false}}>
            <FlowStack.Screen name='Auth' component={MyAuth}  />
            <FlowStack.Screen name='Main' component={MainComp}  />
            </FlowStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNav