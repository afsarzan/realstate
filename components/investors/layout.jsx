import { Nav } from "components";
export { Layout };

function Layout({ children }) {
    return (
        <div className="card bg-gray-200 flex flex-col min-h-screen login-screen">
        <Nav />
        <div className="mt-20 m-auto mb-20 container">
            <div className="card bg-base-100 shadow-xl ">
            <div className="card-body">
                <div className="hero bg-base-200">
                <div className="hero-content  w-full">               
                    <div className="card  shadow-2xl bg-base-100  w-full pb-10">
                        {children}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
     </div>
    );
}