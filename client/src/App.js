import InputSection from './components/InputSection';
import './app.css'
import DisplaySection from './components/DisplaySection';
import { useEffect, useState } from 'react';

function App() {
	const [stockData, setStockData] = useState({});
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		console.log(loading)
	}, [loading])

	const fetchStockData = (details) => {
		setLoading(true)
		fetch('http://localhost:5000/api/fetchStockData', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(details)
		}).then(response => response.json())
			.then(result => {
				setStockData(result.body)
			})
			.finally(() => {
				setLoading(false)

			})
	}
	return (
		<div className="wrapper">
			<InputSection fetchStockData={fetchStockData} />
			{
				loading &&
				<div className='loader'>
					loading...
				</div>
			}
			{
				Object.keys(stockData).length > 0 &&
				<DisplaySection stockData={stockData} />
			}
		</div>
	);
}

export default App;