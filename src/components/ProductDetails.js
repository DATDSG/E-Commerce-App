import React from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";
import useStore from "../store/store";
import { tw } from "nativewind";

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <View style={tw`flex-1 justify-center items-center p-5`}>
        <Text style={tw`text-center text-red-500 text-xl mb-4`}>
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
    <ScrollView style={tw`p-5 bg-white`}>
      <Image
        source={{ uri: product.mainImage }}
        style={tw`w-full h-72 rounded-lg mb-5`}
        resizeMode="cover"
        accessibilityLabel={`${product.name} image`}
      />
      <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
        {product.name}
      </Text>
      <Text style={tw`text-xl text-gray-600 mb-2`}>
        {product.price.amount} {product.price.currency}
      </Text>
      <Text style={tw`text-base text-gray-700 mb-4`}>
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

export default ProductDetails;
