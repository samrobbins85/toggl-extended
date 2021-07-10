export default function Earnings({ er, currency, time, rate }) {
	let exchangeRate = 0;
	if (currency === "GBP") {
		exchangeRate = 1;
	} else {
		exchangeRate = er.filter((item) => item.source === currency)[0].rate;
	}
	return (
		<div className="bg-purple-100 p-4 rounded text-center">
			<h2 className="font-semibold text-2xl">Earnings</h2>
			<p>{(exchangeRate * time * rate).toFixed(2)}</p>
		</div>
	);
}
