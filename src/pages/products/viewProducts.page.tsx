import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/product.service';
import Product from '../../models/Product.model';

export default function ViewProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await productService.get_data_by_id(Number(id));
      setProduct(res.data as Product);
    };
    fetch();
  }, [id]);

  if (!product) return <div className="text-center mt-10">Cargando...</div>;

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-xl font-bold mb-4">Detalles del Producto</h1>
      <p><strong>Nombre:</strong> {product.name}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
    </div>
  );
}
