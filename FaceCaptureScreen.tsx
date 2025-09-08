import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FaceCapture'>;

interface FaceData {
  timestamp: string;
  confidence: number;
  features: string;
  liveness: string;
}

export default function FaceCaptureScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [isFaceCaptured, setIsFaceCaptured] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [statusText, setStatusText] = useState('Ready to capture facial biometrics');
  const [verificationStatus, setVerificationStatus] = useState('Pending facial scan');
  const [faceData, setFaceData] = useState<FaceData | null>(null);
  const progress = useRef(new Animated.Value(0)).current;

  const startProgressAnimation = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const initiateFaceCapture = () => {
    setStatusText('Camera activated - Position your face');
    setVerificationStatus('Capturing face...');
    setTimeout(() => {
      setIsFaceCaptured(true);
      captureFace();
    }, 1000);
  };

  const captureFace = () => {
    setStatusText('Processing facial biometric data...');
    setVerificationStatus('Analyzing biometric features...');
    startProgressAnimation();

    setTimeout(() => {
      const confidence = Math.floor(Math.random() * 30) + 70;

      setFaceData({
        timestamp: new Date().toISOString(),
        confidence,
        features: '128-point analysis complete',
        liveness: 'verified',
      });

      setIsFaceCaptured(true);
      setStatusText('Facial biometrics captured successfully');
      setVerificationStatus('Face captured - Ready for verification');
    }, 3000);
  };

  const verifyBiometrics = () => {
    if (!isFaceCaptured) {
      Alert.alert('Error', 'Please capture facial biometrics first.');
      return;
    }

    setStatusText('Verifying biometric match...');
    setVerificationStatus('Verifying...');

    setTimeout(() => {
      const matchResult = Math.random() > 0.1;
      if (matchResult) {
        setIsVerified(true);
        setStatusText('Biometric match verified');
        setVerificationStatus('Verified - High confidence match');
        Alert.alert('Success', 'Biometric verification successful.');
      } else {
        setIsVerified(false);
        setStatusText('Verification failed');
        setVerificationStatus('Failed - Low confidence match');
        Alert.alert('Failure', 'Biometric verification failed. Please try again.');
      }
    }, 2000);
  };

  const saveFaceData = () => {
    if (!isVerified) {
      Alert.alert('Error', 'Please verify biometrics before saving.');
      return;
    }

    setStatusText('Saving facial biometric data...');
    setTimeout(() => {
      setStatusText('Face data saved successfully');
      Alert.alert('Saved', 'Facial biometric data encrypted and saved.');
      navigation.navigate('IDInfo');
    }, 1500);
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.facePreview} onPress={initiateFaceCapture}>
        {!isFaceCaptured ? (
          <>
            <FontAwesome5 name="camera" size={48} color="#131514" style={{ marginBottom: 15 }} />
            <Text style={styles.scanText}>Tap to Capture Face</Text>
          </>
        ) : (
          <Image
            source={{ uri: 'https://placehold.co/400x300/2563eb/FFFFFF?text=FACE+CAPTURED' }}
            style={styles.capturedFace}
          />
        )}
      </TouchableOpacity>

      <View style={styles.progressBar}>
        <Animated.View style={[styles.progress, { width: progressWidth }]} />
      </View>

      {faceData && (
        <View style={styles.faceData}>
          <Text style={styles.faceDataTitle}>Biometric Data:</Text>
          <Text>Confidence: {faceData.confidence}%</Text>
          <Text>Features: {faceData.features}</Text>
          <Text>Liveness: {faceData.liveness}</Text>
        </View>
      )}

      <Text style={styles.status}>{statusText}</Text>
      <Text style={styles.status}>{verificationStatus}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={verifyBiometrics} disabled={!isFaceCaptured}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveFaceData} disabled={!isVerified}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfdffff',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  facePreview: {
    height: 250,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#131514',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanText: {
    fontSize: 18,
    fontWeight: '600',
  },
  capturedFace: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progress: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  faceData: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  faceDataTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  status: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#1e293b',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
