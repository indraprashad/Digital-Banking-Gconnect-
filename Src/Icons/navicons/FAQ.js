import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpansion}>
        <View style={styles.header}>
          <Text style={styles.question}>{question}</Text>
          <AntDesign
            name={expanded ? "minus" : "plus"}
            size={24}
            color="#F39C12"
          />
        </View>
      </TouchableOpacity>

      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

const FAQ = () => {
  return (
    <View style={styles.container}>
      <FAQItem
        question="What is Gconnect?"
        answer="It is a digital platform meticulously crafted to revolutionize the experience 
        of international students at ADTU."
      />
      <FAQItem
        question="Why it is Developed?"
        answer="The recognition of a critical need to 
        streamline administrative processes, foster effective communication, and ultimately enhance the 
        overall engagement and satisfaction of our diverse global student community."
      />
      <FAQItem
        question="What is the benifits of using Gconnet?"
        answer="Efficient Online Payment Systems in Educational Settings"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  answer: {
    padding: 10,
  },
});

export default FAQ;
