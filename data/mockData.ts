
import { Article, Video, Comment, Author } from '../types';
import { slugify } from '../utils/slugify';

// --- AUTHORS DATA ---

export const AUTHORS_FR: Record<string, Author> = {
  eric: {
    id: '1',
    name: 'Eric NGUELE',
    role: 'Journaliste indépendant',
    avatar: 'https://picsum.photos/seed/eric/100/100',
    bio: 'Journaliste d\'investigation et analyste politique couvrant les enjeux de développement et de gouvernance au Cameroun.',
    email: 'eric.nguele@kubarusahel24.com',
    phone: '+237 000 000 000',
    socialMedia: {
      twitter: '@EricNguele',
      linkedin: 'eric-nguele'
    },
    joinedDate: '2023-01-01',
    articlesCount: 45,
    status: 'active'
  },
};

export const AUTHORS_EN: Record<string, Author> = {
  eric: {
    id: '1',
    name: 'Eric NGUELE',
    role: 'Independent Journalist',
    avatar: 'https://picsum.photos/seed/eric/100/100',
    bio: 'Investigative journalist and political analyst covering development and governance issues in Cameroon.',
    email: 'eric.nguele@kubarusahel24.com',
    phone: '+237 000 000 000',
    socialMedia: {
      twitter: '@EricNguele',
      linkedin: 'eric-nguele'
    },
    joinedDate: '2023-01-01',
    articlesCount: 45,
    status: 'active'
  },
};

export const AUTHORS = AUTHORS_FR;

// --- COMMENTS DATA ---

export const COMMENTS_FR: Comment[] = [
  { id: '1', articleId: '1', author: 'Oumarou S.', email: 'oumarou@example.com', content: 'Des projets ambitieux, mais qu\'en est-il de la réalité sur le terrain ?', date: 'Il y a 2 heures', likes: 24, status: 'approved' },
  { id: '2', articleId: '2', author: 'Halima M.', email: 'halima@example.com', content: 'Félicitations à la douane ! C\'est un coup dur pour les trafiquants.', date: 'Il y a 3 heures', likes: 12, status: 'approved' },
  { id: '3', articleId: '3', author: 'Jean-Pierre', email: 'jeanpierre@example.com', content: 'Bonne nouvelle pour l\'université de Ngaoundéré, cela va permettre de nouveaux investissements.', date: 'Il y a 1 jour', likes: 9, status: 'approved' },
  { id: '4', articleId: '4', author: 'Bakary', email: 'bakary@example.com', content: 'Il est temps que l\'Etat mobilise ces fonds pour le développement.', date: 'Il y a 5 heures', likes: 15, status: 'approved' },
  { id: '5', articleId: '5', author: 'Sali', email: 'sali@example.com', content: '3,1% c\'est encourageant, mais les prix au marché restent élevés.', date: 'Il y a 10 heures', likes: 7, status: 'approved' },
  { id: '6', articleId: '6', author: 'Abel', email: 'abel@example.com', content: '20 ans de prison, c\'est une vie. La page se tourne enfin.', date: 'Il y a 2 jours', likes: 21, status: 'approved' },
];

export const COMMENTS_EN: Comment[] = [
  { id: '1', articleId: '1', author: 'Oumarou S.', email: 'oumarou@example.com', content: 'Ambitious projects, but what is the reality on the ground?', date: '2 hours ago', likes: 24, status: 'approved' },
  { id: '2', articleId: '2', author: 'Halima M.', email: 'halima@example.com', content: 'Congratulations to customs! This is a major blow to traffickers.', date: '3 hours ago', likes: 12, status: 'approved' },
  { id: '3', articleId: '3', author: 'Jean-Pierre', email: 'jeanpierre@example.com', content: 'Good news for the University of Ngaoundere, this will allow for new investments.', date: '1 day ago', likes: 9, status: 'approved' },
  { id: '4', articleId: '4', author: 'Bakary', email: 'bakary@example.com', content: 'It is time for the State to mobilize these funds for development.', date: '5 hours ago', likes: 15, status: 'approved' },
  { id: '5', articleId: '5', author: 'Sali', email: 'sali@example.com', content: '3.1% is encouraging, but prices at the market remain high.', date: '10 hours ago', likes: 7, status: 'approved' },
  { id: '6', articleId: '6', author: 'Abel', email: 'abel@example.com', content: '20 years in prison is a lifetime. The page finally turns.', date: '2 days ago', likes: 21, status: 'approved' },
];

