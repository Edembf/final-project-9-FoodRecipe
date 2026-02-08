import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { toggleFavorite } from "../redux/favoritesSlice"; // Adjust the path according to your structure

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // Retrieve recipe via route parameters
  const { recipe, index } = route.params || {};

  // Access favorites in Redux (assuming the slice is called 'favorites')
  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);
  
  // Check if recipe is already a favorite
  const isFavorite = recipe ? favoriteRecipes.includes(recipe.idCategory) : false;

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>No recipe details available</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe.idCategory));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Section */}
      <View testID="imageContainer">
        <Image
          source={{ uri: recipe.image }}
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) }
          ]}
        />
      </View>

      {/* Top Buttons */}
      <View style={styles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Details */}
      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        
        <View style={styles.descriptionWrapper}>
          <Text style={styles.contentLabel}>Content</Text>
          <Text style={styles.recipeDescription}>
            {recipe.description || "No description provided."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  articleImage: {
    width: wp(100),
    resizeMode: "cover",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#4F75FF",
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: hp(3),
    color: "#EF4444",
  },
  contentContainer: {
    padding: wp(4),
    marginTop: -hp(2),
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#111827",
    marginBottom: hp(2),
  },
  descriptionWrapper: {
    marginTop: hp(1),
  },
  contentLabel: {
    fontSize: hp(2.2),
    fontWeight: "700",
    color: "#374151",
    marginBottom: hp(1),
  },
  recipeDescription: {
    fontSize: hp(1.9),
    color: "#6B7280",
    lineHeight: hp(2.5),
  },
});