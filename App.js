import React, { useState, useEffect } from 'react';

//-----Redux Setup--------//
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import ReduxThunk from 'redux-thunk'

//importing reducer
import postCreation from './store/reducer/postCreation';

//-----initialising reducer---//
const rootReducer = combineReducers({
  post:postCreation,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

//----Importing Navigator-----//


//-----Custom Font Setup-------//
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading"
import AppNav from './source/Navigator/AppNavigator';



const fontLoading = () =>{ 
  return Font.loadAsync({
    'black':require('./assets/fonts/Gilroy-Black.ttf'),
    'bold':require('./assets/fonts/Gilroy-Bold.ttf'),
    'extra-bold':require('./assets/fonts/Gilroy-ExtraBold.ttf'),
    'heavy':require('./assets/fonts/Gilroy-Heavy.ttf'),
    'light':require('./assets/fonts/Gilroy-Light.ttf'),
    'medium':require('./assets/fonts/Gilroy-Medium.ttf'),
    'regular': require('./assets/fonts/Gilroy-Regular.ttf'),
    'ultra-light': require('./assets/fonts/Gilroy-UltraLight.ttf'),
    'thin': require('./assets/fonts/Gilroy-Thin.ttf'),
    'semi-bold': require('./assets/fonts/Gilroy-SemiBold.ttf')
})}
//---------------------------------------//



export default function App({navigation}){

const[fontLoad, setFontLoad] = useState(false)

  if(!fontLoad)
      {
        return <AppLoading
        startAsync ={fontLoading}
        onFinish = {() => setFontLoad(true)}
        onError = {(test)=> console.log(test) }
        /> 
      }

  return<Provider store={store}><AppNav/></Provider>

}
