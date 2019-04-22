const database = require("../../../database");

const transactions = async (_, args, ctx) => {
  const data = await database("transactions").select();
  return data;
};

const addTransaction = async (
  _,
  { source, title, user, category, reoccuring, budget, cost },
  ctx
) => {
  const [id] = await database("transactions")
    .returning("id")
    .insert({
      source,
      title,
      user,
      category,
      reoccuring,
      budget,
      cost
    });
  return id;
};

module.exports = {
  Query: {
    transactions
  },
  Mutation: {
    addTransaction
  }
};
