import { Text, View } from "react-native";
import { useAccountForm } from "../../hooks/useAccountForm";

import { styles } from "./styles";

export function Finish() {
  const { accountFormData} = useAccountForm();
  return (
    <View style={ styles.container }>
      <Text style={styles.text }>
        Empresa: {accountFormData.name}
      </Text>
      <Text>
        E-mail: {accountFormData.email}
      </Text>
      <Text>
        Data de cadastro: {accountFormData.birth}
      </Text>
      <Text>
        Telefone: {accountFormData.phone}
      </Text>
    </View>
  )
}