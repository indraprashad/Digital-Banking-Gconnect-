import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const SECTIONS = [
  {
    header: "Preferences",
    items: [
      { id: "language", icon: "globe", label: "Language", type: "select" },
      { id: "wifi", icon: "wifi", label: "Use Wi-Fi", type: "toggle" },
    ],
  },
  {
    header: "Help",
    items: [
      { id: "bug", icon: "flag", label: "Change Password", type: "link" },
      { id: "contact", icon: "mail", label: "Contact Us", type: "link" },
    ],
  },
  {
    header: "Content",
    items: [
      { id: "save", icon: "save", label: "Feedback", type: "link" },
      { id: "lock", icon: "lock", label: "Privacy Policy", type: "link" },
      {
        id: "terms",
        icon: "book",
        label: "Terms and conditions",
        type: "link",
      },
      { id: "download", icon: "download", label: "Logout", type: "link" },
    ],
  },
];

export default function Settings(props) {
  const [email, setEmail] = useState("Loading");
  const [username, setUserName] = useState("Loading");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    language: "English",
    darkMode: true,
    wifi: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/username`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        setEmail(data.email);
        setUserName(data.username);

        // Retrieve photo URI from AsyncStorage
        const photoURI = await AsyncStorage.getItem("photoURI");
        if (photoURI) {
          setImage(photoURI);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Save photo URI to AsyncStorage
      await AsyncStorage.setItem("photoURI", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f6f6f6" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile section */}
        <View style={styles.profile}>
          {image && (
            <Image source={{ uri: image }} style={styles.profileAvatar} />
          )}
          <Text style={styles.profileName}>{username}</Text>
          {/* Display the email */}
          <Text style={styles.profileEmail}>{email}</Text>
          {/* Placeholder TouchableOpacity */}
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Upload Profile</Text>
              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>
        {/* Sections */}
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                  >
                    {/* TouchableOpacity and its content */}
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                    >
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />
                        <Text style={styles.rowLabel}>{label}</Text>
                        <View style={styles.rowSpacer} />
                        {type === "select" && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}
                        {type === "toggle" && (
                          <Switch
                            onChange={(val) => setForm({ ...form, [id]: val })}
                            value={form[id]}
                          />
                        )}
                        {(type === "select" || type === "link") && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
});
