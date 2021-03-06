import json
import os

from unipath import Path

from .base import *

DEV_SECRETS_PATH = SETTINGS_PATH.child("dev_secrets.json")
with open(os.path.join(DEV_SECRETS_PATH)) as f: secrets = json.loads(f.read())

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'psipred_website_db',
        'USER': get_secret("USER", secrets),
        'PASSWORD': get_secret("PASSWORD", secrets),
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

SECRET_KEY = get_secret("SECRET_KEY", secrets)

DEBUG = True
STAGING = False
PRODUCTION = False

STATIC_BASE_URL = ''

INSTALLED_APPS = INSTALLED_APPS + ('debug_toolbar',)

DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL': "/static/js/jquery.min.js",
}
