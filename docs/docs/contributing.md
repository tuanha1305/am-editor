# Contribution

## Contributing plugins

Refer to the plugin tutorial document

## Contribute Engine Code

Clone the am-editor repository on GitHub

### Installation dependencies

```bash
$ yarn

//or

$ npm install
```

### Startup project

```bash
//Ordinary start
$ yarn start

//or
//The server-side rendering mode is started and site-ssr will be called. To fully use ssr mode, you need to actively access port 7001 after startup
$ yarn ssr
```

### Start collaborative service

```bash
$ cd ot-server
$ yarn start
```

### Compile

Because we have multiple packages, we use lerna management mode

In the compilation configuration, we used [father-build](https://github.com/umijs/father)

One command can compile all packages

```bash
$ yarn build
```

Site packaging

```bash
$ yarn docs:build
```

## Contributing documents

am-editor uses [dumi](https://d.umijs.org/) as a document site tool,

1. There is "Edit this document on GitHub" at the bottom left of each document, you can modify the document here
2. Open the docs directory on Github, use the file editor to create, modify, and preview files, and then submit a PR
3. You can also clone the am-editor warehouse and modify the files in the docs directory. After the local documentation is debugged, the PR will be unified.

## Financial support

### Alipay

![alipay](https://cdn-object.yanmao.cc/contribution/alipay.png?x-oss-process=image/resize,w_200)

### WeChat Pay

![wechat](https://cdn-object.yanmao.cc/contribution/weichat.png?x-oss-process=image/resize,w_200)

### PayPal

https://paypal.me/aomaocom
