import axios from "axios";
import { useState, useEffect } from "react";

const Fib = () => {
	const [seenIndices, setSeenIndices] = useState([]);
	const [values, setValues] = useState({});
	const [index, setIndex] = useState("");

	useEffect(() => {
		fetchValues();
		fetchIndices();
	}, []);

	const fetchValues = async () => {
		const currentValues = await axios.get("/api/values/current");
		setValues(currentValues.data);
	};

	const fetchIndices = async () => {
		const newSeenIndices = await axios.get("/api/values/all");
		setSeenIndices(newSeenIndices.data);
	};

	const renderSeenIndices = () => {
		return seenIndices.map(({ number }) => number).join(", ");
	};

	const renderValues = () => {
		const entries = [];
		for (let key in values) {
			entries.push(
				<div key={key}>
					For index {key}, I calculated {values[key]}
				</div>
			);
		}
		return entries;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios.post("/api/values", {
			index,
		});
		setIndex("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Enter your index: </label>
				<input value={index} onChange={(e) => setIndex(e.target.value)} />
				<button>Submit</button>
			</form>

			<h3>Indices I have seen</h3>
			{renderSeenIndices()}
			<h3>Calculated Values</h3>
			{renderValues()}
		</div>
	);
};

export default Fib;
