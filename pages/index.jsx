import Link from 'next/link';
import { userService } from 'services';
import { Nav, Alert } from 'components';

export default Home;

function Home() {
    return (
        <div>
            <div>
                <Nav />
                <section className="mb-40 overflow-hidden">
                    <Alert />
                    <div>
                        <video src="/bg-video.mp4" autoPlay="{true}" loop muted
                            className="object-cover object-center w-full h-full" > </video>
                        <div
                            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed">
                            <div className="flex h-full items-center">
                                <div className="px-6 text-center text-white md:px-12">
                                    <h1 className="
                                    sm-2 sm-2 mt-6 mb-16 text-5xl tracking-tight md:text-6xl xl:text-9xl font-poppins">
                                        Catchy Text here <br /><span>for your business</span>
                                    </h1>
                                    <h3 className="mt-6 mb-16 text-4xl tracking-tight md:text-4xl xl:text-4xl font-poppins">
                                        Sub text here
                                    </h3>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>        
                {/* <p>
                    <Link href="/users">Manage Users</Link>
                </p> */}
            </div>
        </div>
    );
}
