export const Type = '@@AZURE_BLOCK_UPLOAD';

/**
 * Redux action to upload a file to Azure Blob Storage by using a sas url
 * @param {String} sasurl
 * @param {File} file
 * @param {Object} callbacks
 * @param {Function} callbacks.onError
 * @param {Function} callbacks.onProgress
 * @param {Function} callbacks.onSuccess
 */
const azureBlockUploadAction = (sasurl, file, callbacks = {}) => ({
  type: Type,
  payload: { sasurl, file, callbacks },
});

export default azureBlockUploadAction;
