import { useState } from "react";
/* import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowLeft } from "lucide-react"; */
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "../styles/Contact.css";

/* const Contact = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const subject = params.get("subject");
  const message = params.get("message");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subject ? `Inquiry about ${subject}` : "", // Use the subject from URL params if available
    message: message || "", // Use the message from URL params if available
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // submit form
    const endpoint = process.env.REACT_APP_Back_end_api_root + "/contactUs";
    const payload = {
      name: formData.name,
      subject: formData.subject,
      customerEmail: formData.email,
      message: formData.message,
      phone: formData.phone,
    };

    try {
      let response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, you can set an error state here to show an error message to the user
      alert(" Error sending message try again later ");
      setIsSubmitting(false);
      return;
    }
  };

  const contactInfo = [
    {
      icon: <Phone className='contact-info-icon' />,
      title: "Phone",
      content: "+234 801 59273522",
      description: "Call us Monday to Friday 9AM-6PM",
    },
    {
      icon: <Mail className='contact-info-icon' />,
      title: "Email",
      content: "storelense@pragmasolutions.co",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className='contact-info-icon' />,
      title: "Branch Office",
      content: "Spera in Deo Park, block 38",
      description: "Abakaliki Ebonyi State, Nigeria",
    },
    {
      icon: <Clock className='contact-info-icon' />,
      title: "Hours",
      content: "Mon-Fri: 9AM-6PM",
      description: "Weekend support available",
    },
  ];

  return (
    <div className='contact-page-container'>
      <nav className='sl-nav'>
        <div className='sl-nav-container'>
          <Link to='/' className='sl-nav-back'>
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Home</span>
          </Link>
          <img
            src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
            alt='StoreLense'
            className='sl-nav-logo'
          />
        </div>
      </nav>
     
      <div className='contact-hero-section'>
        <div className='contact-hero-container'>
          <div className='contact-hero-content'>
            <h1 className='contact-hero-title'>
              Contact <span className='contact-hero-title-highlight'>Us</span>
            </h1>
            <p className='contact-hero-description'>Ready to transform your business with our POS solutions? Get in touch with our expert team today.</p>
          </div>
        </div>
      </div>

      
      <div className='contact-main-container'>
        <div className='contact-info-grid'>
          {contactInfo.map((info, index) => (
            <Card key={index} className='contact-info-card'>
              <CardContent className='contact-info-card-content'>
                <div className='contact-info-icon-wrapper'>{info.icon}</div>
                <h3 className='contact-info-title'>{info.title}</h3>
                <p className='contact-info-content'>{info.content}</p>
                <p className='contact-info-description'>{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

       
        <div className='contact-content-grid'>
         
          <Card className='contact-form-card'>
            <CardHeader>
              <CardTitle className='contact-form-title'>Send us a Message</CardTitle>
              <p style={{ marginBottom: "20px" }} className='contact-form-subtitle'>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className='contact-success-message'>
                  <CheckCircle className='contact-success-icon' />
                  <h3 className='contact-success-title'>Message Sent!</h3>
                  <p className='contact-success-description'>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='contact-form'>
                  <div className='contact-form-row'>
                    <div className='contact-form-field'>
                      <p htmlFor='name' className='contact-form-label'>
                        Full Name *
                      </p>
                      <Input
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder='John Doe'
                        className='contact-form-input'
                      />
                    </div>
                    <div className='contact-form-field'>
                      <p htmlFor='email' className='contact-form-label'>
                        Email Address *
                      </p>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder='john@example.com'
                        className='contact-form-input'
                      />
                    </div>
                  </div>

                  <div className='contact-form-row'>
                    <div className='contact-form-field'>
                      <p htmlFor='phone' className='contact-form-label'>
                        Phone Number
                      </p>
                      <Input
                        id='phone'
                        name='phone'
                        type='tel'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='+1 (555) 123-4567'
                        className='contact-form-input'
                      />
                    </div>
                    <div className='contact-form-field'>
                      <p htmlFor='subject' className='contact-form-label'>
                        Subject *
                      </p>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder='POS Installation Inquiry'
                        className='contact-form-input'
                      />
                    </div>
                  </div>

                  <div className='contact-form-field'>
                    <p htmlFor='message' className='contact-form-label'>
                      Message *
                    </p>
                    <Textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder='Tell us about your business needs and how we can help...'
                      className='contact-form-textarea'
                    />
                  </div>

                  <Button type='submit' disabled={isSubmitting} className='contact-form-submit-button'>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className='contact-form-submit-icon' />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

        
          <div className='contact-sidebar'>
            <Card className='contact-features-card'>
              <CardHeader>
                <CardTitle className='contact-features-title'>Why Choose Our POS Solutions?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='contact-features-list'>
                  <li style={{ marginTop: "20px" }} className='contact-feature-item'>
                    <CheckCircle className='contact-feature-icon' />
                    <span>Free installation and setup with zero downtime</span>
                  </li>
                  <li className='contact-feature-item'>
                    <CheckCircle className='contact-feature-icon' />
                    <span>Comprehensive staff training included</span>
                  </li>
                  <li className='contact-feature-item'>
                    <CheckCircle className='contact-feature-icon' />
                    <span>24/7 technical support and maintenance</span>
                  </li>
                  <li className='contact-feature-item'>
                    <CheckCircle className='contact-feature-icon' />
                    <span>Annual performance analysis and reporting</span>
                  </li>
                  <li className='contact-feature-item'>
                    <CheckCircle className='contact-feature-icon' />
                    <span>Flexible discount packages available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className='contact-guarantee-card'>
              <CardHeader>
                <CardTitle className='contact-guarantee-title'>Quick Response Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ marginTop: "10px" }} className='contact-guarantee-description'>
                  We understand that time is money in business. That's why we guarantee:
                </p>
                <div className='contact-guarantee-box'>
                  <div className='contact-guarantee-header'>
                    <Clock className='contact-guarantee-icon' />
                    <span className='contact-guarantee-label'>Response Times</span>
                  </div>
                  <ul className='contact-guarantee-list'>
                    <li>• Email inquiries: Within 4 hours</li>
                    <li>• Phone calls: Immediate during business hours</li>
                    <li>• Emergency support: Available 24/7</li>
                    <li>• On-site visits: Within 24-48 hours</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; */

