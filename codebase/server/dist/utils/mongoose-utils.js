// Options parameter is an object having searchOptions, filteringOptions, and etc.
export const buildPaginationPipeline = ({ sortField = "_id", sortDir = "asc", pageNum = 1, pageSize = 10, ...searchOptions }) => {
    let formattedSearchOptions = [];
    Object.entries(searchOptions).forEach(([key, value]) => {
        if (value instanceof Array) {
            formattedSearchOptions.push({ [key]: { $all: value } });
        }
        else {
            formattedSearchOptions.push({ [key]: value });
        }
    });
    return [
        {
            $match: {
                ...(formattedSearchOptions.length > 0
                    ? { $and: formattedSearchOptions }
                    : {}),
            },
        },
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
export const buildPostPaginationPipeline = ({ authorName, ...rest }) => {
    const paginationPipeline = buildPaginationPipeline(rest);
    paginationPipeline.splice(1, 0, ...[
        {
            $lookup: {
                from: "User",
                let: { searchId: { $toObjectId: "userId" } },
                pipeline: [
                    { $match: { $expr: [{ _id: "$$searchId" }] } },
                    { $project: { _id: 1, firstName: 1, lastName: 1 } },
                ],
                as: "authorInfo",
            },
        },
    ]);
    return paginationPipeline;
};
export const buildPage = ({ data, countInPage, countInQuery }, { pageSize, pageNum, sortField, sortDir, ...searchOptions }) => {
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
                isEmpty: data?.length == 0,
                isLast: countOfPages === pageNum,
                isFirst: pageNum === 1 || pageNum === undefined,
            },
            count: {
                inPage: countInPage,
                inQuery: countInQuery,
                ofPages: countOfPages,
            },
            searchOptions,
        },
        content: data ?? [],
    };
};
