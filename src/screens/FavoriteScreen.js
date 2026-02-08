import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipesList = useSelector((state) => state.favorites.favoriterecipes);

  // Empty state
  if (!favoriteRecipesList || favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}> Favorites not yet !</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonEmpty}>
          <Text style={{color: "#ffffff" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View testID="favoriteRecipes">
        <Text style={styles.heading}>My Favorite Recipes</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonInline}>
        <Text style={styles.backButtonText}> Go Back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipesList}
        // NOTE: Using idFood here as it's your Redux key
        keyExtractor={(item) => item.idFood?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => navigation.navigate("RecipeDetail", { food: item })}
          >
            <Image 
              source={{ uri: item.recipeImage || item.image }} 
              style={styles.recipeImage} 
            />
            <View style={styles.textContainer}>
              <Text style={styles.recipeTitle}>
                {item.recipeName?.substring(0, 20) + (item.recipeName.length > 20 ? "..." : "")}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    height: hp(4),
    fontSize: hp(3.5),
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: hp(2),
    color: "#4B5563",
  },
  emptyContainer: {
    height: hp(100),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    height: hp(3),
    fontSize: hp(2.5),
    marginBottom: 20,
    color: "#6B7280",
  },
  backButtonEmpty: {
    height: hp(5),
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonInline: {
    height: hp(5),
    width: wp(10),
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 8,
    marginLeft: 60,
    marginVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    height: hp(2.5),
    fontSize: hp(2),
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(5),
  },
  cardContainer: {
    height: hp(40),
    backgroundColor: "white",
    marginBottom: hp(2),
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
  },
  recipeImage: {
    width: wp(25),
    height: hp(40),
    borderRadius: 10,
  },
  textContainer: {
    height: hp(12),
    flex: 1,
    paddingHorizontal: wp(4),
    justifyContent: "center",
  },
  recipeTitle: {
    height: hp(2.5),
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#1F2937",
  },
  recipeCategory: {
    height: hp(2),
    fontSize: hp(1.6),
    color: "#9CA3AF",
  },
});