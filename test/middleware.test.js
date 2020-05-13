import middleware from '../src';
import { Type as ABUAction } from '../src/action';

const startMock = jest.fn();
jest.mock('azure-block-upload');

const AzureBlockUpload = require('azure-block-upload');

const sasurl = 'https://myaccount.blob.core.windows.net/pictures/profile.jpg?sv=2012-02-12&st=2009-02-09&se=2009-02-10&sr=c&sp=r&si=YWJjZGVmZw%3d%3d&sig=dD80ihBh5jfNpymO5Hg1IdiJIEvHcJpCMiCMnN%2fRnbI%3d';
const file = new File(['132456789'], 'filename', { type: 'video/mp4' });

describe('Azure Block Upload middleware', () => {
  beforeEach(() => {
    AzureBlockUpload.mockReset();
  });

  describe('Middleware', () => {
    const inputAction = ({
      type: ABUAction,
      payload: {
        sasurl,
        file,
        callbacks: {},
      },
    });
    const inputRandomAction = ({ type: 'input', payload: {} });

    test('it looks like a redux middleware', () => {
      expect(middleware instanceof Function).toBeTruthy();
      expect(middleware() instanceof Function).toBeTruthy();
      expect(middleware()() instanceof Function).toBeTruthy();
    });

    test('it skips if it\'s not the abu action', () => {
      const next = jest.fn();

      middleware()(next)(inputRandomAction);

      // Middleware should call next
      expect(next).toBeCalled();
      expect(next).toBeCalledWith(inputRandomAction);
    });

    test('it calls AzureBlockUpload if it\'s the proper action', async () => {
      expect.assertions(3);
      const next = jest.fn();

      await middleware()(next)(inputAction);

      // Middleware should call AzureBlockUpload
      expect(AzureBlockUpload).toBeCalled();

      // Middleware should instantiate AzureBlockUpload
      expect(AzureBlockUpload.mock.instances.length).toBeTruthy();

      // Middleware should call start method
      expect(AzureBlockUpload.mock.instances[0].start).toBeCalled();
    });
  });
});
