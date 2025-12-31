import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SocialLoginButtons = () => {
    const { socialLogin } = useAuth();
    const navigate = useNavigate();

    const handleSocialLogin = async (provider: string) => {
        // In a real app, this would trigger the SDK popup (e.g., Google OAuth).
        // Since we don't have App IDs, we will mock the "Success" response from the provider
        // and send that data to our backend to create/login the user.
        
        const mockData = {
            google: {
                id: "google_12345",
                email: "user_google@example.com",
                name: "Google User",
                avatar: "https://lh3.googleusercontent.com/a/ACg8ocI...=s96-c"
            },
            facebook: {
                id: "fb_67890",
                email: "user_fb@example.com",
                name: "Facebook User",
                avatar: "https://platform-lookaside.fbsbx.com/platform/profilepic/..."
            },
            x: {
                id: "x_112233",
                email: "user_x@example.com",
                name: "X User",
                avatar: "https://pbs.twimg.com/profile_images/..."
            }
        };

        const data = mockData[provider as keyof typeof mockData];
        if (!data) return;

        try {
            // Simulate network delay for SDK
            await new Promise(resolve => setTimeout(resolve, 800)); 
            
            await socialLogin(provider, data.email, data.name, data.id, data.avatar);
            navigate('/client/home'); // Or determine dashboard based on role
        } catch (error) {
            console.error(`${provider} login failed`, error);
            alert(`Error initializing ${provider} login`);
        }
    };

    return (
        <div className="flex justify-center gap-4 mt-6">
            <button 
                onClick={() => handleSocialLogin('google')}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                title="Continuar con Google"
                type="button"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            </button>
            <button 
                onClick={() => handleSocialLogin('facebook')}
                className="p-2 rounded-full bg-[#1877F2] hover:bg-[#166fe5] transition-colors text-white"
                title="Continuar con Facebook"
                type="button"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
            </button>
            <button 
                onClick={() => handleSocialLogin('x')}
                className="p-2 rounded-full bg-black hover:bg-gray-800 transition-colors text-white"
                title="Continuar con X"
                type="button"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218Zm-2.1281 2.4739L10.8574 12.0336L5.31378 4.10196H7.70018L12.1742 10.5026L12.8703 11.4985L18.6861 19.8188H16.2997L11.5542 13.0956Z" />
                </svg>
            </button>
        </div>
    );
};
