import {Shop} from './shop'

export type RootStackParamList = {
  Main: undefined;
  Shop: {shop: Shop};
  User: undefined;
  CreateReview: {shop: Shop};
}