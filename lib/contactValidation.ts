export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  csrfToken: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function validateContactForm(data: unknown): { success: true; data: ContactFormData } | { success: false; error: string } {
  if (typeof data !== 'object' || data === null) {
    return { success: false, error: 'Données invalides' };
  }

  const anyData = data as Record<string, unknown>;
  const name = typeof anyData.name === 'string' ? anyData.name.trim() : '';
  const email = typeof anyData.email === 'string' ? anyData.email.trim().toLowerCase() : '';
  const message = typeof anyData.message === 'string' ? anyData.message.trim() : '';
  const csrfToken = typeof anyData.csrfToken === 'string' ? anyData.csrfToken : '';

  if (!name) {
    return { success: false, error: 'Le nom est requis' };
  }
  if (name.length < 2) {
    return { success: false, error: 'Le nom doit contenir au moins 2 caractères' };
  }
  if (name.length > 100) {
    return { success: false, error: 'Le nom ne doit pas dépasser 100 caractères' };
  }

  if (!email) {
    return { success: false, error: 'L\'email est requis' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Adresse email invalide' };
  }

  if (!message) {
    return { success: false, error: 'Le message est requis' };
  }
  if (message.length < 10) {
    return { success: false, error: 'Le message doit contenir au moins 10 caractères' };
  }
  if (message.length > 5000) {
    return { success: false, error: 'Le message ne doit pas dépasser 5000 caractères' };
  }

  if (!csrfToken) {
    return { success: false, error: 'Token CSRF manquant' };
  }

  return {
    success: true,
    data: { name, email, message, csrfToken },
  };
}
