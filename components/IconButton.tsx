import { View, Text} from "react-native";
import {EvilIcons } from "@expo/vector-icons/";


type IconbuttonProps = {
  text?: string | number;
  icon: React.ComponentProps<typeof EvilIcons>["name"];
};
const Iconbutton = ({ icon, text }: IconbuttonProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {}
      <EvilIcons name={icon} size={22} color={"gray"} />
      {}
      <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
    </View>
  );
};
export default Iconbutton