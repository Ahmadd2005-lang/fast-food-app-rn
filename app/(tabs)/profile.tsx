import CustomButton from "@/components/CustomButton";
import { account } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import { Alert, Image, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Logout Failed", "Unable to logout. Please try again.");
      console.log(error);
    }
  };

  // const handleEditProfile = () => {
  //   router.push("edit-profile"); // You should create this route/screen
  // };

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg">No user data found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const profileData = [
    { key: "name", label: "Name", value: user.name },
    { key: "email", label: "Email", value: user.email },
    // Add more fields here if needed
  ];

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <View className="mb-4 px-4">
      <Text className="text-base text-gray-500 mb-1">{item.label}</Text>
      <Text className="text-lg text-gray-900 font-semibold">{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-1 p-6">
        <FlatList
          ListHeaderComponent={
            <View className="items-center mb-8">
              <View className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200 items-center justify-center">
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: 96, height: 96, borderRadius: 48 }}
                  resizeMode="cover"
                />
              </View>
            </View>
          }
          data={profileData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ListFooterComponent={
            <View style={{ marginTop: 30, marginBottom: 50 }}>
              <CustomButton
                title="Edit Profile"
                onPress={() => {}}
                style="mb-4 bg-blue-500"
              />
              <CustomButton
                title="Logout"
                onPress={handleLogout}
                style="bg-red-500"
              />
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
