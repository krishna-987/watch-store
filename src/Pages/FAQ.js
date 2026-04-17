import { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    q: "WHAT TYPE OF WATCHES ARE SEVENFRIDAY TIMEPIECES?",
    a: "SEVENFRIDAY timepieces are primarily automatic mechanical watches, designed with an industrial aesthetic and built using premium materials. Select collections may feature quartz movements, but the brand is best known for its mechanical craftsmanship."
  },
  {
    q: "MY WATCH HAS STOPPED OR IS RUNNING INACCURATELY. WHAT SHOULD I DO?",
    a: "Ensure the watch is fully wound by rotating the crown approximately 40–50 times. Automatic watches rely on wrist movement; if not worn regularly, manual winding is required. If the issue persists, please contact an authorized service center."
  },
  {
    q: "HOW SHOULD I MAINTAIN MY WATCH?",
    a: "Avoid exposure to extreme temperatures, magnetic fields, and strong impacts. Clean your watch with a soft cloth and service it periodically (every 3–5 years) through authorized service providers."
  },
  {
    q: "ARE SEVENFRIDAY WATCHES WATER-RESISTANT?",
    a: "Yes, most models are water-resistant; however, they are not designed for deep-water activities. Always check the specific water resistance rating of your model before exposure to water."
  },
  {
    q: "DO YOU PROVIDE WARRANTY COVERAGE?",
    a: "All watches come with an international manufacturer’s warranty (typically 1 year), covering defects in materials and workmanship. The warranty does not cover damage due to misuse or normal wear and tear."
  },
  {
    q: "HOW CAN I VERIFY THE AUTHENTICITY OF MY WATCH?",
    a: "SEVENFRIDAY watches include NFC authentication technology. You can verify your product using the official SEVENFRIDAY app to ensure authenticity."
  },
  {
    q: "DO YOU OFFER RETURNS OR EXCHANGES?",
    a: "Yes, we offer a limited return/exchange policy within a specified period (e.g., 7 days), provided the product is unused and in its original packaging. Terms may vary based on region."
  },
  {
    q: "HOW LONG DOES SHIPPING TAKE?",
    a: "Orders are typically delivered within 2–5 business days. Delivery timelines may vary depending on location and logistics conditions."
  },
  {
    q: "CAN I TRACK MY ORDER?",
    a: "Yes, once your order is shipped, a tracking ID will be shared via email or SMS. You can use it to monitor delivery status in real-time."
  },
  {
    q: "DO YOU OFFER INTERNATIONAL SHIPPING?",
    a: "International shipping availability depends on your location. Shipping fees, duties, and taxes may apply as per local regulations."
  },
  {
    q: "DOES SEVENFRIDAY OFFER BUY-BACK OR TRADE-IN OPTIONS?",
    a: "Currently, SEVENFRIDAY does not offer direct buy-back or trade-in programs. Customers may explore third-party resale platforms if needed."
  },
  {
    q: "HOW CAN I STAY UPDATED ON NEW COLLECTIONS AND OFFERS?",
    a: "You can subscribe to our newsletter or follow our official social media channels to receive updates on new launches, collaborations, and exclusive offers."
  },
  {
    q: "HOW CAN I CONTACT CUSTOMER SUPPORT?",
    a: "You can reach our customer support team via email, phone, or through the contact form available on our website. Support hours may vary by region."
  }
];
function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="faq-page">

      {/* ✅ VIDEO SECTION */}
    <div className="faq-video">
  <video autoPlay loop muted playsInline>
    <source src="/videos/watch.mp4" type="video/mp4" />
  </video>
</div>

      {/* ✅ FAQ LIST */}
      <div className="faq-container">
        <h2 className="faq-title">FAQs</h2>

        {faqData.map((item, index) => (
          <div key={index} className="faq-item">

            <div
              className="faq-question"
              onClick={() => toggle(index)}
            >
              {item.q}
              <span>{open === index ? "−" : "+"}</span>
            </div>

            {open === index && (
              <div className="faq-answer">
                {item.a}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

export default FAQ;