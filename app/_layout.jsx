import { View } from 'react-native';
import { AppProvider,useGlobalStates } from '../hooks/globalStates';
import Layout from './Layout'
import TransactionSigner from './TransactionSigner';


export default function Wrapper() {
    return <AppProvider>
        <Layout />
        {/* <TransactionSigner /> */}
    </AppProvider>
}
