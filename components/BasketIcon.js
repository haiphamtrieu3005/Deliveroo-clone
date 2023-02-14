import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { selectBasketItem, selectTotal } from "../fetures/basketSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const BasketIcon = () => {
  const items = useSelector(selectBasketItem);
    const total = useSelector(selectTotal
    );
//   const total =
//     items.length > 0 && items.reduce((total, item) => total + item.price, 0);
const navigation = useNavigation();
if(items.length ===0) return null;

  return (
    <View className="absolute bottom-1 w-full z-50 ">
      <TouchableOpacity 
      onPress={() => navigation.navigate("basket")}
      className="flex-row rounded-lg bg-[#00CCBB] p-4 mx-5 shadow-lg items-center">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg  text-center flex-1">
          Basket
        </Text>
        <Text className="text-lg text-white font-extralight ">{total}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
