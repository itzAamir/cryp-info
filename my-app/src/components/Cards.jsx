import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NoResults from "./NoResults";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";

const Cards = () => {
	const [coins, setCoins] = useState([]);
	const [filteredCoins, setFilteredCoins] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getData = () => {
			setLoading(true);
			let noOfData = 10;
			const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${noOfData}&page=1&sparkline=false`;

			axios
				.get(url)
				.then((res) => {
					let data = res.data;
					setCoins(data);
					setFilteredCoins(filterCoins(data));
					setLoading(false);
				})
				.catch((err) => console.error(err));
		};
		getData();
	}, []);

	useEffect(() => {
		setFilteredCoins(filterCoins(coins));
	}, [searchTerm]);

	const filterCoins = (arr) => {
		return arr.filter((val) =>
			val.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	return (
		<div className="card-container">
			<input
				type="text"
				id="searchBar"
				placeholder="Search..."
				onChange={(event) => setSearchTerm(event.target.value)}
			/>
			<hr />
			{loading && <Spinner />}
			{filteredCoins.length === 0 ? (
				<NoResults />
			) : (
				filteredCoins.map((elem, index) => {
					return (
						<NavLink key={index} to={`crypto/${elem.id}`}>
							<Card data={elem} />
						</NavLink>
					);
				})
			)}
		</div>
	);
};

export default Cards;
