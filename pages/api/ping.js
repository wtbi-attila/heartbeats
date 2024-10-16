import fetch from 'node-fetch';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { websiteUrl } = req.body;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'No website URL provided' });
  }

  try {
    const start = Date.now();
    const response = await fetch(websiteUrl);
    const end = Date.now();
    const responseTime = end - start;

    const status = response.ok ? 'up' : 'down';
    const statusMessage = response.ok
      ? `Website is up (${responseTime}ms)`
      : `Website is down (${response.status})`;

    // Store ping result in Supabase
    const { data, error } = await supabase
      .from('ping_results')
      .insert({
        website: websiteUrl,
        status,
        response_time: responseTime,
        status_code: response.status,
      });

    if (error) {
      console.error('Error storing ping result:', error);
    }

    res.status(200).json({ status: statusMessage, websiteUrl });
  } catch (error) {
    console.error('Error pinging website:', error);
    res.status(200).json({ status: 'Error: Unable to reach the website', websiteUrl });
  }
}