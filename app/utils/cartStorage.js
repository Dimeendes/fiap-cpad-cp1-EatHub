import AsyncStorage from '@react-native-async-storage/async-storage';

const LEGACY_CART_KEY = 'carrinho';

function getUserIdentifier(usuarioLogado) {
  return (
    usuarioLogado?.emailRM ||
    usuarioLogado?.emailRF ||
    usuarioLogado?.email ||
    usuarioLogado?.rm ||
    usuarioLogado?.nome ||
    'anonimo'
  );
}

export function getCartStorageKey(usuarioLogado) {
  return `carrinho:${getUserIdentifier(usuarioLogado)}`;
}

export async function getUserCart(usuarioLogado) {
  const userCartKey = getCartStorageKey(usuarioLogado);
  const dados = await AsyncStorage.getItem(userCartKey);

  if (dados) {
    return JSON.parse(dados);
  }

  const legacyCart = await AsyncStorage.getItem(LEGACY_CART_KEY);
  if (!legacyCart) {
    return [];
  }

  const carrinho = JSON.parse(legacyCart);
  await AsyncStorage.setItem(userCartKey, JSON.stringify(carrinho));
  await AsyncStorage.removeItem(LEGACY_CART_KEY);
  return carrinho;
}

export async function saveUserCart(usuarioLogado, carrinho) {
  const userCartKey = getCartStorageKey(usuarioLogado);
  await AsyncStorage.setItem(userCartKey, JSON.stringify(carrinho));
}

export async function clearUserCart(usuarioLogado) {
  const userCartKey = getCartStorageKey(usuarioLogado);
  await AsyncStorage.removeItem(userCartKey);
}
