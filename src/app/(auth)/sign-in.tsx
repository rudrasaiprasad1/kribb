import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold text-blue-500">Sign In</Text>
    </SafeAreaView>
  );
}
