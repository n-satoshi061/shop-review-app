import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {searchReview} from '../lib/algolia'
/* components */
import { Stars } from "../components/Stars";
import { SearchReviewItem } from "../components/SearchReviewItem";

/* types */
import { Review } from "../types/review";

type Props = {
  review: Review;
};

export const SearchScreen: React.FC<Props> = ({ review }: Props) => {
  const [keyword, setKeyword] = useState<string>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const onChangeText = async (text: string) => {
    setKeyword(text)
    if(!text) {
      setReviews([])
    } else {
      const result = await searchReview(text);
      if(result.hits.length > 0) {
        const reviews = result.hits.map(hit => {
          return (hit as unknown) as Review;
        })
        setReviews(reviews)
      } else {
        setReviews([])
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="検索キーワード" 
        onChangeText={onChangeText}
        value={keyword}
      />
      <FlatList
        data={reviews}
        renderItem={({item}) => <SearchReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  input: {
    height: 50,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    margin: 16,
  },
});