import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "2348159273522";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const CONTACT_INFO = [
  {
    icon: Phone,
    color: "#2563EB",
    bg: "#EAF1FF",
    title: "Call us",
    content: "+234 801 59273522",
    sub: "Mon – Fri, 9 AM – 6 PM",
    href: "tel:+23480159273522",
    cta: "Call now",
  },
  {
    icon: MessageCircle,
    color: "#16A34A",
    bg: "#E7F8EE",
    title: "WhatsApp",
    content: "+234 801 59273522",
    sub: "Fastest response guaranteed",
    href: `${WHATSAPP_BASE}?text=Hi%20StoreLense%2C%20I%20have%20a%20question`,
    cta: "Open WhatsApp",
    whatsapp: true,
  },
  {
    icon: Mail,
    color: "#37B4C5",
    bg: "#EAFBFD",
    title: "Email",
    content: "storelense@pragmasolutions.co",
    sub: "We reply within 24 hours",
    href: "mailto:storelense@pragmasolutions.co",
    cta: "Send email",
  },
  {
    icon: MapPin,
    color: "#F5A623",
    bg: "#FFF3E0",
    title: "Branch office",
    content: "Spera in Deo Park, Block 38",
    sub: "Abakaliki, Ebonyi State, Nigeria",
    href: "https://maps.google.com/?q=Abakaliki+Ebonyi+State+Nigeria",
    cta: "Get directions",
  },
];

const FEATURES = [
  "Free installation and setup with zero downtime",
  "Comprehensive staff training included",
  "24/7 technical support and maintenance",
  "Annual performance analysis and reporting",
  "Flexible discount packages available",
];

const RESPONSE_TIMES = [
  { label: "WhatsApp", time: "Within minutes" },
  { label: "Phone calls", time: "Immediate (business hours)" },
  { label: "Email inquiries", time: "Within 4 hours" },
  { label: "On-site visits", time: "Within 24 – 48 hours" },
];

