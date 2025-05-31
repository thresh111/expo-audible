import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</Text>

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

          <TouchableOpacity className="w-full bg-blue-600 p-4 rounded-lg mt-6" onPress={onSignInPress}>
            <Text className="text-white text-center font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-6 gap-2">
          <Text className="text-gray-400">Don't have an account?</Text>

          <Text className="text-blue-400 font-semibold ml-1" onPress={() => router.replace("/sign-up")}>
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
}
