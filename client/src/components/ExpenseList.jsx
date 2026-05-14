function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p className="text-gray-500 text-center py-8">No expenses yet. Add one above!</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{expense.title}</td>
              <td className="px-4 py-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {expense.category}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right font-medium">
                ${parseFloat(expense.amount).toFixed(2)}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit(expense)}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;