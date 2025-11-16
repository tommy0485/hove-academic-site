import React, { useState, useMemo, useEffect } from 'react';
import type { Publication } from '@/types';
import PublicationCard from './PublicationCard.astro';
import * as Astro from 'astro/runtime/server/index.js';

interface Props {
	publications: Publication[];
}

const PublicationList: React.FC<Props> = ({ publications }) => {
	const allKeywords = useMemo(() => {
		const keywords = new Set<string>();
		publications.forEach((pub) => pub.keywords.forEach((kw) => keywords.add(kw)));
		return Array.from(keywords).sort();
	}, [publications]);

	const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
	const [searchInput, setSearchInput] = useState('');
	const [filteredPublications, setFilteredPublications] = useState(publications);

	// Effect to handle filtering logic whenever dependencies change
	useEffect(() => {
		const searchLower = searchInput.toLowerCase();
		const selectedArray = Array.from(selectedKeywords);

		const results = publications.filter((pub) => {
			const matchesSearch =
				pub.title.toLowerCase().includes(searchLower) ||
				pub.authors.some((author) => author.toLowerCase().includes(searchLower)) ||
				pub.venue.toLowerCase().includes(searchLower);

			const matchesKeywords =
				selectedArray.length === 0 || // Show all if no keywords selected
				selectedArray.every((selectedKw) =>
					pub.keywords.some((pubKw) => pubKw.toLowerCase() === selectedKw.toLowerCase())
				);

			return matchesSearch && matchesKeywords;
		});

		setFilteredPublications(results);
	}, [publications, selectedKeywords, searchInput]);

	const toggleKeyword = (keyword: string) => {
		setSelectedKeywords((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(keyword)) {
				newSet.delete(keyword);
			} else {
				newSet.add(keyword);
			}
			return newSet;
		});
	};

	const clearFilters = () => {
		setSelectedKeywords(new Set());
		setSearchInput('');
	};

	// Function to render Astro components from within React/TSX
	// This uses the Astro Runtime for component rendering
	const renderAstroComponent = (pub: Publication) => {
		// This uses the Astro component's public render function
		// @ts-ignore - The component is passed as a prop from Astro side
		return Astro.render(PublicationCard, { pub: pub });
	};

	return (
		<div className="space-y-8">
			{/* Filter UI */}
			<div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
				<h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Filter Publications</h3>

				{/* Search Input */}
				<input
					type="text"
					placeholder="Search by title, author, or venue..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-50 transition-colors"
					aria-label="Search publications"
				/>

				{/* Keyword Tags */}
				<div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Keyword filters">
					{allKeywords.map((keyword) => (
						<button
							key={keyword}
							onClick={() => toggleKeyword(keyword)}
							className={`px-3 py-1 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
								selectedKeywords.has(keyword)
									? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
									: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-50 dark:hover:bg-gray-500'
							}`}
							aria-pressed={selectedKeywords.has(keyword)}
						>
							{keyword}
						</button>
					))}
				</div>

				{/* Clear Filters Button */}
				{(selectedKeywords.size > 0 || searchInput) && (
					<button
						onClick={clearFilters}
						className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
						aria-label="Clear all filters"
					>
						Clear Filters
					</button>
				)}
			</div>

			{/* Publication List */}
			<div>
				{filteredPublications.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
						{filteredPublications.map((pub, index) => (
							<div
								key={index}
								dangerouslySetInnerHTML={{ __html: renderAstroComponent(pub) }}
								role="listitem"
							/>
						))}
					</div>
				) : (
					<p className="text-center text-xl text-gray-500 dark:text-gray-400 p-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg" role="alert">
						No publications match your current filters.
					</p>
				)}
			</div>
		</div>
	);
};

export default PublicationList;