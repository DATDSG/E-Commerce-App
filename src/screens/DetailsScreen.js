import React from "react";
import { View, Text, Image, ScrollView, Button } from "react-native";
import useStore from "../store/store";

const DetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const { addToCart } = useStore();

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-center text-red-500 text-xl mb-4">
          Product not found!
        </Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          color="#1D4ED8"
        />
      </View>
    );
  }

  return (
    <ScrollView className="p-5 bg-white">
      <Image
        source={{ uri: product.mainImage }}
        className="w-full h-72 rounded-lg mb-5"
        resizeMode="cover"
        accessibilityLabel={`${product.name} image`}
      />
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        {product.name}
      </Text>
      <Text className="text-xl text-gray-600 mb-2">
        {product.price.amount} {product.price.currency}
      </Text>
      <Text className="text-base text-gray-700 mb-4">
        {product.description}
      </Text>
      <Button
        title="Add to Cart"
        onPress={() => addToCart(product)}
        color="#1D4ED8"
        accessibilityLabel={`Add ${product.name} to cart`}
      />
    </ScrollView>
  );
};

export default DetailsScreen;
