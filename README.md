# Book Surf🏄🏄🏄

Book surf is an open source project that can help users find and serach
books easily from different sources. The project used React framework and some
other related set of tools.

# How To Contribute?

It is a straight forward process: clone it.. play with.. and send over your pull requests.

**Note:** While in development, you would need to create your own API tokens for both :

1.  New York Times Books Api
2.  Google Books Api
    Like usual, save them inside _local enviroment file_ using the following signature:


        REACT_APP_NY_KEY='your key'
        REACT_APP_NY_SECRET="your secret'
        REACT_APP_GOOGLE_KEY='your key'

**Gotchas:** if Typescript won't load make sure you add the following line to your configuration file:

    {
    	/ /tsconfig.json
        ...
        "resolve": {"extensions": [".ts", ".tsx", ".js", ".jsx"]}
        ...
    }

## License

**Book Surf&copy;** is an open source project under the **MIT** **License**.
