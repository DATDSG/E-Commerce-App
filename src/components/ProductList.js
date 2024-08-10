import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { tw } from "nativewind";

const ProductList = ({ products, navigation }) => {
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={tw`p-4 bg-white mb-4 rounded-lg flex-row items-center`}
      onPress={() => navigation.navigate("Details", { product: item })}
    >
      <Image
        source={{ uri: item.mainImage }}
        style={tw`w-16 h-16 rounded-lg mr-4`}
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold text-gray-800`}>{item.name}</Text>
        <Text style={tw`text-base text-gray-600`}>
          {item.price.amount} {item.price.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={tw`p-4`}
    />
  );
};

export default ProductList;
