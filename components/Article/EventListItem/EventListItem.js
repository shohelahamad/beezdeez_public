import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EventListItem = props => {
    console.log(props.image_info)
    let ImageView = (
        <View></View>
      );
      if (JSON.parse(props.image_info).length>0) {
        ImageView = 
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 10
            }}
            resizeMode="cover"
            source={{ uri: JSON.parse(props.image_info)[0].orig }}
            />
        </View>
      }
  return (
    <TouchableOpacity onPress={props.onViewDetail} style={{}}>
    <View style={styles.listItem}>
        <View style={styles.row}>
            <View style={{ width: "100%", flexDirection: "column" }}>
                <View style={styles.row}>
                    <Text style={{ color: "#969696" , marginTop: 10}}>{props.header}</Text>
                </View>
                <View style={styles.row}>
                    <View style={{width: '80%', overflow: 'hidden'}}>
                        <Text style={{ marginTop: 10, fontSize: 25 }}>{props.title} </Text>
                    </View>
                    <View style={{width: '20%', height: 80}}>
                        {ImageView}
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <View style={{ width: "100%", flexDirection: "row", marginTop: 10, justifyContent: 'space-between' }}>
            <View style={{flexDirection: "row", overflow: 'hidden'}}>
                    {/* <Text style={{ color: "#969696" }}>{props.kind} </Text> */}
                    <Ionicons style={{ marginRight: 5}} name={"md-list"} color={"#969696"} size={15} />
                    <Text numberOfLines={1} style={{ color: "#969696" }}>{props.sub_title} </Text>
                </View>
                <View style={{flexDirection: "row" }}>
                <MaterialIcons style={{ marginRight: 5, marginLeft: 5 }} name={"more-horiz"} color={"#000000"} size={20} />
                </View>
            </View>
        </View>
    </View>
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
        width: "95%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: "2.5%",
        marginBottom: 2,
        borderColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: 'gray',
        marginTop: 10,
        shadowColor: '#969696',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    row: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: "space-between",
    }
});
export default EventListItem;
