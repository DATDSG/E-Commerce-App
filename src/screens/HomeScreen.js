import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { fetchProducts } from "../services/api";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getProducts();
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      className="p-4 bg-white mb-4 rounded-lg flex-row items-center shadow"
      onPress={() => navigation.navigate("ProductInfo", { productId: item.id })}
    >
      <Image
        source={{ uri: item.mainImage }}
        className="w-16 h-16 rounded-lg mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-base text-gray-600">
          {item.price.amount} {item.price.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text className="mt-4 text-lg">Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-red-500 text-center">{error}</Text>
        <Text
          className="mt-4 text-lg text-blue-500 underline"
          onPress={getProducts}
        >
          Retry
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1D4ED8"]}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
