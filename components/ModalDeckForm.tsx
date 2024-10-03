import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedInput } from "./ThemedInput";
import { PrimaryThemedButton } from "./ThemedButton";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export const ModalDeckForm = ({onSubmit, showModal, setShowModal, deckName, setDeckName, title}: {onSubmit: (deckName: string) => void, showModal: boolean, setShowModal: (showModal: boolean) => void, deckName: string, setDeckName: (deckName: string) => void, title: string}) => {
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
                <ThemedInput lightColor={Colors.gray[200]} darkColor={Colors.gray[500]} placeholder="Nicos weg A2 episode 1" onChangeText={setDeckName} value={deckName} />
              </ThemedView>
              <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.footer}>
                <PrimaryThemedButton onPress={() => {onSubmit(deckName);}} extraStyle={{width: '100%'}}>
                  <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.buttonText}>Create</ThemedText>
                </PrimaryThemedButton>
            </ThemedView>
          </ThemedView>
        </ThemedSafeAreaView>
      </Modal>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.blue[400],
  },
  header: {
    marginBottom: 12,
    paddingTop: 20, // Add some top padding
  },
  content: {
    // flex: 1,
  },
  footer: {
    marginTop: 16,
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
    textAlign: 'center',
    fontSize: 14
  },
  cancelButtonText: {
    marginTop: 16,
    color: Colors.red[500],
    textAlign: 'center',
  }
});