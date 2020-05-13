import React from "react";
import { StyleSheet, FlatList,View,Text } from "react-native";

import ArticleListItem from "../ArticleListItem/ArticleListItem";

const ArticleList = props => {
  return (
          <FlatList
            onViewDetail={() => {
              console.log(props)
              // props.navigation.navigate({ routeName: 'ProductDetail example chaged '});
                props.navigation.navigate('ProductDetail',{ 
                  productId: itemdata.item.id,
                  productTitle: itemdata.item.title
                });
              }}
            style={styles.listContainer}
            data={props.articles}
            renderItem={(info) => (
            <ArticleListItem
            articleId={info.item.id}
            articleTitle={info.item.title}
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

export default ArticleList;
