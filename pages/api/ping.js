import fetch from 'node-fetch';
import { supabase } from '../../lib/supabaseClient';

const WEBSITE_TO_PING = 'https://example.com'; // Replace with the website you want to ping

export default async function handler(req, res) {
  try {
    const start = Date.now();
    const response = await fetch(WEBSITE_TO_PING);
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
        website: WEBSITE_TO_PING,
        status,
        response_time: responseTime,
        status_code: response.status,
      });

    if (error) {
      console.error('Error storing ping result:', error);
    }

    res.status(200).json({ status: statusMessage });
  } catch (error) {
    console.error('Error pinging website:', error);
    res.status(200).json({ status: 'Error: Unable to reach the website' });
  }
}
