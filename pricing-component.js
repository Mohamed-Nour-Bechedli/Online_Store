/**
 * REUSABLE PRICING COMPONENT
 * A flexible, data-driven pricing card component that can render multiple pricing plans
 * with customizable features, styling, and event handling.
 */

class PricingComponent {
    /**
     * Initialize the pricing component
     * @param {string} containerId - ID of the container element where cards will be rendered
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.template = document.getElementById('pricing-card-template');
        this.plans = [];
        this.eventCallbacks = {};
        
        if (!this.container) {
            throw new Error(`Container with ID "${containerId}" not found`);
        }
        
        if (!this.template) {
            throw new Error('Pricing card template not found');
        }
        
        // Bind methods to ensure correct context
        this.renderPlans = this.renderPlans.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        
        console.log('PricingComponent initialized successfully');
    }

    /**
     * Render multiple pricing plans
     * @param {Array} plansData - Array of plan configuration objects
     */
    renderPlans(plansData) {
        if (!Array.isArray(plansData) || plansData.length === 0) {
            console.warn('No pricing plans provided or invalid data format');
            return;
        }

        // Clear existing content
        this.container.innerHTML = '';
        this.plans = plansData;

        // Render each plan
        plansData.forEach((planData, index) => {
            this.renderCard(planData, index);
        });

        console.log(`Rendered ${plansData.length} pricing cards`);
    }

    /**
     * Render a single pricing card
     * @param {Object} planData - Plan configuration object
     * @param {number} index - Index of the plan in the array
     */
    renderCard(planData, index) {
        // Validate required plan data
        if (!this.validatePlanData(planData)) {
            console.error('Invalid plan data:', planData);
            return;
        }

        // Clone the template
        const cardClone = this.template.content.cloneNode(true);
        const cardElement = cardClone.querySelector('.pricing-card');

        // Set plan data attributes
        cardElement.setAttribute('data-plan', planData.id || `plan-${index}`);
        cardElement.setAttribute('data-index', index);

        // Apply highlighted styling if specified
        if (planData.highlighted) {
            cardElement.classList.add('highlighted');
        }

        // Populate card content
        this.populateCardContent(cardClone, planData);

        // Add event listeners
        this.addCardEventListeners(cardElement, planData);

        // Append to container
        this.container.appendChild(cardClone);
    }

    /**
     * Validate plan data structure
     * @param {Object} planData - Plan configuration object
     * @returns {boolean} - Whether the plan data is valid
     */
    validatePlanData(planData) {
        const requiredFields = ['title', 'price', 'features', 'buttonText'];
        return requiredFields.every(field => planData.hasOwnProperty(field));
    }

    /**
     * Populate card content with plan data
     * @param {DocumentFragment} cardClone - Cloned card template
     * @param {Object} planData - Plan configuration object
     */
    populateCardContent(cardClone, planData) {
        // Set title
        const titleElement = cardClone.querySelector('.plan-title');
        titleElement.textContent = planData.title;

        // Set badge (if provided)
        const badgeElement = cardClone.querySelector('.plan-badge');
        if (planData.badge && planData.badge.trim()) {
            badgeElement.textContent = planData.badge;
            badgeElement.style.display = 'inline-block';
        } else {
            badgeElement.style.display = 'none';
        }

        // Set price
        const priceAmountElement = cardClone.querySelector('.price-amount');
        const pricePeriodElement = cardClone.querySelector('.price-period');
        
        priceAmountElement.textContent = this.formatPrice(planData.price);
        pricePeriodElement.textContent = planData.period || '/month';

        // Set features
        this.populateFeatures(cardClone, planData.features);

        // Set button text
        const buttonTextElement = cardClone.querySelector('.button-text');
        buttonTextElement.textContent = planData.buttonText;
    }

    /**
     * Format price for display
     * @param {number|string} price - Price value
     * @returns {string} - Formatted price string
     */
    formatPrice(price) {
        const numPrice = parseFloat(price);
        if (isNaN(numPrice)) {
            return price.toString();
        }
        
        // Format to 2 decimal places, but remove unnecessary zeros
        return numPrice % 1 === 0 ? numPrice.toString() : numPrice.toFixed(2);
    }

