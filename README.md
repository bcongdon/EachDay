# EachDay
[![Build Status](https://travis-ci.org/bcongdon/EachDay.svg?branch=master)](https://travis-ci.org/bcongdon/EachDay)
![python-versions](https://img.shields.io/badge/python-2.7%2C%203.6-blue.svg)
![npm-version](https://img.shields.io/badge/npm-4.6.1-blue.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Installation
1. Install dependencies.
    ```
    yarn
    ```
2. Install pip dependencies.
    ```
    pip install -r requirements.txt
    ```
3. Start Postgres (TODO: Explain config)
4. Start the Flask backend.
    ```
    python manage.py run
    ```
5. Start the React frontend.
    ```
    yarn start
    ```

### Building for Deployment

To produce the production-ready minified bundle:

```
yarn build
```

## Usage

Visit `http://localhost:9000` in your broswer. 😁

## Screenshots

![Dashboard](/readme_assets/dashboard.png)

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Make sure that all the tests and linting still pass: `./test_all.sh`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D

## License

MIT