import ContactLinks from '../components/ContactLinks'

export default function Contact() {
  return (
    <section className="section">
      <h1 style={{ marginBottom: '0.5rem' }}>Contact</h1>
      <p className="utility-text" style={{ opacity: 0.5, marginBottom: '3rem' }}>
        Get in touch
      </p>

      <ContactLinks variant="contact" />
    </section>
  )
}
