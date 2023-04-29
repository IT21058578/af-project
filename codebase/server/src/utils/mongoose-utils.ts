import { Aggregate, PipelineStage } from "mongoose";
import { IPaginationResult, TExtendedPageOptions } from "../types/misc-types";

// Options parameter is an object having searchOptions, filteringOptions, and etc.
export const buildPaginationPipeline = <T>({
	sortField = "",
	sortDir = "asc",
	pageNum = 1,
	pageSize = 10,
	...searchOptions
}: TExtendedPageOptions<T>): PipelineStage[] => [
	{ $match: { ...searchOptions } },
	{
		$facet: {
			metadata: [{ $count: "countInQuery" }],
			data: [
				{ $sort: { [sortField]: sortDir === "asc" ? 1 : -1 } },
				{ $skip: (pageNum - 1) * pageSize },
				{ $limit: pageSize },
			],
		},
	},
	{
		$project: {
			countInQuery: { $arrayElemAt: ["$metadata.countInQuery", 0] },
			countInPage: { $size: "$data" },
			data: 1,
		},
	},
];

export const buildPage = <T>(
	{ data, countInPage, countInQuery }: IPaginationResult<T>,
	{
		pageSize = 10,
		pageNum = 1,
		sortField,
		sortDir,
		...searchOptions
	}: TExtendedPageOptions<T>
) => {
	const countOfPages = Math.ceil(countInQuery / pageSize);
	return {
		_metadata: {
			page: {
				size: pageSize,
				number: pageNum,
			},
			...(sortField &&
				sortDir && {
					sort: {
						field: sortField,
						direction: sortDir,
					},
				}),
			state: {
				isEmpty: data.length == 0,
				isLast: countOfPages === pageNum,
				isFirst: pageNum === 1,
			},
			count: {
				inPage: countInPage,
				inQuery: countInQuery,
				ofPages: countOfPages,
			},
			searchOptions,
		},
		content: data,
	};
};
