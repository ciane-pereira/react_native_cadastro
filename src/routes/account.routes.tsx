import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FormOne } from "../screens/FormOne";
import { FormTwo } from "../screens/FormTwo";
import { FormThree } from "../screens/FormThree";
import { Finish } from "../screens/Finish";

const { Navigator, Screen } = createNativeStackNavigator();

export function AccountRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Screen name="formOne" component={FormOne} />
      <Screen name="formTwo" component={FormTwo} />
      <Screen name="formThree" component={FormThree} />
      <Screen name="finish" component={Finish} />
    </Navigator>
  )
}