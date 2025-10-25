class APIFeature {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
        search() {
            const keyword = this.queryStr.keyword ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            } : {}

            this.query = this.query.find({...keyword});
            return this;
        }
        filter() {
            const queryCopy = { ...this.queryStr };
            
            // Removing some fields from query
            const removeFields = ['keyword', 'page', 'limit'];
            removeFields.forEach(el => delete queryCopy[el]);



            // Advance Filter for price and rating
            let queryStr = JSON.stringify(queryCopy);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
            let parsedQuery = JSON.parse(queryStr);

            let queryObj = {};
            Object.keys(parsedQuery).forEach(key => {
                if (key.includes("[$")) {
                    const [field, operator] = key.split(/\[|\]/).filter(Boolean);
                    if (!queryObj[field]) queryObj[field] = {};
                    queryObj[field][operator] = Number(parsedQuery[key]);
                } else {
                    queryObj[key] = parsedQuery[key];
                }
            });



            this.query = this.query.find(queryObj);
            return this;
        }
        pagination(resPerPage) {
            const currentPage = Number(this.queryStr.page) || 1;
            const skip = resPerPage * (currentPage - 1);

            this.query = this.query.limit(resPerPage).skip(skip);
            return this;
        }
}
module.exports = APIFeature;