export const COMMENTS = COMMENTS_FR;

// --- ARTICLES DATA ---

export const ARTICLES_FR: Article[] = [
  {
    id: '1',
    title: "Cameroun/Développement : Ces projets qui sont restés dans les effets d’annonces",
    excerpt: "Des projets qui donnent l’impression que le président Paul Biya ne fait pas ce qu’il dit et remplit le Cameroun d’éléphants blancs et de dettes.",
    content: `<p>Cameroun/Développement</p>
<p>Ces projets qui sont restés dans les effets d’annonces.</p>
<p>Des projets qui donnent l’impression que le président Paul Biya ne fait pas ce qu’il dit et remplit le Cameroun d’éléphants blancs et de dettes à payer de générations en générations.</p>
<p>C’est la chronique de ce 21 Février de la journaliste Mimie Méfo qui met la puce à l’oreille et remet au goût du jour ces grandes annonces des septennats passés qui sont restées dans le registre des effets d’annonces des années après. La question à se poser est de savoir : qu’est ce qui coince ? Qu’est ce qui n’a pas marché ? Qui sont les acteurs derrière chaque projet ? Était-ce faisable au moment des annonces ? Peut-on les mettre en œuvre au cours de ce septennat en vue de conforter l’esprit des Camerounais en ce que l’émergence du Cameroun sera réelle à l’horizon 2035 tel que claironné depuis plus d’une décennie par l’ordre en place à Yaoundé ? La transfuge d’équinoxe Tv qui vit aujourd’hui en Occident a pour cela pris quelques projets majeurs en exemple.</p>
<ul>
<li><strong>Le Tramway de Douala.</strong> Annoncé en 2019 à grand renfort médiatique, dans une surabondance de discours et débauche de salives, ce projet est resté une vue de l’esprit et on aborde presque plus le sujet depuis quelques années.</li>
<li><strong>Le Bus Rapid Transit (BRT) de Yaoundé.</strong> C’était à l’époque la panacée pour la capitale Camerounaise pour résoudre les problèmes d’embouteillages et désengorger les rues aux heures de pointe notamment.</li>
<li><strong>Le téléphérique de Yaoundé.</strong> Promis en 2023, ces missions concurrençaient également le BRT afin de donner et diversifier les moyens de locomotion des habitants d « Ongola ».</li>
<li><strong>L’aéroport moderne de Kribi.</strong> Un projet qui allait donner une autre envergure à la cité balnéaire et doper le tourisme.</li>
<li><strong>La Centrale éolienne des monts Bamboutos</strong> annoncée en 2015. Dans le cadre du mix-énergétique, elle allait apporter 42MW pour soutenir la transition énergétique. Selon Mimie Mefo, le projet est resté dans les études plus d’une quinzaine d’années après.</li>
<li><strong>Le tour de Camtel.</strong> Son dévoilement en 2012 a fait rêver les millions de Camerounais, heureux de voir que la faîtière nationale en matière de téléphonie allait enfin consentir à être ambitieuse et donner aux Camerounais toute la grandeur qu’ils méritent. Hélas, le rêve jusqu’aujourd’hui s’est figé en une image capturée par les flashes des photographes ainsi que des mémoires qui se demandent : Où en est Camtel avec ce projet qui allait redessiner le visage de Yaoundé ?</li>
<li><strong>L’hôtel 5 étoile du Lac Municipal.</strong> Le projet est comme noyé dans les eaux du lac de Yaoundé.</li>
</ul>
<p>Pour Mimie Mefo, le hic n’est pas seulement « le retard », s’il s’avère que ce soit ainsi. Mais plutôt « l’habitude d’annoncer sans livrer », « l’habitude de promettre sans rendre compte ». Elle fait savoir que des pays à niveau comparable tel que le Burkina-Faso … (qui aurait pu imaginer qu’un jour on allait comparer le Cameroun au pays des hommes intègres tant le Cameroun est béni en tout…) réalisent des résultats concrets. Elle a clos sa pensée en se questionnant ou en questionnant le gouvernement Camerounais en ces termes : « Que faut-il pour que le Cameroun bénéficie réellement de toutes ces annonces ?</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Politique',
    author: AUTHORS_FR.eric,
    publishedAt: '2026-02-21T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 1500,
    isBreaking: true,
    seo: {
      slug: slugify("Cameroun Développement Ces projets qui sont restés dans les effets d'annonces")
    }
  },
  {
    id: '2',
    title: "Cameroun/Aéroport de Douala : Plus de 50 Milliards F CFA de Cocaïne et Tramadol saisis",
    excerpt: "Un coup de filet des services de la douane Camerounaise enregistré le 20 Février 2026 au cours d’un contrôle.",
    content: `<p>Cameroun/Aéroport de Douala</p>
<p>Plus de 50 Milliards F CFA de Cocaïne et Tramadol saisis.</p>
<p>Un coup de filet des services de la douane Camerounaise enregistré le 20 Février 2026 au cours d’un contrôle des marchandises à l’importation.</p>
<ul>
<li><strong>1057 Kg de Cocaïne et 1434 Kg de Tramadal.</strong> Soit un total de 2491 Kg de drogues et produits stupéfiants saisis le 20 février autour de 8H30 minutes dans le cadre d’un contrôle des marchandises à l’importation par les agents de subdivision commerciale de la douane Camerounaise à l’aéroport de Douala. En visite de travail dans la capitale régionale du Littoral, le ministre des finances, Louis Paul Motazé et son alter ego de la santé publique, Manaouda Malachie, se sont immédiatement rendus au terminal de fret concerné par cette arrestation particulière. La Cocaïne proviendrait de l’Allemagne et les 40 millions de comprimés Tramadal auraient été embarqués depuis l’Inde et le Sud Soudan selon les services de la Douane.</li>
</ul>
<p>Face aux membres du gouvernement, les agents de la douane Camerounaise ont fait savoir que plusieurs semaines après le débarquement de ces cargaisons ciblées et suivies, l’importateur ne s’est pas présenté pour les formalités et procédures de dédouanement et d’enlèvement de ses marchandises. La saisie quant à elle est estimée à 90 000 Dollars US, soit 50 Milliards F CFA. Des sources de la correspondances n°031 du 20 Février adressée par le chef de la subdivision commerciale du groupement actif du secteur des douanes du Littoral 2, Gabriel Ngah Nfor, au président du comité local de sureté de l’aéroport de Douala, le corps du délit, le procès-verbal de saisie ainsi que la lettre de transport aérien ont été mis à la disposition du Procureur de la République près le tribunal de grande instance du Wouri à Douala-Bonanjo pour la suite des enquêtes, conformément aux dispositions des articles 360-369 du code des douanes Cemac. La population Camerounaise salue sur toute l’étendue du triangle national ce coup de filet salvateur qui porte une estocade au trafic de drug et de stupéfiant qui sème la mort et la désolation dans de nombreuses familles Camerounaises. Au-delà de ses prérogatives de protection de l’économie nationale, la douane Camerounaise montre là une autre facette de ses missions régaliennes à savoir la défense et la sécurisation du territoire nationale.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Société',
    author: AUTHORS_FR.eric,
    publishedAt: '2026-02-20T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 2800,
    isBreaking: false,
    seo: {
      slug: slugify("Cameroun Aéroport de Douala Cocaïne et Tramadol saisis")
    }
  },
  {
    id: '3',
    title: "Cameroun/Université de Ngaoundéré : 1,5 Milliards F CFA de dettes fiscales apurées",
    excerpt: "Une ardoise accumulée entre 2017 et 2021 par l’institution universitaire des berges du Lac de Dang.",
    content: `<p>Cameroun /Université de Ngaoundéré</p>
<p>1,5 Milliards F CFA de dettes fiscales apurées.</p>
<p>Une ardoise accumulée entre 2017 et 2021 par l’institution universitaire des berges du Lac de Dang.</p>
<p>C’était l’une des grandes nouvelles de la dernière session ordinaire du conseil d’administration présidée en Janvier 2026 par son président Abdoulaye Adji. Dans son propos liminaire, Mamoudou Abdoulmoumini , recteur de l’université de Ngaoundéré a fait savoir que la dette que son institution traine tel un boulet depuis quelques années, est désormais résorbée. Il s’agit d’une dette fiscale d’1,5 Milliards F CFA accumulée entre les exercices budgétaires 2017 et 2021. C’est-à-dire qu’elle a été contractée avant sa nomination par décret présidentiel du 30 Août 2023.</p>
<p>Une ardoise qui est donc complètement payée. L’Université de Ngaoundéré a adopté pour l’exercice budgétaire 2026 une prévision de plus de 7 Milliards F CFA. Cet effacement de cette ardoise donne désormais au Recteur Abdoulmoumini et son aguste institution qui abrite déjà plus de 30 000 étudiants, des coudées franches pour rectifier sa trésorerie et avoir une enveloppe à allouer aux investissements. En rappel, l’université de Ngaoundéré n’a pas procédé aux investissements depuis aux moins 2 années successivement. Ceci, dans un contexte d’insuffisances d’offres infrastructurelles, en enseignants, en laboratoires et salles de travaux de pointe alors que le monde est plus que jamais ancrée dans l’ère de l’intelligence artificielle.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Économie',
    author: AUTHORS_FR.eric,
    publishedAt: '2026-01-15T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-152305085306e-88e4f6e447a1?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1250,
    isBreaking: false,
    seo: {
      slug: slugify("Cameroun Université de Ngaoundéré dettes fiscales apurées")
    }
  },
  {
    id: '4',
    title: "L'Etat à la recherche de 1650 Milliards F CFA",
    excerpt: "Le ministre des finances a présenté le 19 Février à Douala le plan de financement de l'Etat pour l'exercice 2026.",
    content: `<p>Le chef de l'Etat Camerounais Paul Biya a habilité le ministre des finances, Louis Paul Motazé, à mobiliser 1650 Milliards F CFA afin de permettre à l'Etat de soutenir ses différentes missions inscrites dans le budget de l'exercice 2026. Arrivée à Douala, l'argentier national a présenté le 19 Février le plan de financement de l'Etat et la stratégie appelée à encadrer cette mobilisation des ressources. Aussi, a-t-il été révélé que ce plan de financement est réparti ainsi qu'il suit :</p>
<ul>
<li>400 Milliards F CFA sur le marché domestique (OTA et Obligations)</li>
<li>1000 Milliards F CFA sur les marchés financiers internationaux</li>
<li>250 Milliards F CFA en prêts directs bancaires</li>
</ul>
<p>Sur la page du Minfi, l'on fait savoir qu'« un reliquat de 585 Milliards F CFA prévu sur les marchés internationaux fait déjà l'objet des discussions avancées ». Notamment avec la Banque Africaine de Développement et African Trade And Investment Development Insurance « en vue d'un mécanisme de rehaussement de crédit ». Sur le marché national, des opérations d'appels publics à l'épargne ont été annoncées pour le financement du développement du Cameroun.</p>
<p>A l'occasion, le ministre Louis Paul Motazé qui était accompagné par Paul Tasong, ministre délégué placé auprès du ministre de l'économie, de la planification et de l'aménagement du territoire, a tenu à magnifier ce qu'il appelle « un partenariat solide » construit depuis près de 15 ans avec les banques, les sociétés de bourses, les compagnies d'assurance, les établissements de micro-finance, les investisseurs institutionnels et l'ensemble des acteurs du marché financier. Des remerciements chaleureux ont été dits à l'endroit de la Banque des Etats de l'Afrique Centrale (BEAC) ainsi qu'au partenaire stratégique African Export-Import Bank (Afreximbank) qui met à disposition plus de 600 Milliards F CFA.</p>
<p>Le ministre a présenté un cadre macro-économique et des perspectives économiques encourageantes. Notamment, une croissance économique projetée à 4,3% en 2026 (lorsque l'INS projette à 3,1%), une dette publique soutenable situé aux environs de 42% du PIB et encore en-dessous du plafond communautaire de 70%, plus de 1325 Milliards F CFA mobilisés sur le marché monétaire de la Béac et 100% des échéances honorées. Comme quoi l'Etat Camerounais reste un bon risque et un bon payeur. Le 30 Janvier dernier à Londres, une émission obligataire de 750 Millions US Dollar avec la Citi, J.P Morgan et Cygnum Capital a été largement sursouscrite, confirmant la confiance des investisseurs internationaux et nationaux dans la signature du Cameroun.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Économie',
    author: AUTHORS_FR.eric,
    publishedAt: '2026-02-19T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1250,
    isBreaking: false,
    seo: {
      slug: slugify("L'Etat à la recherche de 1650 Milliards F CFA")
    }
  },
  {
    id: '5',
    title: "Le taux d'inflation à 3,1% selon l'INS",
    excerpt: "L'institut national de la statistique fait savoir que le taux d'inflation est en recul alors que depuis 2021 le pays connait une inflation à répétition.",
    content: `<p>C'est une information majeure livrée ce 23 février 2026 par l'institut national de la statistique. Le taux d'inflation est en net recul au Cameroun. De 5,7% en 2024, il est de 3,1 en 2025. Bien qu'en dessus d'1 point du seuil communautaire qui est de 3% (cadre des critères de convergences de la Cemac). Selon l'INS, cette baisse est due à un meilleur approvisionnement des marchés, un relâchement des tensions sur l'offre et des conditions logistiques fixes et sans grands changements après une période perturbée en Octobre et Novembre de 2025.</p>
<h3>Les villes les plus chères</h3>
<p>La ville de Ngaoundéré détient le taux d'inflation le plus élevé du Cameroun des sources de l'INS. La métropole de l'Adamaoua est à 4,3% et tient ce maillot jaune depuis bientôt un quinquennat. Le trio de tête des villes Camerounaises les plus chères est composé de Bamenda à 4,2% et Bafoussam. Buéa, Yaoundé sont au milieu du Tableau. Douala, Bertoua, Ebolowa et Garoua vivent une hausse contenue tandis que Maroua fête la queue avec 1,3%, le taux d'inflation le plus faible du pays. Les variations se jouent autour des coûts de transports, l'accessibilité des produits et les spécificités de réseaux d'approvisionnement.</p>
<h3>Des perspectives meilleures selon le FMI</h3>
<p>Le Pays de Paul Biya fait des efforts importants pour se rapprocher du seuil de 3% de la Cemac voir figurer en dessous à travers plusieurs politiques et mécanismes. Selon le Fonds Monétaire International, le Cameroun devrait voir sa croissance économique tourner autour de 3,3% en 2026. En 2028, la croissance devrait surpasser les 4% avec l'apport du secteur énergétique subordonnée à la levée de nombreux goulots qui butent la montée en puissance de plusieurs projets structurants. D'après le FMI, la stabilité des prix à moyen terme pourrait être entretenue par cette dynamique et améliorer le pouvoir d'achat des ménages. L'institution de Bretton Woods fait savoir que l'inflation pourrait descendre en dessous de 3% in 2026 pour se situer à 2,9% et se stabiliser autour de 2,5% d'ici à 2028 si d'importantes réformes structurelles continuent d'être conduites.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Économie',
    author: AUTHORS_FR.eric,
    publishedAt: '2026-02-23T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 980,
    isBreaking: false,
    seo: {
      slug: slugify("Le taux d'inflation à 3,1% selon l'INS")
    }
  },
  {
    id: '6',
    title: "Gérard Ondo Ndong libéré après 20 ans de prison",
    excerpt: "L'ex directeur général du Feicom a retrouvé la liberté ce 21 Février 2026.",
    content: `<p>Tout de blanc vêtu comme une souillure désormais expurgée de sa vie, Emmanuel Gérard Ondo Ndong a retrouvé la chaleur du cocon familial ce 21 Février après plus de 7300 jours derrière les geôles. Le cas de l'ex directeur général du fond spécial d'équipement et d'intervention inter-communal -FEICOM- est symbolique des procès dans le cadre de l'opération dite « épervier » au Cameroun, opération de lutte contre la corruption et d'assainissement des mœurs publiques engagée par le chef de l'Etat Paul Biya. Dans le cadre de l'affaire Ondo Ndong, il y'a eu après son arrestation la saisie et vente aux enchères de ses biens immobiliers et meubles au profit de l'Etat. Mis aux arrêts et gardé à la prison de Kondengui, il a passé ici l'essentiel de sa détention. Soit 20 ans pour les uns, voire 25 ans pour d'autres.</p>
<p>Tout débute en 2005 avec son limogeage de son poste de DG du FEICOM. Il est arrêté dans la foulée en 2006 et détenu à Kondengui. Les griefs font état d'un montant oscillant entre 35 et 50 Milliards F CFA de deniers publics détournés (54 Millions d'Euros) entre 2000 et 2005. Il est condamné en première instance in 2007 à 50 ans de prison ferme pour détournement, corruption et complicité. Jugement dont il fera appel. La peine sera réduite en appel à 20 ans.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Société',
    author: AUTHORS_FR.eric,
    publishedAt: '2026-02-21T12:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 2100,
    isBreaking: false,
    seo: {
      slug: slugify("Gérard Ondo Ndong libéré après 20 ans de prison")
    }
  },
];

