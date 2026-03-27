import { SiteContent } from "../types";

export const defaultContent: SiteContent = {
  hero: {
    badge: "🔥 Vagas Limitadas",
    title: "Viaje em Classe Executiva Pagando Preço de Econômica",
    subtitle: "Receba diariamente as melhores promoções e emissões de passagens aéreas em primeira classe e executiva para os destinos mais desejados do mundo.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    ctaText: "Entrar no Grupo VIP",
    ctaLink: "#pricing",
    stats: [
      { value: "10.000+", label: "Membros" },
      { value: "50+", label: "Países Cobertos" },
      { value: "7 Dias", label: "Garantia" }
    ]
  },
  whatis: {
    title: "O que é o Trajeto das Milhas?",
    description: "O Trajeto das Milhas é um ecossistema completo para quem deseja viajar com luxo e conforto sem gastar fortunas. Nosso time de especialistas monitora o mercado 24 horas por dia para encontrar as brechas e promoções que as companhias aéreas não querem que você veja. Você recebe tudo mastigado no seu celular.",
    imageUrl: "https://images.unsplash.com/photo-1540339832862-47452993c66e?auto=format&fit=crop&q=80&w=800"
  },
  benefits: [
    { id: "1", icon: "Bell", title: "Alertas Diários", description: "Receba notificações em tempo real das melhores oportunidades de emissão." },
    { id: "2", icon: "Plane", title: "Emissões Executivas", description: "Foco total em passagens de alto valor com o menor custo possível." },
    { id: "3", icon: "TrendingUp", title: "Dicas de Acúmulo", description: "Aprenda as melhores estratégias para multiplicar suas milhas rapidamente." },
    { id: "4", icon: "Headphones", title: "Suporte Especializado", description: "Tire suas dúvidas com quem realmente entende do mercado de milhas." },
    { id: "5", icon: "Video", title: "Aulas ao Vivo", description: "Encontros mensais para discutir novas estratégias e tirar dúvidas." },
    { id: "6", icon: "Users", title: "Comunidade Exclusiva", description: "Troque experiências com outros viajantes que buscam o mesmo objetivo." }
  ],
  testimonials: [
    { id: "1", name: "Ricardo Silva", role: "Empresário", avatarUrl: "https://i.pravatar.cc/150?u=ricardo", text: "Minha primeira viagem de executiva foi para Paris pagando menos que uma econômica. O grupo se pagou na primeira emissão!", stars: 5 },
    { id: "2", name: "Ana Oliveira", role: "Médica", avatarUrl: "https://i.pravatar.cc/150?u=ana", text: "As dicas de acúmulo são sensacionais. Consegui emitir passagens para a família toda usando as estratégias do grupo.", stars: 5 },
    { id: "3", name: "Marcos Santos", role: "Nômade Digital", avatarUrl: "https://i.pravatar.cc/150?u=marcos", text: "O suporte é muito rápido. Sempre que tive dúvida sobre uma emissão, me ajudaram a decidir a melhor opção.", stars: 5 },
    { id: "4", name: "Juliana Costa", role: "Advogada", avatarUrl: "https://i.pravatar.cc/150?u=juliana", text: "Nunca mais viajo de econômica em voos longos. O Trajeto das Milhas mudou minha forma de ver o mundo.", stars: 5 }
  ],
  pricing: {
    sectionTitle: "Escolha o Plano Ideal para Você",
    plans: [
      {
        id: "semestral",
        name: "Plano Semestral",
        period: "6 Meses de Acesso",
        installments: "6x R$ 52,38",
        totalPrice: "R$ 277 à vista",
        checkoutLink: "https://pay.hotmart.com/placeholder1",
        highlighted: false,
        features: ["Alertas Diários", "Suporte via Telegram", "Acesso às Aulas Gravadas", "Ebook de Boas-vindas"]
      },
      {
        id: "anual",
        name: "Plano Anual",
        period: "12 Meses de Acesso",
        installments: "12x R$ 46,89",
        totalPrice: "R$ 447 à vista",
        checkoutLink: "https://pay.hotmart.com/placeholder2",
        highlighted: true,
        features: ["Tudo do Semestral", "Melhor Custo-Benefício", "Aulas ao Vivo Mensais", "Consultoria em Grupo", "Bônus Exclusivos"]
      }
    ]
  },
  bonuses: [
    { id: "1", title: "Aula de Acúmulo Estratégico", description: "O passo a passo definitivo para gerar milhas do zero sem gastar mais por isso.", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" },
    { id: "2", title: "Aula Mensal ao Vivo", description: "Análise de mercado em tempo real e as melhores oportunidades do mês.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400" },
    { id: "3", title: "Ebook das Companhias Aéreas", description: "Um guia completo sobre as alianças aéreas e como emitir em cada uma.", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109c055?auto=format&fit=crop&q=80&w=400" }
  ],
  guarantee: {
    days: 7,
    title: "7 Dias de Garantia Incondicional",
    description: "Se por qualquer motivo você achar que o grupo não é para você, basta solicitar o reembolso dentro de 7 dias e devolveremos 100% do seu investimento. Sem perguntas, sem burocracia."
  },
  faq: [
    { id: "1", question: "Como funciona o grupo?", answer: "É um grupo no Telegram onde nossos especialistas enviam diariamente as melhores oportunidades de passagens em executiva e primeira classe, além de estratégias de milhas." },
    { id: "2", question: "Por quanto tempo tenho acesso?", answer: "Depende do plano escolhido. O plano semestral dá acesso por 6 meses e o anual por 12 meses." },
    { id: "3", question: "Para quais destinos são os alertas?", answer: "Enviamos alertas para o mundo todo: EUA, Europa, Ásia, Oceania e também destinos nacionais estratégicos." },
    { id: "4", question: "E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional para testar o grupo e pedir seu dinheiro de volta se não ficar satisfeito." },
    { id: "5", question: "Como recebo os alertas?", answer: "Os alertas são enviados em tempo real através de um canal exclusivo no Telegram." }
  ],
  about: {
    title: "Quem é Anderson Nascimento?",
    subtitle: "Especialista em Milhas e Emissões de Luxo",
    description: "Com mais de 10 anos de experiência no mercado de turismo e milhas aéreas, Anderson Nascimento já ajudou milhares de pessoas a realizarem o sonho de viajar em classe executiva e primeira classe pagando menos que uma passagem econômica. Sua missão é democratizar o acesso ao luxo através de estratégias inteligentes de acúmulo e emissão, revelando os segredos que as companhias aéreas tentam esconder.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    experienceBadge: {
      value: "10+",
      label: "ANOS DE EXP."
    },
    achievements: [
      "Especialista em Emissões Internacionais",
      "Mentor de Milhares de Alunos",
      "Criador do Método Trajeto das Milhas"
    ]
  }
};
