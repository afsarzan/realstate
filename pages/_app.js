import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';

import { userService } from 'services';
import LandingPage from './home';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login', '/account/register','/home',''];
        const path = url.split('?')[0];        
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            // router.push({
            //     pathname: '',
            //     query: { returnUrl: router.asPath }
            // });
        } else {
            setAuthorized(true);
        }
    }
    return (
        <>
            <Head>
                <title>realstate</title>
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>                         
                {
                authorized ? (                    
                    <Component {...pageProps} />
                ) : (
                    <LandingPage/>
                )
                }
            </div>
        </>
    );
}
