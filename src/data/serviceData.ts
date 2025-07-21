/**
 * Service data for locksmith services
 * This data is used for service-specific meta tags and structured data
 */

export interface ServiceData {
  name: string;
  category: string;
  description: string;
  slug: string;
  parentSlug?: string;
  price?: string;
  priceRange?: string;
  availability?: string;
  keywords: string[];
  relatedServices?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export const serviceData: Record<string, ServiceData> = {
  'emergency-locksmith': {
    name: 'Emergency Locksmith Services',
    category: 'Emergency',
    description: 'Immediate 24/7 emergency locksmith services for car lockouts, home lockouts, business lockouts and more. Fast response, competitive rates, and licensed professionals.',
    slug: 'emergency-locksmith',
    priceRange: '$75-$150',
    availability: 'InStock',
    keywords: [
      'emergency locksmith',
      '24/7 locksmith',
      'lockout service',
      'car lockout',
      'house lockout',
      'business lockout',
      'urgent locksmith'
    ],
    relatedServices: [
      'car-lockout',
      'house-lockout',
      'business-lockout',
      'storage-unit-lockout'
    ],
    faqs: [
      {
        question: 'How quickly can an emergency locksmith arrive?',
        answer: 'Our emergency locksmiths typically arrive within 15-30 minutes of your call, depending on your location and current demand.'
      },
      {
        question: 'Do you provide emergency locksmith services 24/7?',
        answer: 'Yes, we offer 24/7 emergency locksmith services, including weekends and holidays.'
      },
      {
        question: 'How much does an emergency locksmith service cost?',
        answer: 'Emergency locksmith services typically range from $75-$150 depending on the service required, time of day, and complexity of the job.'
      }
    ]
  },
  'residential-locksmith': {
    name: 'Residential Locksmith Services',
    category: 'Residential',
    description: 'Professional residential locksmith solutions including lock installation, repair, rekey, and upgrade services. Enhance your home security with our expert locksmiths.',
    slug: 'residential-locksmith',
    priceRange: '$50-$200',
    availability: 'InStock',
    keywords: [
      'residential locksmith',
      'home locksmith',
      'house locks',
      'door locks',
      'lock installation',
      'lock repair',
      'lock rekey',
      'deadbolt installation'
    ],
    relatedServices: [
      'lock-replacement',
      'lock-rekey',
      'lock-repair',
      'gate-locks'
    ],
    faqs: [
      {
        question: 'How often should I change my home locks?',
        answer: 'It\'s recommended to change or rekey your home locks every 3-5 years, or immediately after moving into a new home, after a break-in attempt, or if you\'ve lost your keys.'
      },
      {
        question: 'What\'s the difference between rekeying and replacing locks?',
        answer: 'Rekeying changes the internal pins of a lock so it works with a new key while keeping the existing hardware. Replacing locks involves installing entirely new lock hardware.'
      },
      {
        question: 'What types of residential locks do you install?',
        answer: 'We install a wide range of residential locks including deadbolts, knob locks, lever handle locks, smart locks, keyless entry systems, and high-security locks from trusted brands.'
      }
    ]
  },
  'commercial-locksmith': {
    name: 'Commercial Locksmith Services',
    category: 'Commercial',
    description: 'Expert commercial locksmith solutions including master key systems, access control, high-security locks, and emergency exit devices for businesses of all sizes.',
    slug: 'commercial-locksmith',
    priceRange: '$100-$500',
    availability: 'InStock',
    keywords: [
      'commercial locksmith',
      'business locksmith',
      'commercial security',
      'master key system',
      'access control',
      'high-security locks',
      'emergency exit device'
    ],
    relatedServices: [
      'lock-replacement',
      'lock-rekey',
      'emergency-exit-device',
      'master-key',
      'access-control'
    ],
    faqs: [
      {
        question: 'What is a master key system?',
        answer: 'A master key system allows different levels of access within a building. Individual keys work only on specific doors, while master keys can open multiple or all doors in the system.'
      },
      {
        question: 'Can you install access control systems?',
        answer: 'Yes, we install and service various access control systems including keypad entry, card readers, biometric systems, and electronic locks for businesses of all sizes.'
      },
      {
        question: 'Do you work with specific commercial lock brands?',
        answer: 'We work with all major commercial lock brands including Schlage, Yale, ASSA ABLOY, Medeco, Mul-T-Lock, and many others to provide the best security solutions for your business.'
      }
    ]
  },
  'auto-locksmith': {
    name: 'Auto Locksmith Services',
    category: 'Automotive',
    description: 'Professional automotive locksmith services including car key replacement, key fob programming, ignition repair, and car lockouts. Service for all vehicle makes and models.',
    slug: 'auto-locksmith',
    priceRange: '$75-$300',
    availability: 'InStock',
    keywords: [
      'auto locksmith',
      'car locksmith',
      'car key replacement',
      'key fob programming',
      'car lockout',
      'ignition repair',
      'car key duplication'
    ],
    relatedServices: [
      'car-key-replacement',
      'key-fob-programming',
      'car-key-duplicate',
      'car-key-cutting',
      'ignition-lock-cylinder'
    ],
    faqs: [
      {
        question: 'Can you make a car key without the original?',
        answer: 'Yes, we can make car keys without the original by using your vehicle\'s VIN number and proof of ownership. We can cut and program keys for virtually all makes and models.'
      },
      {
        question: 'How much does it cost to replace a car key?',
        answer: 'Car key replacement costs vary depending on the vehicle make, model, and key type. Basic keys may cost $75-150, while advanced key fobs or smart keys typically range from $150-300.'
      },
      {
        question: 'Can you program key fobs on-site?',
        answer: 'Yes, our mobile locksmiths have the equipment to program key fobs on-site for most vehicle makes and models, saving you a trip to the dealership.'
      }
    ]
  },
  'car-lockout': {
    name: 'Car Lockout Service',
    category: 'Emergency',
    description: 'Fast, professional car lockout service available 24/7. Our skilled locksmiths can quickly unlock your vehicle without damage, getting you back on the road.',
    slug: 'car-lockout',
    parentSlug: 'emergency-locksmith',
    price: '$75',
    availability: 'InStock',
    keywords: [
      'car lockout',
      'auto lockout',
      'vehicle lockout',
      'locked keys in car',
      'unlock car door',
      'emergency car locksmith'
    ],
    relatedServices: [
      'car-key-replacement',
      'key-fob-programming'
    ]
  },
  'house-lockout': {
    name: 'House Lockout Service',
    category: 'Emergency',
    description: 'Professional house lockout service available 24/7. Our expert locksmiths can quickly unlock your home door without damage, getting you back inside safely.',
    slug: 'house-lockout',
    parentSlug: 'emergency-locksmith',
    price: '$85',
    availability: 'InStock',
    keywords: [
      'house lockout',
      'home lockout',
      'residential lockout',
      'locked out of house',
      'unlock house door',
      'emergency home locksmith'
    ],
    relatedServices: [
      'lock-replacement',
      'lock-rekey'
    ]
  }
};