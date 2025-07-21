import React from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  faqs: FAQItem[];
  mainEntity?: boolean;
}

export const createFAQSchema = (props: FAQSchemaProps) => {
  const { faqs, mainEntity = true } = props;
  
  // Create FAQ items
  const faqItems = faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));
  
  // Return schema based on mainEntity flag
  if (mainEntity) {
    return {
      type: 'FAQPage',
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems
      }
    };
  } else {
    return {
      type: 'FAQ',
      data: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": faqItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": item
        }))
      }
    };
  }
};

export default createFAQSchema;