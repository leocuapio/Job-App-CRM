interface Params {
    setsortOption: React.Dispatch<React.SetStateAction<string>>;
    sortOption: string;
}

export default function SortApplications({setsortOption, sortOption}: Params) {
    return (
        <div className="w-full md:w-56">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7166]">
                Sort
            </label>
            <select
                className="mt-2 w-full rounded-md border border-[#cfc7bc] bg-[#fbfaf7] px-3 py-2.5 text-sm font-medium text-[#221f1f] outline-none transition focus:border-[#756a5f] focus:bg-white focus:ring-2 focus:ring-[#d7cec2]"
                value={sortOption}
                onChange = {(e) => setsortOption(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="ascDateApplied">Date Applied &uarr;</option>
                <option value="decDateApplied">Date Applied &#8595;</option>
            </select>
        </div>
    )
}
