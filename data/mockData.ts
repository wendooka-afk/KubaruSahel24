
import { Article, Video, Comment, Author } from '../types';
import { slugify } from '../utils';

// --- AUTHORS DATA ---

export const AUTHORS_FR: Record<string, Author> = {
  john: {
    id: '1',
    name: 'Amadou Diallo',
    role: 'Rédacteur en Chef',
    avatar: 'https://picsum.photos/seed/amadou/100/100',
    bio: 'Spécialiste de la géopolitique du Bassin du Lac Tchad. Amadou couvre les relations entre le Cameroun, le Tchad et le Nigeria, ainsi que les enjeux sécuritaires de la CBLT.',
    email: 'amadou.diallo@kubarusahel24.com',
    phone: '+237 690 123 456',
    socialMedia: {
      twitter: '@AmadouDiallo',
      linkedin: 'amadou-diallo-journalist'
    },
    joinedDate: '2020-01-15',
    articlesCount: 145,
    status: 'active'
  },
  fatou: {
    id: '2',
    name: 'Aïssatou Bello',
    role: 'Correspondante Maroua',
    avatar: 'https://picsum.photos/seed/fatou/100/100',
    bio: 'Basée au cœur de l\'Extrême-Nord, Aïssatou documente la vie quotidienne des populations du Septentrion, l\'impact du changement climatique sur le Lac et l\'entrepreneuriat féminin.',
    email: 'aissatou.bello@kubarusahel24.com',
    phone: '+237 677 234 567',
    socialMedia: {
      twitter: '@AissatouBello',
      facebook: 'aissatou.bello.journalist',
      instagram: '@aissatou_reports'
    },
    joinedDate: '2021-03-20',
    articlesCount: 98,
    status: 'active'
  },
  michel: {
    id: '3',
    name: 'Michel Abba',
    role: 'Analyste Économique',
    avatar: 'https://picsum.photos/seed/michel/100/100',
    bio: 'Expert des filières agro-industrielles (Coton, Bétail), Michel analyse les échanges transfrontaliers au hub de Kousseri et l\'économie de la zone CEMAC.',
    email: 'michel.abba@kubarusahel24.com',
    phone: '+237 699 345 678',
    socialMedia: {
      twitter: '@MichelAbbaEco',
      linkedin: 'michel-abba-economist'
    },
    joinedDate: '2019-11-10',
    articlesCount: 167,
    status: 'active'
  },
};

export const AUTHORS_EN: Record<string, Author> = {
  john: {
    id: '1',
    name: 'Amadou Diallo',
    role: 'Editor in Chief',
    avatar: 'https://picsum.photos/seed/amadou/100/100',
    bio: 'Specialist in the geopolitics of the Lake Chad Basin. Amadou covers relations between Cameroon, Chad, and Nigeria, as well as the security challenges of the LCBC.',
    email: 'amadou.diallo@kubarusahel24.com',
    phone: '+237 690 123 456',
    socialMedia: {
      twitter: '@AmadouDiallo',
      linkedin: 'amadou-diallo-journalist'
    },
    joinedDate: '2020-01-15',
    articlesCount: 145,
    status: 'active'
  },
  fatou: {
    id: '2',
    name: 'Aïssatou Bello',
    role: 'Maroua Correspondent',
    avatar: 'https://picsum.photos/seed/fatou/100/100',
    bio: 'Based in the heart of the Far North, Aïssatou documents the daily lives of Northern populations, the impact of climate change on the Lake, and female entrepreneurship.',
    email: 'aissatou.bello@kubarusahel24.com',
    phone: '+237 677 234 567',
    socialMedia: {
      twitter: '@AissatouBello',
      facebook: 'aissatou.bello.journalist',
      instagram: '@aissatou_reports'
    },
    joinedDate: '2021-03-20',
    articlesCount: 98,
    status: 'active'
  },
  michel: {
    id: '3',
    name: 'Michel Abba',
    role: 'Economic Analyst',
    avatar: 'https://picsum.photos/seed/michel/100/100',
    bio: 'Expert in agro-industrial sectors (Cotton, Livestock), Michel analyzes cross-border exchanges at the Kousseri hub and the economy of the CEMAC zone.',
    email: 'michel.abba@kubarusahel24.com',
    phone: '+237 699 345 678',
    socialMedia: {
      twitter: '@MichelAbbaEco',
      linkedin: 'michel-abba-economist'
    },
    joinedDate: '2019-11-10',
    articlesCount: 167,
    status: 'active'
  },
};

export const AUTHORS = AUTHORS_FR;

// --- COMMENTS DATA ---

