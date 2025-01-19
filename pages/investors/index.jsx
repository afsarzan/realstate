import { userService } from 'services';
import { useState, useEffect } from 'react';
import { Layout } from 'components/investors';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Index = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        const subscription = userService.user.subscribe(user => {
          setUser(user);
          if (!user) {
            router.push('/');
            return null
          };
        });        
        return () => subscription.unsubscribe();
    }, []);
    // only show nav when logged in
    
    
  return (
    <Layout>   
     <div className="flex justify-between bg-slate-500 text-white ">
      <h1 className="text-2xl  p-2 font-bold">Investor listing</h1>      
      <Link href="/investors/add" className="btn btn-active btn-secondary m-2 btn-sm">Add Investor</Link>
     </div>
      <div className="overflow-x-auto">
      <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Sno</th>
          <th>Name</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>                   
          <td>1</td>
          <td>test</td>
          <td>1111</td>                    
          <td></td>
        </tr>
        <tr>                   
          <td>2</td>
          <td>test</td>
          <td>1111</td>                    
          <td></td>
        </tr>
        <tr>                   
          <td>3</td>
          <td>test</td>
          <td>1111</td>                    
          <td></td>
        </tr>
      </tbody>
      </table>
      </div>
    </Layout>
  )
}

export default Index