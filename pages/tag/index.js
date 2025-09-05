import React, { useState } from "react";
import Link from "next/link";
import tags_list from "../../JsonData/photos/tags_list.json";

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLetter, setSelectedLetter] = useState("ALL");

    // Sort tags alphabetically
    const sortedTags = [...tags_list].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    // Tags filtered for main display (search + alphabet)
    const filteredTags = sortedTags.filter((tag) => {
        const matchesSearch = tag.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesLetter =
            selectedLetter === "ALL" ||
            tag.title.charAt(0).toUpperCase() === selectedLetter;
        return matchesSearch && matchesLetter;
    });

    // Tags filtered for hints (search only, ignore alphabet)
    const hintTags = sortedTags.filter((tag) =>
        tag.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered tags by first letter
    const groupedTags = filteredTags.reduce((acc, tag) => {
        const firstLetter = tag.title.charAt(0).toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(tag);
        return acc;
    }, {});

    // Alphabet list
    const alphabets = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

    // Handle selecting hint (auto-fill search)
    const handleSelectHint = (tag) => {
        setSearchQuery(tag.title);
        setSelectedLetter("ALL"); // Reset to all so it shows directly
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
            <h2 className="font-inter font-semibold mb-6 text-lg sm:text-2xl">
                Tag list
            </h2>

            {/* Search bar */}
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />

                {/* Search hints */}
                {searchQuery && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto z-10">
                        {hintTags.length > 0 ? (
                            hintTags.slice(0, 8).map((tag, i) => (
                                <Link
                                    key={i}
                                    href={`/tag/${tag.href}`}
                                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                    {tag.title}
                                </Link>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">No results found</div>
                        )}
                    </div>
                )}
            </div>

            {/* Alphabet filter bar */}
            <div className="flex flex-wrap gap-2 mb-8">
                {alphabets.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`px-3 py-1 rounded-md border transition ${selectedLetter === letter
                            ? "bg-pink-600 text-white border-pink-600"
                            : "bg-black text-white border-gray-700 hover:bg-gray-800"
                            }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Tags grouped */}
            {Object.keys(groupedTags).length > 0 ? (
                Object.keys(groupedTags)
                    .sort()
                    .map((letter, i) => (
                        <div key={letter} className="mb-10">
                            {/* Alphabet heading */}
                            {selectedLetter === "ALL" && (
                                <h3 className="font-bold text-pink-600 text-xl mb-4">
                                    {letter}
                                </h3>
                            )}

                            {/* Responsive tag grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
                                {groupedTags[letter].map((tag, index) => (
                                    <Link
                                        key={index}

                                        href={`/tag/${tag.href}`}
                                        className="text-gray-800 hover:text-pink-600 font-medium"
                                    >
                                        <div
                                            className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-2 transition"
                                        >

                                            {tag.title}
                                            <span className="text-gray-500 text-sm">{tag.count}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Divider */}
                            {i !== Object.keys(groupedTags).length - 1 &&
                                selectedLetter === "ALL" && (
                                    <hr className="mt-6 border-t border-gray-300" />
                                )}
                        </div>
                    ))
            ) : (
                <p className="text-gray-500">No tags available</p>
            )}
        </div>
    );
};

export default Index;
