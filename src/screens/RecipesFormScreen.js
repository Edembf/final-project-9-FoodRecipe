import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  // Have Change: Match the parameter names sent from MyRecipeScreen (recipe and index)
  const { recipe, index } = route.params || {}; 
  
  // Have Change: Use the correct variable 'recipe' to initialize states
  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [image, setImage] = useState(recipe ? recipe.image : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );

  const saverecipe = async () => {
    const newRecipe = { title, image, description };
    try {
      const storedRecipes = await AsyncStorage.getItem("customrecipes");
      const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

      // Have Change: Use 'index' and 'recipe' to check if we are in edit mode
      if (recipe !== undefined && index !== undefined) {
        // Edit mode: replace the recipe at the specific index
        recipes[index] = newRecipe;
      } else {
        // Add mode: push new recipe to array
        recipes.push(newRecipe);
      }

      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});