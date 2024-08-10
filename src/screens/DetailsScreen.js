import React from "react";
import { View, Text, Image, ScrollView, Button } from "react-native";
import { tw } from "nativewind";
import useStore from "../store/store";

const DetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useStore();

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-white`}>
      <Image
        source={{ uri: product.mainImage }}
        style={tw`w-full h-72 rounded-lg mb-4`}
      />
      <Text style={tw`text-3xl font-bold text-gray-900 mb-2`}>
        {product.name}
      </Text>
      {product.brandName && (
        <Text style={tw`text-lg text-gray-600 mb-4`}>
          Brand: {product.brandName}
        </Text>
      )}
      <Text style={tw`text-2xl font-bold text-green-600 mb-2`}>
        {product.price.amount} {product.price.currency}
      </Text>
      <Text style={tw`text-base text-gray-800 mb-4`}>
        {product.description}
      </Text>
      {product.sizes.length > 0 && (
        <Text style={tw`text-sm text-gray-700 mb-4`}>
          Available Sizes: {product.sizes.join(", ")}
        </Text>
      )}
      <Text
        style={tw`text-base font-semibold ${
          product.stockStatus === "IN STOCK" ? "text-green-500" : "text-red-500"
        } mb-4`}
      >
        {product.stockStatus === "IN STOCK" ? "In Stock" : "Out of Stock"}
      </Text>
      <Button
        title="Add to Cart"
        onPress={() => {
          addToCart(product);
          navigation.navigate("Cart");
        }}
        disabled={product.stockStatus !== "IN STOCK"}
        accessibilityLabel="Add product to cart"
      />
    </ScrollView>
  );
};

export default DetailsScreen;
