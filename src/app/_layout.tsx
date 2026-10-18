import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <View
        style={{
          padding: 16,
          marginTop: 12,
          borderRadius: 12,
          borderColor: "#ddd",
        }}
      >
        <Text>City</Text>

        <TextInput
          placeholder="search city...."
          placeholderTextColor="#999"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            alignItems: "center",
            borderRadius: 8,
            padding: 10,
            marginTop: 12,
          }}
        />

        <TouchableOpacity
          onPress={() => alert("your request is submitted")}
          style={{
            backgroundColor: "#00f",
            padding: 12,
            marginTop: 10,
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
