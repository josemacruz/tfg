import test from 'ava';
import { useState, useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  useSelector,
  useSelectorValue,
  selectKey,
  selectProjection
} from '.';

const wait = ms  => new Promise(resolve => setTimeout(resolve, ms)); 

const resolveLater = () => {
  let resolvePromise;
  const promise = new Promise(resolve => { resolvePromise = resolve; });
  return [promise, resolvePromise];
};

const getActual = hook => hook.result.current;

test('Simple selector', t => {  
  const answer = 42;
  function useFoo () {
    const selected = useSelectorValue(() => answer, [answer]);
    return selected;
  }
  const hook = renderHook(() => useFoo());
  t.is(getActual(hook), answer);
});

test('State and effect', async t => {
  const [promiseUseEffectStarted, resolveUseEffectStarted] = resolveLater();
  const [promiseSetSelected, resolveSetSelected] = resolveLater();
  const [promiseStateIsSet, resolveStateIsSet] = resolveLater();
  let setStateCounter = 0;
  function useFoo() {
    const [state, setState] = useState('state');
    const [selected, setSelected] = useSelector({get: () => `${state} mutated`, dependencies: [state]});
    useEffect(() => {
      Promise.resolve()
        .then(resolveUseEffectStarted)
        .then(() => { setSelected('again mutated'); })
        .then(resolveSetSelected)
        .then(() => setState('and'));
    }, []);
    useEffect(() => {
      setStateCounter++;
      console.log(`${setStateCounter} state is: ${state}`);
      state === 'and' && resolveStateIsSet();
    }, [state]);
    return { state, selected };
  }
  const hook = renderHook(() => useFoo());
  await promiseUseEffectStarted;
  t.deepEqual(getActual(hook), { state: 'state', selected: 'state mutated'});
  await promiseSetSelected;
  t.deepEqual(getActual(hook), { state: 'state', selected: 'again mutated'});
  await promiseStateIsSet;
  t.deepEqual(getActual(hook), { state: 'and', selected: 'and mutated'});
  await wait(50);
  t.is(setStateCounter, 2);
});


const initialSession = {
  user: {
    name: 'Jane',
    email: 'jane@doe.com'
  },
  lastLogin: '2000',
  memberSince: '1900',
  life: {
    aliveSince: '1800',
    diesIn: '2100'
  },
  redirectUrl: '/~janedoe'
};

test('Select key and projection', async t => {
  const setSessionOn = async key => {
    const newUser = { name: 'John', email: 'john@doe.com' };
    const newDates = { lastLogin: '2020', life: { diesIn: '2090' } };
    function useFoo() {
      const [session, setSession] = useState(initialSession);
      const [user, setUser] = useSelector(
        selectKey(session, 'user', key === 'user' ? setSession : false)
      );
      const [dates, setDates] = useSelector(
        selectProjection(session, ['lastLogin', 'memberSince', 'life'], key === 'dates' ? setSession : false)
      );
      useEffect(() => {
        wait(50).then(() => {
          setUser(newUser);
          setDates(newDates)
        });
      }, []);
      return {
        session,
        user,
        dates
      };
    }
    let hook = renderHook(() => useFoo());
    t.deepEqual(getActual(hook), {
      session: initialSession,
      user: initialSession.user,
      dates: {
        lastLogin: initialSession.lastLogin,
        memberSince: initialSession.memberSince,
        life: initialSession.life
      }
    });
    await wait(100);
    console.log(getActual(hook))
    t.deepEqual(getActual(hook), {
      session: {      
        user: key === 'user' ? newUser : initialSession.user,
        lastLogin: key === 'dates' ?  newDates.lastLogin: initialSession.lastLogin,
        memberSince: initialSession.memberSince,
        life: key === 'dates' ?  newDates.life: initialSession.life,
        redirectUrl: initialSession.redirectUrl
      },
      user: newUser,
      dates: {
        lastLogin: newDates.lastLogin,
        memberSince: initialSession.memberSince,
        life: newDates.life
      }
    });
  };
  await setSessionOn('user');
  await setSessionOn('dates');
});
