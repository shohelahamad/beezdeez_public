import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ContactListItem from "../ContactListItem/ContactListItem";

const contactList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.userContacts}
      renderItem={(info) => (
        <ContactListItem
          firstName={info.item.firstName}
          lastName={info.item.lastName}
          companyName={info.item.companyName}
          mobileNumber={info.item.mobileNumber}
          email={info.item.email}
          address={info.item.address}
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

export default contactList;
