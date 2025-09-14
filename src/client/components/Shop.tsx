import React from 'react';
import './Shop.css';

interface ShopItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ShopProps {
  petName?: string;
  money?: number;
}

const Shop: React.FC<ShopProps> = ({}) => {
  const shopItems: ShopItem[] = [
    { id: 1, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 2, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 3, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 4, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 5, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 6, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 7, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 8, name: 'Burger', price: 100, image: '/burger.png' },
    { id: 9, name: 'Burger', price: 100, image: '/burger.png' },
  ];

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Shop</h1>
      </div>
      
      <div className="shop-grid">
        {shopItems.map((item) => (
          <div key={item.id} className="shop-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <button className="buy-button">${item.price}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;