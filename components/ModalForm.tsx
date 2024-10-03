import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedInput } from "./ThemedInput";
import { PrimaryThemedButton } from "./ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";

export const ModalForm = ({onSubmit, showModal, setShowModal, word, setWord, translation, setTranslation, title, buttonText}: {onSubmit: (word: string, translation: string) => void, showModal: boolean, setShowModal: (showModal: boolean) => void, word: string, setWord: (word: string) => void, translation: string, setTranslation: (translation: string) => void, title: string, buttonText: string}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={showModal}>
        <ThemedSafeAreaView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.safeArea}>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.modalView}>
              <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.header}>
                <Pressable onPress={() => setShowModal(false)}>
                  <Ionicons name="close" size={24} color={Colors.gray[700]} />
                </Pressable>
                <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.modalTitle}>{title}</ThemedText>
              </ThemedView>
              <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.content}>
                <ThemedInput lightColor={Colors.gray[100]} darkColor={Colors.gray[500]} placeholder="Enter Word" onChangeText={setWord} value={word} />
                <ThemedInput lightColor={Colors.gray[100]} darkColor={Colors.gray[500]} placeholder="Enter Translation" onChangeText={setTranslation} value={translation} />
              </ThemedView>
              <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.footer}>
                <PrimaryThemedButton onPress={() => {onSubmit(word, translation);}} extraStyle={{width: '100%', paddingVertical: 8}}>
                  <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.buttonText}>{buttonText}</ThemedText>
                </PrimaryThemedButton>
              </ThemedView>
            </ThemedView>
        </ThemedSafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.blue[400],
  },
  safeArea: {
    flex: 1,
  },
  header: {
    marginBottom: 12,
    paddingTop: 20, // Add some top padding
  },
  content: {
    // flex: 1,
    gap: 16,
  },
  footer: {
    marginTop: 16,
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 12,
    color: Colors.gray[700],
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});