export const COMMENTS_FR: Comment[] = [
  { id: '1', articleId: '1', author: 'Oumarou S.', email: 'oumarou@example.com', content: 'Enfin une stabilité électrique à Maroua ! Cela change tout pour nos commerces.', date: 'Il y a 2 heures', likes: 24, status: 'approved' },
  { id: '2', articleId: '3', author: 'Fadimatu', email: 'fadimatu@example.com', content: 'Il faut insister sur la scolarisation des filles, c\'est l\'avenir de notre région.', date: 'Il y a 4 heures', likes: 18, status: 'approved' },
  { id: '3', articleId: '22', author: 'Jean-Pierre', email: 'jeanpierre@example.com', content: 'Le parc de Waza est un joyau, espérons que les touristes reviennent vite.', date: 'Il y a 1 jour', likes: 9, status: 'approved' },
  { id: '4', articleId: '2', author: 'Halima M.', email: 'halima@example.com', content: 'Excellente nouvelle pour le commerce transfrontalier !', date: 'Il y a 3 heures', likes: 12, status: 'approved' },
  { id: '5', articleId: '1', author: 'Boukar', email: 'boukar@example.com', content: 'Spam message test', date: 'Il y a 1 heure', likes: 0, status: 'rejected' },
  { id: '6', articleId: '8', author: 'Mariama S.', email: 'mariama@example.com', content: 'La coopération régionale est essentielle pour notre développement.', date: 'Il y a 5 heures', likes: 15, status: 'pending' },
  { id: '7', articleId: '11', author: 'Ibrahim K.', email: 'ibrahim@example.com', content: 'Bravo aux producteurs de coton ! Cette récolte record est méritée.', date: 'Il y a 2 jours', likes: 8, status: 'approved' },
  { id: '8', articleId: '14', author: 'Sophie L.', email: 'sophie@example.com', content: 'Félicitations aux équipes sanitaires pour ce travail remarquable.', date: 'Il y a 6 heures', likes: 20, status: 'pending' },
];

export const COMMENTS_EN: Comment[] = [
  { id: '1', articleId: '1', author: 'Oumarou S.', email: 'oumarou@example.com', content: 'Finally electrical stability in Maroua! This changes everything for our businesses.', date: '2 hours ago', likes: 24, status: 'approved' },
  { id: '2', articleId: '3', author: 'Fadimatu', email: 'fadimatu@example.com', content: 'We must insist on girls\' schooling, it is the future of our region.', date: '4 hours ago', likes: 18, status: 'approved' },
  { id: '3', articleId: '22', author: 'Jean-Pierre', email: 'jeanpierre@example.com', content: 'Waza Park is a gem, let\'s hope tourists return quickly.', date: '1 day ago', likes: 9, status: 'approved' },
  { id: '4', articleId: '2', author: 'Halima M.', email: 'halima@example.com', content: 'Excellent news for cross-border trade!', date: '3 hours ago', likes: 12, status: 'approved' },
  { id: '5', articleId: '1', author: 'Boukar', email: 'boukar@example.com', content: 'Spam message test', date: '1 hour ago', likes: 0, status: 'rejected' },
  { id: '6', articleId: '8', author: 'Mariama S.', email: 'mariama@example.com', content: 'Regional cooperation is essential for our development.', date: '5 hours ago', likes: 15, status: 'pending' },
  { id: '7', articleId: '11', author: 'Ibrahim K.', email: 'ibrahim@example.com', content: 'Congratulations to cotton producers! This record harvest is well deserved.', date: '2 days ago', likes: 8, status: 'approved' },
  { id: '8', articleId: '14', author: 'Sophie L.', email: 'sophie@example.com', content: 'Congratulations to the health teams for this remarkable work.', date: '6 hours ago', likes: 20, status: 'pending' },
];

export const COMMENTS = COMMENTS_FR;

// --- ARTICLES DATA ---

