import { User } from 'shared/types';
import { userSelector } from './user.selectors';
import { useAppSelector } from 'store/store';

export function useUserSelector(): User {
    return useAppSelector(userSelector);
}
