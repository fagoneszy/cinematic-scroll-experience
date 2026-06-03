import { SectionData } from './types';
import img1 from './assets/images/architecture_monolith_mist_1780500255908.png';
import img2 from './assets/images/concrete_curves_minimal_1780500272123.png';
import img3 from './assets/images/misty_pine_peaks_1780500288445.png';
import img4 from './assets/images/abstract_cosmic_light_1780500303530.png';
import img5 from './assets/images/minimalist_horizon_ocean_1780500318664.png';

export const SECTIONS_DATA: SectionData[] = [
  {
    id: 1,
    sectionId: 'hero-section',
    title: "O Silêncio das Palavras",
    subtitle: "01 // O POEMA OCULTO",
    description: "No vão entre uma palavra e outra, habita o poema que nunca foi escrito. O silêncio não é ausência — é a forma mais pura de existência. Cada pausa carrega séculos de significados não ditos, esperando o instante certo para ecoar na alma de quem ousa escutar.",
    imageUrl: img1,
    location: "ENTRE O DITO E O NÃO DITO",
    coordinates: "∞.∞° N, ∞.∞° E"
  },
  {
    id: 2,
    sectionId: 'circle-reveal-section',
    title: "A Dança do Efêmero",
    subtitle: "02 // INSTANTES QUE BRILHAM",
    description: "Tudo o que é belo dura apenas um sopro. As pétalas caem, a luz se inclina, os segundos fogem como pássaros ao entardecer. Mas na dança do efêmero encontramos a eternidade — não no que permanece, mas no que nos transforma ao partir.",
    imageUrl: img2,
    location: "DANÇA DOS INSTANTES",
    coordinates: "47.37° N, 08.54° E"
  },
  {
    id: 3,
    sectionId: 'parallax-section',
    title: "O Abismo Interior",
    subtitle: "03 // PROFUNDEZAS DA ALMA",
    description: "Descemos camadas como quem desfolha um livro antigo. Cada verso revela um abismo novo, cada estrofe desnuda uma verdade esquecida. O abismo interior não é vazio — é plenitude que ainda não aprendemos a nomear. Mergulhar é o único caminho para o alto.",
    imageUrl: img3,
    location: "ABISMO DA ALMA",
    coordinates: "46.52° N, 09.81° E"
  },
  {
    id: 4,
    sectionId: 'zoom-section',
    title: "O Instante Eterno",
    subtitle: "04 // AGORA ABSOLUTO",
    description: "O tempo não é uma linha reta — é um círculo que dança sobre si mesmo. Passado e futuro se encontram na ponta do agora, nesse instante que se abre como um portal. Cada segundo contém uma eternidade inteira, cada pulsação carrega o ritmo do universo.",
    imageUrl: img4,
    location: "RODA DO TEMPO",
    coordinates: "35.67° N, 139.65° E"
  },
  {
    id: 5,
    sectionId: 'final-section',
    title: "POR HOJE É SÓ",
    subtitle: "05 // ETERNIDADE EM PAUSA",
    description: "O poema não termina — ele se dissolve no mar do indizível. As palavras retornam ao silêncio de onde vieram, e o que resta não é fim, mas o eco de tudo que foi sentido. No último verso, a página em branco se torna o maior dos poemas.",
    imageUrl: img5,
    location: "MAR DO INDIZÍVEL",
    coordinates: "55.67° N, 12.56° E"
  }
];