export const ARTICLES_FR: Article[] = [
  {
    id: '1',
    title: "Énergie : Les centrales solaires de Maroua et Guider transforment le quotidien",
    excerpt: "La mise en service complète des parcs solaires modulaires stabilise enfin le réseau électrique dans le Grand-Nord.",
    content: `<p>Les champs de panneaux photovoltaïques de Guider et Maroua injectent désormais leur pleine puissance dans le Réseau Interconnecté Nord (RIN). Fini le temps où les groupes électrogènes thermiques peinaient à répondre à la demande.</p><p>Avec une capacité cumulée dépassant les 30 MW, ces installations permettent de réduire drastiquement les délestages qui handicapaient l'économie locale.</p>`,
    category: 'Économie',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-10-24T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe5bb626582f?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1250,
    isBreaking: false,
    seo: {
      slug: slugify("Énergie : Les centrales solaires de Maroua et Guider transforment le quotidien")
    }
  },
  {
    id: '2',
    title: "Sécurité : Réouverture complète du corridor Mora-Dabanga-Kousseri",
    excerpt: "Axe vital pour les échanges entre le Cameroun et le Tchad, la route nationale N°1 voit le trafic reprendre intensément.",
    content: `<p>Les camions chargés de marchandises s'étirent à nouveau sur le bitume en direction de N'Djamena. La sécurisation de l'axe Mora-Kousseri est une priorité absolue pour la stabilité régionale.</p>`,
    category: 'Politique',
    author: AUTHORS_FR.john,
    publishedAt: '2023-10-24T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
    readTime: 8,
    views: 3400,
    isBreaking: true,
    seo: {
      slug: slugify("Sécurité : Réouverture complète du corridor Mora-Dabanga-Kousseri")
    }
  },
  {
    id: '3',
    title: "Société : L'accès à l'eau potable s'améliore à Ngaoundéré",
    excerpt: "De nouveaux forages solaires ont été inaugurés dans les quartiers périphériques de la capitale de l'Adamaoua.",
    content: `<p>L'accès à l'eau potable reste un défi majeur. À Ngaoundéré, l'installation de nouveaux systèmes de pompage solaire offre un répit aux populations locales.</p>`,
    category: 'Société',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-10-23T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1541810228801-9874c7989d9c?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 890,
    isBreaking: false,
    seo: {
      slug: slugify("Société : L'accès à l'eau potable s'améliore à Ngaoundéré")
    }
  },
  {
    id: '4',
    title: "Culture : Le festival national des arts et de la culture de retour à Garoua",
    excerpt: "Les berges de la Bénoué s'apprêtent à accueillir les délégations de tout le pays pour une célébration de la diversité.",
    content: `<p>Garoua s'habille aux couleurs du patrimoine. Le FENAC promet une immersion totale dans les danses traditionnelles et l'artisanat local.</p>`,
    category: 'Culture',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-10-22T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 1560,
    isBreaking: false
  },
  {
    id: '5',
    title: "Régions : Développement local au Logone-et-Chari",
    excerpt: "Les maires de la région se concertent pour dynamiser les projets d'infrastructures rurales.",
    content: `<p>Le désenclavement des zones rurales est au centre des discussions à Kousseri. Les initiatives locales visent à faciliter l'écoulement des produits agricoles.</p>`,
    category: 'Régions',
    author: AUTHORS_FR.john,
    publishedAt: '2023-10-21T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    readTime: 7,
    views: 720,
    isBreaking: false
  },
  {
    id: '6',
    title: "Sport : Coton Sport de Garoua prêt pour la nouvelle saison",
    excerpt: "Les 'Cotonculteurs' affichent leurs ambitions pour conserver leur titre de champion du Cameroun.",
    content: `<p>Le club phare du Septentrion a entamé sa préparation physique intense au stade de Roumdé Adjia. Les supporters attendent de grandes performances.</p>`,
    category: 'Sport',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-10-20T16:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 2100,
    isBreaking: false
  },
  {
    id: '7',
    title: "Tech : Maroua devient un hub pour les startups du numérique",
    excerpt: "Un nouvel incubateur technologique soutient les jeunes développeurs de l'Extrême-Nord.",
    content: `<p>L'ouverture du "Sahel Tech Hub" permet de canaliser les talents locaux vers des solutions adaptées aux réalités régionales, notamment dans l'agritech.</p>`,
    category: 'Tech',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-10-19T13:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1100,
    isBreaking: false
  },
  // --- NOUVEAUX ARTICLES POLITIQUES ---
  {
    id: '8',
    title: "Diplomatie : Sommet extraordinaire de la CBLT à N'Djamena",
    excerpt: "Les chefs d'État du bassin du Lac Tchad se réunissent pour discuter de la sécurité et du climat.",
    content: `<p>Le sommet de N'Djamena marque un tournant dans la coopération régionale. Les enjeux sont triples : sécuritaires avec la lutte contre le terrorisme, écologiques avec le retrait des eaux, et humanitaires.</p>`,
    category: 'Politique',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-01T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 2800,
    isBreaking: false,
    seo: {
      slug: slugify("Diplomatie : Sommet extraordinaire de la CBLT à N'Djamena")
    }
  },
  {
    id: '9',
    title: "Gouvernance : La décentralisation s'accélère dans le Grand-Nord",
    excerpt: "De nouvelles compétences ont été transférées aux communes pour une gestion plus proche des citoyens.",
    content: `<p>Les mairies de Garoua et Ngaoundéré prennent désormais en charge la gestion directe des infrastructures scolaires et sanitaires de base.</p>`,
    category: 'Politique',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-02T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1450,
    isBreaking: false,
    seo: {
      slug: slugify("Gouvernance : La décentralisation s'accélère dans le Grand-Nord")
    }
  },
  {
    id: '10',
    title: "Élections : Préparatifs des sénatoriales dans l'Adamaoua",
    excerpt: "La commission électorale forme ses agents pour assurer un scrutin transparent.",
    content: `<p>À l'approche des élections sénatoriales, l'Adamaoua se mobilise. Les sessions de formation visent à garantir le bon déroulement du vote.</p>`,
    category: 'Politique',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-03T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1540910419868-474947ce5dd7?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 980,
    isBreaking: false,
    seo: {
      slug: slugify("Élections : Préparatifs des sénatoriales dans l'Adamaoua")
    }
  },
  // --- NOUVEAUX ARTICLES ÉCONOMIE ---
  {
    id: '11',
    title: "Agriculture : Record de production de coton cette année",
    excerpt: "La SODECOTON annonce des chiffres historiques grâce à de nouvelles techniques culturales.",
    content: `<p>Les efforts de modernisation portent leurs fruits. Les rendements à l'hectare ont augmenté de 25% dans les zones encadrées.</p>`,
    category: 'Économie',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-04T12:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 3100,
    isBreaking: true,
    seo: {
      slug: slugify("Agriculture : Record de production de coton cette année")
    }
  },
  {
    id: '12',
    title: "Transport : Le port sec de Ngaoundéré modernise ses équipements",
    excerpt: "Nouveau hub logistique, le site s'équipe pour fluidifier les échanges vers le Tchad et la RCA.",
    content: `<p>L'installation de nouveaux portiques de levage permet de réduire de moitié le temps de transit des marchandises arrivant par train depuis Douala.</p>`,
    category: 'Économie',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-05T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 1800,
    isBreaking: false,
    seo: {
      slug: slugify("Transport : Le port sec de Ngaoundéré modernise ses équipements")
    }
  },
  {
    id: '13',
    title: "Microfinance : L'essor des crédits agricoles pour les femmes du Sahel",
    excerpt: "Des coopératives féminines à Garoua transforment l'économie rurale grâce à l'accès au micro-crédit.",
    content: `<p>Plus de 500 femmes ont bénéficié de prêts pour l'achat de semences et de petits équipements de transformation de l'arachide.</p>`,
    category: 'Économie',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-06T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1250,
    isBreaking: false,
    seo: {
      slug: slugify("Microfinance : L'essor des crédits agricoles pour les femmes du Sahel")
    }
  },
  // --- NOUVEAUX ARTICLES SOCIÉTÉ ---
  {
    id: '14',
    title: "Santé : Fin de l'épidémie de choléra dans l'Extrême-Nord",
    excerpt: "Les autorités sanitaires confirment l'absence de nouveaux cas après trois mois de lutte intense.",
    content: `<p>La vigilance reste de mise, mais les campagnes de sensibilisation à l'hygiène ont porté leurs fruits dans les zones frontalières de Kousseri.</p>`,
    category: 'Société',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-07T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 2200,
    isBreaking: false,
    seo: {
      slug: slugify("Santé : Fin de l'épidémie de choléra dans l'Extrême-Nord")
    }
  },
  {
    id: '15',
    title: "Éducation : Le défi de l'école pour les enfants déplacés internes",
    excerpt: "À Maroua, des centres d'apprentissage temporaires accueillent des milliers d'enfants fuyant l'insécurité.",
    content: `<p>L'UNICEF et les autorités locales travaillent main dans la main pour assurer la continuité pédagogique malgré les traumatismes du déplacement.</p>`,
    category: 'Société',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-08T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    readTime: 8,
    views: 1650,
    isBreaking: false,
    seo: {
      slug: slugify("Éducation : Le défi de l'école pour les enfants déplacés internes")
    }
  },
  {
    id: '16',
    title: "Urbanisme : Garoua se dote d'un nouveau système de drainage",
    excerpt: "Les travaux visent à prévenir les inondations récurrentes lors de la saison des pluies.",
    content: `<p>Le projet financé par la Banque Mondiale transforme le visage des quartiers populaires de la ville de Garoua.</p>`,
    category: 'Société',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-09T13:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 990,
    isBreaking: false,
    seo: {
      slug: slugify("Urbanisme : Garoua se dote d'un nouveau système de drainage")
    }
  },
  // --- NOUVEAUX ARTICLES CULTURE ---
  {
    id: '17',
    title: "Patrimoine : La grande Fantasia de Maroua attire des milliers de curieux",
    excerpt: "Les cavaliers du Septentrion ont offert un spectacle équestre éblouissant sur la place de la grande mosquée.",
    content: `<p>Tradition ancestrale, la fantasia célèbre le lien entre l'homme et le cheval, emblème de noblesse et de courage dans les lamidats du Nord.</p>`,
    category: 'Culture',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-10T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 2900,
    isBreaking: false,
    seo: {
      slug: slugify("Patrimoine : La grande Fantasia de Maroua attire des milliers de curieux")
    }
  },
  {
    id: '18',
    title: "Artisanat : Le cuir de Ngaoundéré s'exporte désormais en Europe",
    excerpt: "Les tanneurs locaux adoptent des méthodes écologiques pour répondre aux normes internationales.",
    content: `<p>De la tannerie traditionnelle à la maroquinerie de luxe, les artisans de l'Adamaoua se modernisent sans perdre leur savoir-faire.</p>`,
    category: 'Culture',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-11T11:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1524292332709-b33366a7f141?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1100,
    isBreaking: false,
    seo: {
      slug: slugify("Artisanat : Le cuir de Ngaoundéré s'exporte désormais en Europe")
    }
  },
  {
    id: '19',
    title: "Littérature : Premier salon du livre du Grand-Nord à Garoua",
    excerpt: "Auteurs et poètes de la région se réunissent pour célébrer la langue Peule et le patrimoine écrit.",
    content: `<p>L'événement vise à encourager la lecture chez les jeunes et à promouvoir les auteurs locaux qui racontent le quotidien du Sahel.</p>`,
    category: 'Culture',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-12T15:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 750,
    isBreaking: false,
    seo: {
      slug: slugify("Littérature : Premier salon du livre du Grand-Nord à Garoua")
    }
  },
  // --- NOUVEAUX ARTICLES RÉGIONS ---
  {
    id: '20',
    title: "Logone-et-Chari : Construction d'un pont transfrontalier vers le Tchad",
    excerpt: "L'ouvrage permettra de booster les échanges commerciaux entre Kousseri et N'Djamena.",
    content: `<p>Ce nouveau pont est attendu depuis des décennies par les transporteurs et les commerçants de la zone CEMAC.</p>`,
    category: 'Régions',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-13T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1449156006073-95101183e536?auto=format&fit=crop&q=80&w=800',
    readTime: 7,
    views: 2400,
    isBreaking: false,
    seo: {
      slug: slugify("Logone-et-Chari : Construction d'un pont transfrontalier vers le Tchad")
    }
  },
  {
    id: '21',
    title: "Bénoué : Modernisation des périmètres hydro-agricoles de Lagdo",
    excerpt: "Le barrage de Lagdo s'équipe pour augmenter les capacités d'irrigation des rizières.",
    content: `<p>L'objectif est d'atteindre l'autosuffisance en riz pour tout le Septentrion d'ici trois ans grâce à l'extension des zones cultivables.</p>`,
    category: 'Régions',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-14T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 1300,
    isBreaking: false,
    seo: {
      slug: slugify("Bénoué : Modernisation des périmètres hydro-agricoles de Lagdo")
    }
  },
  {
    id: '22',
    title: "Extrême-Nord : Retour progressif des touristes au Parc de Waza",
    excerpt: "Après des années d'insécurité, les premiers safaris photo reprennent timidement dans la réserve.",
    content: `<p>Les guides forestiers et les hôtels locaux respirent. Le parc, célèbre pour ses éléphants et ses girafes, tente de reconquérir sa renommée mondiale.</p>`,
    category: 'Régions',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-15T13:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1950,
    isBreaking: false,
    seo: {
      slug: slugify("Extrême-Nord : Retour progressif des touristes au Parc de Waza")
    }
  },
  // --- NOUVEAUX ARTICLES SPORT ---
  {
    id: '23',
    title: "Infrastructure : Le stade de Roumdé Adjia aux normes internationales",
    excerpt: "Garoua s'apprête à accueillir des rencontres internationales de haut niveau.",
    content: `<p>Avec sa nouvelle pelouse hybride et son éclairage LED de pointe, le stade devient le joyau sportif du Grand-Nord.</p>`,
    category: 'Sport',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-16T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 3500,
    isBreaking: false,
    seo: {
      slug: slugify("Infrastructure : Le stade de Roumdé Adjia aux normes internationales")
    }
  },
  {
    id: '24',
    title: "Athlétisme : Succès pour la 10ème édition du Marathon du Sahel",
    excerpt: "Plus de 1000 coureurs ont bravé la chaleur pour cette compétition devenue incontournable à Maroua.",
    content: `<p>Des athlètes venus du Tchad et du Nigeria ont dominé les débats cette année, renforçant le caractère international de l'épreuve.</p>`,
    category: 'Sport',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-17T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1200,
    isBreaking: false
  },
  {
    id: '25',
    title: "Lutte : Tournoi traditionnel inter-régions à Ngaoundéré",
    excerpt: "Les meilleurs lutteurs de l'Adamaoua et du Nord se sont affrontés dans une ambiance électrique.",
    content: `<p>La lutte traditionnelle reste le sport le plus populaire dans les zones rurales, drainant des foules immenses à chaque compétition de village.</p>`,
    category: 'Sport',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-18T16:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 980,
    isBreaking: false
  },
  // --- NOUVEAUX ARTICLES TECH ---
  {
    id: '26',
    title: "Télécoms : Extension de la couverture fibre optique au Nord",
    excerpt: "Le déploiement de nouveaux câbles permet d'améliorer la connectivité internet à Garoua et Ngaoundéré.",
    content: `<p>Ce projet d'envergure vise à réduire la fracture numérique et à favoriser le développement des services en ligne pour les entreprises locales.</p>`,
    category: 'Tech',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-19T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1450,
    isBreaking: false
  },
  {
    id: '27',
    title: "Innovation : Une application pour aider les éleveurs du Sahel",
    excerpt: "Une startup de Maroua lance une plateforme pour géolocaliser les points d'eau et les pâturages.",
    content: `<p>L'outil utilise les données satellitaires pour informer en temps réel les éleveurs nomades, réduisant ainsi les conflits liés aux ressources.</p>`,
    category: 'Tech',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-20T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 2100,
    isBreaking: false
  },
  {
    id: '28',
    title: "E-santé : La télémédecine gagne du terrain à Maroua",
    excerpt: "Des centres de santé ruraux sont désormais connectés aux spécialistes de l'hôpital régional.",
    content: `<p>Grâce à la visioconférence et aux dossiers médicaux partagés, les diagnostics sont plus rapides et plus précis pour les populations reculées.</p>`,
    category: 'Tech',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-21T14:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1150,
    isBreaking: false
  },
  {
    id: '29',
    title: "Environnement : La Grande Muraille Verte avance dans le Nord",
    excerpt: "Des milliers d'acacias plantés pour freiner l'avancée du désert dans la région.",
    content: `<p>Le projet continental prend forme localement avec la mobilisation des communautés villageoises pour la reforestation des zones arides.</p>`,
    category: 'Société',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-22T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1800,
    isBreaking: false
  },
  {
    id: '30',
    title: "Économie : Découverte de nouveaux gisements miniers",
    excerpt: "Des études géologiques confirment le potentiel aurifère de la région de l'Est-Nord.",
    content: `<p>Cette découverte pourrait transformer l'économie locale, mais suscite aussi des inquiétudes quant à l'impact environnemental de l'extraction.</p>`,
    category: 'Économie',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-23T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 2500,
    isBreaking: true
  },
  {
    id: '31',
    title: "Société : Intégration réussie pour les réfugiés à Minawao",
    excerpt: "Le camp de réfugiés devient un modèle d'autonomisation grâce à l'agriculture.",
    content: `<p>Les réfugiés nigérians cultivent désormais leurs propres terres et vendent leurs produits sur les marchés locaux, favorisant la cohésion sociale.</p>`,
    category: 'Société',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-24T12:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1600,
    isBreaking: false
  },
  {
    id: '32',
    title: "Tech : Des drones pour surveiller les cultures",
    excerpt: "L'agriculture de précision débarque dans les plantations de coton.",
    content: `<p>L'utilisation de drones permet d'optimiser l'arrosage et de détecter précocement les maladies des plantes, augmentant ainsi les rendements.</p>`,
    category: 'Tech',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-25T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1350,
    isBreaking: false
  },
  {
    id: '33',
    title: "Culture : Préparatifs du Ramadan à Ngaoundéré",
    excerpt: "Les marchés s'animent à l'approche du mois sacré.",
    content: `<p>Les commerçants stockent les denrées alimentaires tandis que les mosquées se refont une beauté pour accueillir les fidèles.</p>`,
    category: 'Culture',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-26T15:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542627088-755745e128cc?auto=format&fit=crop&q=80&w=800',
    readTime: 3,
    views: 2100,
    isBreaking: false
  },
  {
    id: '34',
    title: "Politique : Accord de sécurité transfrontalier",
    excerpt: "Le Cameroun et le Nigeria renforcent leur coopération militaire.",
    content: `<p>Les deux pays s'engagent à patrouiller conjointement le long de la frontière pour lutter contre les groupes armés et les trafics illicites.</p>`,
    category: 'Politique',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-27T11:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 3100,
    isBreaking: true
  },
  {
    id: '35',
    title: "Régions : Réhabilitation du chemin de fer Transcamerounais",
    excerpt: "L'axe Yaoundé-Ngaoundéré va connaître une cure de jouvence.",
    content: `<p>Ces travaux sont cruciaux pour le désenclavement du Grand-Nord et le transport des marchandises vers le sud du pays.</p>`,
    category: 'Régions',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-11-28T08:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1900,
    isBreaking: false
  },
  {
    id: '36',
    title: "Sport : Lancement d'une académie de football à Garoua",
    excerpt: "Former les futurs Lions Indomptables, tel est l'objectif de ce nouveau centre.",
    content: `<p>Soutenue par des anciens internationaux, l'académie offrira une formation sportives et scolaire de haut niveau aux jeunes talents.</p>`,
    category: 'Sport',
    author: AUTHORS_FR.john,
    publishedAt: '2023-11-29T14:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1543326727-b52eb5db0f66?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1400,
    isBreaking: false
  },
  {
    id: '37',
    title: "Santé : Des cliniques mobiles sillonnent le Sahel",
    excerpt: "Apporter des soins aux populations nomades les plus isolées.",
    content: `<p>Ces unités médicales tout-terrain proposent des consultations, des vaccinations et des soins d'urgence dans les zones reculées.</p>`,
    category: 'Société',
    author: AUTHORS_FR.fatou,
    publishedAt: '2023-11-30T09:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1750,
    isBreaking: false
  },
  {
    id: '38',
    title: "Éducation : Inauguration de centres de formation professionnelle",
    excerpt: "Lutter contre le chômage des jeunes par l'apprentissage de métiers techniques.",
    content: `<p>Mécanique, menuiserie, couture... ces centres offrent des perspectives concrètes d'emploi à la jeunesse locale.</p>`,
    category: 'Société',
    author: AUTHORS_FR.michel,
    publishedAt: '2023-12-01T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1200,
    isBreaking: false
  }
];

