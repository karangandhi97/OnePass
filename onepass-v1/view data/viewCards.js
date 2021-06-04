import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import axios from "react-native-axios";
import { newcss } from "../newcss";
import { fonts } from "../fonts";
import Icons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";

export default function CardDetails({ navigation }) {
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [editable, setEditable] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleteable, setdelete] = useState(true);
  const [data, setData] = useState(navigation.state.params.key);

  const handleInput = (e) => {
    const { name, value } = e;
    setData((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };
  const del = () => {
    axios
      .delete(`http://10.0.0.3:3000/cards/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
  };

  const changeState = () => {
    setEditable(!editable);
    setdelete(!deleteable);
    if (editable) {
      navigation.navigate("CardDetails");
    }
  };

  const submit = () => {
    axios
      .put(`http://10.0.0.3:3000/cards/${data._id}`, data, {
        headers: {
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS",
        },
      })
      .then(navigation.navigate("Homepage"));
  };
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.view_headerbg}>
          <Text style={styles.fakeheading}></Text>
        </View>
        <View style={styles.view_headingview}>
          {!editable ? (
            <>
              <Text style={styles.view_headingtext}>Card Details</Text>
            </>
          ) : (
            <Text style={styles.view_headingtext}>Editing Mode</Text>
          )}
        </View>

        <View style={styles.view_actualheading}>
          {!editable ? (
            <>
              <Icons
                onPress={() => navigation.goBack()}
                name={"arrow-back"}
                size={30}
                color="#F0F5F9"
                style={styles.editbackicon}
              />
              <TouchableOpacity style={styles.editbutton} onPress={changeState}>
                <Text style={styles.editbuttontext}>Edit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.cancelbutton}
                onPress={changeState}
              >
                <Text style={styles.cancelbuttontext}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitbutton}
                onPress={() => setConfirm(!confirm)}
              >
                <Text style={styles.deletebuttontext}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <ScrollView style={styles.scroll}>
          <View style={([styles.screenview], { alignItems: "flex-start" })}>
            {confirm ? (
              <View style={styles.popupbox}>
                <View style={styles.popupboxtext}>
                  <Text style={styles.popuptitle}>Delete</Text>
                  <Text style={styles.popupcontent}>Confirm Deletion</Text>
                </View>
                <View style={styles.popupbuttonbox}>
                  <TouchableOpacity
                    onPress={() => setConfirm(!confirm)}
                    style={styles.popupLeftbutton}
                  >
                    <Text style={styles.popupbuttoncontent}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={del}
                    style={styles.popupRightbutton}
                  >
                    <Text style={styles.popupbuttoncontent}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <Text style={styles.fieldname}>{"\n"}Card Holder Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "name" })
              }
              placeholder="Card Holder Name"
              // secureTextEntry = {true}
              defaultValue={data.name}
              editable={editable}
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Card Number</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "number" })
              }
              placeholder="Card Number"
              // secureTextEntry = {true}
              defaultValue={data.number}
              editable={editable}
              placeholderTextColor="#000000"
            />
            <Text style={styles.fieldname}>{"\n"}CVV</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "cvv" })}
              placeholder="CVV"
              // secureTextEntry = {true}
              defaultValue={data.cvv}
              editable={editable}
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Month Of Expiry</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) => handleInput({ value: text, name: "moe" })}
              placeholder="Month of Expiry"
              // secureTextEntry = {true}
              defaultValue={data.moe}
              editable={editable}
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Bank Name</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "bankname" })
              }
              placeholder="Bank Name"
              // secureTextEntry = {true}
              defaultValue={data.bankname}
              editable={editable}
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Password</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "password" })
              }
              placeholder="Password"
              defaultValue={data.password}
              editable={editable}
              // secureTextEntry = {true}
              placeholderTextColor="#000000"
            />

            <Text style={styles.fieldname}>{"\n"}Note</Text>
            <TextInput
              style={styles.fieldinput}
              onChangeText={(text) =>
                handleInput({ value: text, name: "notes" })
              }
              placeholder="Note"
              defaultValue={data.notes}
              editable={editable}
              // secureTextEntry = {true}
              placeholderTextColor="#000000"
            />
            <View style={styles.deletebuttonview}>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
              {deleteable ? null : (
                <>
                  <TouchableOpacity
                    style={styles.deletebutton}
                    onPress={submit}
                  >
                    <Text style={styles.submitbuttontext}>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <Text>
              {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
