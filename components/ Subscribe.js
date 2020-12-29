import { useState, useRef } from 'react';
import { trackGoal } from 'fathom-client';
import styled from 'styled-components';

const Container = styled.div`
  white-space: nowrap;
  display: inline-block;
`;

const Input = styled.input`
  font-size: 1.17rem;
  padding: 1rem 1.5rem 1rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 4px solid #ffcc00;
`;

const Button = styled.button`
  font-size: 1.17rem;
  font-weight: 600;
  background: #ffcc00;
  padding: 1rem 1.5rem 1rem 1rem;
  margin-right: 2rem;
  border-radius: 0 0.5rem 0.5rem 0;
  border: 4px solid #fc0;
  &:hover {
    background: #f7c701;
    border-color: #f7c701;
  }
  &:active {
    background: #ffd93f;
  }
`;

const ErrorMessage = styled.h4`
  color: #fa141f;
`;

const SuccessMessage = styled.h4`
  color: #1bc23c;
`;

const Subscribe = () => {
  const [form, setForm] = useState(false);
  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading', message: '⏳ Loading...' });

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: 'error',
        message: `❌ Something went wrong. We couldn't add your email to the wait list.`
      });
      return;
    }

    trackGoal('JYFUFMSF', 0);
    inputEl.current.value = '';
    setForm({
      state: 'success',
      message: `🎉 Hooray! You're now on the wait list.`
    });
  };

  return (
    <Container>
      <Input
        ref={inputEl}
        aria-label="Email for newsletter"
        placeholder="your@email.com"
        type="email"
        autoComplete="email"
        required
      />
      <Button onClick={subscribe}>Subscribe</Button>
      {form.state === 'loading' ? (
        <h4>{form.message}</h4>
      ) : form.state === 'error' ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === 'success' ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : null}
    </Container>
  );
};

export default Subscribe;
