#!/usr/bin/env bash
# Script de verificación de propagación y salud DNS para nexosingenieria.com

DOMAIN="nexosingenieria.com"
EXPECTED_MAIL_IP="45.79.23.185"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Auditoría DNS en tiempo real para $DOMAIN ===${NC}\n"

# 1. Nameservers
echo -e "${YELLOW}[1/6] Nameservers autoritativos (NS):${NC}"
NS_RECORDS=$(dig NS "$DOMAIN" +short)
echo "$NS_RECORDS"
if echo "$NS_RECORDS" | grep -qi "dns-parking.com"; then
    echo -e "${GREEN}✓ Delegado a Hostinger DNS${NC}\n"
elif echo "$NS_RECORDS" | grep -qi "whdns.co"; then
    echo -e "${YELLOW}ℹ Todavía responde en Winkhosting (Hosting Compartido)${NC}\n"
else
    echo -e "${RED}⚠ Nameservers desconocidos o sin propagar${NC}\n"
fi

# 2. Servidor de correo A (mail)
echo -e "${YELLOW}[2/6] Subdominio de correo (mail.$DOMAIN):${NC}"
MAIL_IP=$(dig "mail.$DOMAIN" A +short | tail -n 1)
echo "mail.$DOMAIN -> $MAIL_IP"
if [ "$MAIL_IP" == "$EXPECTED_MAIL_IP" ]; then
    echo -e "${GREEN}✓ Correcto: mail apunta a la IP fija del hosting compartido ($EXPECTED_MAIL_IP)${NC}\n"
else
    echo -e "${RED}✗ ATENCIÓN: mail.$DOMAIN no apunta a $EXPECTED_MAIL_IP (apunta a '$MAIL_IP')${NC}\n"
fi

# 3. Registro MX
echo -e "${YELLOW}[3/6] Registro MX:${NC}"
MX_RECORD=$(dig "$DOMAIN" MX +short)
echo "$MX_RECORD"
if echo "$MX_RECORD" | grep -qi "mail.$DOMAIN"; then
    echo -e "${GREEN}✓ Correcto: MX desacoplado apuntando a mail.$DOMAIN${NC}\n"
elif echo "$MX_RECORD" | grep -qE "^0 $DOMAIN\."; then
    echo -e "${RED}✗ ALERTA: MX sigue apuntando a la raíz ($DOMAIN). Debe apuntar a mail.$DOMAIN antes de conmutar la web${NC}\n"
else
    echo -e "${YELLOW}ℹ Registro MX detectado: $MX_RECORD${NC}\n"
fi

# 4. SPF y DKIM
echo -e "${YELLOW}[4/6] Autenticación de correo (SPF y DKIM):${NC}"
SPF=$(dig "$DOMAIN" TXT +short | grep -i "v=spf1")
echo "SPF: $SPF"
DKIM=$(dig "default._domainkey.$DOMAIN" TXT +short)
if [ -n "$DKIM" ]; then
    echo -e "${GREEN}✓ DKIM presente (default._domainkey)${NC}"
else
    echo -e "${RED}✗ DKIM no encontrado en default._domainkey.$DOMAIN${NC}"
fi
echo ""

# 5. Resolución Web (Apex y WWW)
echo -e "${YELLOW}[5/6] Enrutamiento Web (@ y www):${NC}"
APEX_RES=$(dig "$DOMAIN" +short)
WWW_RES=$(dig "www.$DOMAIN" +short)
echo "@ ($DOMAIN):"
echo "$APEX_RES"
echo "www ($DOMAIN):"
echo "$WWW_RES"
echo ""

# 6. Conectividad HTTP/HTTPS
echo -e "${YELLOW}[6/6] Verificación HTTP/HTTPS:${NC}"
STATUS_APEX=$(curl -s -o /dev/null -w "%{http_code}" -L --connect-timeout 5 "https://$DOMAIN" 2>/dev/null || echo "FAIL")
STATUS_WWW=$(curl -s -o /dev/null -w "%{http_code}" -L --connect-timeout 5 "https://www.$DOMAIN" 2>/dev/null || echo "FAIL")
echo "HTTP Status https://$DOMAIN: $STATUS_APEX"
echo "HTTP Status https://www.nexosingenieria.com: $STATUS_WWW"

echo -e "\n${BLUE}=== Fin de la auditoría ===${NC}"
