import { React, useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

import AntDesign from "react-native-vector-icons/AntDesign"
import {
  ImageBackground,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import API from "../../backendApi";
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const data = [
  { label: "Market", value: "1" },
  { label: "Home", value: "2" },
  { label: "Hospital", value: "3" },
  { label: "Mandir", value: "4" },
  { label: "Exam", value: "5" },
];

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [value, setValue] = useState(null);
  const [disable,setDisable]=useState(false);
  const checkPurpose=async(item)=> {
    try {
      console.log("Json stringiyed item label is given by",JSON.stringify(item.label))
      await AsyncStorage.setItem('purpose',JSON.stringify(item.label))
      const res=await AsyncStorage.getItem('purpose')
      console.log(`Async storage value of purpose tag is ${res}`)
      setValue(res)
      setDisable(true)
    }
    catch (e) {
      console.warn(e)
    }
  }
  const getUser = async () => {
    try {
      const res = await AsyncStorage.getItem('user')
      console.log("The loaded user is", res)
      setUserData(JSON.parse(res))
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUser()
  }, []);
  console.log(`disable ${disable} \n UserData ${userData} \n value ${value}`)
  if (!userData) {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: 60,
          backgroundColor: "#eeeeee",
        }}
      >
        <Image
          source={
            { uri: "https://cdn.dribbble.com/users/711094/screenshots/3288010/sean_tiffonnet_loader_360learning.gif" }
          }
          style={{ height: 600, width: 600 }}
        />
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
    >
      <ImageBackground
        source={{ uri: userData.photolink }}
        style={{
          height: 0.55 * h,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 60,
            alignItems: "center",
          }}
        ></View>
        <LinearGradient
          colors={["rgba(0,0,0,1)", "transparent"]}
          style={{
            transform: [{ rotate: '180deg' }],
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            height: 0.16 * h,
          }}
        >
          <Text
            style={{
              transform: [{ rotate: '180deg' }],
              color: "#FFF",
              fontSize: 35,
              alignSelf: "center",
              fontFamily: "Montserrat_700Bold",
            }}
          >
            {userData.name}
          </Text>
        </LinearGradient>
      </ImageBackground>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 40,
          paddingVertical: 20,
          marginTop: 20,
          padding: 40,
        }}
      >
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          // disable={disable}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={value}
          searchPlaceholder="Search..."
          value={value}
          onChange={(item) => {
            console.log("item selected is ",item)
            checkPurpose(item)
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />

          )}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingVertical: 15,
          marginTop: 20,
          padding: 30,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            editable={false}
            style={styles.input1}
            placeholder="Phone Number :"
          />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userData.phonenum ? `${userData.phonenum}` : "Phone Number"}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            editable={false}
            style={styles.input1}
            placeholder={"Roll Number :"}
          />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userData.rollnum ? `${userData.rollnum}` : "Roll Number"}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            editable={false}
            style={styles.input1}
            placeholder={"Branch :"}
          />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userData.branch ? `${userData.branch}` : "branch"}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            editable={false}
            style={styles.input1}
            placeholder={"Year :"}
          />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userData.year ? `${userData.year}` : "Year"}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            editable={false}
            style={styles.input1}
            placeholder={"Father Name :"}
          />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userData.fathername ? userData.fathername : "Father Name"}
            multiline />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            editable={false}
            style={styles.input1}
            placeholder={"Guardian No :"}
          />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userData.fatherphonenum ? `${userData.fatherphonenum}` : "Father Phone Number"}
          />
        </View>

      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 50,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 50,
    width: "50%",
    fontSize: 16,
    marginVertical: 10,
    borderWidth: 0,
    borderBottomWidth: 2,
    padding: 10,
    color: "black",
    textTransform: "uppercase",
  },
  input1: {
    height: 50,
    width: "50%",
    fontSize: 16,
    marginVertical: 10,
    borderWidth: 0,
    borderBottomWidth: 2,
    padding: 10,
    color: "black",
    fontWeight: "600"

  },
});
