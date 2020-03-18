import React from "react";
import { StyleSheet, FlatList } from "react-native";

import LabelListItem from "../LabelListItem/LabelListItem";

const labelList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.labels}
      renderItem={(info) => (
        <LabelListItem
        labelTitle={info.item.labelTitle}
        labelColor={info.item.labelColor}
        onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    marginTop: 10
  }
});

export default labelList;
