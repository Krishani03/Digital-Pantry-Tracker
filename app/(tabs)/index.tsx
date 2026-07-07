import { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchItems, deletePantryItem } from '../../store/pantrySlice';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.pantry);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deletePantryItem(id));
    Alert.alert("Deleted", "Item removed from pantry");
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Pantry Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 15, 
            borderBottomWidth: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            backgroundColor: item.quantity < 100 ? '#FFF0F0' : '#FFFFFF' 
          }}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.quantity} {item.unit}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}