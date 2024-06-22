// src/components/FAQ.js
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const faqs = [
        {
            question: "What is your organization's mission and impact?",
            answer: "Our organization's mission is to provide clean water and sanitation to communities in need. We have impacted thousands of lives through our projects."
        },
        {
            question: "How does my donation contribute?",
            answer: "Your donation directly supports our efforts in implementing clean water and sanitation projects in underserved areas, improving health and livelihoods."
        },
        {
            question: "Examples of funded projects?",
            answer: "Some of our funded projects include installing water purification systems, building sanitation facilities, and conducting hygiene awareness programs."
        },
        {
            question: "Transparency and accountability?",
            answer: "We maintain strict transparency by providing regular reports on fund utilization, project progress, and outcomes. Our financial records are audited and publicly accessible."
        },
        {
            question: "Donor involvement opportunities?",
            answer: "We offer various involvement opportunities such as volunteer programs, donor events, and project visits. Your participation helps us create a greater impact."
        },
        {
            question: "What impact has your organization made so far?",
            answer: "Our organization has provided clean water access to over 10,000 people and built sanitation facilities benefiting numerous communities."
        },
        {
            question: "Can you provide statistics or case studies showing outcomes?",
            answer: "Yes, we have documented case studies showing improved health metrics and socio-economic development in areas where our projects are implemented."
        },
        {
            question: "How do you ensure sustainability in your initiatives?",
            answer: "We focus on community engagement, capacity building, and technology transfer to ensure long-term sustainability of our projects."
        },
        {
            question: "What are the challenges your organization faces?",
            answer: "Some challenges include funding constraints, logistical issues in remote areas, and the need for continuous community support."
        },
        {
            question: "How can donors get involved beyond financial contributions?",
            answer: "Donors can volunteer, participate in awareness campaigns, advocate for policy changes, and share our work on social media."
        }
    ];
    
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="wrapper">
      <p>The Beginning of a New Asset Class</p>
      <h1>Frequently Asked Questions</h1>

      {faqs.map((faq, index) => (
        <div className="faq" key={index}>
          <button
            className={`accordion ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            {faq.question}
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <div className={`pannel ${activeIndex === index ? 'active' : ''}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
