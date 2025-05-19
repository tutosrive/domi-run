import { Link } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';
import { Ripple } from 'primereact/ripple';

export default function CategoryProductsMenu() {
  const items = [
    {
      template: () => (
        <button className={'btn w-full'}>
          <i className={'pi pi-fw pi-tag'} /> Products Category
          <Ripple />
        </button>
      ),
      items: [
        {
          template: () => (
            <div className={'p-ripple orange-ripple'}>
              <Link to="products/category/all" className="p-menuitem-link btn bg-yellow-600">
                <span className="p-menuitem-text">All</span>
                <Ripple />
              </Link>
            </div>
          ),
        },
        {
          template: () => (
            <div className={'p-ripple orange-ripple'}>
              <Link to="/products/category/appetizers" className="p-menuitem-link btn bg-yellow-600">
                <span className="p-menuitem-text">Appetizers</span>
                <Ripple />
              </Link>
            </div>
          ),
        },
        {
          template: () => (
            <div className={'p-ripple orange-ripple'}>
              <Link to="/products/category/main-courses" className="p-menuitem-link btn bg-yellow-600">
                <span className="p-menuitem-text">Main Courses</span>
                <Ripple />
              </Link>
            </div>
          ),
        },
        {
          template: () => (
            <div className={'p-ripple orange-ripple'}>
              <Link to="/products/category/desserts" className="p-menuitem-link btn bg-yellow-600">
                <span className="p-menuitem-text">Desserts</span>
                <Ripple />
              </Link>
            </div>
          ),
        },
        {
          template: () => (
            <div className={'p-ripple orange-ripple'}>
              <Link to="/products/category/drinks" className="p-menuitem-link btn bg-yellow-600">
                <span className="p-menuitem-text">Drinks</span>
                <Ripple />
              </Link>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <div className={'p-ripple orange-ripple'}>
        <PanelMenu model={items} style={{ width: '100%' }} className={'bg-base-100'} />
      </div>
    </>
  );
}
