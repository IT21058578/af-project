import { Aggregate, FilterQuery, PipelineStage } from "mongoose";
import {
	IPaginationResult,
	IPostPageOptions,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TPost } from "../types/model-types.js";

// Options parameter is an object having searchOptions, filteringOptions, and etc.
export const buildPaginationPipeline = <T>({
	sortField = "",
	sortDir = "asc",
	pageNum = 1,
	pageSize = 10,
	...searchOptions
}: TExtendedPageOptions<T>): PipelineStage[] => {
	let formattedSearchOptions: FilterQuery<any>[] = [];
	Object.entries(searchOptions).forEach(([key, value]) => {
		if (value instanceof Array) {
			formattedSearchOptions.push({ [key]: { $all: value } });
		} else {
			formattedSearchOptions.push({ [key]: value });
		}
	});
	return [
		{ $match: { $and: formattedSearchOptions } },
		{
			$facet: {
				metadata: [{ $count: "countInQuery" }],
				data: [
					{ $sort: { [sortField]: sortDir === "asc" ? 1 : -1 } },
					{ $skip: ((pageNum || 1) - 1) * (pageSize || 10) },
					{ $limit: pageSize || 10 },
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
};

export const buildPostPaginationPipeline = ({
	authorName,
	...rest
}: IPostPageOptions) => {
	const paginationPipeline = buildPaginationPipeline<TPost>(rest);
	paginationPipeline.splice(1, 0, {
		$lookup: {
			from: "User",
			let: { searchId: { $toObjectId: "userId" } },
			pipeline: [
				{ $match: { $expr: [{ _id: "$$searchId" }] } },
				{ $project: { _id: 1, firstName: 1, lastName: 1 } },
			],
			as: "authorInfo",
		},
	});
	// TODO: Insert the additional match into the match in the query.
	// TODO: Figure out way to do the hot, controversial, popular thing here.
	return paginationPipeline;
};

export const buildPage = <T>(
	{ data, countInPage, countInQuery }: IPaginationResult<T>,
	{
		pageSize,
		pageNum,
		sortField,
		sortDir,
		...searchOptions
	}: Partial<TExtendedPageOptions<T>>
) => {
	const countOfPages = Math.ceil(countInQuery / (pageSize || 10));
	return {
		_metadata: {
			page: {
				size: pageSize || 10,
				number: pageNum || 1,
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
