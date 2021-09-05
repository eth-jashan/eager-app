import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather,MaterialIcons,Ionicons  } from '@expo/vector-icons';
import AuthScreen from '../screen/AuthFlow/AuthScreen';

const AuthStack = createStackNavigator();

const MyAuth =()=> {
  return (
    <AuthStack.Navigator initialRouteName={"StartupScreen"} screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="StartupScreen" component={AuthScreen} /> 
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
      
    </MainStack.Navigator>
  )

} 


const FlowStack = createStackNavigator()
const AppNav = () => {
  const token = useSelector(x=>x.profile.token)
    return(
        <NavigationContainer>
            <FlowStack.Navigator screenOptions={{headerShown:false}}>
            <FlowStack.Screen name='Auth' component={MyAuth}  />
            </FlowStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNav