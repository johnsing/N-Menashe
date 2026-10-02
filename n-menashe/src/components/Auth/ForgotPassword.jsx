import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

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

const SuccessMessage = styled.div`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.2);
  color: #51cf66;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const {  error } = await resetPassword(email);
      if (error) throw error;
      
      setSuccess('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <AuthCard>
        <h2>Reset Password</h2>
        <p className="subtitle">
          Enter your email address and we'll send you a link to reset your password
        </p>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

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

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </SubmitButton>
        </Form>

        <AuthLink>
          Remember your password? <Link to="/login">Sign In</Link>
        </AuthLink>
      </AuthCard>
    </Container>
  );
};

export default ForgotPassword;