import { useRef } from "react";
import { Text, TextInput, View } from "react-native";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAccountForm } from "../../hooks/useAccountForm";

import { styles } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AccountProps } from "../../contexts/AccountFormContext";

export function FormOne(){
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<AccountProps>();


  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("formTwo");
  }

  const emailRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro de Cliente
      </Text>

      <Input 
      icon="user"
      error={errors.name?.message}
      formProps={{
        control,
        name: "name",
        rules: {
          required: "Nome é obrigatório",
        }
      }}
      inputProps={{ placeholder: "Empresa",
       onSubmitEditing: () => emailRef.current?.focus(),
       returnKeyType: "next"
       }} 
      />

      <Input 
      error={errors.email?.message}
      ref={emailRef}
      icon="mail"
      formProps={{
        control,
        name: "email",
        rules: {
          required: "E-mail é obrigatório",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "E-mail inválido" 
          }
        }
      }}
      inputProps={{ 
        placeholder: "E-mail",
        onSubmitEditing: () => handleSubmit(handleNextStep),
       }} 
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  )
}