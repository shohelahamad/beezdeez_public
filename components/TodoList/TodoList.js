import React from "react";
import { StyleSheet, FlatList } from "react-native";

import TodoListItem from "../TodoListItem/TodoListItem";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.todos}
      renderItem={(info) => (
        <TodoListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          todoTitle={info.item.todoTitle}
          todoDescribtion={info.item.todoDescribtion}
          priority={info.item.priority}
          dueDate={info.item.dueDate}
          eventId={info.item.eventId}
          isDone={info.item.isDone}
          onItemPressed={() => props.onItemSelected(info.item.key)}
          onDoneTodo={() => props.onDoneSelected(info.item.key)}
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
