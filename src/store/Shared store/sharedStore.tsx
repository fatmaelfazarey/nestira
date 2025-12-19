import { useAuth } from '@/contexts/AuthContext';
import { IP } from '../Path';
const path = `${IP}/api/`;

export const useSharedStore = () => {
    const { currentUser, userData } = useAuth();
    const newUser = async (userRes: any) => {
        const user = userRes || currentUser;
        if (!user) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }
        console.log('hiiiiiiiii new user')

        const token = `Bearer ${user.stsTokenManager.accessToken}`;
        const url = `${path}add-event/new-user`;

        try {

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();

                throw new Error(`Failed newUser : ${errorMessage}`);
            }
            const data = await response.json();
            return data;

        } catch (error) {
            if (error instanceof Error) {

                console.error('Error during newUser:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return {
        newUser
    };
};
