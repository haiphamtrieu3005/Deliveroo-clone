import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";


const Categories = () => {
  const [Categories, setCaterories] = useState([]);

  useEffect(() => {
    sanityClient
    .fetch(
      `
        *[_type == "category"]
      `
    ).then((date) => {
      setCaterories(date);
    });
  }, []);
  return (
    <ScrollView
      className=""
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* CategoryCard */}

      {Categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
