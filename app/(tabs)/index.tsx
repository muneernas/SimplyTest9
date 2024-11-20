import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { Provider } from "react-redux"; 
import Stoore from "../store";
const App = () => {
  const [selectedBirthPlace, setSelectedBirthPlace] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowpicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const toggleDatepicker = () => {
    setShowpicker(!showPicker);
  };
  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        setDateOfBirth(currentDate.toDateString());
      }
    }
  };
  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());

    toggleDatepicker();
  };

  return (
    <Provider store={Stoore}>

    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        >
        <View style={styles.container}>
          <Text style={styles.header}>ID Input Form</Text>
          <Text style={styles.SubH}>
            please input Data from your National ID
          </Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.TextInf}></TextInput>
            <Text style={styles.label}>National ID Num:</Text>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              style={styles.TextInf}
              ></TextInput>
            <Text style={styles.label}>Gender:</Text>
            <Dropdown
              data={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              labelField={"label"}
              valueField="value"
              style={styles.TextInf}
              value={""}
              onChange={() => {}}
              />
            <Text style={styles.label}>Birth Date:</Text>
            {showPicker && (
              <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              maximumDate={new Date()}
              onChange={onChange}
              style={styles.datepicker}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.pickerButton,
                    { backgroundColor: "11182711" },
                  ]}
                  onPress={toggleDatepicker}
                  >
                  <Text style={[styles.buttonText, { color: "#075985" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.pickerButton]}
                  onPress={confirmIOSDate}
                  >
                  <Text style={[styles.buttonText]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  style={styles.TextInf}
                  placeholder="please select a date"
                  editable={false}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholderTextColor={"grey"}
                  onPressIn={toggleDatepicker}
                  ></TextInput>
              </Pressable>
            )}
            <Text style={styles.label}>Place Of birth:</Text>
            <Dropdown
              data={[
                { value: "Germany", label: "Germany" },
                { value: "USA", label: "USA" },
                { value: "Japan", label: "Japan" },
                { value: "Malta", label: "Malta" },
                { value: "Wales", label: "Wales" },
                { value: "Burkina Faso", label: "Burkina Faso" },
              ]}
              labelField={"label"}
              valueField="value"
              style={styles.TextInf}
              value={"enter your birth place"}
              onChange={() => {}}
              />

            <Text style={styles.label}>Mothers Name:</Text>
            <TextInput style={styles.TextInf}></TextInput>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
              </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },
  header: {
    fontSize: 36,
    color: "green",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "black",
  },
  SubH: {
    fontSize: 18,
    color: "grey",
    marginBottom: 15,
  },
  TextInf: {
    borderWidth: 1,
    borderColor: "black",
    height: 35,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: 200,
    borderRadius: 5,
    marginTop: 25,
  },
  formContainer: {
    width: "90%",
    gap: 12,
    paddingHorizontal: 20,
  },
  datepicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
  },
});

export default App;
