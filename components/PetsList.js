import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import PostInfo from './PostInfo';

function Item({ item, onPress, backgroundColor, textColor, setVisible, setPost }) {
  const openModal = () => {
    onPress();
    setVisible(true);
    setPost(
      <PostInfo {...item} setVisible={setVisible} />
    );
  }

  return (
    <TouchableOpacity onPress={openModal} style={[styles.item, backgroundColor]}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />
      <Text style={[styles.itemTitle, textColor]}>
        {item.title.trim().length > 30 ? item.title.trim().slice(0, 30).trim() + "..." : item.title}
      </Text>
    </TouchableOpacity>
  )
};

export default function PetsList({ pets, title, setVisible, setPost }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#94cfe0" : "#94cfe0";
    const color = item.id === selectedId ? 'black' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        setVisible={setVisible}
        setPost={setPost}
        key={item.id}
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
        extraData={selectedId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent:'center',
  },
  item: {
    flex: 1,
    flexDirection:'row',
    padding: 5,
    alignItems:'flex-end',
    marginVertical: 1,
    marginHorizontal: 16,
    borderRadius: 5,

  },
  itemTitle: {
    fontSize: 17,
    marginLeft:10,
    marginBottom:5,
  },
  title: {
    marginLeft:15,
    fontSize: 32,
    fontWeight: '700'
  },
  itemImg:{
    width: 75,
    height:75,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#f7f7f7',
  }
});
