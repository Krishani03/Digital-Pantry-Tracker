import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getAllItems } from '../../service/pantryService';

export default function HomeScreen() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await getAllItems();
      setItems(data);
    };
    loadItems();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Pantry Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name} - {item.quantity} {item.unit}</Text>
          </View>
        )}
      />
    </View>
  );
}