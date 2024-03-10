import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
}

export default Home;