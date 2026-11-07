import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Sun,
  Moon,
  ArrowUpRight,
  Send,
  CheckCircle,
  ExternalLink,
  Code2,
  Smartphone,
  Layers,
  Database,
  Sparkles,
  Terminal,
  Cpu,
  Palette,
  Briefcase,
  Copy,
  Check,
  ChevronRight,
  X,
  Menu
} from "lucide-react";

// Crisp custom brand SVGs (independent and guaranteed to render)
function GithubIcon({ size = 17, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon({ size = 17, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 17, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("philz-theme") || "dark";
  });
  const [navFloat, setNavFloat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [gridOverlay, setGridOverlay] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const spotRef = useRef(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("philz-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Scroll listener for nav floating background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setNavFloat(true);
      } else {
        setNavFloat(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Spotlight mouse effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        spotRef.current.style.setProperty("--mx", `${x}%`);
        spotRef.current.style.setProperty("--my", `${y}%`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard shortcut 'G' for easter egg grid overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "g" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        setGridOverlay((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto rotate project phone mockup screenshots every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShotIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("philipsanusi32@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSending(true);

    // Construct mailto link as direct guaranteed delivery fallback
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Sanusi,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    const mailtoUrl = `mailto:philipsanusi32@gmail.com?subject=${subject}&body=${body}`;

    // Fast dispatch feedback & triggers email composer
    setTimeout(() => {
      setFormSending(false);
      setFormSubmitted(true);
      window.location.href = mailtoUrl;
    }, 500);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Tools list requested by user
  const tools = [
    { name: "React Native", tag: "Mobile Apps", desc: "Building cross-platform mobile apps for iOS and Android.", icon: <Smartphone size={20} /> },
    { name: "JavaScript", tag: "Core Logic", desc: "Modern ES6+, asynchronous programming, and DOM interfaces.", icon: <Terminal size={20} /> },
    { name: "Node.js", tag: "Backend", desc: "Scalable server-side systems, RESTful APIs, and microservices.", icon: <Database size={20} /> },
    { name: "Python", tag: "Backend & AI", desc: "Data processing, script automation, backend APIs, and logic.", icon: <Cpu size={20} /> },
    { name: "GitHub", tag: "DevOps & VCS", desc: "Collaborative Git workflows, releases, and CI/CD pipelines.", icon: <GithubIcon size={20} /> },
    { name: "TypeScript", tag: "Type Safety", desc: "Robust type systems for large scalable web & app codebases.", icon: <Code2 size={20} /> },
    { name: "React", tag: "Web Applications", desc: "High-performance SPAs, reactive component state, and modern hooks.", icon: <Sparkles size={20} /> },
    { name: "CSS3", tag: "Styling & Motion", desc: "Modern layouts, flexbox, grid, glassmorphism, and responsive design.", icon: <Palette size={20} /> },
    { name: "HTML5", tag: "Structure & SEO", desc: "Semantic markup, accessibility, modern standards, and metadata.", icon: <Layers size={20} /> }
  ];

  // Services requested by user
  const services = [
    {
      num: "01",
      title: "Software & Web Development",
      desc: "Full-cycle digital products spanning high-performance web applications, mobile platforms, and software solutions.",
      tags: ["React", "React Native", "JavaScript", "TypeScript", "Vite", "Node.js"]
    },
    {
      num: "02",
      title: "Online Marketplace Solutions",
      desc: "Architecting scalable online marketplace systems, e-commerce architectures, product catalogs, and transaction pipelines.",
      tags: ["Online Marketplace", "E-Commerce", "API Integration", "Secure Auth", "Payment Gateways"]
    },
    {
      num: "03",
      title: "Full-Stack Development",
      desc: "End-to-end full-stack software development integrating reactive client interfaces with high-availability server backends.",
      tags: ["Full-Stack", "React", "Node.js", "Python", "REST APIs", "Modern Web"]
    },
    {
      num: "04",
      title: "Backend & Systems Architecture",
      desc: "Robust backend architectures, server APIs, and data services built with Node.js, Python, and clean engineering practices.",
      tags: ["Node.js", "Python", "REST APIs", "Database Design", "Security"]
    },
    {
      num: "05",
      title: "Frontend Engineering",
      desc: "High-performance, responsive, and animated user interfaces built with React, CSS3, and fluid micro-interactions.",
      tags: ["Component Architecture", "State Management", "Performance", "CSS Animations"]
    }
  ];

  return (
    <>
      {/*  ATMOSPHERE*/}
      <div className="atmos" aria-hidden="true" />
      <div className="spot" ref={spotRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/*  EASTER EGG GRID OVERLAY  */}
      <div id="grid-overlay" className={gridOverlay ? "on" : ""} aria-hidden="true">
        <div className="g-cols">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} />
          ))}
        </div>
      </div>

      {/*  TOP NAVBAR  */}
      <nav id="nav" className={navFloat ? "float" : ""} aria-label="Main Navigation">
        <div className="nav-bg" aria-hidden="true" />

        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}>
          <span>PhilzCodex</span>
          <span className="nav-logo-badge">DEV</span>
        </a>

        {/* Center Nav Links */}
        <div className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo("#about"); }}>About</a>
          <a href="#skills" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo("#skills"); }}>Services</a>
          <a href="#work" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo("#work"); }}>Work</a>
          <a href="#tools" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo("#tools"); }}>Tools</a>
          <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Contact</a>
        </div>

        {/* Navbar Action Buttons (GitHub, Instagram, YouTube, Theme Toggle, Hire Me) */}
        <div className="nav-actions">
          {/* GitHub Button (Working link as requested) */}
          <a
            href="https://github.com/philipcodex"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            title="GitHub (philipcodex)"
            aria-label="GitHub profile"
          >
            <GithubIcon size={17} />
          </a>

          {/* Instagram Button */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            title="Instagram"
            aria-label="Instagram profile"
          >
            <InstagramIcon size={17} />
          </a>

          {/* YouTube Button */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            title="YouTube"
            aria-label="YouTube channel"
          >
            <YoutubeIcon size={17} />
          </a>

          {/* Dark / Light Theme Toggle */}
          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Hire Me CTA Button */}
          <button
            className="nav-hire-btn"
            onClick={() => scrollTo("#contact")}
          >
            Hire Me
          </button>

          {/* Mobile Hamburger Button */}
          <button
            id="nav-burger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} color="var(--bone)" /> : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ──────────────────────────── */}
      <div id="nav-overlay" className={mobileMenuOpen ? "open" : ""}>
        <div className="ov-link">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("#about"); }}>About</a>
        </div>
        <div className="ov-link">
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo("#skills"); }}>Services</a>
        </div>
        <div className="ov-link">
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo("#work"); }}>Work</a>
        </div>
        <div className="ov-link">
          <a href="#tools" onClick={(e) => { e.preventDefault(); scrollTo("#tools"); }}>Tools</a>
        </div>
        <div className="ov-link">
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Contact</a>
        </div>

        {/* Mobile Socials */}
        <div className="ov-socials">
          <a
            href="https://github.com/philipcodex"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="YouTube"
          >
            <YoutubeIcon size={18} />
          </a>
          <a
            href="mailto:philipsanusi32@gmail.com"
            className="nav-social-btn"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <main>
        {/* ─── HERO SECTION ───────────────────────────────── */}
        <section id="hero">
          <div className="hero-top">
            {/* User requested: "make the avaliable button green" and remove freelancing */}
            <div className="status-badge-green" title="Available">
              <span className="pulse-dot-green" />
              <span>Available</span>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="mono">© 2026 PHILZCODEX</div>
              <div className="mono" style={{ color: "var(--ash)" }}>/ Coding Journey Since 2023</div>
            </div>
          </div>

          <div className="shell">
            <div className="hero-heading-row">
              <h1 className="hero-name" aria-label="Sanusi Philip PhilzCodex">
                <span className="hero-line">
                  <span>SANUSI</span>
                </span>
                <span className="hero-line">
                  <span>PHILIP</span>
                </span>
              </h1>

              {/* Small circle avatar beside Sanusi Philip at top right */}
              <div className="hero-avatar-badge" title="Sanusi Philip (PhilzCodex)">
                <div className="hero-avatar-circle">
                  <img
                    src="/images/avatar.jpg"
                    alt="Sanusi Philip"
                    className="hero-avatar-img"
                  />
                  <span className="hero-avatar-ring-glow" aria-hidden="true" />
                  <span className="hero-avatar-status" title="Active & Available" />
                </div>
              </div>
            </div>

            <div className="hero-meta">
              <p className="hero-sub">
                <b>Software Developer, Creative Thinker, Creator &amp; Well-Trained Full-Stack Developer</b> currently studying Information Technology at Redeemer’s University. Specialized in building scalable web applications, online marketplace solutions, and robust software architectures.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-solid"
                  onClick={() => scrollTo("#work")}
                >
                  <span>View Projects</span>
                  <ArrowUpRight size={15} />
                </button>

                {/* User requested: "See all my repositories button that will take them to my repositories in my git profile" */}
                <a
                  href="https://github.com/philipcodex?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  title="See all my repositories on GitHub"
                >
                  <GithubIcon size={15} />
                  <span>See All My Repositories</span>
                  <ArrowUpRight size={14} />
                </a>

                {/* Direct email button */}
                <a
                  href="mailto:philipsanusi32@gmail.com?subject=Project%20Inquiry%20for%20Sanusi%20Philip&body=Hi%20Sanusi,%0A%0AI'd%20love%20to%20connect%20with%20you%20regarding%20a%20project..."
                  className="btn btn-emerald"
                  title="Directly opens your email client to send a message"
                >
                  <Mail size={14} />
                  <span>Email Me Directly</span>
                </a>

                <button
                  className="btn btn-ghost"
                  onClick={() => scrollTo("#contact")}
                >
                  <span>Let's Talk</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MARQUEE (TOOLS & TECH STACK TICKER) ────────── */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span className="marquee-item">Software Development</span>
            <span className="marquee-item">Full-Stack Developer</span>
            <span className="marquee-item">Online Marketplace</span>
            <span className="marquee-item">React Native</span>
            <span className="marquee-item">JavaScript</span>
            <span className="marquee-item">TypeScript</span>
            <span className="marquee-item">Node.js</span>
            <span className="marquee-item">Python</span>
            <span className="marquee-item">React</span>
            <span className="marquee-item">HTML5</span>
            <span className="marquee-item">CSS3</span>
            <span className="marquee-item">GitHub</span>
            <span className="marquee-item">Backend Architecture</span>

            {/* Seamless duplicate */}
            <span className="marquee-item">Software Development</span>
            <span className="marquee-item">Full-Stack Developer</span>
            <span className="marquee-item">Online Marketplace</span>
            <span className="marquee-item">React Native</span>
            <span className="marquee-item">JavaScript</span>
            <span className="marquee-item">TypeScript</span>
            <span className="marquee-item">Node.js</span>
            <span className="marquee-item">Python</span>
            <span className="marquee-item">React</span>
            <span className="marquee-item">HTML5</span>
            <span className="marquee-item">CSS3</span>
            <span className="marquee-item">GitHub</span>
            <span className="marquee-item">Backend Architecture</span>
          </div>
        </div>

        {/* ─── ABOUT ME SECTION ───────────────────────────── */}
        <section id="about">
          <div className="shell">
            <div className="sec-head">
              <span className="tag">About</span>
              <span className="sec-line" />
            </div>

            <div className="about-grid">
              <div>
                <h2 className="about-hello">
                  Building meaningful solutions with <em>passion &amp; precision.</em>
                </h2>

                {/* User's Exact About Me Content */}
                <p className="about-body">
                  Hi, I’m <b>Sanusi Philip (PhilzCodex)</b>, a passionate software developer, creative thinker, creator, and well-trained full-stack developer currently studying Information Technology at <b>Redeemer’s University</b>, with an expected graduation year of <b>2030</b>.
                </p>

                <p className="about-body">
                  My coding journey began in <b>2023</b>. Although the process was challenging and I took a break at one point, my passion for technology brought me back, and since then, I’ve been more focused on improving my skills and building meaningful projects.
                </p>

                <p className="about-body">
                  I specialize in building full-stack applications, developing web &amp; mobile solutions, engineering online marketplace systems, and crafting reliable software architectures. I’m always exploring new technologies, learning, and turning creative ideas into digital experiences as a creator and well-trained developer.
                </p>

                <p className="about-body" style={{ color: "var(--bone)", fontWeight: 500 }}>
                  “My goal is to build innovative solutions, solve real-world problems, and grow into an exceptional software developer.”
                </p>

                <div className="about-tags">
                  <span className="about-tag">Software Development</span>
                  <span className="about-tag">Full-Stack Developer</span>
                  <span className="about-tag">Online Marketplace</span>
                  <span className="about-tag">Creator</span>
                  <span className="about-tag">Well-Trained Developer</span>
                  <span className="about-tag">Backend Engineering</span>
                  <span className="about-tag">Web &amp; App Development</span>
                </div>
              </div>

              <div>
                {/* 3D Portrait Card */}
                <div className="about-portrait-card">
                  <img
                    src="/images/portrait.jpg"
                    alt="Sanusi Philip PhilzCodex"
                    className="about-portrait-img"
                  />
                  <div className="about-portrait-overlay">
                    <div className="about-stats">
                      <div>
                        <div className="stat-val">2030</div>
                        <div className="stat-lbl">Redeemer's Univ · IT</div>
                      </div>
                      <div>
                        <div className="stat-val">3+</div>
                        <div className="stat-lbl">Years Journey (2023)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="timeline">
                  <div className="t-row">
                    <div className="t-year">2024 - 2030</div>
                    <div>
                      <div className="t-role">B.Sc. Information Technology</div>
                      <div className="t-place">Redeemer's University · Undergraduate</div>
                    </div>
                  </div>

                  <div className="t-row">
                    <div className="t-year">2023 - Pres.</div>
                    <div>
                      <div className="t-role">Full-Stack Developer &amp; Online Marketplace Solutions</div>
                      <div className="t-place">React · React Native · Node.js · Python · Online Marketplace Systems</div>
                    </div>
                  </div>

                  <div className="t-row">
                    <div className="t-year">2023</div>
                    <div>
                      <div className="t-role">The Coding Genesis</div>
                      <div className="t-place">First step into software engineering, logic &amp; programming</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ("WHAT I DO") ─────────────────────── */}
        <section id="skills">
          <div className="shell">
            <div className="sec-head">
              <span className="tag">Services</span>
              <span className="sec-line" />
              <span className="sec-title">What I Do</span>
            </div>

            <div>
              {services.map((svc) => (
                <div key={svc.num} className="svc-row">
                  <div className="svc-num">{svc.num}</div>
                  <div>
                    <h3 className="svc-name">{svc.title}</h3>
                    <p className="svc-desc">{svc.desc}</p>
                  </div>
                  <div className="svc-tags">
                    {svc.tags.map((t) => (
                      <span key={t} className="svc-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WORK / PROJECTS SECTION ────────────────────── */}
        <section id="work">
          <div className="shell">
            <div className="sec-head">
              <span className="tag">Selected Work</span>
              <span className="sec-line" />
              <span className="sec-title">Things I've Built</span>
            </div>
          </div>

          {/* Project 1: Nexus Analytics & Mobile App */}
          <article className="panel">
            <div className="shell panel-grid">
              <div className="panel-visual">
                <span className="panel-bgmark">NX</span>
                <div className="ph-stage">
                  <div className="phone-float">
                    <div className="phone">
                      <div className="ph-body">
                        <div className="ph-notch" />
                        <div className="ph-screen">
                          <img
                            src={activeShotIndex === 0 ? "/images/project1.jpg" : "/images/project2.jpg"}
                            alt="Nexus Analytics Mobile App"
                            className="ph-img"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ph-ground" />
                  </div>
                </div>
              </div>

              <div className="panel-info">
                <div className="panel-num">01 — Full-Stack &amp; Mobile</div>
                <h3 className="panel-title">Nexus Analytics Platform</h3>
                <p className="panel-desc">
                  An advanced real-time developer metrics and portfolio tracking application built with <b>React Native</b>, <b>Node.js</b>, and <b>JavaScript</b>. Features telemetry charts, cloud synchronization, and responsive design systems.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">React Native</span>
                  <span className="panel-tag">Node.js</span>
                  <span className="panel-tag">JavaScript</span>
                  <span className="panel-tag">REST APIs</span>
                  <span className="panel-tag">Full-Stack</span>
                </div>
                <div className="panel-links">
                  <a
                    href="https://github.com/philipcodex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid"
                  >
                    <span>View on GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setActiveShotIndex((prev) => (prev === 0 ? 1 : 0))}
                  >
                    <span>Toggle Screenshot</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Project 2: DevConnect Collaborative Hub */}
          <article className="panel flip">
            <div className="shell panel-grid">
              <div className="panel-visual">
                <span className="panel-bgmark">DC</span>
                <div className="ph-stage">
                  <div className="phone-float">
                    <div className="phone">
                      <div className="ph-body">
                        <div className="ph-notch" />
                        <div className="ph-screen">
                          <img
                            src="/images/project2.jpg"
                            alt="DevConnect Collaborative Hub"
                            className="ph-img"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ph-ground" />
                  </div>
                </div>
              </div>

              <div className="panel-info">
                <div className="panel-num">02 — Social &amp; Cloud Platform</div>
                <h3 className="panel-title">DevConnect Collaborative Hub</h3>
                <p className="panel-desc">
                  A collaborative workspace and code review environment for emerging developers. Integrated with <b>Python</b> backend microservices, <b>TypeScript</b>, and modern dark mode interface.
                </p>
                <div className="panel-tags">
                  <span className="panel-tag">React</span>
                  <span className="panel-tag">Python</span>
                  <span className="panel-tag">TypeScript</span>
                  <span className="panel-tag">GitHub API</span>
                  <span className="panel-tag">CSS3</span>
                </div>
                <div className="panel-links">
                  <a
                    href="https://github.com/philipcodex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="#contact"
                    className="btn btn-ghost"
                    onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                  >
                    <span>Request Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Mini Projects Grid */}
          <div className="shell">
            <div className="mini-head">More Projects &amp; Experiments</div>
            <div className="mini-grid">
              <div className="mini">
                <div className="mini-num">03</div>
                <h4 className="mini-name">PyAutomation Suite</h4>
                <p className="mini-desc">
                  Lightweight Python scripts automating workflow tasks, file parsing, and REST endpoint monitoring.
                </p>
                <div className="mini-tags">
                  <span className="mini-tag">Python</span>
                  <span className="mini-tag">CLI</span>
                  <span className="mini-tag">Automation</span>
                
                </div>
              </div>

              <div className="mini">
                <div className="mini-num">04</div>
                <h4 className="mini-name">TaskFlow Mobile</h4>
                <p className="mini-desc">
                  Intuitive productivity and task management application built with React Native and localized storage.
                </p>
                <div className="mini-tags">
                  <span className="mini-tag">React Native</span>
                  <span className="mini-tag">JavaScript</span>
                  <span className="mini-tag">CSS3</span>
                </div>
              </div>

              <div className="mini">
                <div className="mini-num">05</div>
                <h4 className="mini-name">Marketplace Engine &amp; Architecture</h4>
                <p className="mini-desc">
                  Scalable e-commerce and digital marketplace transaction pipeline with responsive design and modern state handling.
                </p>
                <div className="mini-tags">
                  <span className="mini-tag">HTML5</span>
                  <span className="mini-tag">CSS3</span>
                  <span className="mini-tag">Full-Stack</span>
                  <span className="mini-tag">Marketplace</span>
                </div>
              </div>
            </div>

            {/* User requested: "See all my repositories button that will take them to my repositories in my git profile" */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem", paddingBottom: "3rem" }}>
              <a
                href="https://github.com/philipcodex?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
                style={{ padding: "1rem 2.4rem", fontSize: "0.82rem" }}
                title="View all repositories on GitHub"
              >
                <GithubIcon size={18} />
                <span>See All My Repositories</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ─── TOOLS I USE (TECH STACK) ───────────────────── */}
        <section id="tools">
          <div className="shell">
            <div className="sec-head">
              <span className="tag">Tech Stack</span>
              <span className="sec-line" />
              <span className="sec-title">Tools I Use</span>
            </div>

            <div className="tools-grid">
              {tools.map((t) => (
                <div key={t.name} className="tool-card">
                  <div>
                    <div className="tool-header">
                      <div className="tool-icon-wrap">{t.icon}</div>
                      <span className="tool-badge">{t.tag}</span>
                    </div>
                    <h4 className="tool-name">{t.name}</h4>
                    <p className="tool-desc">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT SECTION  */}
        <section id="contact">
          <div className="contact-glow" aria-hidden="true" />

          <div className="shell">
            <div className="sec-head">
              <span className="tag">Get in Touch</span>
              <span className="sec-line" />
            </div>

            <h2 className="contact-head">
              Let's build something <em>remarkable.</em>
            </h2>

            <div className="contact-grid">
              {/* Left Column: Direct Email CTA & Socials */}
              <div>
                <p className="contact-sub">
                  I'm open to software development opportunities, full-stack projects, online marketplace collaborations, and engineering discussions. Have an idea or want to build something impactful? Let's connect!
                </p>

                {/* Highlighted Direct Email Box with 1-Click Button */}
                <div className="email-direct-box">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Mail size={20} color="var(--emerald)" />
                    <h4>Direct Email Contact</h4>
                  </div>
                  <p>
                    Click below to open your preferred email client directly, or copy the address to your clipboard.
                  </p>

                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                    <a
                      href="mailto:philipsanusi32@gmail.com?subject=Hello%20Sanusi%20(PhilzCodex)&body=Hi%20Sanusi,%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about..."
                      className="btn btn-emerald"
                      title="Directly opens your email app"
                    >
                      <Mail size={15} />
                      <span>philipsanusi32@gmail.com</span>
                    </a>

                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={handleCopyEmail}
                      title="Copy email address"
                    >
                      {copiedEmail ? <Check size={14} color="var(--emerald)" /> : <Copy size={14} />}
                      <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                    </button>
                  </div>
                </div>

                {/* Social Links List */}
                <div className="socials">
                  <a
                    className="social"
                    href="mailto:philipsanusi32@gmail.com"
                  >
                    <span>Email: philipsanusi32@gmail.com</span>
                    <ArrowUpRight size={17} />
                  </a>

                  <a
                    className="social"
                    href="https://github.com/philipcodex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>GitHub (@philipcodex)</span>
                    <ArrowUpRight size={17} />
                  </a>

                  <a
                    className="social"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight size={17} />
                  </a>

                  <a
                    className="social"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>YouTube</span>
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>

              {/* Right Column: Working Contact Form */}
              <div>
                {formSubmitted ? (
                  <div className="form-feedback">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                      <CheckCircle size={22} color="var(--emerald)" />
                      <h4>Thank You, Message Prepared!</h4>
                    </div>
                    <p style={{ marginBottom: "1rem" }}>
                      Your email message was prepared for <b>philipsanusi32@gmail.com</b> and your email app was requested to open. If it didn't open automatically, you can click below:
                    </p>
                    <a
                      href={`mailto:philipsanusi32@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(formData.message)}`}
                      className="btn btn-solid"
                    >
                      <span>Open in Email App</span>
                      <Send size={14} />
                    </a>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ marginLeft: "0.6rem" }}
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                    >
                      <span>Send Another</span>
                    </button>
                  </div>
                ) : (
                  <form className="form" onSubmit={handleFormSubmit}>
                    <div className="f-row">
                      <div className="f-field">
                        <label className="f-label" htmlFor="name">Your Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="f-input"
                          placeholder="e.g. John Doe"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="f-field">
                        <label className="f-label" htmlFor="email">Your Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="f-input"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="f-field">
                      <label className="f-label" htmlFor="subject">Subject / Project Type</label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className="f-input"
                        placeholder="e.g. Website Development / App Project"
                        required
                        value={formData.subject}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="f-field">
                      <label className="f-label" htmlFor="message">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="f-textarea"
                        placeholder="Tell me about your project, timeline, or idea…"
                        required
                        value={formData.message}
                        onChange={handleFormChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-solid"
                      disabled={formSending}
                      style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
                    >
                      <Send size={15} />
                      <span>{formSending ? "Sending..." : "Send Message to Email"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer>
        <div className="shell">
          <div className="foot-grid">
            <div className="foot-statement">
              Building innovative solutions, deliberately.
            </div>

            <div className="foot-col">
              <h4>Navigation</h4>
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("#about"); }}>About Me</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo("#skills"); }}>Services</a>
              <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo("#work"); }}>Selected Work</a>
              <a href="#tools" onClick={(e) => { e.preventDefault(); scrollTo("#tools"); }}>Tech Stack</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Contact</a>
            </div>

            <div className="foot-col">
              <h4>Connect</h4>
              <a href="mailto:philipsanusi32@gmail.com">philipsanusi32@gmail.com</a>
              <a href="https://github.com/philipcodex" target="_blank" rel="noopener noreferrer">GitHub / philipcodex</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
              <p style={{ marginTop: "1rem", color: "var(--faint)", fontSize: "0.8rem" }}>
                Redeemer’s University · IT 2030
              </p>
            </div>
          </div>

          {/* Giant Editorial Wordmark */}
          <div className="foot-word" aria-hidden="true">
            PHILZCODEX
          </div>

          <div className="foot-bottom">
            <span>© 2026 Sanusi Philip (PhilzCodex). All rights reserved.</span>
            <span style={{ cursor: "pointer" }} onClick={() => setGridOverlay((prev) => !prev)}>
              Grid: {gridOverlay ? "ON" : "OFF"} (Press 'G')
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
