import React from "react";
import { StyleSheet, FlatList } from "react-native";

import NoteListItem from "../NoteListItem/NoteListItem";

const noteList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.notes}
      renderItem={(info) => (
        <NoteListItem
        noteHeading={info.item.noteHeading}
        noteDescribtion={info.item.noteDescribtion}
        catagory={info.item.catagory}
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

export default noteList;
