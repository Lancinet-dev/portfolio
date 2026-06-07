import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './App.css'

const PROFILE = {
  name: 'Lancinet Baldé',
  role: 'Développeur Full-Stack & Fondateur de Fuelo',
  location: 'Conakry, Guinée',
  email: 'lancinetbalde21@gmail.com',
  github: 'https://github.com/Lancinet-dev',
  // Numéro WhatsApp à renseigner (format wa.me, indicatif Guinée +224)
  whatsapp: 'https://wa.me/224000000000',
  photo:
    'https://res.cloudinary.com/de0xeqpj9/image/upload/v1780820247/file_0000000057c471f49582c65b78b6c5f0_zwfhkj.png',
}

const ROLES = [
  'Développeur Full-Stack',
  'Fondateur de Fuelo 🚀',
  "Créateur de SaaS pour l'Afrique",
  'Passionné de produits qui résolvent de vrais problèmes',
]

const NAV_LINKS = [
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projet', href: '#project' },
  { label: 'Contact', href: '#contact' },
]

const STATS = [
  { number: '1', label: 'SaaS lancé en production : Fuelo' },
  { number: '20+', label: 'Fonctionnalités livrées de bout en bout' },
  { number: '100%', label: 'Autodidacte, du design au déploiement' },
  { number: '🇬🇳', label: 'Basé à Conakry, Guinée — pour l’Afrique' },
]

const SKILLS = [
  { name: 'React', color: 'var(--blue)' },
  { name: 'Node.js', color: 'var(--orange)' },
  { name: 'Express', color: 'var(--blue)' },
  { name: 'PostgreSQL', color: 'var(--orange)' },
  { name: 'Git & GitHub', color: 'var(--blue)' },
  { name: 'Vercel', color: 'var(--orange)' },
  { name: 'Cloudinary', color: 'var(--blue)' },
]

const PROJECT_TAGS = ['React', 'Node.js / Express', 'PostgreSQL', 'Socket.IO', 'Cloudinary']

/* ---------- Hooks ---------- */

function useTypewriter(words, { typingSpeed = 85, deletingSpeed = 40, pause = 1700 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setText(words[0])
      return
    }

    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
        },
        deleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause, reduceMotion])

  return text
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/* ---------- Icônes inline ---------- */

function IconGithub(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.96 3.22 9.17 7.69 10.66.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.11-1.16 3.11-1.16.61 1.54.23 2.68.11 2.96.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.65.78.54 4.46-1.49 7.68-5.7 7.68-10.66C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  )
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12.04 2.5c-5.25 0-9.5 4.24-9.5 9.47 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.93-1.28a9.5 9.5 0 0 0 4.6 1.18h.01c5.24 0 9.5-4.24 9.5-9.47 0-2.53-.99-4.9-2.78-6.69a9.49 9.49 0 0 0-6.72-2.74Zm5.43 11.88c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.07 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.27.17-1.4-.07-.12-.27-.2-.57-.34Z" />
    </svg>
  )
}

function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function IconExternal(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

/* ---------- Animations ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Reveal({ children, className, delay = 0, as = 'div' }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  )
}

function scrollToId(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------- Navbar ---------- */

function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  const handleNav = (href) => {
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header className="navbar">
      <div className={`navbar-inner ${scrolled || open ? 'scrolled' : ''}`}>
        <div className="navbar-row">
          <a className="navbar-logo" href="#top" onClick={(e) => { e.preventDefault(); handleNav('#top') }}>
            Lancinet<span className="dot">.</span>dev
          </a>

          <nav className="navbar-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="navbar-cta" href="#contact" onClick={(e) => { e.preventDefault(); handleNav('#contact') }}>
            Me contacter
          </a>

          <button
            type="button"
            className="navbar-burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>

        {open && (
          <motion.div
            className="navbar-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
                {link.label}
              </a>
            ))}
            <a className="navbar-cta" href="#contact" onClick={(e) => { e.preventDefault(); handleNav('#contact') }}>
              Me contacter
            </a>
          </motion.div>
        )}
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */

