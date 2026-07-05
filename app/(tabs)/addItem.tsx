import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addItem } from '../../service/pantryService';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = async () => {
    try {
      await addItem(name, parseInt(quantity), 'g');
      Alert.alert("Success", "Item added to pantry!");
    } catch (error) {
      Alert.alert("Error", "Could not add item");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <TextInput placeholder="Item Name" onChangeText={setName} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Quantity (g)" keyboardType="numeric" onChangeText={setQuantity} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Add to Pantry" onPress={handleAdd} />
    </View>
  );
}