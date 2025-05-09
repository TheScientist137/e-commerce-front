import { useEffect } from "react";
import { useShopContext } from "../hooks/useContext";
import { FilterType } from "../types/types";

export default function FilterFilters() {
	const {
		filteredProducts,
		filterFilters,
		applyFiltersForFilters,
		updateFiltersFilter
	} = useShopContext();

	const applicationAreas = Array.from(
		new Set(
			filteredProducts.map(
				(product) => (product as FilterType).filterData.filter_type
			)
		)
	);
	const filterBrands = Array.from(
		new Set(
			filteredProducts.map(
				(product) => (product as FilterType).brand
			)
		)
	);

	useEffect(() => {
		applyFiltersForFilters();
	}, [filterFilters]);

	return (
		<div>
			<div>
				<h4>AREA OF APPLICATION</h4>
				{applicationAreas.map((area) => (
					<button key={area} onClick={() => updateFiltersFilter(
						"applicationArea",
						filterFilters.applicationArea === null ? area : null
					)}>
						{area}
					</button>
				))}
			</div>
			<div>
				<h4>BRANDS</h4>
				{filterBrands.map((brand) => (
					<button key={brand} onClick={() => updateFiltersFilter(
						"brand",
						filterFilters.brand === null ? brand : null
					)}>
						{brand}
					</button>
				))}
			</div>
		</div>

	);
}   