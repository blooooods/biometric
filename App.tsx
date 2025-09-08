import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';

export type RootStackParamList = {
  FaceCapture: undefined;
  IDInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ✅ Dummy screen for FaceCapture
function FaceCaptureScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Face Capture Screen</Text>
    </View>
  );
}

// ✅ Dummy screen for IDInfo
function IDInfoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ID Info Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FaceCapture">
        <Stack.Screen
          name="FaceCapture"
          component={FaceCaptureScreen}
          options={{ title: 'Facial Recognition' }}
        />
        <Stack.Screen
          name="IDInfo"
          component={IDInfoScreen}
          options={{ title: 'Credential Info' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
