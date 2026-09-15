export type Comune = {
  slug: string;
  nome: string;
  descrizione: string;
  vicini: string[];
};

export const COMUNI: Comune[] = [
  {
    slug: 'gaeta',
    nome: 'Gaeta',
    descrizione: 'Città di mare tra borgo medievale e quartiere Serapo, con tante seconde case e attività stagionali: utenze che spesso restano ferme su contratti vecchi e costosi.',
    vicini: ['Formia', 'Itri', 'Sperlonga'],
  },
  {
    slug: 'minturno',
    nome: 'Minturno',
    descrizione: 'Tra Aurelia e costa, con Scauri e le frazioni collinari: case familiari e piccole attività che pagano bollette importanti tutto l\'anno.',
    vicini: ['Scauri', 'Formia', 'Spigno Saturnia'],
  },
  {
    slug: 'sperlonga',
    nome: 'Sperlonga',
    descrizione: 'Perla del Tirreno: seconde case e stabilimenti che consumano a stagione ma pagano quote fisse tutto l\'anno. Qui la durata del prezzo pesa più che altrove.',
    vicini: ['Itri', 'Fondi', 'Gaeta'],
  },
  {
    slug: 'itri',
    nome: 'Itri',
    descrizione: 'Borgo collinare tra Formia e Fondi: tante case singole con consumi gas invernali alti, dove la scelta dell\'offerta giusta si sente eccome.',
    vicini: ['Formia', 'Gaeta', 'Sperlonga'],
  },
  {
    slug: 'terracina',
    nome: 'Terracina',
    descrizione: 'Città dal tessuto ampio: famiglie, negozi e stabilimenti balneari. Ogni tipologia ha la sua offerta giusta, e quasi mai è quella che ha oggi.',
    vicini: ['Fondi', 'Priverno', 'Sperlonga'],
  },
  {
    slug: 'fondi',
    nome: 'Fondi',
    descrizione: 'Area agricola e commerciale vasta: attività, serre e magazzini con consumi energetici importanti, dove un\'offerta sbagliata costa migliaia di euro.',
    vicini: ['Terracina', 'Itri', 'Lenola'],
  },
  {
    slug: 'latina',
    nome: 'Latina',
    descrizione: 'Il capoluogo: condomini, appartamenti e piccole imprese. Anche in città, il confronto bolletta per bolletta resta il modo più onesto per risparmiare.',
    vicini: ['Priverno', 'Sezze', 'Sabaudia'],
  },
];

export const getComune = (slug: string) => COMUNI.find((c) => c.slug === slug);
