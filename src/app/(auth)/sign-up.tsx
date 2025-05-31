import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    console.log(emailAddress, password);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-gray-900 p-6">
        <View className="flex-1 justify-center">
          <Text className="text-3xl font-bold text-center mb-8 text-white">Verify Your Email</Text>

          <View className="gap-4">
            <View>
              <Text className="text-sm font-medium text-gray-300 mb-1">Verification Code</Text>
              <TextInput
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
                value={code}
                placeholder="Enter your verification code"
                placeholderTextColor="#9CA3AF"
                onChangeText={setCode}
              />
            </View>

            <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-lg mt-6" onPress={onVerifyPress}>
              <Text className="text-white text-center font-semibold">Verify Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-center mb-8 text-white">Create Account</Text>

        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">Email</Text>
            <TextInput
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmailAddress}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">Password</Text>
            <TextInput
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              value={password}
              placeholder="Enter password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-lg mt-6" onPress={onSignUpPress}>
            <Text className="text-white text-center font-semibold">Create Account</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-6 gap-2">
          <Text className="text-gray-400">Already have an account?</Text>

          <Text className="text-blue-400 font-semibold ml-1" onPress={() => router.replace("/sign-in")}>
            Sign in
          </Text>
        </View>
      </View>
    </View>
  );
}
