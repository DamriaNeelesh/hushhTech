// Supabase Edge Function to serve country/state/city data
// This replaces the heavy country-state-city library on the frontend
// PUBLIC ENDPOINT - No authentication required for location data

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Country, State, City } from 'npm:country-state-city@3.2.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type'); // 'countries', 'states', 'cities'
    const countryCode = url.searchParams.get('country'); // e.g., 'US'
    const stateCode = url.searchParams.get('state'); // e.g., 'CA'

    let data;

    switch (type) {
      case 'countries':
        // Get all countries
        data = Country.getAllCountries().map(c => ({
          isoCode: c.isoCode,
          name: c.name,
        }));
        break;

      case 'states':
        // Get states for a specific country
        if (!countryCode) {
          return new Response(
            JSON.stringify({ error: 'country parameter is required for states' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
        data = State.getStatesOfCountry(countryCode).map(s => ({
          isoCode: s.isoCode,
          name: s.name,
        }));
        break;

      case 'cities':
        // Get cities for a specific state in a country
        if (!countryCode || !stateCode) {
          return new Response(
            JSON.stringify({ error: 'country and state parameters are required for cities' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
        data = City.getCitiesOfState(countryCode, stateCode).map(c => ({
          name: c.name,
        }));
        break;

      default:
        return new Response(
          JSON.stringify({ 
            error: 'Invalid type parameter. Use: countries, states, or cities' 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

    return new Response(
      JSON.stringify({ data }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        } 
      }
    );

  } catch (error) {
    console.error('Error in get-locations function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
