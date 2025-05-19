import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slice/cart.slice';
import Product from '../../models/Product.model.ts';
import productService from '../../services/product.service.ts';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function ProductsPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProducts = async () => {
    setLoading(true);
    const resProducts = await productService.get_all_product();
    let data: Product[] = resProducts.data ? (resProducts.data as Product[]) : [];

    if (category && category !== 'all') {
      data = data.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <h3 className="italic text-gray-500">Category: {category}</h3>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        {loading ? (
          <LoaderPointsComponent />
        ) : products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow mb-4 bg-blue">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-green-600 font-bold">${product.price}</p>
                </div>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for category "{category}"</p>
        )}
      </div>
    </>
  );
}
