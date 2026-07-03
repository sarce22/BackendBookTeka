import { connect, disconnect } from 'mongoose';
import * as dotenv from 'dotenv';
import BookModel from './src/models/book.model';

dotenv.config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/bookteka';

const libros = [
  // Acción
  { name: 'El Último Agente', price: '45000', isbn: 'ACT-001', description: 'Un ex espía debe volver al campo para salvar a su hija de un sindicato del crimen.', category: 'Acción', author: 'Jack Reacher', urlImage: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?q=80&w=500&auto=format&fit=crop' },
  { name: 'Fuego Cruzado', price: '38000', isbn: 'ACT-002', description: 'Dos bandas rivales en un fuego cruzado donde solo puede quedar uno vivo.', category: 'Acción', author: 'Mark Owen', urlImage: 'https://images.unsplash.com/photo-1595180665243-d9d28373322d?q=80&w=500&auto=format&fit=crop' },
  { name: 'Operación Tormenta', price: '52000', isbn: 'ACT-003', description: 'Una misión de rescate en el desierto se complica con la tormenta de arena del siglo.', category: 'Acción', author: 'Tom Clancy', urlImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=500&auto=format&fit=crop' },
  { name: 'Venganza Letal', price: '41000', isbn: 'ACT-004', description: 'No descansará hasta encontrar a los responsables de destruir su vida.', category: 'Acción', author: 'Vince Flynn', urlImage: 'https://images.unsplash.com/photo-1587391157140-5b583f7aee3b?q=80&w=500&auto=format&fit=crop' },
  { name: 'Zona Cero', price: '47000', isbn: 'ACT-005', description: 'Un atentado en el centro financiero desencadena una cacería internacional.', category: 'Acción', author: 'Brad Thor', urlImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=500&auto=format&fit=crop' },

  // Poesia
  { name: 'Versos del Alma', price: '25000', isbn: 'POE-001', description: 'Una colección íntima que explora los rincones más profundos del sentimiento humano.', category: 'Poesia', author: 'Gabriela Mistral', urlImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=500&auto=format&fit=crop' },
  { name: 'Susurros de Otoño', price: '22000', isbn: 'POE-002', description: 'Poemas escritos mientras caen las hojas, melancolía y esperanza entrelazadas.', category: 'Poesia', author: 'Mario Benedetti', urlImage: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=500&auto=format&fit=crop' },
  { name: 'Noches en Vela', price: '28000', isbn: 'POE-003', description: 'Versos crudos sobre el insomnio, el amor perdido y los recuerdos imborrables.', category: 'Poesia', author: 'Alejandra Pizarnik', urlImage: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=500&auto=format&fit=crop' },
  { name: 'El Mar Interno', price: '30000', isbn: 'POE-004', description: 'Reflexiones sobre la inmensidad del yo y el caos de las emociones.', category: 'Poesia', author: 'Pablo Neruda', urlImage: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=500&auto=format&fit=crop' },
  { name: 'Flores de Papel', price: '20000', isbn: 'POE-005', description: 'Sutileza y belleza efímera capturadas en rimas simples pero poderosas.', category: 'Poesia', author: 'Octavio Paz', urlImage: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=500&auto=format&fit=crop' },

  // Romance
  { name: 'Bajo el Mismo Cielo', price: '35000', isbn: 'ROM-001', description: 'Dos jóvenes se encuentran en París y viven una semana que cambiará sus vidas.', category: 'Romance', author: 'Nicholas Sparks', urlImage: 'https://images.unsplash.com/photo-1518621845118-2dfe09758760?q=80&w=500&auto=format&fit=crop' },
  { name: 'Promesas Rotas', price: '32000', isbn: 'ROM-002', description: 'Una historia de segundas oportunidades cuando el primer amor regresa al pueblo.', category: 'Romance', author: 'Jojo Moyes', urlImage: 'https://images.unsplash.com/photo-1511988617509-2404362be474?q=80&w=500&auto=format&fit=crop' },
  { name: 'El Hilo Rojo', price: '40000', isbn: 'ROM-003', description: 'El destino siempre encuentra la manera de unir a los que están destinados a amarse.', category: 'Romance', author: 'Alice Kellen', urlImage: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=500&auto=format&fit=crop' },
  { name: 'Un Invierno Contigo', price: '38000', isbn: 'ROM-004', description: 'Atrapados en una cabaña en medio de la nieve, la pasión surge para derretir el hielo.', category: 'Romance', author: 'Megan Maxwell', urlImage: 'https://images.unsplash.com/photo-1491295995256-4c478a873837?q=80&w=500&auto=format&fit=crop' },
  { name: 'Cartas del Pasado', price: '36000', isbn: 'ROM-005', description: 'Una vieja caja de cartas revela un secreto familiar y da inicio a un nuevo romance.', category: 'Romance', author: 'Elísabet Benavent', urlImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=500&auto=format&fit=crop' },

  // Paranormal
  { name: 'Sombras de Salem', price: '42000', isbn: 'PAR-001', description: 'Brujas, maldiciones y un investigador paranormal que no cree en la magia.', category: 'Paranormal', author: 'Stephen King', urlImage: 'https://images.unsplash.com/photo-1509314959114-1ce5d259cce3?q=80&w=500&auto=format&fit=crop' },
  { name: 'El Eco del Espejo', price: '45000', isbn: 'PAR-002', description: 'La nueva dueña de una casa antigua descubre que los espejos reflejan otro mundo.', category: 'Paranormal', author: 'Shirley Jackson', urlImage: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=500&auto=format&fit=crop' },
  { name: 'Nocturno', price: '39000', isbn: 'PAR-003', description: 'Vampiros que no brillan al sol, sino que gobiernan desde las sombras.', category: 'Paranormal', author: 'Anne Rice', urlImage: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=500&auto=format&fit=crop' },
  { name: 'La Quinta Fase', price: '48000', isbn: 'PAR-004', description: 'Apariciones que escalan desde simples ruidos hasta posesiones completas.', category: 'Paranormal', author: 'Joe Hill', urlImage: 'https://images.unsplash.com/photo-1533552755457-5b43063f9157?q=80&w=500&auto=format&fit=crop' },
  { name: 'Voces de Ultratumba', price: '41000', isbn: 'PAR-005', description: 'Una medium intenta salvar el alma de un niño atrapado en un sanatorio abandonado.', category: 'Paranormal', author: 'Mariana Enríquez', urlImage: 'https://images.unsplash.com/photo-1505500690771-470076a5b8da?q=80&w=500&auto=format&fit=crop' },

  // Ciencia Ficción
  { name: 'Más allá de Orión', price: '50000', isbn: 'CIFI-001', description: 'Una expedición encuentra ruinas alienígenas que cambian la historia humana.', category: 'Ciencia Ficción', author: 'Isaac Asimov', urlImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop' },
  { name: 'Ciudad de Neón', price: '46000', isbn: 'CIFI-002', description: 'Cyberpunk clásico. Un detective busca a un androide rebelde en las calles empapadas de neón.', category: 'Ciencia Ficción', author: 'William Gibson', urlImage: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop' },
  { name: 'El Código Estelar', price: '55000', isbn: 'CIFI-003', description: 'Un programador descubre que nuestro universo es una simulación cuántica.', category: 'Ciencia Ficción', author: 'Neal Stephenson', urlImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop' },
  { name: 'Evolución Z', price: '49000', isbn: 'CIFI-004', description: 'Un experimento genético para curar enfermedades resulta en la próxima especie dominante.', category: 'Ciencia Ficción', author: 'Michael Crichton', urlImage: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?q=80&w=500&auto=format&fit=crop' },
  { name: 'La Última Frontera', price: '52000', isbn: 'CIFI-005', description: 'La colonia en Marte enfrenta su primer invierno y no están solos en el planeta rojo.', category: 'Ciencia Ficción', author: 'Andy Weir', urlImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=500&auto=format&fit=crop' }
];

async function seed() {
  try {
    await connect(DB_URI);
    console.log('Conectado a MongoDB...');
    
    // Primero, limpiar los libros existentes para evitar duplicados de ISBN (opcional, mejor los borramos todos para tener los 25 puros y probar bien)
    await BookModel.deleteMany({});
    console.log('Colección de libros limpiada.');
    
    const docs = await BookModel.insertMany(libros);
    console.log(`${docs.length} libros insertados exitosamente!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error poblando libros:', error);
    process.exit(1);
  }
}

seed();
