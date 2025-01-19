import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    
    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));        
        return () => subscription.unsubscribe();
    }, []);

    
    useEffect( () => {       
     
        const handleScroll = () => {            
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
          };  
          window.addEventListener('scroll', handleScroll);  
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    },[])
  

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };


    // only show nav when logged in
    // if (!user) return null;

    return (        
        <header className={`navigation lg:px-16 px-8 nav-header py-4 md:py-0 fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled ? 'bg-gray-900 shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto flex flex-wrap">
                <div className={`flex-1 flex justify-between  ${menuOpen ? 'items-top' : 'items-center'}`}>
                    <a href="" className="text-xl font-semibold text-white tracking-normal font-poppins">realstate</a>
                </div>

                <div className="relative flex  flex-col">
                <label htmlFor="menu-toggle" className={`pointer-cursor md:hidden block  ${menuOpen ? 'flex justify-end' : ''}`} onClick={toggleMenu}>
                    <svg className="fill-current text-gray-300 hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="menu-toggle" />

                <div className={`md:flex md:items-center md:w-auto w-full ${menuOpen ? 'block flex-grow flex-shrink-0 flex-basis-full bg-gray-900 p-4 transition-all duration-2000' : 'hidden'}`} id="menu">
                    <nav>
                    <ul className={`md:flex items-center justify-between text-base  md:pt-0  ${menuOpen ? '' : 'pt-4'}`}>
                        <li><NavLink href="/" exact className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900">Home</NavLink></li>
                        <li><NavLink href="/home#about" exact className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900">About Us</NavLink></li>
                        <li><NavLink href="/home#contact" exact className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900">Contact Us</NavLink></li>
                        { user ? 
                            (
                                <>
                                <li><NavLink href="/investors" className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900">Investors</NavLink></li>
                            {/* <li><NavLink href="/investors/add" className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900">Add Investors</NavLink></li> */}
                            <li><a onClick={userService.logout} className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900" href="">Logout</a></li>
                            </>
                            ) : (
                                <>
                                <li><NavLink href="/account/login" exact className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900 ">Login</NavLink></li>
                                <li><NavLink href="/account/register" exact className="md:px-4 py-2 md:py-4 px-0 block text-white md:hover:bg-gray-900 ">sign up</NavLink></li>
                                </>
                            )
                        }
                    </ul>
                    </nav>
                </div>
                </div>
            </div>
        </header>
    );
}