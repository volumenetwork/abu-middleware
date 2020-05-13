import AzureBlockUpload from 'azure-block-upload';
import { Type } from './action';

/**
 * Azure Block Upload Middleware for redux
 */
const azureBlockUploadMiddleware = () => next => async action => {
  const { type, payload } = action || {};

  // If not the wanted type, ignore this middleware
  if (type !== Type) {
    return next(action);
  }
  // Required data
  const { sasurl, file, callbacks = {} } = payload || {};

  if (!sasurl) {
    throw new Error('undefined sasurl');
  }

  if (!file) {
    throw new Error('undefined file')
  }

  const client = new AzureBlockUpload(sasurl, file, { callbacks });
  await client.start();

  return next(action);
};

export default azureBlockUploadMiddleware;
