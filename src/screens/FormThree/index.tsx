import { useRef } from "react";
import { Text, TextInput, View } from "react-native";

import { useForm } from "react-hook-form";
import { useAccountForm } from "../../hooks/useAccountForm";
import { useNavigation } from "@react-navigation/native";
import { AccountProps } from "../../contexts/AccountFormContext";

import { styles } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function FormThree(){
  const { navigate} = useNavigation();
  const { updateFormData } = useAccountForm();
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<AccountProps>();


  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("finish")
  }

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return password === passwordConfirmation || "As senhas devem ser iguais";
  } 

  const passwordConfirmationRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha sua senha
      </Text>

      <Input 
      icon="key"
      error={errors.password?.message}
      formProps={{
        control,
        name: "password",
        rules: {
          required: "Senha é obrigatória",
          minLength: {
            value: 6,
            message: "A senha deve conter pelo menos seis dígitos"
          }
        }
      }}
      inputProps={{ 
        placeholder: "Senha",
       onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
       returnKeyType: "next",
       secureTextEntry: true
       }} 
      />

      <Input 
      error={errors.passwordConfirmation?.message}
      ref={passwordConfirmationRef}
      icon="key"
      formProps={{
        control,
        name: "passwordConfirmation",
        rules: {
          required: "Confirme a senha",
          validate: validationPasswordConfirmation,
        }
      }}
      inputProps={{ 
        placeholder: "Confirme a senha",
        onSubmitEditing: () => handleSubmit(handleNextStep),
        secureTextEntry: true
       }} 
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  )
}