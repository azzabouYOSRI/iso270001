import { Injectable } from '@angular/core';
// import { encrypt, decrypt } from './encryption-utils';

@Injectable({
  providedIn: 'root'
})
export class SessionStorage {

  private rsaKeyPairs: { [itemId: string]: { privateKey: string, publicKey: string } } = {};

  setItem(itemId: string, value: any): void {
    // const rsaKeyPair = generateRSAKeyPair();
    // this.rsaKeyPairs[itemId] = rsaKeyPair;
    // const encryptedValue = encrypt(JSON.stringify(value), rsaKeyPair.publicKey);
    // sessionStorage.setItem(itemId, JSON.stringify({ encryptedValue, publicKey: rsaKeyPair.publicKey }));
  }

  getItem(itemId: string): any {
    const itemData = sessionStorage.getItem(itemId);
    if (itemData) {
      const { encryptedValue, publicKey } = JSON.parse(itemData);
      const rsaKeyPair = this.rsaKeyPairs[itemId];
      if (!rsaKeyPair || rsaKeyPair.publicKey !== publicKey) {
        throw new Error(`RSA key pair for item ${itemId} not found or does not match public key stored in session storage`);
      }
      // const decryptedValue = decrypt(encryptedValue, rsaKeyPair.privateKey);
      // return JSON.parse(decryptedValue);
    }
    return null;
  }

  removeItem(itemId: string): void {
    delete this.rsaKeyPairs[itemId];
    sessionStorage.removeItem(itemId);
  }

  clear(): void {
    this.rsaKeyPairs = {};
    sessionStorage.clear();
  }
}
