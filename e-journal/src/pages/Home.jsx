import Icon from '../assets/Icon.svg'

function Home() {
  return (
    <>
      <header className="home-header">
        <div className="home-logo">ejournal</div>
        <nav className="home-nav">
          <button type="button" className="home-nav-link">
            sign up
          </button>
          <button type="button" className="home-nav-link">
            log in
          </button>
        </nav>
      </header>

      <main className="home-main">
        <img src={Icon} className="home-illustration" aria-hidden="true" alt="" />

        <section aria-label="Welcome" className="home-hero">
          <h1 className="home-hero-title">
            <span className="home-hero-title-line">Write your day,</span>
            <br />
            <span className="home-hero-title-line">one page at a time</span>
          </h1>
          <button type="button" className="home-hero-cta">
            Let Started
          </button>
        </section>
      </main>
    </>
  )
}

export default Home