import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import "../styles/Contact.css";
import { Link, useLocation } from "react-router-dom";

const Contact = () => {
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
      {/* Hero Section */}
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

      {/* Contact Info Cards */}
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

        {/* Main Content */}
        <div className='contact-content-grid'>
          {/* Contact Form */}
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

          {/* Additional Information */}
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

export default Contact;
