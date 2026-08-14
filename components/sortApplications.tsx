interface Params {
    setsortOption: React.Dispatch<React.SetStateAction<string>>;
    sortOption: string;
}

export default function SortApplications({setsortOption, sortOption}: Params) {
    return (
        <div>
            <p className="text-white">Sort</p>
            <select className= "text-white" value={sortOption} onChange = {(e) => setsortOption(e.target.value)}>
                <option value="default">Default</option>
                <option value="ascDateApplied">Date Applied &uarr;</option>
                <option value="decDateApplied">Date Applied &#8595;</option>
            </select>
        </div>
    )
}