function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-photo-wrap"
        >
          <span className="hero-photo-glow" />
          <img className="hero-photo" src={PROFILE.photo} alt={PROFILE.name} />
        </motion.div>

        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="pulse" />
          Disponible pour de nouveaux projets
        </motion.span>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Salut, je suis <span className="gradient-text">{PROFILE.name}</span>
        </motion.h1>

        <motion.p
          className="hero-typewriter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {typed}
          <span className="cursor" aria-hidden="true" />
        </motion.p>

        <motion.p
          className="hero-location"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          📍 {PROFILE.location}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button type="button" className="btn btn-primary" onClick={() => scrollToId('#project')}>
            Voir mes projets
            <IconArrowRight />
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => scrollToId('#contact')}>
            Me contacter
          </button>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a className="social-icon" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <IconGithub />
          </a>
          <a className="social-icon" href={`mailto:${PROFILE.email}`} aria-label="Email">
            <IconMail />
          </a>
          <a className="social-icon" href={PROFILE.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <IconWhatsapp />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span>Scroll</span>
        <span className="line" />
      </motion.div>
    </section>
  )
}

/* ---------- À propos ---------- */

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal>
          <span className="eyebrow">À propos</span>
          <h2 className="section-title">
            Jeune développeur guinéen, je construis des produits qui résolvent de{' '}
            <span className="gradient-text">vrais problèmes africains</span>.
          </h2>
          <div className="about-text" style={{ marginTop: 24 }}>
            <p>
              Je m'appelle <strong>Lancinet Baldé</strong>, développeur full-stack basé à{' '}
              <strong>Conakry, en Guinée 🇬🇳</strong>. Autodidacte, j'ai appris à concevoir,
              coder et déployer des applications complètes — du frontend au backend, en passant
              par la base de données et l'infrastructure.
            </p>
            <p>
              Je suis le fondateur de <span className="accent">Fuelo</span>, un SaaS de gestion de
              stations-service pensé pour l'Afrique de l'Ouest, aujourd'hui en production. Ce projet
              m'a appris à transformer une idée en produit réel, utilisé par de vrais gérants au
              quotidien — de l'architecture technique jusqu'au support utilisateur.
            </p>
            <p>
              Mon objectif : créer des outils simples, robustes et taillés pour les réalités du
              terrain africain — connexions instables, usage mobile, besoin de fiabilité.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="stats-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} className="stat-card" variants={fadeUp}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Compétences ---------- */

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Compétences</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Les outils avec lesquels je construis</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subtitle">
              Une stack moderne et éprouvée, la même qui fait tourner Fuelo en production
              aujourd'hui — du frontend au déploiement.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="skills-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SKILLS.map((skill) => (
            <motion.span
              key={skill.name}
              className="skill-badge"
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'var(--border-strong)' }}
            >
              <span className="dot" style={{ background: skill.color }} />
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Projet vedette : Fuelo ---------- */

