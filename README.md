# abu-redux-middleware
Redux middleware for [azure-block-upload](https://github.com/volumenetwork/azure-block-upload).

## Installation
```
npm install abu-redux-middleware
```

## Usage
When creating Redux store, use `applyMiddleware` function as explained [here](https://redux.js.org/api/applymiddleware). For example:
```
import ABUReduxMiddleware from 'abu-redux-middleware';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(reducer, initialState, applyMiddleware(ABUReduxMiddleware));
```
To trigger this middleware, you need to dispatch an action with this shape:
```
{
  "type": "@@AZURE_BLOCK_UPLOAD",
  "payload": { endpoint, file, callbacks },
}
```
For more information about this action or the prebuilt action, see the next section.

## Dispatching upload action
This module also includes an action ready to be used.
```
import { action as ABUAction } from 'abu-redux-middleware';

dispatch(ABUAction(sasUrl, file, callbacks));
```
- **sasUrl** is the azure presigned sas url for uploading. It should be similar to `https://myaccount.blob.core.windows.net/pictures/profile.jpg?sv=2012-02-12&st=2009-02-09&se=2009-02-10&sr=c&sp=r&si=YWJjZGVmZw%3d%3d&sig=dD80ihBh5jfNpymO5Hg1IdiJIEvHcJpCMiCMnN%2fRnbI%3d`
- **file** is a *File* instance, the file to be uploaded
- **callbacks** is an object with three callbacks: *onSuccess*, *onError*, *onProgress*.

## About Azure SAS
Visit https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview
