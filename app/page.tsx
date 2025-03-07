// app/page.tsx
"use client";

import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import ProductCard from "./components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaUsers, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Home() {
  const products = [
    { id: 1, name: "Sutiã Elegance", price: 89.90, image: "/images/sutia1.jpg" },
    { id: 2, name: "Calcinha Confort", price: 29.90, image: "/images/calcinha1.jpg" },
    { id: 3, name: "Conjunto Luxo", price: 129.90, image: "/images/conjunto1.jpg" },
    { id: 4, name: "Body Sensual", price: 99.90, image: "/images/body1.jpg" },
  ];

  const banners = [
    { id: 1, image: "/banners/banner1.jpg", text: "Nova Coleção" },
    { id: 2, image: "/banners/banner2.jpg", text: "Descontos Exclusivos" },
    { id: 3, image: "/banners/banner3.jpg", text: "Frete Grátis" },
  ];

  const testimonials = [
    { name: "Ana Silva", text: "Qualidade excepcional!", image: "/avatars/ana.jpg" },
    { name: "João Pereira", text: "Entrega super rápida.", image: "/avatars/joao.jpg" },
    { name: "Maria Oliveira", text: "Adorei a experiência!", image: "/avatars/maria.jpg" },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

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
        className="relative w-full h-[70vh] max-h-[700px] overflow-hidden bg-gradient-hero"
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBanner ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img src={banner.image} alt={banner.text} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-mendes-white drop-shadow-lg mb-4">{banner.text}</h1>
                <button className="px-8 py-3 bg-mendes-orange text-mendes-white rounded-full font-semibold hover:bg-mendes-accent transition-all animate-pulse-grow">
                  Explorar Agora
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBanner ? "bg-mendes-orange scale-125" : "bg-mendes-white/70"
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </section>

      <SubHeader />

      {/* Destaques */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        id="destaques"
        className="section-container bg-mendes-white"
      >
        <h2 className="section-title animate-fade-in-up">
          <FaStar className="inline mr-2" /> Destaques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} delay={index * 150} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Sobre */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        id="sobre"
        className="section-container bg-mendes-white"
      >
        <div className="text-center">
          <h2 className="section-title animate-fade-in-up">
            <FaUsers className="inline mr-2" /> Sobre Nós
          </h2>
          <p className="text-lg text-mendes-gray max-w-3xl mx-auto leading-relaxed">
            A MendesWear combina qualidade e inovação em roupas íntimas, oferecendo conforto e estilo para todos os momentos. Nossa missão é elevar sua confiança com cada peça.
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
        className="section-container bg-mendes-white"
      >
        <h2 className="section-title animate-fade-in-up">
          <FaUsers className="inline mr-2" /> O Que Dizem Nossos Clientes
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-mendes-white rounded-xl p-8 text-center text-mendes-gray shadow-md animate-slide-fade" style={{ animationDelay: `${index * 200}ms` }}>
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
            className="absolute top-1/2 left-[-50px] transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-mendes-orange text-mendes-white rounded-full hover:bg-mendes-accent transition-all shadow-md"
          >
            ❮
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-mendes-orange text-mendes-white rounded-full hover:bg-mendes-accent transition-all shadow-md"
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
        className="section-container bg-mendes-white"
      >
        <h2 className="section-title animate-fade-in-up">
          <FaMapMarkerAlt className="inline mr-2" /> Conecte-se Conosco
        </h2>
        <div className="text-center">
          <p className="text-lg text-mendes-gray mb-6">Siga-nos nas redes sociais para novidades e promoções!</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-mendes-orange hover:text-mendes-accent transition text-3xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-mendes-orange hover:text-mendes-accent transition text-3xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-mendes-orange hover:text-mendes-accent transition text-3xl">
              <FaTwitter />
            </a>
          </div>
          <h3 className="text-2xl font-semibold text-mendes-dark mb-4">Endereço da Loja Física</h3>
          <p className="text-mendes-gray">Rua das Flores, 123, Centro - São Paulo/SP</p>
          <p className="text-mendes-gray">Horário: Seg-Sex, 9h-18h</p>
          <p className="text-mendes-gray">Telefone: (11) 1234-5678</p>
        </div>
      </section>
    </div>
  );
}