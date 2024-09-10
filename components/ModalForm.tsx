import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemedInput } from "./ThemedInput";
import { PrimaryThemedButton } from "./ThemedButton";

export const ModalForm = ({onSubmit, showModal, setShowModal, word, setWord, translation, setTranslation, title}: {onSubmit: (word: string, translation: string) => void, showModal: boolean, setShowModal: (showModal: boolean) => void, word: string, setWord: (word: string) => void, translation: string, setTranslation: (translation: string) => void, title: string}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Pressable onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={24} color={Colors.gray[700]} />
            </Pressable>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <View style={styles.content}>
            <ThemedInput placeholder="Enter Word" onChangeText={setWord} value={word} />
            <ThemedInput placeholder="Enter Translation" onChangeText={setTranslation} value={translation} />
          </View>
          <View style={styles.footer}>
            <PrimaryThemedButton onPress={() => {onSubmit(word, translation);}} extraStyle={{width: '100%'}}>
              <Text style={styles.buttonText}>Create</Text>
            </PrimaryThemedButton>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.blue[400],
  },
  header: {
    marginBottom: 12,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  footer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 12,
    color: Colors.gray[700],
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  button: {
    marginTop: 16,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    backgroundColor: Colors.blue[500],
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    marginTop: 16,
    color: Colors.red[500],
    textAlign: 'center',
  }
});