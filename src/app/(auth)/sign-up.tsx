import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  // clerk states
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();

  //routing states
  const router = useRouter();

  //   data states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const isLoading = fetchStatus === "fetching";

  const onSignupPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    if (error) {
      alert(error);
      return;
    }
    if (!error) {
      await signUp.verifications.sendEmailCode();
      return <></>;
    }
  };

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require(`../../../assets/images/kribb.png`)}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Verify your account
        </Text>
        <Text className="font-bold text-gray-500 mb-8">
          we have sent an code to : {email}
        </Text>

        <View className="flex-row gap-3 mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 "
            placeholder="Enter Verification Code"
            placeholderTextColor={`#9ca3af`}
            autoCapitalize="words"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />
        </View>

        {errors.fields.code ? (
          <Text className="text-red-500 mb-4">
            {errors.fields.code.message}
          </Text>
        ) : null}

        {/* submit button  */}

        <TouchableOpacity
          onPress={onSignupPress}
          disabled={isLoading}
          className="w-full bg-blue-500 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color={`white`} />
          ) : (
            <Text className="text-white text-base font-bold">Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require(`../../../assets/images/kribb.png`)}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </Text>
        <Text className="font-bold text-gray-500 mb-8">
          Find your dream home
        </Text>

        <View className="flex-row gap-3 mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 "
            placeholder="First Name"
            placeholderTextColor={`#9ca3af`}
            autoCapitalize="words"

            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 "
            placeholder="Last Name"
            placeholderTextColor={`#9ca3af`}
            autoCapitalize="words"

            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Email  */}

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Email Address"
          placeholderTextColor={`#9ca3af`}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {errors.fields.emailAddress ? (
          <Text className="text-red-500 mb-4">
            {errors.fields.emailAddress.message}
          </Text>
        ) : null}

        {/* Password */}

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"

          placeholder="Password"
          placeholderTextColor={`#9ca3af`}

          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errors.fields.password ? (
          <Text className="text-red-500 mb-4">
            {errors.fields.password.message}
          </Text>
        ) : null}

        {/* submit button  */}

        <TouchableOpacity
          onPress={onSignupPress}
          disabled={isLoading}
          className="w-full bg-blue-500 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color={`white`} />
          ) : (
            <Text className="text-white text-base font-bold">Sign up</Text>
          )}
        </TouchableOpacity>

        {/* to navigate other auth pages  */}

        <View className="flex-row justify-center">
          <Text className=" text-gray-500">Already have an accoiunt? </Text>
          <Link href="/sign-in">
            <Text className=" text-blue-500 font-semibold">Sign In</Text>
          </Link>
        </View>

        {/* for captcha  */}
        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
}
