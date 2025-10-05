import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, useWindowDimensions } from "react-native";
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
  const [step, setStep] = useState<Step | "entry">("entry");
  const [players, setPlayers] = useState<string>("");
  const [duration, setDuration] = useState<number | null>(null);
  const [showDurationMenu, setShowDurationMenu] = useState(false);
  const [filterCategories, setFilterCategories] = useState<null | boolean>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[] | null>(null);
  const [showFilteredModal, setShowFilteredModal] = useState(false);

  const { width } = useWindowDimensions();
  const isDesktop = width > 700;

  // Opciones de duración (en minutos)
  const durationOptions = [
    10, 15, 20, 30, 40, 45, 50, 60, 75, 90, 120, 180
  ];

  // Pantalla de entrada: dos botones de filtro
  if (step === "entry") {
    // Cambia la lógica: en desktop (width > 700) usa row, en móvil usa column
    const BUTTON_GAP = 16;
    const BUTTON_PERCENT = 0.9;
    const isDesktop = width > 700;
    const containerStyle = isDesktop
      ? { flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }
      : { flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" };

    return (
      <View style={[styles.entryBg, { flex: 1 }]}>
        <View style={[styles.entryContainer, containerStyle]}>
          <TouchableOpacity
            style={[
              styles.entryBox,
              {
                width: isDesktop ? `${BUTTON_PERCENT * 100 / 2}%` : `${BUTTON_PERCENT * 100}%`,
                height: isDesktop ? `${BUTTON_PERCENT * 100}%` : `${BUTTON_PERCENT * 100 / 2}%`,
                marginRight: isDesktop ? BUTTON_GAP : 0,
                marginBottom: !isDesktop ? BUTTON_GAP : 0,
              }
            ]}
            onPress={() => {
              setFilterCategories(false);
              setStep("players");
            }}
          >
            <Text style={styles.entryTitle}>Filtrar por num. jugadores y tiempo</Text>
            <Text style={styles.entryDesc}>Encuentra juegos según cuántos son y el tiempo disponible</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.entryBox,
              {
                width: isDesktop ? `${BUTTON_PERCENT * 100 / 2}%` : `${BUTTON_PERCENT * 100}%`,
                height: isDesktop ? `${BUTTON_PERCENT * 100}%` : `${BUTTON_PERCENT * 100 / 2}%`,
                marginRight: 0,
                marginBottom: 0,
              }
            ]}
            onPress={() => {
              setFilterCategories(true);
              setStep("categories");
            }}
          >
            <Text style={styles.entryTitle}>Filtrar por categoría</Text>
            <Text style={styles.entryDesc}>Encuentra juegos por tipo, temática o mecánica</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Paso 1: ¿Cuántos jugadores? (solo si filterCategories === false)
  if (step === "players" && filterCategories === false) {
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

  // Paso 2: ¿Cuánto tiempo máximo tienen? (solo si filterCategories === false)
  if (step === "duration" && filterCategories === false) {
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
            onPress={() => setStep("result")}
          >
            <Text style={styles.buttonText}>Ver juegos</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Paso 3: ¿Filtrar por categorías?
  if (step === "categories" && filterCategories === null) {
    // Nunca se mostrará porque ahora siempre es true/false según el botón de entrada
    return null;
  }

  // Paso 4: Selección de categorías (solo si filterCategories === true)
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
    const numPlayers = Number(players);
    let filtered = games;

    // Si filtro por jugadores/tiempo
    if (filterCategories === false) {
      filtered = filtered.filter(g =>
        g.minPlayers <= numPlayers &&
        g.maxPlayers >= numPlayers &&
        g.averageDuration <= (duration ?? 999)
      );
    }

    // Si filtro por categorías
    if (filterCategories === true && selectedCategories.length > 0) {
      filtered = filtered.filter(g =>
        g.categories.some(cat => selectedCategories.includes(cat))
      );
    }

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
  entryBg: {
    flex: 1,
    backgroundColor: "#d06666", // rojo de la letra
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  entryContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  entryBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // width y height se calculan dinámicamente
  },
  entryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d06666ff",
    marginBottom: 8,
    textAlign: "center",
  },
  entryDesc: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
});

/*
Lógica aplicada en cada paso/pregunta del flujo:

1. Paso "players":
   - Pregunta: ¿Cuántos jugadores son?
   - Lógica: El usuario ingresa un número de jugadores. Solo permite avanzar si el valor es un número válido mayor a 0.

2. Paso "duration":
   - Pregunta: ¿Cuánto tiempo máximo tienen?
   - Lógica: El usuario selecciona el tiempo máximo disponible para jugar (en minutos) de una lista de opciones. Solo permite avanzar si se selecciona una opción.

3. Paso "categories" (primera parte):
   - Pregunta: ¿Quieres filtrar por categorías?
   - Lógica: El usuario elige SI o NO. Si elige NO, pasa directo al filtrado final. Si elige SI, pasa a seleccionar categorías.

4. Paso "categories" (segunda parte):
   - Pregunta: Selecciona las categorías
   - Lógica: El usuario puede seleccionar una o varias categorías de la lista. Al presionar "Ver juegos", se realiza el filtrado final.

5. Paso "result":
   - Lógica de filtrado:
     a) El número de jugadores debe estar dentro del rango permitido por el juego (`minPlayers` y `maxPlayers`).
     b) El tiempo promedio del juego (`averageDuration`) debe ser menor o igual al tiempo máximo seleccionado por el usuario.
     c) Si se seleccionaron categorías, el juego debe incluir al menos una de las categorías seleccionadas (OR).
   - Si hay coincidencias, se muestran los juegos filtrados en el modal de AllOurGamesScreen.
   - Si no hay coincidencias, se muestra un mensaje indicando que no hay juegos que hagan match con esos criterios y se ofrece volver al menú.

Resumen:
- Cada paso recolecta un criterio de filtrado.
- El filtrado final aplica todos los criterios juntos para mostrar solo los juegos que cumplen con todo.
- El campo de duración ahora es `averageDuration` y la comparación es directa contra el filtro de tiempo máximo.
- El filtrado por categorías ahora es OR (al menos una categoría debe coincidir).
*/

