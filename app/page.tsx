// app/page.tsx
"use client";

import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import ProductCard from "./components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaUsers, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import axios from "axios";

const getAuthToken = async () => {
  try {
    console.log("Tentando conectar à API em https://mendeswear.api.idworks.com.br/1.0/user/signin/local...");
    const response = await axios.post(
      "https://mendeswear.api-idworks.com.br/1.0/user/signin/local",
      {
        email: "arthurfernandes.mw@gmail.com",
        password: "Arthur@123",
      },
      {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.token;
    console.log("Resposta recebida:", JSON.stringify(response.data, null, 2));
    return token;
  } catch (error: any) {
    console.error("Erro ao obter token:", error.message);
    if (error.response) {
      console.error("Resposta do servidor:", JSON.stringify(error.response.data, null, 2));
      console.error("Status:", error.response.status);
      console.error("Cabeçalhos:", error.response.headers);
    } else if (error.request) {
      console.error("Nenhuma resposta recebida. Problema de rede ou servidor inacessível.");
    } else {
      console.error("Erro na configuração da requisição:", error.message);
    }
    throw error;
  }
};

export default function Home() {
  const products = [
    {
      id: 1,
      name: "3 Pares Meias Masculinas Esportivas",
      price: 34.90,
      image: "/images/meia.jpg",
      description: "Meias esportivas masculinas confortáveis e duráveis, perfeitas para o dia a dia ou atividades físicas.",
      images: ["/images/meia.jpg", "/images/meia2.jpg", "/images/5520.jpg"],
      reviews: [
        { user: "Carlos", rating: 5, comment: "Muito confortáveis e resistentes!" },
        { user: "Paula", rating: 4, comment: "Gostei bastante, mas poderiam ter mais cores." },
      ],
    },
    {
      id: 2,
      name: "Meia Calça Infantil Feminina Lupo Fio 80",
      price: 38.99,
      image: "/images/calca.jpg",
      description: "Meia calça infantil de alta qualidade, com elasticidade e conforto para crianças.",
      images: ["/images/calca.jpg", "/images/meia.jpg"],
      reviews: [{ user: "Mariana", rating: 5, comment: "Minha filha adorou!" }],
    },
    {
      id: 3,
      name: "2 Pares Meias Feminina Lupo Cano Curto Fio 40",
      price: 16.99,
      image: "/images/5520.jpg",
      description: "Meias femininas de cano curto, ideais para uso casual com excelente custo-benefício.",
      images: ["/images/5520.jpg", "/images/meia2.jpg"],
      reviews: [{ user: "Fernanda", rating: 4, comment: "Boa qualidade pelo preço." }],
    },
    {
      id: 4,
      name: "Meia Calça Feminina Plus Size Trifil Fio 40 Clássica Fina",
      price: 32.99,
      image: "/images/meia2.jpg",
      description: "Meia calça plus size elegante e confortável, perfeita para ocasiões especiais.",
      images: ["/images/meia2.jpg", "/images/calca.jpg"],
      reviews: [{ user: "Beatriz", rating: 5, comment: "Ajuste perfeito, adorei!" }],
    },
  ];

  const banners = [
    { id: 1, image: "/banners/banner1.png", text: "Nova Coleção" },
    { id: 2, image: "/banners/banner2.png", text: "Descontos Exclusivos" },
    { id: 3, image: "/banners/banner3.png", text: "Frete Grátis" },
  ];

  const testimonials = [
    { name: "Ana Silva", text: "Qualidade excepcional!", image: "/avatars/ana.jpg" },
    { name: "João Pereira", text: "Entrega super rápida.", image: "/avatars/joao.jpg" },
    { name: "Maria Oliveira", text: "Adorei a experiência!", image: "/avatars/maria.jpg" },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null); // Estado para armazenar o token
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Conexão com a API
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        console.log("Iniciando teste de conexão...");

        // Teste com API pública
        console.log("Testando conexão com API pública...");
        const publicApiResponse = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        console.log("Resposta da API pública:", JSON.stringify(publicApiResponse.data, null, 2));

        // Teste com a API da ID.Works
        const authToken = await getAuthToken();
        setToken(authToken); // Armazena o token no estado
        console.log("Token obtido com sucesso:", authToken);
      } catch (error) {
        console.error("Falha ao conectar à API:", error);
      }
    };
    testApiConnection();
  }, []);

  // Carrossel de banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setDragOffset(0);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Animação de seções
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden-before-animation");
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - startX;
    setDragOffset(diffX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const bannerWidth = bannerRef.current?.clientWidth || 1;
    const threshold = bannerWidth * 0.3;

    if (dragOffset < -threshold && currentBanner < banners.length - 1) {
      setCurrentBanner((prev) => prev + 1);
    } else if (dragOffset > threshold && currentBanner > 0) {
      setCurrentBanner((prev) => prev - 1);
    }

    setDragOffset(0);
  };

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-mendes-white text-mendes-gray">
      <Header />
      {/* Hero Section com Carrossel */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="relative w-full h-[70vh] max-h-[700px] overflow-hidden bg-gradient-hero hidden-before-animation"
      >
        <div
          ref={bannerRef}
          className="flex w-full h-full transition-transform duration-500 ease-in-out touch-none"
          style={{
            transform: `translateX(calc(-${currentBanner * 100}% + ${dragOffset}px))`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full h-full relative">
              <img src={banner.image} alt={banner.text} className="w-full h-full object-cover select-none" />
            </div>
          ))}
        </div>
      </section>

      {/* Indicadores fora do banner */}
      <div className="flex justify-center space-x-3 py-4 bg-mendes-white">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentBanner
                ? "bg-mendes-white border-2 border-mendes-orange scale-125 shadow-md"
                : "bg-mendes-gray/50"
            }`}
            onClick={() => {
              setCurrentBanner(index);
              setDragOffset(0);
            }}
          />
        ))}
      </div>

      <SubHeader />

      {/* Destaques */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        id="destaques"
        className="section-container bg-mendes-white hidden-before-animation"
      >
        <h2 className="section-title">
          <FaStar className="inline mr-2 text-mendes-orange" /> Destaques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 150}
              onViewProduct={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Sobre (Hero) */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        id="sobre"
        className="relative w-full py-20 bg-mendes-light text-mendes-dark hidden-before-animation"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 flex items-center justify-center gap-3">
            <FaUsers className="text-mendes-orange" /> Sobre Nós
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
            Na <span className="text-mendes-orange font-bold">MendesWear</span>, combinamos qualidade e inovação em roupas íntimas para oferecer conforto e estilo em cada momento. Nossa missão é elevar sua confiança com peças únicas e bem pensadas.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Clientes Satisfeitos */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        id="clientes"
        className="section-container bg-mendes-white hidden-before-animation"
      >
        <h2 className="section-title">
          <FaUsers className="inline mr-2 text-mendes-orange" /> O Que Dizem Nossos Clientes
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-mendes-white rounded-xl p-8 text-center text-mendes-gray shadow-md">
                    <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-mendes-orange" />
                    <p className="italic mb-4 text-gray-600">"{testimonial.text}"</p>
                    <p className="font-semibold text-mendes-dark">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-[-40px] sm:left-[-50px] transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-mendes-orange text-mendes-white rounded-full hover:bg-mendes-accent transition-all shadow-md"
          >
            ❮
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-[-40px] sm:right-[-50px] transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-mendes-orange text-mendes-white rounded-full hover:bg-mendes-accent transition-all shadow-md"
          >
            ❯
          </button>
        </div>
      </section>

      <div className="section-divider" />

      {/* Redes Sociais e Endereço */}
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="section-container bg-mendes-white hidden-before-animation"
      >
        <h2 className="section-title">
          <FaMapMarkerAlt className="inline mr-2 text-mendes-orange" /> Conecte-se Conosco
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Redes Sociais */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-mendes-dark mb-4">Siga-nos</h3>
            <p className="text-lg text-mendes-gray mb-6">Fique por dentro das novidades e promoções!</p>
            <div className="flex justify-center space-x-8">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:text-[#C13584] transition-all duration-300 transform hover:scale-125">
                <FaInstagram size={36} />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#00F2EA] hover:text-[#00C4B4] transition-all duration-300 transform hover:scale-125">
                <FaTwitter size={36} /> {/* Placeholder para TikTok */}
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#1654B2] transition-all duration-300 transform hover:scale-125">
                <FaFacebook size={36} />
              </a>
            </div>
          </div>

          {/* Endereço com Mapa */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-mendes-dark mb-4">Nosso Endereço</h3>
            <p className="text-lg text-mendes-gray">Alameda São Caetano, 1226 - Santa Paula</p>
            <p className="text-lg text-mendes-gray">São Caetano do Sul - SP, 09560-500</p>
            <p className="text-lg text-mendes-gray mt-2">Seg-Sex: 9h-18h | Sab: 9h-14h</p>
            <p className="text-lg text-mendes-gray">WhatsApp: (11) 95178-7427</p>
            <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-46.554123456789!3d-23.623456789123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce429e6b8e7b7b%3A0x5b8e8f8e8f8e8f8e!2sAlameda%20São%20Caetano%2C%201226%2C%20São%20Caetano%20do%20Sul%20-%20SP%2C%2009560-500!5e0!3m2!1spt-BR!2sbr!4v1634567891234!5m2!1spt-BR!2sbr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Produto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-mendes-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-mendes-gray hover:text-mendes-orange text-3xl font-bold"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Fotos do Produto */}
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
                <div className="flex space-x-4 mt-4">
                  {selectedProduct.images.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Informações do Produto */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-mendes-dark">{selectedProduct.name}</h2>
                <p className="text-xl text-mendes-orange font-semibold">R$ {selectedProduct.price.toFixed(2)}</p>
                <p className="text-lg text-mendes-gray">{selectedProduct.description}</p>
                <button className="w-full px-6 py-3 bg-mendes-orange text-mendes-white rounded-full font-semibold hover:bg-mendes-accent transition-all">
                  Adicionar ao Carrinho
                </button>

                {/* Avaliações */}
                <div>
                  <h3 className="text-xl font-semibold text-mendes-dark mb-4">Avaliações</h3>
                  {selectedProduct.reviews.length > 0 ? (
                    selectedProduct.reviews.map((review: any, index: number) => (
                      <div key={index} className="mb-4">
                        <p className="font-semibold text-mendes-dark">{review.user}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? "text-mendes-orange" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <p className="text-mendes-gray">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-mendes-gray">Nenhuma avaliação ainda.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
