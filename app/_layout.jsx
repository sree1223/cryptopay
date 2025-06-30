import { View } from 'react-native';
import { AppProvider,useGlobalStates } from '../hooks/globalStates';
import Layout from './Layout'

export default function Wrapper() {
    return <AppProvider>
        <Layout />
    </AppProvider>
}
