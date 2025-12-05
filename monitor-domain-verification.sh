#!/bin/bash

# Supabase Domain Verification Monitor
# Project: hushh-ai
# Domain: auth.hushh.ai

echo "🔍 Monitoring Supabase Domain Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Domain: auth.hushh.ai"
echo "Project: ibsisfnjxeowvdtvgzff"
echo "Press Ctrl+C to stop monitoring"
echo ""

CHECK_COUNT=0

while true; do
    CHECK_COUNT=$((CHECK_COUNT + 1))
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo "[$TIMESTAMP] Check #$CHECK_COUNT"
    
    # Get the full status
    RAW_OUTPUT=$(supabase domains get --project-ref ibsisfnjxeowvdtvgzff --include-raw-output 2>&1)
    
    # Extract SSL status
    SSL_STATUS=$(echo "$RAW_OUTPUT" | grep '"ssl"' -A 3 | grep 'status' | head -1 | cut -d'"' -f4)
    
    # Extract overall status
    OVERALL_STATUS=$(echo "$RAW_OUTPUT" | grep '"status":' | tail -1 | cut -d'"' -f4)
    
    echo "  SSL Status: $SSL_STATUS"
    echo "  Overall Status: $OVERALL_STATUS"
    
    if [ "$SSL_STATUS" = "active" ]; then
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ SUCCESS! SSL Certificate is ACTIVE!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "🚀 Next Steps:"
        echo ""
        echo "1. Activate the domain:"
        echo "   supabase domains activate --project-ref ibsisfnjxeowvdtvgzff"
        echo ""
        echo "2. Update your .env.local file:"
        echo "   NEXT_PUBLIC_SUPABASE_URL=https://auth.hushh.ai"
        echo ""
        echo "3. Test the endpoint:"
        echo "   curl -I https://auth.hushh.ai/auth/v1/health"
        echo ""
        break
    fi
    
    echo "  ⏳ Still pending... Next check in 2 minutes"
    echo ""
    sleep 120
done
