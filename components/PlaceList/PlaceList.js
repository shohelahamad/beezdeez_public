import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.todos}
      renderItem={(info) => (
        <ListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          todoTitle={info.item.todoTitle}
          todoDescribtion={info.item.todoDescribtion}
          priority={info.item.priority}
          dueDate={info.item.dueDate}
          eventId={info.item.eventId}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
