import  { useState } from "react";
function Faq() {
  const [activeIndex, setActiveIndex] = useState(null); // State to track active accordion item

  // Define an array of FAQ items
  const faqItems = [
    {
      question: "How Can I Trust BlackRock?",
      answer:
        "We understand that embarking on an educational journey abroad is a significant decision, and trusting your partner is essential. Here's why you can have complete confidence in choosing BlackRock are Years of Experience, Transparency, Dedicated Team, Global Network, Compliance, Client Success Stories, Financial Assistance, Accessibility.",
    },
    {
      question: "Do I Need to Take International Exams?",
      answer:
        "It's a great way to showcase your skills and potential to universities and colleges around the world. Here's why we highly recommend it. Many institutions consider international exams like TOEFL, IELTS, SAT, GMAT, or GRE as part of their admission criteria. A strong score can give your application an edge.",
    },
    {
      question: "Can You Help with Scholarships or Financial Aid?",
      answer:
        "Absolutely! We believe that financial barriers should never stand in the way of your educational dreams. We are committed to helping you secure the financial support you need to turn your educational dreams into reality.",
    },
    {
      question: "Do You Provide Services Only for Specific Countries?",
      answer:
        "No, we don't believe in limiting educational opportunities by borders. Our services are designed to empower you on your educational journey, regardless of your desired study destination. Here's what we offer: Global Reach, Tailored Guidance, Diverse Options, International Connections, Customized Solutions.",
    },
    {
      question: "What are the General Application Steps?",
      answer:
        "Navigating the application process for your educational journey abroad may seem daunting, but we're here to simplify it for you. Here are the general application steps: Initial Consultation -> Choose Your Destination -> Select Your Program -> Prepare Required Documents -> Financial Planning -> Language Proficiency -> Submit Applications -> Prepare for Interviews -> Visa Application ->Travel and Arrival -> Orientation and Integration -> Ongoing Support. Remember, each step of the application process is manageable with the right guidance and support.",
    },
    {
      question: "Can I Apply Without a Passport?",
      answer:
        "We understand that your educational dreams might not always align with your passport's expiration date. Here's the good news: yes, you can apply without a passport.We've got your back every step of the way: Guidance, Support, Timely Processing, Peace of Mind.",
    },
    // Add more FAQ items as needed
  ];

  // Split the faqItems array into two separate arrays for left and right columns
  const leftColumnItems = faqItems.slice(0, 3);
  const rightColumnItems = faqItems.slice(3);

  // Function to handle accordion item clicks
  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle accordion item
  };

  return (
    <section id="faq" className="faq">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <i className="bi bi-patch-question"></i>
          <div className="faq-header-text">
            <h2>Frequently Asked Questions</h2>
            <p>
              Here are some of the most common questions we receive from
              students. If you have any other questions, feel free to contact
              us.
            </p>
          </div>
        </header>

        <div className="row">
          <div className="col-lg-6">
            <div className="accordion accordion-flush" id="faqlist1">
              {leftColumnItems.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeIndex === index ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleAccordionClick(index)}
                      aria-expanded={activeIndex === index ? "true" : "false"}
                      aria-controls={`faq-content-${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`faq-content-${index}`}
                    className={`accordion-collapse collapse ${
                      activeIndex === index ? "show" : ""
                    }`}
                    aria-labelledby={`heading-${index}`}
                    data-bs-parent="#faqlist1"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="accordion accordion-flush" id="faqlist2">
              {rightColumnItems.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeIndex === index + 3 ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleAccordionClick(index + 3)}
                      aria-expanded={
                        activeIndex === index + 3 ? "true" : "false"
                      }
                      aria-controls={`faq-content-${index + 3}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`faq-content-${index + 3}`}
                    className={`accordion-collapse collapse ${
                      activeIndex === index + 3 ? "show" : ""
                    }`}
                    aria-labelledby={`heading-${index + 3}`}
                    data-bs-parent="#faqlist2"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