    /**
     * Populate features list
     * @param {DocumentFragment} cardClone - Cloned card template
     * @param {Array} features - Array of feature strings
     */
    populateFeatures(cardClone, features) {
        const featuresListElement = cardClone.querySelector('.features-list');
        featuresListElement.innerHTML = '';

        if (!Array.isArray(features)) {
            console.warn('Features should be an array');
            return;
        }

        features.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.textContent = feature;
            featuresListElement.appendChild(listItem);
        });
    }

    /**
     * Add event listeners to card elements
     * @param {Element} cardElement - The card DOM element
     * @param {Object} planData - Plan configuration object
     */
    addCardEventListeners(cardElement, planData) {
        const button = cardElement.querySelector('.cta-button');
        
        // Button click handler
        button.addEventListener('click', (event) => {
            event.preventDefault();
            this.handleCardClick(planData, cardElement);
        });

        // Card hover effects for accessibility
        cardElement.addEventListener('mouseenter', () => {
            this.handleCardHover(cardElement, true);
        });

        cardElement.addEventListener('mouseleave', () => {
            this.handleCardHover(cardElement, false);
        });

        // Keyboard accessibility
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handleCardClick(planData, cardElement);
            }
        });
    }

    /**
     * Handle card click events
     * @param {Object} planData - Plan configuration object
     * @param {Element} cardElement - The card DOM element
     */
    handleCardClick(planData, cardElement) {
        // Add visual feedback
        this.addClickAnimation(cardElement);

        // Execute registered callback
        if (this.eventCallbacks.onPlanSelect) {
            this.eventCallbacks.onPlanSelect(planData.id || planData.title, planData);
        }

        // Emit custom event
        const customEvent = new CustomEvent('planSelected', {
            detail: {
                planId: planData.id,
                planData: planData,
                cardElement: cardElement
            }
        });
        document.dispatchEvent(customEvent);

        console.log('Plan selected:', planData.title);
    }

    /**
     * Handle card hover effects
     * @param {Element} cardElement - The card DOM element
     * @param {boolean} isHovering - Whether the card is being hovered
     */
    handleCardHover(cardElement, isHovering) {
        if (isHovering) {
            cardElement.style.zIndex = '10';
        } else {
            cardElement.style.zIndex = '1';
        }
    }

    /**
     * Add click animation to card
     * @param {Element} cardElement - The card DOM element
     */
    addClickAnimation(cardElement) {
        cardElement.style.transform = 'scale(0.98)';
        setTimeout(() => {
            cardElement.style.transform = '';
        }, 150);
    }

    /**
     * Register event callback for plan selection
     * @param {Function} callback - Callback function to execute when a plan is selected
     */
    onPlanSelect(callback) {
        if (typeof callback === 'function') {
            this.eventCallbacks.onPlanSelect = callback;
        } else {
            console.warn('onPlanSelect callback must be a function');
        }
    }

    /**
     * Update a specific plan's data and re-render the card
     * @param {string} planId - ID of the plan to update
     * @param {Object} updatedData - Updated plan data
     */
    updatePlan(planId, updatedData) {
        const planIndex = this.plans.findIndex(plan => plan.id === planId);
        
        if (planIndex === -1) {
            console.warn(`Plan with ID "${planId}" not found`);
            return;
        }

        // Update plan data
        this.plans[planIndex] = { ...this.plans[planIndex], ...updatedData };

        // Find and remove existing card
        const existingCard = this.container.querySelector(`[data-plan="${planId}"]`);
        if (existingCard) {
            existingCard.remove();
        }

        // Re-render the updated card
        this.renderCard(this.plans[planIndex], planIndex);
        
        console.log(`Plan "${planId}" updated successfully`);
    }

    /**
     * Remove a plan from the display
     * @param {string} planId - ID of the plan to remove
     */
    removePlan(planId) {
        const planIndex = this.plans.findIndex(plan => plan.id === planId);
        
        if (planIndex === -1) {
            console.warn(`Plan with ID "${planId}" not found`);
            return;
        }

        // Remove from data array
        this.plans.splice(planIndex, 1);

        // Remove from DOM
        const cardElement = this.container.querySelector(`[data-plan="${planId}"]`);
        if (cardElement) {
            cardElement.remove();
        }

        console.log(`Plan "${planId}" removed successfully`);
    }

    /**
     * Get current plans data
     * @returns {Array} - Array of current plan objects
     */
    getPlans() {
        return [...this.plans]; // Return copy to prevent external modification
    }

    /**
     * Clear all pricing cards
     */
    clear() {
        this.container.innerHTML = '';
        this.plans = [];
        console.log('All pricing cards cleared');
    }

    /**
     * Destroy the component and clean up event listeners
     */
    destroy() {
        this.clear();
        this.eventCallbacks = {};
        console.log('PricingComponent destroyed');
    }
}

// Export for use in other modules (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PricingComponent;
}