export const ARTICLES_EN: Article[] = [
  {
    id: '1',
    title: "Energy: Maroua and Guider solar plants transform daily life",
    excerpt: "Full commissioning of modular solar parks finally stabilizes the electrical grid in the Far North.",
    content: `<p>Photovoltaic fields in Guider and Maroua are now injecting their full power into the Northern Interconnected Grid (RIN).</p>`,
    category: 'Économie',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-10-24T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe5bb626582f?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1250,
    isBreaking: false
  },
  {
    id: '2',
    title: "Security: Full reopening of the Mora-Dabanga-Kousseri corridor",
    excerpt: "A vital axis for trade between Cameroon and Chad, National Road No. 1 sees traffic resume intensely.",
    content: `<p>Trucks loaded with goods are once again stretching out on the asphalt toward N'Djamena. Securing the Mora-Kousseri axis is a top priority.</p>`,
    category: 'Politique',
    author: AUTHORS_EN.john,
    publishedAt: '2023-10-24T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
    readTime: 8,
    views: 3400,
    isBreaking: true
  },
  {
    id: '3',
    title: "Society: Access to drinking water improves in Ngaoundere",
    excerpt: "New solar boreholes have been inaugurated in the peripheral districts of the Adamaoua capital.",
    content: `<p>Access to safe water remains a major challenge. In Ngaoundere, solar pumping systems provide relief to local populations.</p>`,
    category: 'Société',
    author: AUTHORS_EN.fatou,
    publishedAt: '2023-10-23T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1541810228801-9874c7989d9c?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 890,
    isBreaking: false
  },
  {
    id: '4',
    title: "Culture: National Festival of Arts and Culture returns to Garoua",
    excerpt: "The banks of the Benue are preparing to host delegations for a celebration of diversity.",
    content: `<p>Garoua is dressed in heritage colors. The festival promises an immersion into traditional dances and local crafts.</p>`,
    category: 'Culture',
    author: AUTHORS_EN.fatou,
    publishedAt: '2023-10-22T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 1560,
    isBreaking: false
  },
  {
    id: '5',
    title: "Regions: Local development in Logone-et-Chari",
    excerpt: "Regional mayors are coordinating to boost rural infrastructure projects.",
    content: `<p>Unlocking rural areas is at the center of discussions to facilitate the flow of agricultural products.</p>`,
    category: 'Régions',
    author: AUTHORS_EN.john,
    publishedAt: '2023-10-21T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    readTime: 7,
    views: 720,
    isBreaking: false
  },
  {
    id: '6',
    title: "Sport: Coton Sport Garoua ready for the new season",
    excerpt: "The 'Cotonculteurs' are showing their ambitions to retain their Cameroonian champion title.",
    content: `<p>The flagship club of the North has begun its intense physical preparation for the new season.</p>`,
    category: 'Sport',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-10-20T16:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 2100,
    isBreaking: false
  },
  {
    id: '7',
    title: "Tech: Maroua becomes a hub for digital startups",
    excerpt: "A new tech incubator has opened to support young developers in the Far North.",
    content: `<p>The opening of this digital hub helps channel local talent into solutions adapted to regional realities.</p>`,
    category: 'Tech',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-10-19T13:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1100,
    isBreaking: false
  },
  // English translations for new articles would go here
  {
    id: '8',
    title: "Diplomacy: Extraordinary LCBC Summit in N'Djamena",
    excerpt: "Heads of state from the Lake Chad basin meet to discuss security and climate.",
    content: `<p>The summit marks a turning point in regional cooperation. Key issues include terrorism and climate change.</p>`,
    category: 'Politique',
    author: AUTHORS_EN.john,
    publishedAt: '2023-11-01T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 2800,
    isBreaking: true
  },
  {
    id: '11',
    title: "Cotton: Sodecoton announces record harvest of 350,000 tons",
    excerpt: "The cotton giant in the North returns to historical performances thanks to better support.",
    content: `<p>Farmers in Kaele and Mora are seeing their efforts rewarded with higher purchase prices per kilo.</p>`,
    category: 'Économie',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-11-04T11:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&q=80&w=800',
    readTime: 7,
    views: 3100,
    isBreaking: false
  },
  {
    id: '14',
    title: "Health: End of cholera epidemic in Far North",
    excerpt: "Health authorities confirm zero new cases after three months of intense struggle.",
    content: `<p>Vigilance remains, but hygiene awareness campaigns have proven effective in border areas.</p>`,
    category: 'Société',
    author: AUTHORS_EN.fatou,
    publishedAt: '2023-11-07T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 2200,
    isBreaking: false
  },
  {
    id: '29',
    title: "Environment: The Great Green Wall advances in the North",
    excerpt: "Thousands of acacias planted to curb desert encroachment in the region.",
    content: `<p>The continental project takes shape locally with the mobilization of village communities for reforestation of arid zones.</p>`,
    category: 'Société',
    author: AUTHORS_EN.fatou,
    publishedAt: '2023-11-22T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1800,
    isBreaking: false
  },
  {
    id: '30',
    title: "Economy: Discovery of new mining deposits",
    excerpt: "Geological studies confirm the gold potential of the East-North region.",
    content: `<p>This discovery could transform the local economy, but also raises concerns about the environmental impact of extraction.</p>`,
    category: 'Économie',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-11-23T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 2500,
    isBreaking: true
  },
  {
    id: '31',
    title: "Society: Successful integration for refugees in Minawao",
    excerpt: "The refugee camp becomes a model of empowerment through agriculture.",
    content: `<p>Nigerian refugees are now cultivating their own land and selling their produce in local markets, fostering social cohesion.</p>`,
    category: 'Société',
    author: AUTHORS_EN.john,
    publishedAt: '2023-11-24T12:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1600,
    isBreaking: false
  },
  {
    id: '32',
    title: "Tech: Drones to monitor crops",
    excerpt: "Precision agriculture arrives in cotton plantations.",
    content: `<p>Using drones optimizes watering and early detection of plant diseases, thus increasing yields.</p>`,
    category: 'Tech',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-11-25T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1350,
    isBreaking: false
  },
  {
    id: '33',
    title: "Culture: Ramadan preparations in Ngaoundere",
    excerpt: "Markets come alive as the holy month approaches.",
    content: `<p>Traders stock up on food items while mosques get a makeover to welcome the faithful.</p>`,
    category: 'Culture',
    author: AUTHORS_EN.fatou,
    publishedAt: '2023-11-26T15:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542627088-755745e128cc?auto=format&fit=crop&q=80&w=800',
    readTime: 3,
    views: 2100,
    isBreaking: false
  },
  {
    id: '34',
    title: "Politics: Cross-border security agreement",
    excerpt: "Cameroon and Nigeria strengthen their military cooperation.",
    content: `<p>The two countries commit to joint patrols along the border to fight against armed groups and illicit trafficking.</p>`,
    category: 'Politique',
    author: AUTHORS_EN.john,
    publishedAt: '2023-11-27T11:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1579370830761-dbbcd8488339?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 3100,
    isBreaking: true
  },
  {
    id: '35',
    title: "Regions: Rehabilitation of the Trans-Cameroon railway",
    excerpt: "The Yaounde-Ngaoundere axis will undergo a rejuvenation cure.",
    content: `<p>These works are crucial for opening up the Far North and transporting goods to the south of the country.</p>`,
    category: 'Régions',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-11-28T08:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1900,
    isBreaking: false
  },
  {
    id: '36',
    title: "Sport: Launch of a football academy in Garoua",
    excerpt: "Training future Indomitable Lions is the goal of this new center.",
    content: `<p>Supported by former internationals, the academy will offer high-level sports and academic training to young talents.</p>`,
    category: 'Sport',
    author: AUTHORS_EN.john,
    publishedAt: '2023-11-29T14:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1543326727-b52eb5db0f66?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1400,
    isBreaking: false
  },
  {
    id: '37',
    title: "Health: Mobile clinics tour the Sahel",
    excerpt: "Providing care to the most isolated nomadic populations.",
    content: `<p>These all-terrain medical units offer consultations, vaccinations, and emergency care in remote areas.</p>`,
    category: 'Société',
    author: AUTHORS_EN.fatou,
    publishedAt: '2023-11-30T09:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1750,
    isBreaking: false
  },
  {
    id: '38',
    title: "Education: Inauguration of vocational training centers",
    excerpt: "Fighting youth unemployment through technical skills training.",
    content: `<p>Mechanics, carpentry, sewing... these centers offer concrete job prospects to local youth.</p>`,
    category: 'Société',
    author: AUTHORS_EN.michel,
    publishedAt: '2023-12-01T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1200,
    isBreaking: false
  }
];

