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





// const Tab = createMaterialBottomTabNavigator()

// const BottomStack = () => {
    
//     return (
//         <Tab.Navigator
//           initialRouteName="Home"
//           activeColor="#08818a"
//           barStyle={{ backgroundColor: 'white' }}
//           shifting={true}
//           screenOptions={{headerShown:false}}

//         >
//           <Tab.Screen
            
//             name="Home"
//             component={HomeScreen}
//             options={{
//               tabBarLabel: 'Home',
//               tabBarIcon: ({ color }) => (
//                 <Entypo name="home" size={24} color={color} />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="PosStats"
//             component={PosStats}
//             options={{
//               tabBarLabel: 'Stats',
//               tabBarIcon: ({ color }) => (
//               <View>                
//                 <Entypo name="area-graph" size={24} color={color} />
//               </View>
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{
//               tabBarLabel: 'Profile',
//               tabBarIcon: ({ color }) => (
//               <View>                
//                 <Ionicons name="person-circle-outline" size={24} color={color} />
//               </View>
//               ),
//             }}
//           />
//         </Tab.Navigator>)

// }

// const MainStack = createStackNavigator();

// const MainComp = () => {

//   return(
//     <MainStack.Navigator screenOptions={{headerShown:false}}>
//       <MainStack.Screen name='Home' component={BottomStack} />
//       <MainStack.Screen name='Kyc' component={KycScreen} />
//       <MainStack.Screen name='DishListScreen' component={DishListScreen} />
//       <MainStack.Screen name='CategoryListScreen' component={CategoryListScreen}/>
//       <MainStack.Screen name="DishUpload" component={DishUploadScreen}/>
//       <MainStack.Screen name="MenuCreation" component = {CategoryUpload}/>
//       <MainStack.Screen name='BannerScreen' component={BannerScreen} />
//       <MainStack.Screen name="BannerUpload" component = {BannerUploading}/>
//       <MainStack.Screen name="Orders" component = {OrderScreen}/>
//     </MainStack.Navigator>
//   )

// } 


const FlowStack = createStackNavigator()
const AppNav = () => {
    return(
        <NavigationContainer>
            <FlowStack.Navigator screenOptions={{headerShown:false}}>
            <FlowStack.Screen name='Auth' component={MyAuth}  />
            </FlowStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNav