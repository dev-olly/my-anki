import { Colors } from "@/constants/Colors";
import { View,Text, Pressable, StyleSheet } from "react-native";

const examples = [
  {"id":"0MYgXuh899ok9HPJzOfR","title":"Jahreszeiten","level":"A1","lessonUrl":"https://learngerman.dw.com/en/jahreszeiten/l-37651758","words":[{"german":"sonnig","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"sunny"},{"german":"nass","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"wet"},{"german":"trocken","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"dry"},{"german":"regnerisch","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"rainy"},{"german":"wie","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"as"},{"german":"schwer","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"heavy"},{"german":"frieren","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"to freeze; to be cold"},{"german":"die Jahreszeit, die Jahreszeiten","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"season"},{"german":"als","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"than"},{"german":"der Herbst, die Herbste","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"fall; autumn"},{"german":"schön","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"nice; beautiful; pretty"},{"german":"kalt","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"cold"},{"german":"spannend","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"exciting; gripping"},{"german":"heiß","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"hot"},{"german":"etwas/jemanden mit|nehmen","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"to take something/someone along"},{"german":"bekannt","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"famous"},{"german":"der Sommer, die Sommer","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"summer"},{"german":"grün","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"green"},{"german":"etwas verlieren","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"to lose something"},{"german":"Ski fahren","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"to ski"},{"german":"die Blume, die Blumen","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"flower"},{"german":"das Blatt, die Blätter","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"leaf"},{"german":"genauso","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"just as"},{"german":"der Frühling, die Frühlinge","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"spring"},{"german":"windig","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"windy"},{"german":"die Kälte","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"cold; coldness; cold weather"},{"german":"warm","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"warm"},{"german":"der Winter, die Winter","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"winter"},{"german":"schlimm","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"terrible"},{"german":"finden","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"to find"},{"german":"die Temperatur, die Temperaturen","audioSource":"/assets/audio/signal_sound_failure.mp3","translation":"temperature"}],"WordsCount":31}
]

const Levels = ["A1", "A2", "B1", "B2", "C1", "C2"]

const LevelTab = ({level}: {level: string}) => {
 return (
  <Pressable>
    <View style={styles.tabButton}>
      <Text style={styles.tabButtonText}>{level}</Text>
    </View>
  </Pressable>
 )
}

export default function ExternalDeckList() {

  return (
    <View>
      <Text>Deck List</Text>
      <View style={styles.tabList}>
        {Levels.map((level) => (
          <LevelTab level={level} key={level} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: Colors.gray[500], 
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: Colors.gray[500],
  },
  tabButtonText: {
    color: Colors.gray[100],
  }
})