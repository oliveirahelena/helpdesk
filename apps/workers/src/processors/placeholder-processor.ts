export async function runPlaceholderProcessor(queueName: string, payload: unknown) {
  return {
    queueName,
    payload,
    processed: true
  };
}
