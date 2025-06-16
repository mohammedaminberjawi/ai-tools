import LoginForm from '../loginForm';

export default function LoginPage() {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            padding: '16px',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                padding: '32px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                '@media (max-width: 480px)': {
                    padding: '24px',
                    margin: '16px'
                }
            }}>
                <h1 style={{ 
                    textAlign: 'center', 
                    marginBottom: '32px',
                    marginTop: '0',
                    color: '#111827',
                    fontSize: '24px',
                    fontWeight: '600'
                }}>
                    Login
                </h1>
                <LoginForm />
            </div>
        </div>
    );
}