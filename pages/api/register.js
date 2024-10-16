import { supabase, signUp as supabaseSignUp } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, role, websiteUrl } = req.body;

    try {
      await supabaseSignUp( email, password, { 
        data: {
          role,
          ...(role === 'client' && websiteUrl ? { websiteUrl } : {}),
        },
      } );

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
