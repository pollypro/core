export const runCommand = async (
  Command: any,
  context: Record<string, any>,
  params = {},
) => {
  const queue = []
    .concat(Array.isArray(Command.dependsOn) ? Command.dependsOn : [], Command)
    .map((CommandClass) => new CommandClass());

  let contextAcc = context;
  for (const CommandInstance of queue) {
    contextAcc = await CommandInstance.execute(contextAcc, params);
  }

  return contextAcc;
};
