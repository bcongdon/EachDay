#!/usr/bin/env bash

npm test && \
npm run lint && \
python manage.py cov && \
pep8 eachday
