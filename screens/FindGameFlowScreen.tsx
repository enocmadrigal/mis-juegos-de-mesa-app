import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import AllOurGamesScreen from "./AllOurGamesScreen";
import { games } from "../data/games";

type Step = "players" | "duration" | "categories" | "result";

const allCategories = Array.from(
  new Set(games.flatMap(g => g.categories))
);

export default function FindGameFlowScreen({
  navigation,
}: {
  navigation: { goBack: () => void }
}) {
  const [step, setStep] = useState<Step>("players");
  const [players, setPlayers] = useState<string>("");
  const [duration, setDuration] = useState<number | null>(null);
  const [showDurationMenu, setShowDurationMenu] = useState(false);
  const [filterCategories, setFilterCategories] = useState<null | boolean>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[] | null>(null);
  const [showFilteredModal, setShowFilteredModal] = useState(false);

  // Opciones de duración (en minutos)
  const durationOptions = [
    10, 15, 20, 30, 40, 45, 50, 60, 75, 90, 120, 180
  ];

  // Paso 1: ¿Cuántos jugadores?
  if (step === "players") {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>¿Cuántos jugadores son?</Text>
        <TextInput
          style={styles.input}
          keyboardType={Platform.OS === "ios" || Platform.OS === "android" ? "number-pad" : "numeric"}
          inputMode="numeric"
          maxLength={2}
          value={players}
          onChangeText={setPlayers}
          placeholder="Jugadores"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={styles.button}
          disabled={!players || isNaN(Number(players)) || Number(players) < 1}
          onPress={() => setStep("duration")}
        >
          <Text style={styles.buttonText}>Siguiente pregunta</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Paso 2: ¿Cuánto tiempo máximo tienen?
  if (step === "duration") {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>¿Cuánto tiempo máximo tienen?</Text>
        <View style={styles.inputMenuWrapper}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDurationMenu(!showDurationMenu)}
          >
            <Text style={{ color: duration ? "#222" : "#aaa" }}>
              {duration ? `${duration} mins` : "Selecciona tiempo"}
            </Text>
          </TouchableOpacity>
          {/* Menú absolutamente posicionado y centrado respecto al input */}
          {showDurationMenu && (
            <View style={styles.menuOverlay} pointerEvents="box-none">
              <ScrollView
                style={styles.menu}
                contentContainerStyle={{ alignItems: 'center' }}
                persistentScrollbar
                showsVerticalScrollIndicator
              >
                {durationOptions.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.menuItem}
                    onPress={() => {
                      setDuration(opt);
                      setShowDurationMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>{opt} mins</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            disabled={!duration}
            onPress={() => setStep("categories")}
          >
            <Text style={styles.buttonText}>Siguiente pregunta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Paso 3: ¿Filtrar por categorías?
  if (step === "categories" && filterCategories === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>¿Quieres filtrar por categorías?</Text>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <TouchableOpacity
            style={[styles.button, { marginRight: 12 }]}
            onPress={() => setFilterCategories(true)}
          >
            <Text style={styles.buttonText}>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep("result")}
          >
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Paso 4: Selección de categorías
  if (step === "categories" && filterCategories === true) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Categorías</Text>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          {allCategories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBox,
                selectedCategories.includes(cat) && styles.categoryBoxSelected
              ]}
              onPress={() => {
                setSelectedCategories(selectedCategories.includes(cat)
                  ? selectedCategories.filter(c => c !== cat)
                  : [...selectedCategories, cat]);
              }}
            >
              <Text style={[
                styles.categoryText,
                selectedCategories.includes(cat) && styles.categoryTextSelected
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setStep("result")}
        >
          <Text style={styles.buttonText}>Ver juegos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Paso final: mostrar juegos filtrados
  if (step === "result") {
    // Filtrado
    const numPlayers = Number(players);
    let filtered = games.filter(g =>
      g.minPlayers <= numPlayers &&
      g.maxPlayers >= numPlayers &&
      g.minDuration <= (duration ?? 999) &&
      g.maxDuration >= (duration ?? 0)
    );
    if (filterCategories && selectedCategories.length > 0) {
      filtered = filtered.filter(g =>
        selectedCategories.every(cat => g.categories.includes(cat))
      );
    }

    // Si no hay juegos, muestra mensaje en pantalla blanca
    if (filtered.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.question}>
            No tenemos juegos que hagan match con esos criterios :(
          </Text>
          <Text style={styles.tryOtherText}>
            Intenta con otros criterios
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver al menú</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Mostrar el modal de AllOurGamesScreen con los juegos filtrados
    if (!showFilteredModal) {
      setFilteredGames(filtered);
      setShowFilteredModal(true);
      return null;
    }

    return (
      <AllOurGamesScreen
        isVisible={showFilteredModal}
        onGoToHomeButtonPress={() => {
          setShowFilteredModal(false);
          setFilteredGames(null);
          navigation.goBack();
        }}
        filteredGames={filteredGames}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    justifyContent: "center"
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d06666ff",
    marginBottom: 16, // antes 32, reduce espacio debajo de la pregunta
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#d06666ff",
    borderRadius: 12,
    padding: 12,
    fontSize: 22,
    width: 220,
    textAlign: "center",
    marginBottom: 1, // antes 32, reduce espacio debajo del input
    backgroundColor: "#fff",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#d06666ff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  inputMenuWrapper: {
    width: 220,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    zIndex: 10,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    zIndex: 1, // El botón queda debajo del menú
  },
  menuOverlay: {
    position: 'absolute',
    top: 56,
    left: 0,
    width: 220,
    zIndex: 9999,
    elevation: 30,
    // El menú se centra respecto al input y puede salirse del modal si el modal tiene overflow: 'visible'
  },
  menu: {
    maxHeight: 120,
    width: 220,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d06666ff",
    borderRadius: 12,
    marginBottom: 0,
    zIndex: 10,
    elevation: 10,
    overflow: 'hidden', // <-- Asegura que los valores no se salgan del menú
  },
  menuItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  menuItemText: {
    fontSize: 18,
    color: "#d06666ff"
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 24
  },
  categoryBox: {
    borderWidth: 1,
    borderColor: "#d06666ff",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    margin: 6,
    backgroundColor: "#fff"
  },
  categoryBoxSelected: {
    backgroundColor: "#d06666ff"
  },
  categoryText: {
    color: "#d06666ff",
    fontWeight: "bold"
  },
  categoryTextSelected: {
    color: "#fff"
  },
  resultBox: {
    borderWidth: 1,
    borderColor: "#d06666ff",
    borderRadius: 12,
    padding: 18,
    margin: 10,
    backgroundColor: "#fff"
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d06666ff"
  },
  resultSubtitle: {
    fontSize: 16,
    color: "#444",
    marginTop: 4
  },
  tryOtherText: {
    fontSize: 24,
    color: "#d06666ff",
    textAlign: "center",
    marginTop: 24,
    fontWeight: "bold",
  },
});