function FeaturedProject() {
  return (
    <section className="section" id="project">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Projet vedette</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Fuelo — mon SaaS en production</h2>
          </Reveal>
        </div>

        <Reveal className="project-card">
          <div className="project-card-inner">
            <div>
              <span className="project-badge">
                <span className="pulse" />
                En production
              </span>
              <h3 className="project-name">Fuelo</h3>
              <p className="project-desc">
                Un SaaS de gestion de stations-service pensé pour l'Afrique de l'Ouest. Il permet
                aux propriétaires et gérants de piloter leur stock, leurs ventes, leurs alertes et
                leurs employés depuis leur téléphone, en temps réel — avec un système anti-fraude,
                un suivi GPS des livraisons et des rapports automatisés.
              </p>
              <div className="project-tags">
                {PROJECT_TAGS.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <a
                className="btn btn-primary"
                href="https://fuelo-kappa.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Voir Fuelo en ligne
                <IconExternal />
              </a>
            </div>

            <div className="project-mock" aria-hidden="true">
              <div className="project-mock-bar">
                <span style={{ background: '#f87171' }} />
                <span style={{ background: '#fbbf24' }} />
                <span style={{ background: '#34d399' }} />
              </div>
              <div className="project-mock-row">
                <div className="project-mock-card">
                  <div className="label">Ventes du jour</div>
                  <div className="value">2 480 000 GNF</div>
                </div>
                <div className="project-mock-card">
                  <div className="label">Stock carburant</div>
                  <div className="value">68%</div>
                </div>
              </div>
              <div className="project-mock-bars">
                {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
                  <span key={i} className="bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Nouveau message de ${form.name || 'votre site'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || 'Anonyme'} (${form.email || 'pas d’email fourni'})`
    )
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Contact</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">Construisons quelque chose ensemble</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subtitle">
              Une idée de projet, une mission freelance ou simplement envie d'échanger ? Écrivez-moi,
              je réponds rapidement.
            </p>
          </Reveal>
        </div>

        <div className="contact-grid">
          <Reveal>
            <div className="contact-card">
              <div className="contact-card-title">Contact direct</div>
              <a className="contact-link-row" href={PROFILE.whatsapp} target="_blank" rel="noreferrer">
                <span className="icon-box whatsapp"><IconWhatsapp /></span>
                <span className="meta">
                  WhatsApp
                  <span>Réponse rapide, idéal pour discuter d'un projet</span>
                </span>
              </a>
              <a className="contact-link-row" href={`mailto:${PROFILE.email}`}>
                <span className="icon-box email"><IconMail /></span>
                <span className="meta">
                  {PROFILE.email}
                  <span>Pour les demandes détaillées et les collaborations</span>
                </span>
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-card-title">Ailleurs sur le web</div>
              <a className="contact-link-row" href={PROFILE.github} target="_blank" rel="noreferrer">
                <span className="icon-box email"><IconGithub /></span>
                <span className="meta">
                  github.com/Lancinet-dev
                  <span>Mon code, mes projets, mes contributions</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="vous@exemple.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Parlez-moi de votre projet…" value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Envoyer le message
                <IconArrowRight />
              </button>
              <p className="form-note">
                L'envoi ouvre votre application email avec le message déjà rempli, à destination de {PROFILE.email}.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          Lancinet<span className="dot">.</span>dev
        </div>
        <p className="footer-tagline">
          Développeur full-stack à Conakry, je conçois des produits numériques pensés pour
          l'Afrique — du concept au déploiement.
        </p>
        <div className="footer-links">
          <a className="social-icon" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <IconGithub />
          </a>
          <a className="social-icon" href={`mailto:${PROFILE.email}`} aria-label="Email">
            <IconMail />
          </a>
          <a className="social-icon" href={PROFILE.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <IconWhatsapp />
          </a>
        </div>
        <span className="footer-meta">© {new Date().getFullYear()} Lancinet Baldé — Conakry, Guinée 🇬🇳</span>
      </div>
    </footer>
  )
}

/* ---------- App ---------- */

function App() {
  const reduceMotion = useReducedMotion()
  const orbsEnabled = !reduceMotion

  return (
    <div className="page">
      {orbsEnabled && (
        <>
          <span className="glow-orb" style={{ width: 480, height: 480, top: -160, left: -120, background: 'rgba(37, 99, 235, 0.35)' }} />
          <span className="glow-orb" style={{ width: 420, height: 420, top: '38%', right: -160, background: 'rgba(245, 158, 11, 0.22)' }} />
          <span className="glow-orb" style={{ width: 380, height: 380, bottom: -140, left: '20%', background: 'rgba(37, 99, 235, 0.22)' }} />
        </>
      )}

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
