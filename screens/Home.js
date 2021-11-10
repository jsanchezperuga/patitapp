import React from 'react'
import { View, Text } from 'react-native'
import PetsList from '../components/PetsList'

export default function Home() {
  return (
    <View style={{flex: 1}}> 
      {/* Implementar mapa/integracion con google maps?? */}
      {/* Por mientras, mostrar una lista con los pedidos de busqueda y encontrados */}

      {/* por que si no tiene el style flex en android no funciona?? */}
      <PetsList title="Mascotas Perdidas" pets={mascotasPerdidas}  />
      <PetsList title="Mascotas Encontradas" pets={mascotasEncontradas}  />
    </View>
  )
}

// ejemplo que se va a obtener desde firebase
const mascotasPerdidas = [
  {id: "7082b7af-8a2c-453e-85b0-8e19d4ccfbbf", title: "Perro raza grande perdido!!", image: "https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/kraken_generic_max_width_960/public/purina-7-razas-de-perros-grandes-para-lugares-espaciosos.png?itok=EtrqNqaB"},
  {id: "c098a96a-021d-454e-bae6-95904888bfa8", title: "Chiguaga marron responde a nombre de Lazie", image: "https://i.pinimg.com/236x/86/0a/bf/860abf2c83e17fbca40a8e17af082db8--chihuahua-dogs-pet-dogs.jpg"},
  {id: "b0fcbf9d-378d-492e-8789-110acb05ae6b", title: "Gato blanco cola corta", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDY32G6pXAxySzaxjaIwW63Crj8ZcsiOCvA&usqp=CAU"},
  {id: "251132a3-0b7a-425a-a429-1a75743211a0", title: "(Zona Devoto) caniche toy blanco", image: "https://image.freepik.com/foto-gratis/pequeno-cachorro-caniche-toy-dorado-jardin_126745-1792.jpg"}
]

const mascotasEncontradas = [
  {id: "4ea3ec0e-50b0-4ab1-8835-42ac85e4776e", title: "Caniche toy blanco (Devoto)", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStJ9J3loc1RIB62GQ_txwcjPTLN6uyyOMd7g&usqp=CAU"},
  {id: "e204f10f-c071-42f7-89f3-7af53953ffe5", title: "Tortuga de agua encontrada en Berazategui", image: "https://www.fanmascotas.com/wp-content/uploads/2017/05/tortuga-de-agua-640x480.jpg"},
  {id: "e8bdc6b2-1ad1-4b6c-bd9a-a69375cab72d", title: "Perra viejita de unos 9 años encontrada", image: "https://res.cloudinary.com/postedin/image/upload/d_mascotas:no-image.jpg,f_auto,q_80/mascotas/c-postedin-image-32482.jpeg"}
]