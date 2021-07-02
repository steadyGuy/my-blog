import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectAlert } from '../../redux/selectors';
import { Loader } from './Loader';
import { Toast } from './Toast';


export const Alert: FC = () => {
  const state = useSelector(selectAlert);
  console.log(state, 'state')
  // debugger;
  return (
    <>

      {state.loading && <Loader />}

      {state.errors && <Toast body={state.errors} severity="error" />}

      {state.success && <Toast body={state.success} severity="success" />}

    </>
  )
}
