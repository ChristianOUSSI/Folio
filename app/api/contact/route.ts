import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/contactValidation';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { validateCSRFToken } from '@/lib/csrf';

function escapeHtml(str: string) {
  return str.replace(/[&<>'"`]/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      case '`':
        return '&#096;';
      default:
        return char;
    }
  });
}

// Configuration (utilisé pour l'envoi d'email si disponible)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'Christian.oussi01@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const ip = getClientIP(request);
    const rateLimitCheck = checkRateLimit(ip);
    
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        { status: 429, headers: { 'Retry-After': '3600' } }
      );
    }

    const body = await request.json();
    const { name, email, message, csrfToken } = body;

    // Validate CSRF token
    if (!validateCSRFToken(csrfToken)) {
      return NextResponse.json(
        { error: 'Erreur de sécurité. Veuillez réessayer.' },
        { status: 403 }
      );
    }

    // Validate input data
    const validation = validateContactForm({ name, email, message, csrfToken });

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // If Resend is configured, we could send an email.
    // In this environment, the "resend" package is not present; we'll just log the message.
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      to: TO_EMAIL,
      from: FROM_EMAIL,
    });

    return NextResponse.json(
      { success: true, message: 'Message reçu (enregistrement local, email non envoyé).' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
