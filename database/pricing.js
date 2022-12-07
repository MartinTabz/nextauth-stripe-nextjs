export const pricingPlans = [
   {
      title: 'Basic',
      cena: 550,
      currency: 'Kč',
      frequency: '/měsíc',
      description: 'Základní stránky',
      features: [
         'Footshop',
         'Asos',
         'Shopify'
      ],
      mostPopular: false,
      stripeplan: 'price_1MCOI4Ie6OfE8rNR3OClLkk1'
   },
   {
      title: 'Pro',
      cena: 800,
      currency: 'Kč',
      frequency: '/měsíc',
      description: 'Všechny možné stránky',
      features: [
         'Footshop',
         'Asos',
         'Supreme',
         'Shopify',
         'Undefeated'
      ],
      mostPopular: true,
      stripeplan: 'price_1MCOIbIe6OfE8rNR2duYdF6J'
   },
   {
      title: 'Enterprise',
      cena: 990,
      currency: 'Kč',
      frequency: '/měsíc',
      description: 'Všechny možné stránky a aplikace',
      features: [
         'Stránky z Pro předplatného',
         'Nike',
         'SNKRS',
         'YZY',
         '+12 dalších'
      ],
      mostPopular: false,
      stripeplan: 'price_1MCOJIIe6OfE8rNRpd2HTMwR'
   },
]