import MessageDisplay from '@/components/MessageDisplay.vue';
import { mount } from '@vue/test-utils';
import { getMessage } from '@/services/axios';
import flushPromises from 'flush-promises';

jest.mock('@/services/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
    const mockMessage = 'Hello from the db!';
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);

    const message = wrapper.find('[data-testid="message"]').element.textContent;
    expect(message).toEqual(mockMessage);
  });

  it('displays an error when getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong.';
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();

    expect(getMessage).toHaveBeenCalledTimes(1);
    const error = wrapper.find('[data-testid="message-error"]').element
      .textContent;
    expect(error).toEqual(mockError);
  });
});
