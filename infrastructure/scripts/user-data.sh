#!/bin/bash
# User data script for infrastructure setup

set -e 

apt-get update -y
apt-get upgrade -y

apt-get install -y docker.io
systemctl start docker
systemctl enable docker
usermod -aG docker ubuntu

curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
apt-get install -y unzip
unzip awscliv2.zip
./aws/install
rm -rf awscliv2.zip aws/

apt-get install -y nginx

mkdir -p /opt/app
chown -R ubuntu:ubuntu /opt/app

cat << 'EOF' > /etc/nginx/sites-available/nextgen
server {
    listen 80;
    server_name _;
    
    location / {
        root /opt/app/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /health {
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable nginx site
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/nextgen /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
systemctl enable nginx

echo "Basic infrastructure setup completed."