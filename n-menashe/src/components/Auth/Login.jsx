import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 420px;
  margin: 60px auto;
  padding: 20px;
`;

const AuthCard = styled.div`
  background: #1a1a1a;
  padding: 48px 40px;
  border-radius: 16px;
  border: 1px solid #333;

  h2 {
    color: #ffd700;
    text-align: center;
    font-size: 28px;
    margin-bottom: 8px;
  }

  p.subtitle {
    color: #888;
    text-align: center;
    margin-bottom: 32px;
    font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  label {
    display: block;
    color: #aaa;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 8px;
    color: #fff;
    font-size: 15px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #ffd700;
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #ffd700;
  color: #0a0a0a;
  font-size: 15px;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AuthLink = styled.p`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 20px;

  a {
    color: #ffd700;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #ffed4a;
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: #ff6b6b;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #333;
  }

  span {
    color: #666;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #0a0a0a;
  color: #fff;
  border: 1px solid #333;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    border-color: #ffd700;
    background: rgba(255, 215, 0, 0.05);
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <AuthCard>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your N-MENASHE account</p>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>or continue with</span>
        </Divider>

        <SocialButton type="button" disabled>
          🔑 Google (Coming Soon)
        </SocialButton>

        <AuthLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </AuthLink>

        <AuthLink style={{ marginTop: '8px' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </AuthLink>
      </AuthCard>
    </Container>
  );
};

export default Login;