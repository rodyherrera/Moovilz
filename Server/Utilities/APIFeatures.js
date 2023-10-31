/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/CodeWithRodi/Moovilz/
 * 
 * :: https://moovilz.codewithrodi.com/
 * :: https://moovilz-backend.codewithrodi.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

// ! APIFeatures class provides a convenient and reusable way to build and 
// ! execute MongoDB queries based on request query parameters.
class APIFeatures{
    constructor({ RequestQueryString, Model, Populate = null }){
        this.Model = Model;
        this.RequestQueryString = RequestQueryString;
        this.Populate = Populate;
        
        this.Buffer = {
            Find: [],
            Sort: {},
            Select: '',
            Skip: 0,
            Limit: 0,
            TotalResults: 0,
            SkippedResults: 0,
            Page: 1,
            TotalPages: 1
        };
    };

    async Perform(){
        const { Find, Sort, Select, Skip, Limit, TotalResults, SkippedResults, Page, TotalPages } = this.Buffer;
        const Query = this.Model.find(...Find).skip(Skip).limit(Limit).sort(Sort).select(Select);
        if(this.Populate !== null){
            Query.populate(this.Populate);
        }
        const Records = await Query;
        return { Records, TotalResults, SkippedResults, Page, Limit, TotalPages };
    };

    // ! The Search method adds a search filter to 
    // ! the MongoDB query based on the Search parameter 
    // ! in the request query parameters. The search filter 
    // ! is built using a searchBuilder method on the Mongoose model.
    Search(){
        if(this.RequestQueryString.Search){
            this.Buffer.Find.push(this.Model.searchBuilder(this.RequestQueryString.Search));
        }
        return this;
    };

    // ! The Filter method adds filters to the MongoDB query 
    // ! based on the other request query parameters. It first removes 
    // ! the Page, Sort, Limit, Fields, and Populate parameters from 
    // ! the request query parameters, and then converts the remaining 
    // ! parameters to MongoDB query filters. It uses a regular expression 
    // ! to convert any gte, gt, lte, or lt parameters to $gte, $gt, $lte, or $lt parameters.
    Filter(){
        const Query = { ...this.RequestQueryString };
        ['Page', 'Sort', 'Limit', 'Fields', 'Populate'].forEach((Variable) => delete Query[Variable]);
        const Filter = JSON.parse(JSON.stringify(Query).replace(/\b(gte|gt|lte|lt)\b/g, (Match) => `$${Match}`));
        this.Buffer.Find.push(Filter)
        return this;
    };

    // ! The Sort method adds a sort parameter to the MongoDB 
    // ! query based on the Sort parameter in the request query parameters. If 
    // ! the Sort parameter is not specified, it defaults to sorting by the 
    // ! CreatedAt field in descending order.
    Sort(){
        // ! If the sort is not specified, then we sort by the creation date.
        this.Buffer.Sort = (this.RequestQueryString.Sort) 
            ? (this.RequestQueryString.Sort.split(',').join(' '))
            : ({ CreatedAt: -1 });
        return this;
    };

    // ! The LimitFields method adds a select parameter to 
    // ! the MongoDB query based on the Fields parameter in the 
    // ! request query parameters. If the Fields parameter is 
    // ! not specified, it returns all fields.
    LimitFields(){
        // ! If the fields are not specified, then we return all the fields.
        if(this.RequestQueryString.Fields){
            this.Buffer.Select = (this.RequestQueryString.Fields.split(',').join(' '));
        }
        return this;
    };

    // ! The Paginate method adds pagination parameters to the 
    // ! MongoDB query based on the Page and Limit parameters
    // ! in the request query parameters. If the Limit parameter is 
    // ! set to -1, it disables pagination. It calculates the Skip 
    // ! parameter based on the Page and Limit parameters, and sets the 
    // ! TotalResults, SkippedResults, Page, and TotalPages properties of the Buffer object.
    async Paginate(){
        // ! If the limit is set to -1, then we don't want to paginate.
        if(this.RequestQueryString.Limit * 1 === -1)
            return this;
        const Page = this.RequestQueryString.Page * 1 || 1;
        const Limit = this.RequestQueryString.Limit * 1 || 100;
        const Skip = (Page - 1) * Limit;
        this.Buffer.Skip = Skip;
        this.Buffer.Limit = Limit;
        const RecordsCount = await this.Model.countDocuments();
        this.Buffer.TotalResults = RecordsCount;
        this.Buffer.Page = Page;
        this.Buffer.SkippedResults = (Page * Limit);
        this.Buffer.TotalPages = Math.ceil(RecordsCount / Limit);
        if(this.RequestQueryString.Page){
            // ! If the page is greater than the total pages, then we throw an error.
            if(Skip >= RecordsCount && RecordsCount.length >= 1)
                throw new Error('Core::InvalidPageForPagination');
        }
        return this;
    };
};

module.exports = APIFeatures;