# Create our image based on Python 3.8
FROM python:3.8

# Tell Python to not generate .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Turn off buffering
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /var/www/api

# Add files
ADD . .

# Install requirements using pip
RUN python -m pip install -r requirements.txt

# Run flask dev server
CMD ["python", "app.py"]
