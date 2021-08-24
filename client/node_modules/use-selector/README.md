[![npm version](https://badge.fury.io/js/use-selector.svg)](https://www.npmjs.com/package/use-selector)
<a href="http://travis-ci.org/assister-ai/use-selector"><img src="https://api.travis-ci.org/assister-ai/use-selector.svg?branch=master" alt="Build Status"></a>

# useSelector

useSelector hook for computing a state from another state

  - Usable without external state management libraries
  - Composable [utility selectors](#utility-selectors):
    - `selectKey`
    - `selectProjection`
  - [Integration](#recoil) with [Recoil](https://www.npmjs.com/package/recoil)
    - Native Recoil selectors:
      - `keySelector`
      - `projection`
  - Custom selectors ([by implementing](#custom-selector) the `Selector` interface)
  - Typescript support!

## Instal

```bash
npm i --save use-selector
```

## Usage

Read only:

```js
const newState = useSelectorValue(() => {
  /* return newState's value here */
}, [dependingState1, dependingState2] /* dependencies */);
```


Detailed example:

```jsx
import React, { useState } from 'react';
import { useSelectorValue } from 'use-selector';

function Form() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const isFormValid = useSelectorValue(() => title !=== '' && text !== '', [title, text]);

  return (
    <form>
      <input onChange={e => setTitle(e.target.value)} value={title} />
      <input onChange={e => setText(e.target.value)} value={text} />

      <button disabled={isFormValid} />
    </form>
  );
}

export default Form;
```

### Advanced usage

#### Utility Selectors

```js
import React, { useState } from 'react';
import { selectKey, selectProjection } from 'use-selector';

function Profile() {
  const [user, setUser] = useState({
    info: {
      firstName: 'Jane',
      lastName: 'Doe'
      photo: '/images/jane.png',
      title: 'Director',
    },
    roles: ['ADMIN'],
  });

  // Read only select, changes NOT reflected in 'user'
  const [info, setInfo] = useSelector(selectKey(user, 'info'));
  // info = { firstName, lastName, photo, title }

  // Read/Write select (by passing setParent = setInfo)
  // Changes DO reflect in 'info'
  const [name, setName] = useSelector(
    selectProjection(info, ['firstname', 'lastName'], setInfo)
  )
  // name = { firstName, lastName }

  // ...
}
```

#### Recoil

```ts
import { atom } from 'recoil';
import { keySelector, projection } from 'use-selector/recoil';

interface User {
  firstName: string,
  lastName: string,
  email: string | null,
}

interface Session {
  user: User,
  expires: Date
}

export const sessionState = atom<Session>({
  key: 'sessionState'
});

// Read/Write user state in sync with session.user
export const userState = keySelector(sessionState, 'user'); // RecoilState<User>

// Read/Write name state in sync with user
export const nameState = projection(userState, ['firstName', 'lastName']);
// RecoilState<{ firstName: string, lastName: string }>
```

#### Custom Selector

```js
function mySelector(parent, setParent) {
  return {
    get: () => parent + ' mutated',
    set: ({ get, set }, newValue) => {
      const internalState = get();  // internalState = '${parent} mutated'
      set(newValue + ' set'); // internalState = `${newValue} set`
      setParent(newValue) // parent = newValue, internalState =  `${newValue} set`
    },
    dependencies: [/* dependencies, optional */]
  };
}
```

## License

[MIT](https://github.com/assister-ai/use-selector/blob/master/LICENSE)
