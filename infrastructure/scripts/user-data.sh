#!/bin/bash
# User data script for EC2 instance setup

yum update -y

amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

mkdir -p /opt/app
cd /opt/app

git clone https://github.com/SyedTalha71x/NextGen-Career.git .

# Create a runtime environment file for backend
cat << EOF > /opt/app/server/.env
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
MYSQL_DATABASE=${MYSQL_DATABASE}
MYSQL_USER=${MYSQL_USER}
MYSQL_PASSWORD=${MYSQL_PASSWORD}
MYSQL_HOST=mysql
PORT=5000
EOF

docker-compose up -d

curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

cd /opt/app/client
npm install
npm run build

yum install nginx -y

mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

cat << EOF > /etc/nginx/sites-available/nextgen
server {
    listen 80;
    server_name _;

    root /opt/app/client/dist;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

rm -f /etc/nginx/conf.d/*.conf
ln -s /etc/nginx/sites-available/nextgen /etc/nginx/sites-enabled/

# Include sites-enabled in nginx.conf
if ! grep -q "sites-enabled" /etc/nginx/nginx.conf; then
    sed -i '/http {/a \    include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf
fi

systemctl restart nginx
systemctl enable nginx