export default function Contact() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlSubject = params.get("subject");
  const urlMessage = params.get("message");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: urlSubject ? `Inquiry about ${urlSubject}` : "",
    message: urlMessage || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const endpoint = process.env.REACT_APP_Back_end_api_root + "/contactUs";
    const payload = {
      name: formData.name,
      subject: formData.subject,
      customerEmail: formData.email,
      message: formData.message,
      phone: formData.phone,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Network error");
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 4000);
    } catch {
      setIsSubmitting(false);
      setError("Something went wrong. Please try again or reach us on WhatsApp.");
    }
  };

  const whatsappFormLink = () => {
    const msg = encodeURIComponent(
      `Hi StoreLense! My name is ${formData.name || "..."}\n\n${formData.message || "I'd like to know more about your POS solutions."}`
    );
    return `${WHATSAPP_BASE}?text=${msg}`;
  };

  return (
    <div className='ct'>
      {/* Nav */}
      <nav className='ct__nav'>
        <div className='ct__nav-inner'>
          <Link to='/' className='ct__nav-back'>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <img
            src='https://res.cloudinary.com/ebuka1122/image/upload/v1747600616/StorelenseLogos/Group_2823_fsprsy.png'
            alt='StoreLense'
            className='ct__nav-logo'
          />
        </div>
      </nav>

      {/* Hero */}
      <div className='ct__hero'>
        <div className='ct__hero-inner'>
          <span className='ct__eyebrow'>
            <span className='ct__eyebrow-dot' />
            We're here to help
          </span>
          <h1 className='ct__hero-title'>
            Get in touch with
            <br />
            <span className='ct__hero-accent'>our team</span>
          </h1>
          <p className='ct__hero-sub'>
            Ready to transform your business with StoreLense? Reach us by phone, WhatsApp, or email — and expect a fast, human response.
          </p>
          <a href={`${WHATSAPP_BASE}?text=Hi%20StoreLense%2C%20I%20have%20a%20question`} target='_blank' rel='noopener noreferrer' className='ct__hero-wa'>
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
        <div className='ct__hero-blob' aria-hidden='true' />
      </div>

      {/* Contact cards */}
      <div className='ct__wrap'>
        <div className='ct__cards'>
          {CONTACT_INFO.map((info) => {
            const Icon = info.icon;
            return (
              <a
                key={info.title}
                href={info.href}
                target={info.whatsapp || info.href.startsWith("http") ? "_blank" : undefined}
                rel='noopener noreferrer'
                className={`ct__card${info.whatsapp ? " ct__card--wa" : ""}`}
              >
                <span className='ct__card-ic' style={{ background: info.bg }}>
                  <Icon size={20} color={info.color} strokeWidth={2} />
                </span>
                <div className='ct__card-body'>
                  <span className='ct__card-title'>{info.title}</span>
                  <span className='ct__card-content'>{info.content}</span>
                  <span className='ct__card-sub'>{info.sub}</span>
                </div>
                <span className='ct__card-cta' style={{ color: info.color }}>
                  {info.cta} →
                </span>
              </a>
            );
          })}
        </div>

        {/* Main grid */}
        <div className='ct__grid'>
          {/* Form */}
          <div className='ct__form-card'>
            <div className='ct__form-header'>
              <h2 className='ct__form-title'>Send us a message</h2>
              <p className='ct__form-sub'>
                Fill in the form and we'll get back to you as fast as possible. Prefer instant replies?{" "}
                <a href={whatsappFormLink()} target='_blank' rel='noopener noreferrer' className='ct__inline-wa'>
                  Message us on WhatsApp
                </a>
                .
              </p>
            </div>

            {isSubmitted ? (
              <div className='ct__success'>
                <span className='ct__success-ic'>
                  <CheckCircle size={36} color='#16A34A' />
                </span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='ct__form' noValidate>
                <div className='ct__form-row'>
                  <div className='ct__field'>
                    <label htmlFor='ct-name' className='ct__label'>
                      Full name <span>*</span>
                    </label>
                    <input
                      id='ct-name'
                      name='name'
                      type='text'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder='John Doe'
                      className='ct__input'
                    />
                  </div>
                  <div className='ct__field'>
                    <label htmlFor='ct-email' className='ct__label'>
                      Email address <span>*</span>
                    </label>
                    <input
                      id='ct-email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='john@example.com'
                      className='ct__input'
                    />
                  </div>
                </div>

                <div className='ct__form-row'>
                  <div className='ct__field'>
                    <label htmlFor='ct-phone' className='ct__label'>
                      Phone number
                    </label>
                    <input
                      id='ct-phone'
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='+234 801 234 5678'
                      className='ct__input'
                    />
                  </div>
                  <div className='ct__field'>
                    <label htmlFor='ct-subject' className='ct__label'>
                      Subject <span>*</span>
                    </label>
                    <input
                      id='ct-subject'
                      name='subject'
                      type='text'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder='POS Installation Inquiry'
                      className='ct__input'
                    />
                  </div>
                </div>

                <div className='ct__field'>
                  <label htmlFor='ct-message' className='ct__label'>
                    Message <span>*</span>
                  </label>
                  <textarea
                    id='ct-message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder='Tell us about your business needs and how we can help...'
                    className='ct__textarea'
                    rows={5}
                  />
                </div>

                {error && <p className='ct__error'>{error}</p>}

                <div className='ct__form-actions'>
                  <button type='submit' disabled={isSubmitting} className='ct__submit'>
                    {isSubmitting ? (
                      <span className='ct__spinner' />
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                  <a href={whatsappFormLink()} target='_blank' rel='noopener noreferrer' className='ct__wa-btn'>
                    <MessageCircle size={16} />
                    Send via WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className='ct__sidebar'>
            {/* Why us */}
            <div className='ct__sidebar-card'>
              <h3 className='ct__sidebar-title'>Why choose StoreLense?</h3>
              <ul className='ct__feature-list'>
                {FEATURES.map((f) => (
                  <li key={f} className='ct__feature-item'>
                    <CheckCircle size={16} color='#37B4C5' strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response times */}
            <div className='ct__sidebar-card ct__sidebar-card--accent'>
              <div className='ct__sidebar-card-header'>
                <Clock size={18} color='#2563EB' />
                <h3 className='ct__sidebar-title'>Response guarantee</h3>
              </div>
              <p className='ct__sidebar-sub'>Time is money — here's how fast we respond:</p>
              <div className='ct__times'>
                {RESPONSE_TIMES.map((r) => (
                  <div key={r.label} className='ct__time-row'>
                    <span className='ct__time-label'>{r.label}</span>
                    <span className='ct__time-val'>{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`${WHATSAPP_BASE}?text=Hi%20StoreLense%2C%20I%27d%20like%20to%20know%20more%20about%20your%20POS%20solutions.`}
              target='_blank'
              rel='noopener noreferrer'
              className='ct__wa-card'
            >
              <MessageCircle size={28} color='#fff' />
              <div>
                <div className='ct__wa-card-title'>Chat on WhatsApp</div>
                <div className='ct__wa-card-sub'>Fastest way to reach us — we reply in minutes</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
