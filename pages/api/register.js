import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    try {
      const { user, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      // Insert additional user data into the users table
      const { data, error: insertError } = await supabase
        .from('users')
        .insert({ id: user.id, email, role });

      if (insertError) throw insertError;

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
