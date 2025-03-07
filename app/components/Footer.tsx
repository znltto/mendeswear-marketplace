// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-mendes-blue/10 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm animate-fade-in-up">© 2025 MendesWear. Todos os direitos reservados.</p>
        <div className="mt-2 space-x-6">
          <a href="#" className="text-sm hover:text-mendes-orange transition animate-fade-in-up delay-100">Política de Privacidade</a>
          <a href="#" className="text-sm hover:text-mendes-orange transition animate-fade-in-up delay-200">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}