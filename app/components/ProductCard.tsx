// app/components/ProductCard.tsx
interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  delay?: number;
}

export default function ProductCard({ name, price, image, delay = 0 }: ProductProps) {
  return (
    <div
      className="bg-mendes-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={image} alt={name} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-mendes-dark">{name}</h3>
        <p className="text-mendes-orange font-bold text-xl mt-1">R$ {price.toFixed(2)}</p>
        <button className="mt-4 w-full px-4 py-2 bg-mendes-orange text-mendes-white rounded-full font-semibold hover:bg-mendes-accent transition-all animate-pulse-grow">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}