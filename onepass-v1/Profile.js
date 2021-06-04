import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import { fonts } from "./fonts";
import { newcss } from "./newcss";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Profile({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [settings, setSettings] = useState(false);
  const [aboutus, setAboutus] = useState(false);
  const dispatch = useDispatch();
  const prefs = useSelector((state) => state.preference.preference);

  const masterdelete = () => {
    axios
      .post("http://10.0.0.3:3000/masterdelete", { password: "some pass" })
      .then(() => {
        navigation.navigate("Register");
      })
      .catch((e) => console.log(e));
  };

  const logout = () => {
    axios.post("http://10.0.0.3:3000/preference", prefs);
    navigation.navigate("Login");
  };
  const showSettings = () => {
    setSettings(!settings);
  };
  const showAboutus = () => {
    setAboutus(!aboutus);
  };
  const preference = () => {
    navigation.navigate("ChangePassword");
  };
  const tfa = () => {
    navigation.navigate("Changetfa");
  };
  return (
    <View style={styles.background}>
      <View style={styles.header2}>
        <Text style={styles.heading}>Password</Text>
      </View>
      <ScrollView
        style={
          ([styles.scroll], { align: "center", backgroundColor: "#c3ccea" })
        }
      >
        <TouchableOpacity style={styles.profilecard} onPress={showSettings}>
          <Text style={[styles.profilecardtext]}>Settings</Text>
        </TouchableOpacity>
        {settings && (
          <>
            <TouchableOpacity
              style={styles.profilesubmenutouch}
              onPress={preference}
            >
              <Text style={styles.profilesubmenu}>Change Credentials</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilesubmenutouch} onPress={tfa}>
              <Text style={styles.profilesubmenu}>Change 2FA</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.profilecard} onPress={showAboutus}>
          <Text style={styles.profilecardtext}>About Us</Text>
        </TouchableOpacity>
        {aboutus && (
          <>
            <TouchableOpacity
              style={styles.profilesubmenutouch}
              onPress={() => {
                Linking.openURL(
                  "https://www.linkedin.com/in/samarth-aher-sa09/"
                );
              }}
            >
              <Text style={styles.profilesubmenu}>Samarth Aher</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profilesubmenutouch}
              onPress={() => {
                Linking.openURL("https://www.linkedin.com/in/karangandhi97");
              }}
            >
              <Text style={styles.profilesubmenu}>Karan Gandhi</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={logout} style={styles.profilecard}>
          <Text style={styles.profilecardtext}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={masterdelete} style={styles.profilecard}>
          <Text style={styles.profilecardtext}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default Profile;
