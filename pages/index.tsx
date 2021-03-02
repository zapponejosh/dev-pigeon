import { useState, useContext } from 'react';
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/client';

const Home = () => {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (type: string, username: string, password: string) => {
    try {
      const { error, user } =
        type === 'LOGIN'
          ? await supabase.auth.signIn({ email: username, password })
          : await supabase.auth.signUp({ email: username, password });
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert('Error with auth: ' + error.message);
      } else if (!user)
        alert('Signup successful, confirmation mail should be sent soon!');
    } catch (error) {
      console.log('error', error);
      alert(error.error_description || error);
    }
  };

  return (
    <div>
      <div>
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          required
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <a
          onClick={(e) => {
            e.preventDefault();
            handleLogin('SIGNUP', username, password);
          }}
          href={'/channels'}
        >
          Sign up
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            handleLogin('LOGIN', username, password);
          }}
          href={'/channels'}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Home;
