import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import styles from "./styles";

import Logo from "../../assets/logo.png";
const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const value = Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value);
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso da "${incident.title}" com o valor de ${value}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heróio do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Ong:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        <Text style={styles.incidentProperty}>Descrição:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>
        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>{value}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={sendWhatsapp} style={styles.action}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMail} style={styles.action}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;
