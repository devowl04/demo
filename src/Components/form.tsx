import React, { useState } from 'react'

export default function Form() {
  interface IState {
    name: string;
    email: string;
    subscriptionFre: string;
    option: string;
  }

  const [state, setState] = useState<IState>({
    name: '',
    email: '',
    subscriptionFre: '',
    option: ''
  });

  const handleSubmit = () => {

  }

  const handleChange = (change: { name: string; value: any }) => {
    setState((p) => ({
      ...p,
      [change.name]: change.value,
    }));
  };

  return (
    <div>
      <h1>Form </h1>
      <form name='form' onSubmit={handleSubmit}>
        <div>
          Name:
          <input
            type='text'
            name='name'
            id='name'
            value={state.name}
            onChange={(e) => handleChange({ name: 'name', value: e.target.value })}
          />
        </div>
        <div>
          Email:
          <input
            type='email'
            name='email'
            id='email'
            value={state.email}
            onChange={(e) => handleChange({ name: 'email', value: e.target.value })}
          />
        </div>
        <div>
          Subscription Fre:
          <input
            type='text'
            name='subscriptionFre'
            id='subscriptionFre'
            value={state.subscriptionFre}
            onChange={(e) => handleChange({ name: 'subscriptionFre', value: e.target.value })}
          />
        </div>
        <div>
          Option:
          <input
            type='text'
            name='option'
            id='option'
            value={state.option}
            onChange={(e) => handleChange({ name: 'option', value: e.target.value })}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
