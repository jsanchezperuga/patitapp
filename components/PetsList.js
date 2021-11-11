import React, { useState } from 'react'
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemTitle, textColor]}>
      <Image source={{ uri: item.image }} style={{ width: 25, height: 25 }} />
      {item.title.trim().length > 30 ? item.title.trim().slice(0, 30).trim() + "..." : item.title}
    </Text>
  </TouchableOpacity>
);

export default function PetsList({ pets, title }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 17,
  },
  title: {
    fontSize: 32,
    fontWeight: '700'
  }
});