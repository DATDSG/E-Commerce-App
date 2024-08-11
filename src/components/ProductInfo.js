import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useStore from "../store/store";

const ProductInfo = ({ route, navigation }) => {
  const { productId } = route.params;
  const { products, fetchProducts, addToCart } = useStore((state) => ({
    products: state.products,
    fetchProducts: state.fetchProducts,
    addToCart: state.addToCart,
  }));

  // Fetch products if they are not loaded yet
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product = products.find((p) => p.id === productId);

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
    <View className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Text className="text-blue-500">Back</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: product.mainImage }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </Text>
        <Text className="text-xl text-gray-700 mb-2">
          {product.brandName || "Unknown Brand"}
        </Text>
        <Text className="text-lg font-bold text-green-600 mb-2">
          {product.price.amount} {product.price.currency}
        </Text>
        <Text className="text-base text-gray-800 mb-4">
          {product.description}
        </Text>
        {product.sizes.length > 0 && (
          <Text className="text-sm text-gray-700 mb-4">
            Available Sizes: {product.sizes.join(", ")}
          </Text>
        )}
        <Text
          className={`text-base font-semibold mb-4 ${
            product.stockStatus === "IN STOCK"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {product.stockStatus === "IN STOCK" ? "In Stock" : "Out of Stock"}
        </Text>
        <Button
          title="Add to Cart"
          onPress={() => {
            addToCart(product);
            navigation.navigate("Cart");
          }}
          color="#1D4ED8"
          disabled={product.stockStatus !== "IN STOCK"}
        />
      </ScrollView>
    </View>
  );
};

export default ProductInfo;