// Add the remaining articles manually to ensure total count is correct
const ADDED_ARTICLES_FR = [
  // Already included above
];

const ADDED_ARTICLES_EN = [
  // Already included above
];

export const VIDEOS_FR: Video[] = [
  { id: '1', title: "JT du Septentrion - Édition Spéciale Garoua", duration: "25:30", category: "Journal Télévisé", thumbnailUrl: "https://picsum.photos/seed/jtcam/600/400" },
  { id: '2', title: "Reportage : La montée des eaux à Yagoua", duration: "14:45", category: "Reportage de Terrain", thumbnailUrl: "https://picsum.photos/seed/flood/600/400" },
];

export const VIDEOS_EN: Video[] = [
  { id: '1', title: "Northern News - Garoua Special Edition", duration: "25:30", category: "Journal Télévisé", thumbnailUrl: "https://picsum.photos/seed/jtcam/600/400" },
  { id: '2', title: "Report: Rising waters in Yagoua", duration: "14:45", category: "Reportage de Terrain", thumbnailUrl: "https://picsum.photos/seed/flood/600/400" },
];

export const BREAKING_NEWS_FR = ARTICLES_FR.filter(a => a.isBreaking);
export const BREAKING_NEWS_EN = ARTICLES_EN.filter(a => a.isBreaking);
