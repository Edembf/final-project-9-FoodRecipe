import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  // Render function for each list item
  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          // Safety: pass an empty array if foods is null/undefined
          data={foods || []}
          renderItem={renderItem}
          // Safety for key: uses id or index as fallback
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[
        styles.cardContainer, 
        { 
          // Adjust margins so columns are centered
          paddingLeft: index % 2 === 0 ? 0 : 7, 
          paddingRight: index % 2 === 0 ? 7 : 0 
        }
      ]} 
      testID="articleDisplay"
    >
      <TouchableOpacity 
        style={styles.clickableArea}
        onPress={() => navigation.navigate("RecipeDetail", { food: item })}
      >
        {/* Recipe image with defined height */}
        <Image 
          source={{ uri: item.recipeImage }} 
          style={styles.articleImage} 
        />
        
        {/* Recipe name */}
        <Text style={styles.articleText} numberOfLines={1}>
          {item.recipeName}
        </Text>
        
        {/* Recipe description */}
        <Text style={styles.articleDescription} numberOfLines={1}>
          {item.cookingDescription}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp(2),
  },
  clickableArea: {
    width: '100%',
  },
  articleImage: {
    width: "100%",
    height: hp(20), // Height necessary for displaying remote images
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(1.7),
    fontWeight: "600",
    color: "#52525B",
    marginLeft: wp(2),
    marginTop: hp(0.8),
  },
  articleDescription: {
    fontSize: hp(1.3),
    color: "#8b8b8b",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between",
  },
});