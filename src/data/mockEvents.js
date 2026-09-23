export const INITIAL_CITIES = [
  { id: 'all', name: 'Todas as Cidades', state: 'BR' },
  { id: 'sp', name: 'São Paulo', state: 'SP' },
  { id: 'rj', name: 'Rio de Janeiro', state: 'RJ' },
  { id: 'ctba', name: 'Curitiba', state: 'PR' },
  { id: 'bh', name: 'Belo Horizonte', state: 'MG' },
  { id: 'fln', name: 'Florianópolis', state: 'SC' },
  { id: 'bsb', name: 'Brasília', state: 'DF' },
  { id: 'ssa', name: 'Salvador', state: 'BA' }
];

export const GENRE_FILTERS = [
  { id: 'all', label: 'Todos os Estilos', icon: 'Sparkles' },
  { id: 'Eletrônica', label: 'Eletrônica & Techno', icon: 'Radio' },
  { id: 'Funk', label: 'Funk & Mandelão', icon: 'Flame' },
  { id: 'Pagode', label: 'Pagode & Samba', icon: 'Music' },
  { id: 'Rock', label: 'Rock & Pub', icon: 'Guitar' },
  { id: 'Sertanejo', label: 'Sertanejo Universitário', icon: 'Wine' },
  { id: 'Pop', label: 'Pop & Disco', icon: 'Disc' },
  { id: 'Trap', label: 'Trap & Hip-Hop', icon: 'Zap' }
];

