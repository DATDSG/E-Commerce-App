import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { tw } from "nativewind";
import ProductList from "../components/ProductList";
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

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text style={tw`mt-4 text-lg`}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center p-4`}>
        <Text style={tw`text-lg text-red-500`}>{error}</Text>
        <Text style={tw`mt-4 text-blue-500 underline`} onPress={getProducts}>
          Retry
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-4`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1D4ED8"]}
          />
        }
      >
        <ProductList products={products} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
