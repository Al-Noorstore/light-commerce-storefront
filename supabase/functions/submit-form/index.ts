import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const body = await req.json()
    console.log('Received form submission:', body)

    const { 
      form_type = 'unknown',
      form_name = 'unnamed-form',
      customer_name,
      customer_email,
      customer_phone,
      delivery_address,
      delivery_city,
      delivery_postal_code,
      order_details,
      additional_data 
    } = body

    // Insert form submission into database
    const { data, error } = await supabase
      .from('form_submissions')
      .insert({
        form_type,
        form_name,
        customer_name,
        customer_email,
        customer_phone,
        delivery_address,
        delivery_city,
        delivery_postal_code,
        order_details,
        additional_data,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to save form submission' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Form submission saved successfully:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submission received successfully',
        id: data.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})