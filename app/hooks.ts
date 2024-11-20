import {TypedUseSelectorHook,useDispatch,useSelector} from 'react-redux';
import {RootState,AppDispatch} from './store'

export const UseTweetDispatch=()=>useDispatch<AppDispatch>();
export const UseTweetSelector:TypedUseSelectorHook<RootState>=useSelector;
