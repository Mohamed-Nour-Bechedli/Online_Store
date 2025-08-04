# Reusable Pricing Component

A flexible, data-driven pricing card component built with HTML, CSS, and vanilla JavaScript. This component allows you to easily create and manage multiple pricing plans with customizable features, styling, and event handling.

## Features

- 🎨 **Modern Design**: Beautiful gradient backgrounds, smooth animations, and professional styling
- 📱 **Responsive**: Automatically adapts to different screen sizes
- 🔧 **Configurable**: Easy to customize with data-driven configuration
- ♿ **Accessible**: Keyboard navigation support and semantic HTML
- 🎯 **Interactive**: Hover effects, click animations, and event handling
- 📦 **Reusable**: Component-based architecture for easy integration

## Quick Start

### 1. Include the Files

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Pricing Page</title>
    <link rel="stylesheet" href="pricing-component.css">
</head>
<body>
    <div id="pricing-cards" class="pricing-grid"></div>
    <script src="pricing-component.js"></script>
</body>
</html>
```

### 2. Initialize the Component

```javascript
// Create pricing plans data
const pricingPlans = [
    {
        id: 'basic',
        title: 'Basic Plan',
        price: 9.99,
        period: '/month',
        badge: '',
        features: [
            '1 GB Storage',
            'Basic Support',
            'All Core Features'
        ],
        buttonText: 'Start Trial',
        highlighted: false
    }
    // Add more plans...
];

// Initialize and render
const pricingComponent = new PricingComponent('pricing-cards');
pricingComponent.renderPlans(pricingPlans);
```

## API Documentation

### Constructor

```javascript
new PricingComponent(containerId)
```

**Parameters:**
- `containerId` (string): ID of the container element where cards will be rendered

### Methods

#### `renderPlans(plansData)`
Renders multiple pricing plans from an array of plan objects.

**Parameters:**
- `plansData` (Array): Array of plan configuration objects

#### `renderCard(planData, index)`
Renders a single pricing card.

**Parameters:**
- `planData` (Object): Plan configuration object
- `index` (number): Index of the plan in the array

#### `onPlanSelect(callback)`
Registers a callback function for plan selection events.

**Parameters:**
- `callback` (Function): Function to execute when a plan is selected

#### `updatePlan(planId, updatedData)`
Updates a specific plan's data and re-renders the card.

**Parameters:**
- `planId` (string): ID of the plan to update
- `updatedData` (Object): Updated plan data

#### `removePlan(planId)`
Removes a plan from the display.

**Parameters:**
- `planId` (string): ID of the plan to remove

#### `getPlans()`
Returns a copy of the current plans data array.

#### `clear()`
Removes all pricing cards from the display.

#### `destroy()`
Destroys the component and cleans up event listeners.

## Plan Data Structure

Each plan object should have the following structure:

```javascript
{
    id: 'unique-plan-id',           // Unique identifier for the plan
    title: 'Plan Name',             // Plan title/name
    price: 29.99,                   // Price as number or string
    period: '/month',               // Billing period (optional, defaults to '/month')
    badge: 'Most Popular',          // Badge text (optional, empty string to hide)
    features: [                     // Array of feature strings
        'Feature 1',
        'Feature 2',
        'Feature 3'
    ],
    buttonText: 'Get Started',      // Text for the call-to-action button
    highlighted: true               // Whether this plan should be highlighted
}
```

## Event Handling

### Plan Selection Callback

```javascript
pricingComponent.onPlanSelect((planId, planData) => {
    console.log(`Selected plan: ${planId}`, planData);
    // Handle plan selection (e.g., redirect to checkout)
});
```

### Custom Events

The component also emits custom DOM events:

```javascript
document.addEventListener('planSelected', (event) => {
    const { planId, planData, cardElement } = event.detail;
    console.log('Plan selected via custom event:', planId);
});
```

## Styling Customization

### CSS Custom Properties

You can customize the component by overriding CSS variables:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #e74c3c;
    --text-color: #2c3e50;
    --background-color: #ffffff;
}
```

### Component Classes

Key CSS classes for customization:

- `.pricing-card` - Individual pricing card
- `.pricing-card.highlighted` - Highlighted/featured card
- `.plan-title` - Plan title
- `.price-section` - Price display area
- `.features-list` - Features list
- `.cta-button` - Call-to-action button

## Examples

### Basic Usage

```javascript
const basicPlans = [
    {
        id: 'starter',
        title: 'Starter',
        price: 0,
        period: '/month',
        badge: 'Free',
        features: ['1 Project', 'Basic Support'],
        buttonText: 'Get Started',
        highlighted: false
    }
];

const component = new PricingComponent('my-container');
component.renderPlans(basicPlans);
```

### Dynamic Updates

```javascript
// Update a plan
component.updatePlan('starter', {
    price: 5.99,
    badge: 'Limited Time'
});

// Remove a plan
component.removePlan('starter');

// Add event handling
component.onPlanSelect((planId, planData) => {
    if (planId === 'enterprise') {
        window.location.href = '/contact-sales';
    } else {
        window.location.href = `/checkout/${planId}`;
    }
});
```

### Integration with Frameworks

The component works well with modern frameworks:

```javascript
// React integration example
useEffect(() => {
    const component = new PricingComponent('pricing-container');
    component.renderPlans(plans);
    component.onPlanSelect(handlePlanSelection);
    
    return () => component.destroy();
}, [plans]);
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for template and custom events)

## File Structure

```
pricing-component/
├── pricing-component.html    # Main HTML file with examples
├── pricing-component.css     # Component styles
├── pricing-component.js      # Component JavaScript class
└── README.md                 # This documentation
```

## Best Practices

1. **Data Validation**: Always validate plan data before rendering
2. **Error Handling**: Implement proper error handling for missing elements
3. **Performance**: Use `updatePlan()` instead of re-rendering all plans for single updates
4. **Accessibility**: Ensure proper focus management and keyboard navigation
5. **Responsive Design**: Test on various screen sizes and devices

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE). 