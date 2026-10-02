import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

const PasswordRequirements = styled.ul`
  color: #666;
  font-size: 12px;
  padding-left: 20px;
  margin-top: 4px;

  li {
    margin-bottom: 2px;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return { minLength, hasUpperCase, hasLowerCase, hasNumber };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { username, email, password, confirmPassword } = formData;

    // Validate
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.minLength || !passwordValidation.hasUpperCase || 
        !passwordValidation.hasLowerCase || !passwordValidation.hasNumber) {
      setError('Password does not meet requirements');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, username);
      if (error) throw error;
      
      setSuccess('Account created successfully! Please check your email to verify your account.');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <Container>
      <AuthCard>
        <h2>Create Account</h2>
        <p className="subtitle">Join the N-MENASHE community</p>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <FormGroup>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              disabled={loading}
            />
            {formData.password && (
              <PasswordRequirements>
                <li style={{ color: passwordValidation.minLength ? '#51cf66' : '#666' }}>
                  ✓ At least 8 characters
                </li>
                <li style={{ color: passwordValidation.hasUpperCase ? '#51cf66' : '#666' }}>
                  ✓ At least one uppercase letter
                </li>
                <li style={{ color: passwordValidation.hasLowerCase ? '#51cf66' : '#666' }}>
                  ✓ At least one lowercase letter
                </li>
                <li style={{ color: passwordValidation.hasNumber ? '#51cf66' : '#666' }}>
                  ✓ At least one number
                </li>
              </PasswordRequirements>
            )}
          </FormGroup>

          <FormGroup>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>

        <AuthLink>
          Already have an account? <Link to="/login">Sign In</Link>
        </AuthLink>
      </AuthCard>
    </Container>
  );
};

export default Signup;