
export default function AlertMessage(messages, variant) {
  if (typeof messages == 'string') {
    return enqueueSnackbar(messages, {variant});
  }

  for (let message of messages) {
    enqueueSnackbar(message, {variant});
  }
};
