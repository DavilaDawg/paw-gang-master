import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { RootStackParams } from "../../Types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { createSession, verifySession } from "../../services/authService";

interface LoginFormProps {
  form: { email: string; password: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  navigation: StackNavigationProp<RootStackParams, "Login">;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, setForm, navigation }) => {
  const handleSignIn = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      const token = await createSession({ email, password });

      if (token) {
        const response = await verifySession({ token });

        if (response) navigation.navigate("Main");
      } else {
        console.log("Failed to create session.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <View className="mb-6 px-6 flex-1">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-black mb-2">
          Email address
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          onChangeText={(email) => setForm({ ...form, email })}
          placeholder="hachiko@example.com"
          placeholderTextColor="grey"
          className="h-[50px] bg-[#cfcec9] px-4 rounded-xl text-base font-medium text-black border border-black"
          value={form.email}
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold text-black mb-2">Password</Text>
        <TextInput
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={(password) => setForm({ ...form, password })}
          placeholder="********"
          placeholderTextColor="grey"
          className="h-[50px] bg-[#cfcec9] px-4 rounded-xl text-base font-medium text-black border border-black"
          secureTextEntry={true}
          value={form.password}
        />
      </View>
      <View className="mt-1 mb-4">
        <TouchableOpacity onPress={handleSignIn}>
          <View className="flex-row items-center justify-center rounded-3xl py-2.5 px-5 border border-[#008CBA] bg-[#008CBA]">
            <Text className="text-lg leading-7 font-semibold text-white">
              Sign in
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text className="text-base font-semibold text-black text-center">
        Forgot password?
      </Text>
    </View>
  );
};

export default LoginForm;
