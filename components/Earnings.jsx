import { CashIcon } from "@heroicons/react/solid";
import getSymbolFromCurrency from "currency-symbol-map";

export default function Earnings({ er, currency, time, rate }) {
	let exchangeRate = 0;
	if (currency === "GBP") {
		exchangeRate = 1;
	} else {
		exchangeRate = er.filter((item) => item.source === currency)[0].rate;
	}
	return (
		<div className="purple-bg p-4 rounded">
			<h2 className="font-semibold text-2xl flex items-center text-radix-purple11">
				<CashIcon className="h-6 w-6 mr-2" />
				Earnings
			</h2>
			{currency !== "GBP" && (
				<p className="text-center text-3xl py-2">
					{getSymbolFromCurrency(currency)}
					{(time * rate).toFixed(2)}
				</p>
			)}
			<p className="text-center text-3xl py-2">
				£{(exchangeRate * time * rate).toFixed(2)}
			</p>
		</div>
	);
}
