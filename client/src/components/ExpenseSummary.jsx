function ExpenseSummary({ summary }) {
  const total = summary.reduce((sum, item) => sum + parseFloat(item.total), 0);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Summary by Category</h2>
      {summary.length === 0 ? (
        <p className="text-gray-500">No data yet.</p>
      ) : (
        <>
          <div className="divide-y">
            {summary.map((item) => (
              <div key={item.category} className="flex justify-between py-2">
                <span className="text-gray-700">{item.category}</span>
                <span className="font-medium">${parseFloat(item.total).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 mt-2 border-t font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ExpenseSummary;