import { Layout, AddEdit } from 'components/investors';

export default Add;

function Add() {
    return (
        <Layout>
            <h1 className="text-2xl  p-2  bg-slate-500 text-white font-bold">Add Investor</h1>
            <AddEdit />
        </Layout>
    );
}