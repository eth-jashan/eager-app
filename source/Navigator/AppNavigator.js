import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  Entypo,
  Feather,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AuthScreen from '../screen/AuthFlow/AuthScreen'
import TopicSelectionPage from '../screen/AuthFlow/TopicSelectionScreen';
import HomeScreen from '../screen/MainFlow/HomeScreen';
import ProfileScreen from '../screen/MainFlow/ProfileScreen';
import CollectionScreen from '../screen/MainFlow/CollectionScreen';
import { colors } from '../Constants/theme';
import Toast from 'react-native-toast-message';
import DetailScreenc from '../screen/MainFlow/DetailScreen';
import CommentScreen from '../screen/MainFlow/CommentScreen';
import SearchScreen from '../screen/MainFlow/SearchScreen';

const AuthStack = createStackNavigator();

const MyAuth =()=> {
  return (
    <AuthStack.Navigator  screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="AuthScreen" component={AuthScreen} /> 
    <AuthStack.Screen name="TopicSelection" component={TopicSelectionPage} /> 
    </AuthStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

const HomeNav =()=> {
  return (
    <HomeStack.Navigator initialRouteName={"BootomTab"}  screenOptions={{headerShown:false}}>
    <HomeStack.Screen name="BottomTab" component={BottomStack} />   
    <HomeStack.Screen name="DetailScreen" component={DetailScreenc} /> 
    <HomeStack.Screen name="CommentScreen" component={CommentScreen} />
    </HomeStack.Navigator>
  );
}



const Tab = createMaterialBottomTabNavigator()

const BottomStack = () => {
    
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primaryLight}
        barStyle={{
          backgroundColor: colors.secondary,
          borderTopWidth:0.3
        }}
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
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <Feather name="search" size={24} color={color} />
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
        <Tab.Screen
          name="Collection"
          component={CollectionScreen}
          options={{
            tabBarLabel: "Collection",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="collage" size={24} color={color} />
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
            {/* <FlowStack.Screen name='Auth' component={MyAuth}  /> */}
            <FlowStack.Screen name='Main' component={HomeNav}  />
            </FlowStack.Navigator>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
    )

}

export default AppNav