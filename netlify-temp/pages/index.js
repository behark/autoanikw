export default function Home() {
  return (
    <div style={{ 
      fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        AutoAni - Preview Site
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        We're preparing a beautiful automotive experience for you.
      </p>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          Our full site is currently under development.
        </p>
      </div>
      <div style={{ 
        border: '1px solid #eaeaea', 
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Staging Environment
        </h2>
        <p>
          This is a temporary staging environment for AutoAni website testing.
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
          Deployment test: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
