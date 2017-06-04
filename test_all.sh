#!/usr/bin/env bash

npm test && \
npm run lint && \
python manage.py test && \
pep8 eachday