export const ARTICLES_EN: Article[] = [
  {
    id: '1',
    title: "Cameroon/Development: These projects that remained in announcement effects",
    excerpt: "Projects that give the impression that President Paul Biya does not do what he says and fills Cameroon with white elephants and debts.",
    content: `<p>Cameroon/Development</p>
<p>These projects that remained in announcement effects.</p>
<p>Projects that give the impression that President Paul Biya does not do what he says and fills Cameroon with white elephants and debts to be paid from generation to generation.</p>
<p>It is the chronicle of this February 21 by journalist Mimie Méfo that alerts and brings up to date these major announcements of past seven-year terms that have remained in the register of announcement effects years later. The question to ask is: what is stuck? What didn't work? Who are the actors behind each project? Was it feasible at the time of the announcements? Can they be implemented during this seven-year term to reassure Cameroonians that Cameroon's emergence will be real by 2035 as heralded for more than a decade by the order in place in Yaoundé? The Equinox Tv defector who now lives in the West has taken a few major projects as examples for this.</p>
<ul>
<li><strong>The Douala Tramway.</strong> Announced in 2019 with a lot of media hype, in an overabundance of speeches and talk, this project has remained a figment of the imagination and the subject has hardly been mentioned for several years.</li>
<li><strong>The Yaoundé Bus Rapid Transit (BRT).</strong> It was at the time the panacea for the Cameroonian capital to solve traffic jam problems and unclog streets particularly during rush hours.</li>
<li><strong>The Yaoundé cable car.</strong> Promised in 2023, these missions also competed with the BRT to provide and diversify the means of locomotion for the inhabitants of "Ongola".</li>
<li><strong>The modern Kribi airport.</strong> A project that was going to give another dimension to the seaside city and boost tourism.</li>
<li><strong>The Bamboutos Mountains wind power plant</strong> announced in 2015. As part of the energy mix, it was going to provide 42MW to support the energy transition. According to Mimie Mefo, the project has remained in studies more than fifteen years later.</li>
<li><strong>The Camtel tower.</strong> Its unveiling in 2012 made millions of Cameroonians dream, happy to see that the national operator in terms of telephony was finally going to agree to be ambitious and give Cameroonians all the grandeur they deserve. Alas, the dream to this day has frozen in an image captured by photographers' flashes as well as memories that wonder: Where is Camtel with this project that was going to redesign the face of Yaoundé?</li>
<li><strong>The 5-star hotel of the Municipal Lake.</strong> The project is as if drowned in the waters of the lake of Yaoundé.</li>
</ul>
<p>For Mimie Mefo, the problem is not only "the delay", if it turns out to be so. But rather "the habit of announcing without delivering", "the habit of promising without reporting". She says that countries at a comparable level such as Burkina Faso ... (who could have imagined that one day we would compare Cameroon to the country of upright men, so much Cameroon is blessed in everything ...) achieve concrete results. She closed her thought by questioning or questioning the Cameroonian government in these terms: "What is needed for Cameroon to really benefit from all these announcements?"</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Politique',
    author: AUTHORS_EN.eric,
    publishedAt: '2026-02-21T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    readTime: 6,
    views: 1500,
    isBreaking: true,
    seo: {
      slug: slugify("Cameroon Development projects remains announcement effects")
    }
  },
  {
    id: '2',
    title: "Cameroon/Douala Airport: More than 50 Billion F CFA of Cocaine and Tramadol seized",
    excerpt: "A haul by Cameroonian customs services recorded on February 20, 2026 during an inspection.",
    content: `<p>Cameroon/Douala Airport</p>
<p>More than 50 Billion F CFA of Cocaine and Tramadol seized.</p>
<p>A haul by Cameroonian customs services recorded on February 20, 2026 during an inspection of imported goods.</p>
<ul>
<li><strong>1057 Kg of Cocaine and 1434 Kg of Tramadol.</strong> A total of 2491 Kg of drugs and narcotic products seized on February 20 around 8:30 AM in the context of an inspection of imported goods by agents of the commercial subdivision of Cameroonian customs at Douala airport. On a working visit to the regional capital of the Littoral, the Minister of Finance, Louis Paul Motazé, and his alter ego of public health, Manaouda Malachie, immediately went to the freight terminal concerned by this particular arrest. The Cocaine reportedly comes from Germany and the 40 million Tramadol tablets were allegedly shipped from India and South Sudan according to customs services.</li>
</ul>
<p>Before the members of the government, the Cameroonian customs agents stated that several weeks after the landing of these targeted and tracked cargoes, the importer did not appear for the customs clearance and removal procedures of his goods. The seizure is estimated at 90,000 US dollars, or 50 billion F CFA. According to sources in correspondence No. 031 of February 20 addressed by the head of the commercial subdivision of the active grouping of the customs sector of Littoral 2, Gabriel Ngah Nfor, to the president of the local safety committee of Douala airport, the corpus delicti, the seizure report, and the air waybill were made available to the Public Prosecutor at the Wouri High Court in Douala-Bonanjo for further investigations, in accordance with the provisions of articles 360-369 of the Cemac customs code. The Cameroonian population salutes throughout the national triangle this saving haul that strikes a blow to drug trafficking which sows death and desolation in many Cameroonian families. Beyond its prerogatives of protecting the national economy, Cameroonian customs shows here another facet of its sovereign missions, namely the defense and security of the national territory.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Société',
    author: AUTHORS_EN.eric,
    publishedAt: '2026-02-20T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 2800,
    isBreaking: false,
    seo: {
      slug: slugify("Cameroon Douala Airport Cocaine and Tramadol seized")
    }
  },
  {
    id: '3',
    title: "Cameroon/University of Ngaoundéré: 1.5 Billion F CFA of tax debts cleared",
    excerpt: "A debt accumulated between 2017 and 2021 by the university institution on the banks of Lake Dang.",
    content: `<p>Cameroon /University of Ngaoundéré</p>
<p>1.5 Billion F CFA of tax debts cleared.</p>
<p>A debt accumulated between 2017 and 2021 by the university institution on the banks of Lake Dang.</p>
<p>It was one of the big news items of the last ordinary session of the board of directors chaired in January 2026 by its president Abdoulaye Adji. In his introductory remarks, Mamoudou Abdoulmoumini, rector of the University of Ngaoundéré, stated that the debt that his institution has been dragging like a ball and chain for a few years is now absorbed. It is a tax debt of 1.5 billion F CFA accumulated between the 2017 and 2021 fiscal years. That is to say, it was contracted before his appointment by presidential decree on August 30, 2023.</p>
<p>A debt that is therefore completely paid. The University of Ngaoundéré adopted for the 2026 budget exercise a projection of more than 7 billion F CFA. This clearance of this debt now gives Rector Abdoulmoumini and his august institution, which already houses more than 30,000 students, a free hand to rectify its treasury and have an envelope to allocate to investments. As a reminder, the University of Ngaoundéré has not carried out investments for at least 2 consecutive years. This, in a context of insufficient infrastructure offers, in teachers, in laboratories, and high-tech work rooms while the world is more than ever anchored in the era of artificial intelligence.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Économie',
    author: AUTHORS_EN.eric,
    publishedAt: '2026-01-15T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-152305085306e-88e4f6e447a1?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 1250,
    isBreaking: false,
    seo: {
      slug: slugify("Cameroon University of Ngaoundere tax debts cleared")
    }
  },
  {
    id: '4',
    title: "The State in search of 1650 Billion F CFA",
    excerpt: "The Minister of Finance presented the funding plan of the State for the 2026 financial year in Douala on February 19.",
    content: `<p>The Cameroonian Head of State Paul Biya has empowered the Minister of Finance, Louis Paul Motazé, to mobilize 1650 Billion F CFA to enable the State to support its various missions included in the 2026 financial year budget. Arrived in Douala, the national treasurer presented on February 19 the State's financing plan and the strategy called to supervise this resource mobilization. Also, it was revealed that this financing plan is distributed as follows:</p>
<ul>
<li>400 Billion F CFA on the domestic market (OTA and Bonds)</li>
<li>1000 Billion F CFA on international financial markets</li>
<li>250 Billion F CFA in direct bank loans</li>
</ul>
<p>On the Minfi page, it is stated that "a balance of 585 Billion F CFA planned on international markets is already the subject of advanced discussions". Particularly with the African Development Bank and African Trade And Investment Development Insurance "viewing a credit enhancement mechanism". On the national market, public calls for savings operations have been announced for the funding of Cameroon's development.</p>
<p>On the occasion, Minister Louis Paul Motazé who was accompanied by Paul Tasong, Minister Delegate to the Minister of Economy, Planning and Regional Development, held to magnify what he calls "a solid partnership" built for nearly 15 years with banks, stock exchange companies, insurance companies, micro-finance institutions, institutional investors and all financial market players. Warm thanks were said to the Bank of Central African States (BEAC) as well as to the strategic partner African Export-Import Bank (Afreximbank) which makes available more than 600 Billion F CFA.</p>
<p>The Minister presented a macro-economic framework and encouraging economic perspectives. Notably, an economic growth projected at 4.3% in 2026 (while the INS projects at 3.1%), a sustainable public debt located around 42% of GDP and still below the community ceiling of 70%, more than 1325 Billion F CFA mobilized on the Béac monetary market and 100% of deadlines honored. As if the Cameroonian State remains a good risk and a good payer. Last January 30 in London, a 750 Million US Dollar bond issue with Citi, J.P Morgan and Cygnum Capital was broadly oversubscribed, confirming the trust of international and national investors in Cameroon's signature.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Économie',
    author: AUTHORS_EN.eric,
    publishedAt: '2026-02-19T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 1250,
    isBreaking: false,
    seo: {
      slug: slugify("The State in search of 1650 Billion F CFA")
    }
  },
  {
    id: '5',
    title: "Inflation rate at 3.1% according to INS",
    excerpt: "The National Institute of Statistics reports that the inflation rate is declining while the country has experienced repeated inflation since 2021.",
    content: `<p>This is major information delivered this February 23, 2026 by the National Institute of Statistics. The inflation rate is in clear decline in Cameroon. From 5.7% in 2024, it is 3.1% in 2025. Although 1 point above the community threshold which is 3% (Cemac convergence criteria framework). According to the INS, this drop is due to better supply of markets, a loosening of tensions on supply and fixed logistical conditions without major changes after a period disturbed in October and November of 2025.</p>
<h3>The most expensive cities</h3>
<p>The city of Ngaoundéré holds the highest inflation rate in Cameroon from INS sources. The Adamaoua metropolis is at 4.3% and has held this yellow jersey for nearly a five-year term. The head trio of the most expensive Cameroonian cities is composed of Bamenda at 4.2% and Bafoussam. Buéa, Yaoundé are in the middle of the table. Douala, Bertoua, Ebolowa and Garoua experience contained growth while Maroua brings up the rear with 1.3%, the lowest inflation rate in the country. Variations play out around transport costs, accessibility of products and supply network specificities.</p>
<h3>Better perspectives according to the IMF</h3>
<p>Paul Biya's country is making important efforts to approach the Cemac threshold of 3% or even fall below through several policies and mechanisms. According to the International Monetary Fund, Cameroon should see its economic growth turn around 3.3% in 2026. In 2028, growth should surpass 4% with the contribution of the energy sector subject to the removal of many bottlenecks that block the rise of several structural projects. According to the IMF, price stability in the medium term could be maintained by this dynamic and improve household purchasing power. The Bretton Woods institution reports that inflation could drop below 3% in 2026 to stand at 2.9% and stabilize around 2.5% by 2028 if important structural reforms continue to be conducted.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Économie',
    author: AUTHORS_EN.eric,
    publishedAt: '2026-02-23T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    readTime: 5,
    views: 980,
    isBreaking: false,
    seo: {
      slug: slugify("Inflation rate at 3.1% according to INS")
    }
  },
  {
    id: '6',
    title: "Gérard Ondo Ndong released after 20 years in prison",
    excerpt: "The ex-director general of Feicom regained his freedom this February 21, 2026.",
    content: `<p>All dressed in white as if a stain were now purged from his life, Emmanuel Gérard Ondo Ndong regained the warmth of the family cocoon this February 21 after more than 7300 days behind bars. The case of the former Director General of the Special Fund for Equipment and Inter-municipal Intervention -FEICOM- is symbolic of trials in the framework of the operation called "épervier" (sparrowhawk) in Cameroon, an anti-corruption operation and cleaning up of public morals initiated by Head of State Paul Biya. In the Ondo Ndong case, there was after his arrest the seizure and auction of his real estate and furniture for the benefit of the State. Put under arrest and kept at Kondengui prison, he spent the bulk of his detention here. Either 20 years for some, or 25 years for others.</p>
<p>It all starts in 2005 with his dismissal from his post of DG of FEICOM. He is arrested in the wake in 2006 and detained at Kondengui. The grievances state an amount oscillating between 35 and 50 Billion F CFA of embezzled public funds (54 Million Euros) between 2000 and 2005. He was sentenced in first instance in 2007 to 50 years in prison for embezzlement, corruption and complicity. A judgment he appealed. The sentence was reduced on appeal to 20 years.</p>
<p style="text-align:right;"><strong>Eric NGUELE</strong></p>`,
    category: 'Société',
    author: AUTHORS_EN.eric,
    publishedAt: '2026-02-21T12:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    readTime: 4,
    views: 2100,
    isBreaking: false,
    seo: {
      slug: slugify("Gérard Ondo Ndong libéré après 20 ans de prison")
    }
  },
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
