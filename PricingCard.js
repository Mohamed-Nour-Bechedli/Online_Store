// PricingCard.js - Reusable Pricing Component

// React Component Version
import React, { useState } from 'react';
import './PricingCard.css';

const PricingCard = ({ 
  title, 
  price, 
  period = '/month', 
  features = [], 
  buttonText = 'Get Started',
  onButtonClick,
  featured = false,
  currency = '$',
  badge = 'Most Popular'
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      if (onButtonClick) {
        await onButtonClick();
      }
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className={`pricing-card ${featured ? 'featured' : ''}`}>
      {featured && <div className="badge">{badge}</div>}
      
      <h2 className="title">{title}</h2>
      <div className="price">{currency}{price}</div>
      <div className="price-period">{period}</div>
      
      <ul className="features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      
      <button 
        className="btn" 
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : buttonText}
      </button>
    </div>
  );
};

// Vanilla JavaScript Class Version
class PricingCardComponent {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      title: 'Basic Plan',
      price: '9.99',
      period: '/month',
      features: [],
      buttonText: 'Get Started',
      featured: false,
      currency: '$',
      badge: 'Most Popular',
      onButtonClick: () => {},
      ...options
    };
    
    this.render();
    this.attachEvents();
  }

  render() {
    const { title, price, period, features, buttonText, featured, currency, badge } = this.options;
    
    this.container.innerHTML = `
      <div class="pricing-card ${featured ? 'featured' : ''}">
        ${featured ? `<div class="badge">${badge}</div>` : ''}
        
        <h2 class="title">${title}</h2>
        <div class="price">${currency}${price}</div>
        <div class="price-period">${period}</div>
        
        <ul class="features">
          ${features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <button class="btn">${buttonText}</button>
      </div>
    `;
  }

  attachEvents() {
    const button = this.container.querySelector('.btn');
    button.addEventListener('click', async () => {
      const originalText = button.textContent;
      button.textContent = 'Processing...';
      button.disabled = true;
      
      try {
        if (this.options.onButtonClick) {
          await this.options.onButtonClick();
        }
      } finally {
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 1000);
      }
    });
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.render();
    this.attachEvents();
  }
}

// Usage Examples:

// React Usage:
/*
const pricingPlans = [
  {
    title: 'Basic Plan',
    price: '9.99',
    features: ['1 GB Storage', 'Basic Support', 'All Core Features'],
    onButtonClick: () => console.log('Basic plan selected')
  },
  {
    title: 'Pro Plan',
    price: '19.99',
    features: ['10 GB Storage', 'Priority Support', 'Advanced Analytics'],
    featured: true,
    onButtonClick: () => console.log('Pro plan selected')
  },
  {
    title: 'Enterprise',
    price: '49.99',
    features: ['Unlimited Storage', '24/7 Support', 'Custom Integrations'],
    buttonText: 'Contact Sales',
    onButtonClick: () => console.log('Enterprise plan selected')
  }
];

function PricingSection() {
  return (
    <div className="pricing-container">
      {pricingPlans.map((plan, index) => (
        <PricingCard key={index} {...plan} />
      ))}
    </div>
  );
}
*/

// Vanilla JavaScript Usage:
/*
// Initialize pricing cards
const basicPlan = new PricingCardComponent(
  document.getElementById('basic-plan'),
  {
    title: 'Basic Plan',
    price: '9.99',
    features: ['1 GB Storage', 'Basic Support', 'All Core Features'],
    onButtonClick: () => alert('Basic plan selected!')
  }
);

const proPlan = new PricingCardComponent(
  document.getElementById('pro-plan'),
  {
    title: 'Pro Plan',
    price: '19.99',
    features: ['10 GB Storage', 'Priority Support', 'Advanced Analytics'],
    featured: true,
    onButtonClick: () => alert('Pro plan selected!')
  }
);
*/

export default PricingCard;
export { PricingCardComponent };