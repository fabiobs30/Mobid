import { RootStackParamsList } from '../interfaces/Routes';

declare global{
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamsList {}
    }
}