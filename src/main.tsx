import { FormEvent, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './brand.css';

type IconName = 'software' | 'equipment' | 'automation' | 'digital' | 'infrastructure' | 'integration';

type Solution = {
  icon: IconName;
  title: string;
  copy: string;
};

const Icon = ({ name }: { name: IconName }) => <span className={`icon icon-${name}`} aria-hidden="true" />;

const solutions: Solution[] = [
  { icon: 'digital', title: 'Technology & IT Solutions', copy: 'Connect with technologies, systems and specialist providers suited to your organisation’s needs.' },
  { icon: 'integration', title: 'Laboratory & Healthcare Solutions', copy: 'Explore relevant equipment, systems and solution providers for laboratory and healthcare environments.' },
  { icon: 'automation', title: 'Industrial & Manufacturing Solutions', copy: 'Source practical technology, machinery and operational solutions for evolving industrial requirements.' },
  { icon: 'infrastructure', title: 'Business & Office Infrastructure', copy: 'Identify products, services and infrastructure that support effective business operations.' },
  { icon: 'equipment', title: 'Energy & Infrastructure Solutions', copy: 'Explore suitable products, services and providers for energy and infrastructure requirements.' },
  { icon: 'software', title: 'Software & Digital Solutions', copy: 'Discover digital tools and implementation partners that support stronger ways of working.' },
  { icon: 'equipment', title: 'Equipment & Machinery', copy: 'Access a wider market for commercial equipment, machinery and associated specialist services.' },
  { icon: 'integration', title: 'Specialised Products & Services', copy: 'Bring distinctive requirements to a broader network of relevant providers and possibilities.' }
];

const sectors = [
  'Technology & IT',
  'Healthcare & Laboratory',
  'Industrial & Manufacturing',
  'Business & Office',
  'Energy & Infrastructure',
  'Education & Research',
  'Specialised Products & Services'
];

function Logo({ variant = 'navy' }: { variant?: 'navy' | 'white' }) {
  return (
    <a className="logo" href="#home" aria-label="SOLUTION REDEFINED home">
      <img src={`/assets/brand/zolvo-logo-${variant}.png`} alt="ZOLVO — Solution Redefined" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Home', 'home'],
    ['About Us', 'about'],
    ['Solutions', 'solutions'],
    ['Industries', 'industries'],
    ['Our Approach', 'approach'],
    ['Contact', 'contact']
  ];

  return (
    <header>
      <nav className="nav shell">
        <Logo />
        <button className="menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <i />
          <i />
          <i />
        </button>
        <div className={`links ${open ? 'open' : ''}`}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="button nav-cta" href="#solutions" onClick={() => setOpen(false)}>Explore Solutions <b>&rarr;</b></a>
        </div>
      </nav>
    </header>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Thank you. Your enquiry is ready to be sent once a form service is connected.');
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="fields">
        <label>Full Name<input required name="name" /></label>
        <label>Company / Organisation Name<input required name="company" /></label>
        <label>Email<input required type="email" name="email" /></label>
        <label>Phone Number<input required type="tel" name="phone" /></label>
        <label>Industry<select required defaultValue=""><option disabled value="">Select an industry</option>{sectors.map((sector) => <option key={sector}>{sector}</option>)}</select></label>
        <label>Requirement Category<select required defaultValue=""><option disabled value="">Select a category</option>{solutions.map((solution) => <option key={solution.title}>{solution.title}</option>)}</select></label>
      </div>
      <label>Message<textarea required name="message" rows={4} placeholder="Tell us about your requirement" /></label>
      <button className="button submit">Send Business Enquiry <b>&rarr;</b></button>
      {status && <p className="form-status" role="status">{status}</p>}
      <p className="privacy">Your details are used only to respond to your business enquiry. This form is presently configured for a future form-processing service.</p>
    </form>
  );
}

function App() {
  return <>
    <Header />
    <main>
      <section className="hero" id="home">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Business solutions & sales coordination</p>
            <h1>Every Requirement Deserves the <em>Right Solution.</em></h1>
            <p className="lead">From technology and equipment to specialised business solutions, we connect customers with trusted providers, helping turn requirements into practical possibilities.</p>
            <div className="actions">
              <a className="button" href="#solutions">Explore Solutions <b>&rarr;</b></a>
              <a className="text-link" href="#approach">Our Approach <b>&nearr;</b></a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85" alt="Contemporary enterprise workspace" />
            <div className="image-label"><span>01</span><p>One connection.<br />Multiple possibilities.</p></div>
          </div>
        </div>
      </section>

      <section className="position shell">
        <p className="eyebrow">A structured way forward</p>
        <div className="split-title">
          <h2>One Connection. Multiple <em>Possibilities.</em></h2>
          <p>We turn broad requirements into clearer next steps by bringing the right people, products and providers into the conversation.</p>
        </div>
        <div className="pillars">
          {[
            ['01', 'Understand', 'We identify customer requirements, challenges and business objectives.'],
            ['02', 'Connect', 'We identify and connect customers with suitable solution providers across industries.'],
            ['03', 'Deliver', 'We coordinate the commercial journey and help customers move towards the right solution.']
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="muted" id="solutions">
        <div className="shell">
          <p className="eyebrow">An adaptable solution network</p>
          <div className="split-title"><h2>Solutions That Grow With Your <em>Requirements.</em></h2><a className="text-link" href="#approach">Explore our approach <b>&rarr;</b></a></div>
          <div className="solutions enterprise-solutions">
            {solutions.map((solution) => (
              <article className="solution" key={solution.title}>
                <Icon name={solution.icon} />
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>
                <a href="#approach" aria-label={`Explore our approach to ${solution.title}`}>Explore Our Approach <b>&rarr;</b></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work shell" id="approach">
        <p className="eyebrow">A considered commercial process</p>
        <h2>How We <em>Move Things Forward.</em></h2>
        <div className="steps">
          {[
            ['01', 'Understand', 'Clarify the requirement, operating context and commercial priorities.'],
            ['02', 'Identify', 'Explore the market for suitable products, services and solution providers.'],
            ['03', 'Evaluate', 'Support an informed view of suitability, scope and commercial alignment.'],
            ['04', 'Connect', 'Coordinate introductions and commercial discussions with relevant providers.'],
            ['05', 'Support', 'Coordinate next steps towards implementation and after-sales support where agreed.']
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="finance">
        <div className="shell finance-grid">
          <div>
            <p className="eyebrow light">A more practical route forward</p>
            <h2>Better Access to Solutions. Greater <em>Financial Flexibility.</em></h2>
            <p>We believe access to the right solutions should be practical and commercially achievable. Through suitable financing partners, customers may explore flexible purchasing options for eligible products and services.</p>
            <p className="finance-disclaimer">Financing is provided by independent financial institutions and remains subject to their eligibility criteria and approval.</p>
            <a className="button inverse" href="#approach">Explore Our Approach <b>&rarr;</b></a>
          </div>
          <div className="finance-visual">
            <div className="orb" />
            <div className="data-card"><small>ACCESS & COORDINATION</small><strong>01 / 03</strong><span>Suitability first. Financing where available.</span></div>
          </div>
        </div>
      </section>

      <section className="industries shell" id="industries">
        <div className="industries-image"><img loading="lazy" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" alt="Modern commercial architecture representing a broad business network" /></div>
        <div>
          <p className="eyebrow">Across sectors, without silos</p>
          <h2>Built for the Needs of a More <em>Connected Business World.</em></h2>
          <p>Our business model is designed to grow across categories and industries. We begin with the requirement, then create the right path to relevant products, services and providers.</p>
          <ul>{sectors.map((sector) => <li key={sector}>{sector}<b>&nearr;</b></li>)}</ul>
        </div>
      </section>

      <section className="about muted" id="about">
        <div className="shell about-grid">
          <div><p className="eyebrow">Who we are</p><h2>Requirements In. The Right <em>Possibilities Out.</em></h2></div>
          <div>
            <p>SOLUTION REDEFINED is a business solutions and sales partner focused on connecting customers with the products, services and technologies they need.</p>
            <p>We work across solution categories and industries, bringing customers and solution providers together through a structured, customer-focused approach. Our objective is simple: understand the requirement, identify the possibilities and connect customers with the right solutions.</p>
            <a className="text-link" href="#approach">Explore our approach <b>&rarr;</b></a>
          </div>
        </div>
      </section>

      <section className="why shell">
        <p className="eyebrow">Why solution redefined</p>
        <h2>Your Requirements. Our Network. The Right <em>Connections.</em></h2>
        <div className="why-grid">
          {[
            'Multiple solution categories under one business relationship',
            'Access to different solution providers',
            'Customer-focused requirement assessment',
            'Simplified product and service discovery',
            'Commercial coordination',
            'Financing possibilities through external partners',
            'Long-term business relationships'
          ].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item}</h3></article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-grid contact-grid-single">
          <div>
            <p className="eyebrow light">Contact</p>
            <h2>Building a Stronger Network of <em>Possibilities.</em></h2>
            <p>We are expanding our solution network and service capabilities. Business enquiry submissions will be introduced as the company grows.</p>
            <div className="contact-details">
              <p><small>REGISTERED OFFICE</small>Registered office address<br />[To be added]</p>
              <p><small>CONTACT DETAILS</small><a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a><br /><a href="tel:+910000000000">+91 00000 00000</a></p>
            </div>
          </div>
          {/* Re-enable <ContactForm /> when business enquiry submissions are ready to be accepted. */}
        </div>
      </section>
    </main>
    <footer>
      <div className="shell footer-grid">
        <div><Logo variant="white" /><p>Connecting needs with products, services, technologies and trusted solution providers.</p></div>
        <div><h3>Explore</h3><a href="#about">About Us</a><a href="#solutions">Solutions</a><a href="#industries">Industries</a><a href="#approach">Our Approach</a></div>
        <div><h3>Solutions</h3><a href="#solutions">Technology & IT</a><a href="#solutions">Equipment & Machinery</a><a href="#solutions">Infrastructure</a><a href="#contact">Financing Options</a></div>
        <div><h3>Contact</h3><a href="#contact">Contact details</a><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a><a href="#">Disclaimer</a></div>
      </div>
      <div className="shell copyright">&copy; {new Date().getFullYear()} SOLUTION REDEFINED. All Rights Reserved.<span>Connecting Needs. Delivering Solutions.</span></div>
    </footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
