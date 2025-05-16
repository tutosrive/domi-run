import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { ProductService } from '../services/products.service';
import SigInButtonComponent from '../components/SigIn/SigInButton.component';
import ListAll from './address/listAll.tsx';

export default function CircularDemo() {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
  }, []);

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-100 shadow-2 mx-auto" />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen">
      <ListAll />
      <div className={'mx-auto rounded-sm card w-200'}>{/*<Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" itemTemplate={productTemplate} />*/}</div>
    </div>
  );
}
