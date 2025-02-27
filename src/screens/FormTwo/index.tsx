import { useRef } from "react";
import { Text, TextInput, View } from "react-native";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAccountForm } from "../../hooks/useAccountForm";

import { styles } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AccountProps } from "../../contexts/AccountFormContext";

export function FormTwo(){
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<AccountProps>();


  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("formThree");
  }

  const phoneRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Completar Informações
      </Text>

      <Input 
      icon="calendar"
      error={errors.birth?.message}
      formProps={{
        control,
        name: "birth",
        rules: {
          required: "Data do cadastro é obrigatória",
          pattern: {
            value: /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/,
            message: "Data de cadastro inválida"
          }
        }
      }}
      inputProps={{ placeholder: "Data de cadastro",
       onSubmitEditing: () => phoneRef.current?.focus(),
       returnKeyType: "next"
       }} 
      />

      <Input 
      error={errors.phone?.message}
      ref={phoneRef}
      icon="phone"
      formProps={{
        control,
        name: "phone",
        rules: {
          required: "Telefone é obrigatório",
          pattern: {
            value:/^(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})$/,
            message: "Número de telefone inválido"
          }
        }
      }}
      inputProps={{ 
        placeholder: "Telefone",
        onSubmitEditing: () => handleSubmit(handleNextStep),
       }} 
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  )
}