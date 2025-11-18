import { DEVELOPMENT_ENV } from './env/development';
import { LOCALHOST_ENV } from './env/localhost';
import { PRODUCTION_ENV } from './env/production';

/**
 * npm에 배포된 코드를 불러올 때 환경변수를 지정할 수 있게 필요한 함수
 * 미리 설정한 env가 없다면 undefined를 리턴합니다.
 */
function getEnv() {
  if (typeof window !== 'undefined' && window.env) {
    return window.env;
  }

  if (typeof global !== 'undefined' && global.env) {
    return global.env;
  }

  // next에서는 NODE_ENV를 컨트롤 할 수 없어서 추가한 값.
  if (process.env.NEXT_PUBLIC_ENV) {
    return process.env.NEXT_PUBLIC_ENV;
  }

  return process.env.NODE_ENV;
}

/**
 * 설정된 env에 해당하는 적절한 config 객체를 리턴합니다.
 * env가 설정되어 있지 않다면 운영 환경에서 문제가 없도록 운영 환경의 config를 리턴합니다.
 */
function mapEnvConfigValue() {
  const env = getEnv();

  if (!env) {
    console.error('contents-builder env is not defined');

    return PRODUCTION_ENV;
  }

  if (env === 'localhost') {
    return LOCALHOST_ENV;
  }

  if (env === 'production') {
    return PRODUCTION_ENV;
  }

  return DEVELOPMENT_ENV;
}

const CONFIG = mapEnvConfigValue();

export const CDN_URL = CONFIG.CDN_URL;
export const SITE_URL = CONFIG.SITE_URL;
export const API_URL = CONFIG.API_URL;
export const API_ENDPOINT = `${API_URL}/api`;
export const MODE = CONFIG.MODE;
export const SHORT_URL_DOMAIN = CONFIG.SHORT_URL_DOMAIN;
export const getCdnUrl = (path: string) => `${CDN_URL}${path}`;
