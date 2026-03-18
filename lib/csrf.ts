import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'your-secret-key-change-in-production';
const TOKEN_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

interface TokenData {
  timestamp: number;
  token: string;
}

const tokens = new Map<string, TokenData>();

export function generateCSRFToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now();
  
  // Store with timestamp for validation
  tokens.set(token, { timestamp, token });
  
  // Clean up old tokens
  for (const [key, value] of tokens.entries()) {
    if (Date.now() - value.timestamp > TOKEN_MAX_AGE) {
      tokens.delete(key);
    }
  }
  
  return token;
}

export function validateCSRFToken(token: string): boolean {
  const tokenData = tokens.get(token);
  
  if (!tokenData) {
    return false;
  }
  
  // Check if token is expired
  if (Date.now() - tokenData.timestamp > TOKEN_MAX_AGE) {
    tokens.delete(token);
    return false;
  }
  
  // Token is valid - keep it valid for the session (multiple uses allowed)
  return true;
}