export const DATE_FILTERS = [
  { id: 'all', label: 'Todas as Datas' },
  { id: 'today', label: '🔥 Hoje à Noite' },
  { id: 'tomorrow', label: 'Amanhã' },
  { id: 'weekend', label: 'Fim de Semana' },
  { id: 'upcoming', label: 'Próximos Dias' }
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todos os Tipos' },
  { id: 'Balada', label: 'Balada & Club' },
  { id: 'Pub & Bar', label: 'Pub & Bar' },
  { id: 'Rooftop', label: 'Rooftop & Lounge' },
  { id: 'Festival', label: 'Festival & Rave' }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'NEON PULSE | Melodic Techno & Visual Show',
    tagline: 'Uma experiência sensorial imersiva com lasers e grave pulsante',
    venue: 'Subterrâneo Club',
    city: 'São Paulo',
    neighborhood: 'Barra Funda',
    address: 'Rua Olga, 340 - Barra Funda, São Paulo - SP',
    dateLabel: 'Hoje, 23:00',
    dateCategory: 'today',
    time: '23:00 às 07:00',
    category: 'Balada',
    genre: 'Eletrônica',
    status: 'HOJE • VAI BOMBAR',
    price: 'R$ 60 - R$ 120',
    ticketUrl: 'https://exemplo-ingressos.com/neon-pulse',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    promo: '🍸 Double Gin Tropical até 00:30 • Entrada com copo oficial da tour',
    ageLimit: '18+',
    dressCode: 'Streetwear / Balada Noturna',
    vibeScore: 98,
    isLiked: false,
    likesCount: 342,
    isGoing: false,
    attendeesCount: 189,
    attendees: [
      { id: 'u1', name: 'Lucas Alencar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
      { id: 'u2', name: 'Beatriz Lima', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
      { id: 'u3', name: 'Matheus Costa', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80' },
      { id: 'u4', name: 'Larissa Rocha', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80' },
      { id: 'u5', name: 'Felipe Dias', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '23:00 - 01:00', artist: 'Kaelen (Warm-up)', role: 'Deep & Progressive', ig: '@kaelenmusic' },
      { time: '01:00 - 03:30', artist: 'ANNA ECLIPSE', role: 'Headliner (Afterlife Sound)', ig: '@annaeclipse.dj' },
      { time: '03:30 - 05:30', artist: 'VINTAGE FUTURE (Live)', role: 'Melodic Techno Set', ig: '@vintagefuture' },
      { time: '05:30 - 07:00', artist: 'CYBERVIBE B2B VOID', role: 'Closing After Hours', ig: '@cybervibe' }
    ],
    comments: [
      { id: 'c1', user: 'Thiago Neves', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', text: 'Esse set da Anna Eclipse vai ser histórico! Alguém saindo de Pinheiros pra dividir Uber?', time: 'Há 25 min', likes: 14 },
      { id: 'c2', user: 'Camila Rossi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'Cheguem antes da meia-noite galera, a fila da Barra Funda costuma dobrar a esquina!', time: 'Há 1 hora', likes: 28 }
    ],
    tags: ['Sound System Funktion-One', 'Área Externa', 'Guarda-Volumes', 'Ar-Condicionado']
  },
  {
    id: 'evt-2',
    title: 'BAILE DO MANDRAKE | A Noite do Megabaile',
    tagline: 'Os maiores hits do funk paulista e mandelão sem parar',
    venue: 'Arena Nitro Lounge',
    city: 'São Paulo',
    neighborhood: 'Tatuapé',
    address: 'Av. Radial Leste, 1850 - Tatuapé, São Paulo - SP',
    dateLabel: 'Hoje, 22:30',
    dateCategory: 'today',
    time: '22:30 às 06:00',
    category: 'Balada',
    genre: 'Funk',
    status: 'LOTANDO RÁPIDO',
    price: 'R$ 40 - R$ 90',
    ticketUrl: 'https://exemplo-ingressos.com/baile-mandrake',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    promo: '🔥 Combo de Whisky + Energético com 30% OFF até 00h • Mulheres VIP até 23:30',
    ageLimit: '18+',
    dressCode: 'Estilo Livre / Oakley / Lacoste',
    vibeScore: 96,
    isLiked: false,
    likesCount: 512,
    isGoing: false,
    attendeesCount: 320,
    attendees: [
      { id: 'u6', name: 'Jonathan Silva', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80' },
      { id: 'u7', name: 'Natália Ramos', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
      { id: 'u8', name: 'Renato Santos', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '22:30 - 00:30', artist: 'DJ Biel MPC', role: 'Aquecimento Ritmo Louco', ig: '@djbielmpc' },
      { time: '00:30 - 02:30', artist: 'MC MENOR DO BEAT', role: 'Show Nacional com Banda', ig: '@menordobeat' },
      { time: '02:30 - 04:30', artist: 'DJ PATRICK BH', role: 'MegaFunk & Mandelão', ig: '@patrickbhdj' },
      { time: '04:30 - 06:00', artist: 'DJ GUILHERME DA ZL', role: 'Inimigos do Fim', ig: '@djguizl' }
    ],
    comments: [
      { id: 'c3', user: 'Enzo Ferrari', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80', text: 'Show do Menor do Beat é garantia de loucura! Presença mais que confirmada!', time: 'Há 40 min', likes: 19 }
    ],
    tags: ['Camarote Open Bar', 'Estacionamento Seguro', 'Narguilé Liberado na Área Externa']
  },
  {
    id: 'evt-3',
    title: 'SAMBA & PAGODE DA DIRETORIA | Roda 360°',
    tagline: 'Cerveja gelada, feijoada opcional e o melhor do pagode 90 e atual',
    venue: 'Quintal do Samba 021',
    city: 'Rio de Janeiro',
    neighborhood: 'Lapa',
    address: 'Rua do Riachuelo, 89 - Lapa, Rio de Janeiro - RJ',
    dateLabel: 'Amanhã, 17:00',
    dateCategory: 'tomorrow',
    time: '17:00 às 02:00',
    category: 'Pub & Bar',
    genre: 'Pagode',
    status: 'AMANHÃ • CLÁSSICO',
    price: 'R$ 30 (Lista amiga)',
    ticketUrl: 'https://exemplo-ingressos.com/samba-diretoria',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    promo: '🍺 Balde com 6 Cervejas Long Neck por R$ 55 até 19:00 • Dose dupla de Caipirinha',
    ageLimit: '18+',
    dressCode: 'Casual / Leve / Roda de Samba',
    vibeScore: 94,
    isLiked: false,
    likesCount: 280,
    isGoing: false,
    attendeesCount: 175,
    attendees: [
      { id: 'u9', name: 'Rafaela Albuquerque', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
      { id: 'u10', name: 'Diego Ferreira', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '17:00 - 19:30', artist: 'Grupo Na Palma da Mão', role: 'Abertura & Samba Raiz', ig: '@napalmadamaosamba' },
      { time: '19:30 - 22:30', artist: 'GRUPO SURPRESA 360°', role: 'Clássicos dos Anos 90 e Hits Atuais', ig: '@gruposurpresa' },
      { time: '22:30 - 02:00', artist: 'DJ Bruninho MPC', role: 'Samba Rock & Transição Funk Carioca', ig: '@bruninhompc' }
    ],
    comments: [
      { id: 'c4', user: 'Sabrina Souza', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'Melhor roda de samba do RJ, clima leve e cerveja trincando!', time: 'Há 3 horas', likes: 15 }
    ],
    tags: ['Área Coberta & Aberta', 'Mesa de Petiscos', 'Ambiente Familiar até 20h']
  },
  {
    id: 'evt-4',
    title: 'THE DUBLINER ROCK NIGHT & CRAFT BEER',
    tagline: 'Tributos ao vivo de Arctic Monkeys, The Strokes e Foo Fighters',
    venue: 'The Dubliner Irish Pub',
    city: 'Curitiba',
    neighborhood: 'Batel',
    address: 'Av. do Batel, 1530 - Batel, Curitiba - PR',
    dateLabel: 'Este Sábado, 20:00',
    dateCategory: 'weekend',
    time: '20:00 às 04:00',
    category: 'Pub & Bar',
    genre: 'Rock',
    status: 'FIM DE SEMANA',
    price: 'R$ 25 - R$ 45',
    ticketUrl: 'https://exemplo-ingressos.com/dubliner-rock',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    promo: '☘️ Pint de Guinness com valor promocional • Hambúrguer artesanal especial',
    ageLimit: '18+',
    dressCode: 'Casual / Rocker',
    vibeScore: 92,
    isLiked: false,
    likesCount: 198,
    isGoing: false,
    attendeesCount: 142,
    attendees: [
      { id: 'u11', name: 'Rodrigo Brandão', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
      { id: 'u12', name: 'Juliana Pires', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '20:00 - 22:00', artist: 'Acústico 90s & Grunge', role: 'Voz e Violão Intimista', ig: '@acustico90s' },
      { time: '22:30 - 01:00', artist: 'THE INDIE MONKEYS', role: 'Tributo Arctic Monkeys & Strokes', ig: '@indiemonkeysband' },
      { time: '01:30 - 03:30', artist: 'FOO FIGHTERS COVER BRAZIL', role: 'Puro Rock n Roll', ig: '@foofightersbr' }
    ],
    comments: [
      { id: 'c5', user: 'Lucas Prado', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', text: 'O som desse cover do Arctic Monkeys é idêntico! Sempre que tocam lá eu não perco.', time: 'Há 5 horas', likes: 11 }
    ],
    tags: ['Mais de 20 Torneiras de Chopp', 'Mesa de Sinuca', 'Espaço Climatizado']
  },
  {
    id: 'evt-5',
    title: 'SKYLINE ROOFTOP | Sunset to Midnight Disco & Pop',
    tagline: 'Vista panorâmica 360° da cidade, drinks autorais e hits mundiais',
    venue: 'High Line Rooftop 45',
    city: 'Belo Horizonte',
    neighborhood: 'Savassi',
    address: 'Rua Tomé de Souza, 830 - Savassi, Belo Horizonte - MG',
    dateLabel: 'Este Domingo, 16:30',
    dateCategory: 'weekend',
    time: '16:30 às 01:00',
    category: 'Rooftop',
    genre: 'Pop',
    status: 'FIM DE SEMANA • VISTA INCRÍVEL',
    price: 'R$ 50 - R$ 100',
    ticketUrl: 'https://exemplo-ingressos.com/skyline-rooftop',
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1200&q=80',
    promo: '🌅 Welcome Drink (Aperol Spritz) para os 100 primeiros a chegarem para o pôr do sol',
    ageLimit: '18+',
    dressCode: 'Smart Casual / Chique Moderno',
    vibeScore: 97,
    isLiked: false,
    likesCount: 420,
    isGoing: false,
    attendeesCount: 260,
    attendees: [
      { id: 'u13', name: 'Mariana Duarte', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
      { id: 'u14', name: 'Henrique Vaz', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '16:30 - 18:30', artist: 'DJ Léo Golden', role: 'Sunset Nu-Disco & Soulful House', ig: '@leogolden' },
      { time: '18:30 - 21:30', artist: 'MARINA VIBE B2B KAUAN', role: 'Dua Lipa, Beyoncé & Pop Remixes', ig: '@marinavibe' },
      { time: '21:30 - 01:00', artist: 'QUEEN LUNA & THE DANCERS', role: 'Pop Show Performance & DJ Set', ig: '@queenluna' }
    ],
    comments: [
      { id: 'c6', user: 'Fernanda Leal', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80', text: 'O pôr do sol desse rooftop na Savassi é surreal. Não deixem de experimentar o drink de maracujá com espuma de gengibre!', time: 'Há 1 dia', likes: 22 }
    ],
    tags: ['Vista Panorâmica', 'Carta de Drinks Exclusiva', 'Área VIP com Sofás']
  },
  {
    id: 'evt-6',
    title: 'NOITE DOS BRUTOS | Sertanejo VIP & Open Chopp',
    tagline: 'O melhor modão e sertanejo universitário com chopp na faixa',
    venue: 'Villa Country Hall',
    city: 'Curitiba',
    neighborhood: 'Santa Felicidade',
    address: 'Av. Manoel Ribas, 4200 - Curitiba - PR',
    dateLabel: 'Próxima Sexta, 22:00',
    dateCategory: 'upcoming',
    time: '22:00 às 05:30',
    category: 'Balada',
    genre: 'Sertanejo',
    status: 'PRÓXIMOS DIAS',
    price: 'R$ 45 - R$ 90',
    ticketUrl: 'https://exemplo-ingressos.com/villa-brutos',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    promo: '🍺 Open Chopp Brahma até 00:00 • Aniversariante do mês entra VIP com 3 acompanhantes',
    ageLimit: '18+',
    dressCode: 'Sertanejo / Bota & Chapéu Opcional',
    vibeScore: 91,
    isLiked: false,
    likesCount: 215,
    isGoing: false,
    attendeesCount: 168,
    attendees: [
      { id: 'u15', name: 'Gustavo Paiva', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '22:00 - 00:00', artist: 'DJ Cowboy Beat', role: 'Modão Remixado & Esquenta', ig: '@djcowboy' },
      { time: '00:00 - 03:00', artist: 'LUCAS & MATHEUS AO VIVO', role: 'Gravação do DVD / Hits de Sucesso', ig: '@lucasematheus' },
      { time: '03:00 - 05:30', artist: 'BANDA BRUTOS DO VALE', role: 'Pisadinha & Sertanejo Universitário', ig: '@brutosdovale' }
    ],
    comments: [
      { id: 'c7', user: 'Tatiane Melo', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', text: 'Minha turma já fechou camarote! O show de Lucas & Matheus é surreal de animado.', time: 'Há 1 dia', likes: 8 }
    ],
    tags: ['Open Chopp', 'Camarotes Privativos', 'Estacionamento Próprio']
  },
  {
    id: 'evt-7',
    title: 'TRAP LIFE EXPERIENCE | Matuê & Teto Style Night',
    tagline: 'A noite mais pesada de trap nacional com os beats mais hypados',
    venue: 'Audio Club SP',
    city: 'São Paulo',
    neighborhood: 'Água Branca',
    address: 'Av. Francisco Matarazzo, 694 - Água Branca, São Paulo - SP',
    dateLabel: 'Amanhã, 23:00',
    dateCategory: 'tomorrow',
    time: '23:00 às 06:00',
    category: 'Balada',
    genre: 'Trap',
    status: 'AMANHÃ • 90% VENDIDO',
    price: 'R$ 70 - R$ 140',
    ticketUrl: 'https://exemplo-ingressos.com/trap-life',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    promo: '💥 Copo exclusivo para os primeiros 300 ingressos de pista premium',
    ageLimit: '18+',
    dressCode: 'Hype / Streetwear / Trap Style',
    vibeScore: 99,
    isLiked: false,
    likesCount: 680,
    isGoing: false,
    attendeesCount: 450,
    attendees: [
      { id: 'u16', name: 'Kaio Moreira', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80' },
      { id: 'u17', name: 'Bruna Zanetti', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
      { id: 'u18', name: 'Gabriel Santana', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' }
    ],
    lineup: [
      { time: '23:00 - 01:00', artist: 'DJ WEY (30PRAUM Set)', role: 'Aquecimento Trap & Drill', ig: '@djwey' },
      { time: '01:00 - 03:00', artist: 'TRAP STARS COLLECTIVE', role: 'Showcase Especial com Convidados', ig: '@trapstarsbr' },
      { time: '03:00 - 05:00', artist: 'DJ KAIO MPC', role: 'TrapFunk & Mandelão Speed', ig: '@kaiompc' }
    ],
    comments: [
      { id: 'c8', user: 'Leo Castro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', text: 'Esse rolê vai explodir, quem não garantiu ingresso no 1º lote já perdeu!', time: 'Há 2 horas', likes: 31 }
    ],
    tags: ['Palco Gigante', 'Efeitos Especiais (CO2 & Fogo)', 'Área Fumódromo Ampla']
  }
];

export const CURRENT_USER = {
  id: 'me',
  name: 'Você (Baladeiro)',
  username: '@rolezeiro_vip',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  city: 'São Paulo',
  badge: '🔥 Mestre da Noite (Nível Ouro)',
  bio: 'Se tem música boa e amigos, tô dentro! Vibe sempre positiva.',
  stats: {
    attendedCount: 14,
    savedCount: 22,
    hypeGiven: 87
  }
};

export const LIVE_ACTIVITIES = [
  { id: 'act-1', user: 'Beatriz Lima', text: 'confirmou presença no', event: 'NEON PULSE | Melodic Techno', time: 'Há 2 min', type: 'going' },
  { id: 'act-2', user: 'Rodrigo Brandão', text: 'deu joinha 👍 no', event: 'SAMBA & PAGODE DA DIRETORIA', time: 'Há 5 min', type: 'like' },
  { id: 'act-3', user: 'Larissa Rocha', text: 'comentou: "Alguém anima dividir Uber?" no', event: 'TRAP LIFE EXPERIENCE', time: 'Há 9 min', type: 'comment' },
  { id: 'act-4', user: 'Matheus Costa', text: 'confirmou presença no', event: 'BAILE DO MANDRAKE', time: 'Há 14 min', type: 'going' },
  { id: 'act-5', user: 'Camila Rossi', text: 'deu joinha 👍 no', event: 'THE DUBLINER ROCK NIGHT', time: 'Há 22 min', type: 'like' }
];
