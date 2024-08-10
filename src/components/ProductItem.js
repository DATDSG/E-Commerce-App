import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { tw } from "nativewind";

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`mb-4 border border-gray-300 p-4 rounded-lg bg-white shadow-sm`}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${product.brandName}, priced at ${product.price.amount} ${product.price.currency}`}
    >
      <Image
        source={{ uri: product.mainImage }}
        style={tw`w-full h-40 rounded-lg`}
        resizeMode="cover"
        accessibilityLabel={`${product.name} image`}
      />
      <View style={tw`mt-2`}>
        <Text style={tw`text-lg font-semibold text-gray-900`}>
          {product.name}
        </Text>
        {product.brandName && (
          <Text style={tw`text-sm text-gray-600`}>{product.brandName}</Text>
        )}
        <Text style={tw`text-lg font-bold mt-1 text-gray-800`}>
          {product.price.amount} {product.price.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
