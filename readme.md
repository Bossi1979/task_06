# WhatsChats README

## Project Overview

This Django project is designed as example simple chat app.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.x installed
- `pip` package manager installed
- [Optional] Virtual environment tool (e.g., `venv` or `virtualenv`) for isolating project dependencies

## Getting Started

1. **Clone the Repository:**

    git clone https://github.com/your-username/your-django-project.git
    cd your-django-project

2. **Set Up Virtual Environment (Optional but Recommended):**

    # Create a virtual environment
    python -m venv venv

    # Activate the virtual environment
    # On Windows:
    venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    

3. **Install Dependencies:**

    pip install -r requirements.txt

4. **Database Migrations:**

    # Apply initial database migrations
    python manage.py migrate

5. **Create a Superuser (Optional but Recommended):**

    # Create a superuser to access the Django admin interface
    python manage.py createsuperuser

6. **Run the Development Server:**

    python manage.py runserver

    Visit [http://localhost:8000](http://localhost:8000) in your web browser to see the application.

7. **Access the Django Admin Interface:**

    If you created a superuser, you can access the Django admin interface at [http://localhost:8000/admin](http://localhost:8000/admin).

