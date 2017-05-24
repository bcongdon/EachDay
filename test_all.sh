#!/usr/bin/env bash

npm run test && \
npm run lint && \
python manage.py test && \
pep8 everyday
