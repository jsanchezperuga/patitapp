const Titles = {
  LOST_MSG: ["Ej: Se perdió Lola", "Ej: Buscamos a Milo (cachorrito)", "Ej: Se perdió mi perro Pepe", "Ej: Ayudanos a encontrar a Lulu", "Ej: Se perdió Toto"],
  FOUND_MSG: ["Ej: Encontramos una perrita raza chica", "Ej: Buscamos dueño caniche toy blanco", "Ej: Ayudanos a encontrar el dueño de esta gata"]
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function (type) {
  if (type == "lost") {
    let length = Titles.LOST_MSG.length;
    return { formTitle: "Crear aviso de perdido", titlePlaceHolder: Titles.LOST_MSG[randomInteger(0, length - 1)], areaPlaceHolder: "Barrio en el que se perdió", locationInfoText: "Mantenga presionado el marcador rojo dentro del area que se perdió la mascota", collection: "lostPets" }
  } else if (type == "found") {
    let length = Titles.FOUND_MSG.length;
    return { formTitle: "Crear aviso de encontrado", titlePlaceHolder: Titles.FOUND_MSG[randomInteger(0, length - 1)], areaPlaceHolder: "Barrio en el que fue encontrado", locationInfoText: "Mantenga presionado el marcador rojo dentro del area donde encontró la mascota", collection: "foundPets" }
  }
}