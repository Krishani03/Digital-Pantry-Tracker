import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in!");
    } catch {
      Alert.alert("Error", "Login failed");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}