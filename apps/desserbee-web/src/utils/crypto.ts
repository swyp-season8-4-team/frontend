import crypto from 'crypto';
import { isServer } from '@repo/api';

const ALGORITHM = 'aes-256-cbc';
const IV = Buffer.from('this-is-desserbee-web-iv').subarray(0, 16);
const KEY = Buffer.from(
  'this-is-desserbee-web-key-this-is-desserbee-web-iv'
).subarray(0, 32);

export function encrypt(text: string): string {
  if (!isServer) {
    throw new Error('This function can only be used on the server side');
  }
  
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let encryptedText = cipher.update(text, 'utf8', 'hex');
  encryptedText += cipher.final('hex');

  return encryptedText;
}

export function decrypt(encryptedText: string): string {
  if (!isServer) {
    throw new Error('This function can only be used on the server side');
  }

  const cipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
  let text = cipher.update(encryptedText, 'hex', 'utf8');
  text += cipher.final('utf8');

  return text;
} 