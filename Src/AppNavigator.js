import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Normal/Splash";
import Login from "./Login/Signup/Login";
import CreateAccount from "./signup/CreateAccount";
import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
import Parent from "./Normal/Parent";
import Scan from "./Icons/navicons/Scan";
import History from "./Icons/navicons/History";
import Codes from "./Icons/navicons/Codes";
import Recharge from "./Icons/navicons/Recharge";
import Transfer from "./Icons/navicons/Transfer";
import Support from "./Icons/navicons/Support";
import FAQ from "./Icons/navicons/FAQ";
import Calender from "./Icons/navicons/Calender";
import Settings from "./Icons/navicons/Settings";
import Info from "./Normal/Info";
import CustomHeader from "./Normal/CustomHeader";
import Add from "./Normal/Add";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Parent"
          component={Parent}
          options={{
            header: (props) => <CustomHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Codes"
          component={Codes}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Recharge"
          component={Recharge}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Transfer"
          component={Transfer}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Calender"
          component={Calender}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
