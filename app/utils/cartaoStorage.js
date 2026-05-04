import AsyncStorage from '@react-native-async-storage/async-storage';

/** Chave antiga (global); mantida só para migração automática. */
export const LEGACY_CARTAO_KEY = 'cartao';

/** Chave AsyncStorage por conta logada (email RM/RF/email). */
export function getCartaoStorageKey(usuario) {
  if (!usuario) return null;
  const id = String(usuario.emailRM || usuario.emailRF || usuario.email || '')
    .trim()
    .toLowerCase();
  return id ? `cartao:${id}` : null;
}

/** Lê o cartão do usuário; se existir só a chave legada global, migra para este usuário. */
export async function loadCartaoParaUsuario(usuario) {
  const key = getCartaoStorageKey(usuario);
  if (!key) return null;

  let raw = await AsyncStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  raw = await AsyncStorage.getItem(LEGACY_CARTAO_KEY);
  if (raw) {
    try {
      await AsyncStorage.setItem(key, raw);
      await AsyncStorage.removeItem(LEGACY_CARTAO_KEY);
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

export async function salvarCartaoParaUsuario(usuario, cartaoObj) {
  const key = getCartaoStorageKey(usuario);
  if (!key) throw new Error('usuario_invalido_cartao');
  await AsyncStorage.setItem(key, JSON.stringify(cartaoObj));
  await AsyncStorage.removeItem(LEGACY_CARTAO_KEY);
}

export async function removerCartaoDoUsuario(usuario) {
  const key = getCartaoStorageKey(usuario);
  if (key) await AsyncStorage.removeItem(key);
}
