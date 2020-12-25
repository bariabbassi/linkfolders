import { useState, useRef } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
// import format from 'comma-number';
// import { trackGoal } from 'fathom-client';
import fetcher from '@/utils/fetcher';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  /* border-radius: 0.5rem;
  border: 2px solid black; */
`;

const Input = styled.input`
  font-size: 1.17rem;
  max-width: 300px;
  width: 90vw;
  padding: 1rem 1.5rem 1rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 4px solid #fc0;
`;

const Button = styled.button`
  /* color: #fff; */
  font-size: 1.17rem;
  font-weight: 600;
  background: #fc0;
  padding: 1rem 1.5rem 1rem 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
  border: 4px solid #fc0;
  cursor: pointer;
  &:hover {
    color: #f4f4f4;
    background: #0af;
  }
  &:active {
    background: #4564f5;
  }
`;

// function ErrorMessage({ children }) {
//   return (
//     <p className="flex items-center text-sm font-bold text-red-800 dark:text-red-400">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="mr-2 h-4 w-4"
//       >
//         <path
//           fillRule="evenodd"
//           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//           clipRule="evenodd"
//         />
//       </svg>
//       {children}
//     </p>
//   );
// }

// function SuccessMessage({ children }) {
//   return (
//     <p className="flex items-center text-sm font-bold text-green-800 dark:text-green-400">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="mr-2 h-4 w-4"
//       >
//         <path
//           fillRule="evenodd"
//           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//           clipRule="evenodd"
//         />
//       </svg>
//       {children}
//     </p>
//   );
// }

const Subscribe = () => {
  const [form, setForm] = useState(false);
  const inputEl = useRef(null);
  //   const { data } = useSWR('/api/subscribers', fetcher);
  //   const subscriberCount = format(data?.count);

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading' });

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    // const { error } = await res.json();
    // if (error) {
    //   setForm({
    //     state: 'error',
    //     message: error
    //   });
    //   return;
    // }

    // trackGoal('JYFUFMSF', 0);
    // inputEl.current.value = '';
    // setForm({
    //   state: 'success',
    //   message: `Hooray! You're now on the list.`
    // });
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
      <Button onClick={subscribe}>
        Subscribe
        {/* {form.state === 'loading' ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-900 dark:text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            'Subscribe'
          )} */}
      </Button>

      {/* {form.state === 'error' ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === 'success' ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {`${subscriberCount || '-'} subscribers – `}
          <Link href="/newsletter">
            <a>24 issues</a>
          </Link>
        </p>
      )} */}
    </Container>
  );
};

export default Subscribe;
