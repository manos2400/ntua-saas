FROM node:20.13.0 as generate_result_ms

WORKDIR /app

VOLUME ["/app/data"]

# Install Python and venv
RUN apt update && apt install -y python3 python3-pip python3-venv

# Create a virtual environment
RUN python3 -m venv /app/venv

# Activate the virtual environment and install Python packages
COPY requirements.txt ./
RUN /app/venv/bin/pip install --upgrade pip && /app/venv/bin/pip install -r requirements.txt

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

RUN npm run database_init

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Use the virtual environment's Python and run the application
CMD ["/app/entrypoint.sh"]
