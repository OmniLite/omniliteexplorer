/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import generateTemplate from 'utils/generateTemplate';

export const API_URL_BASE = 'https://api.omniexplorer.info/v1';
export const API_TESTNET_URL_BASE = 'https://testnetapi.omniexplorer.info/v1';
export const API_OMNIFEATHER_URL_BASE = 'https://api.omnifeather.com/v1';
export const API_OMNILITE_URL_BASE = 'https://api.omnilite.org/v1';
export const API_URL_BLOCKCHAIN_BTC_BALANCE =
  'https://blockchain.info/balance?cors=true&active=';
export const FN_API_URL_BLOCKCHAIR_BTC_BALANCE = data =>
  generateTemplate`https://api.blockchair.com/bitcoin/dashboards/address/${'address'}?state=latest&limit=0,0`(
    data,
  );
export const FN_API_URL_BLOCKCHAIN_ADDR = data =>
  generateTemplate`https://blockchain.info/rawaddr/${'address'}?cors=true&limit=${'limit'}&offset=${'offset'}`(
    data,
  );
export const DEFAULT_LOCALE = 'en';
export const DEFAULT_NOT_NUMBER = '---';
export const ECOSYSTEM_PROD = 1;
export const ECOSYSTEM_TEST = 2;
export const ECOSYSTEM_PROD_NAME = 'Production';
export const ECOSYSTEM_TEST_NAME = 'Test';
export const FIRST_BLOCK = 252317;
export const FEATURE_ACTIVATION_TYPE_INT = 65534;
export const TXS_CLASS_AB = 'txs-class-a-b';
export const TXCLASSAB_ADDRESS_MAINNET = '1EXoDusjGwvnjZUyKkxZ4UHEf77z6A5S4P';
export const TXCLASSAB_ADDRESS_TESTNET = 'mpexoDuSkGGqvqrkrjiFng38QPkJQVFyqv';
