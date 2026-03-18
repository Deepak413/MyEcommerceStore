class ApiFeatures {
    constructor(query, queryStr){     //Example:  query- Product.find({})  queryStr- { keyword:'product1', category: 'Laptop'}
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword       //changing keyword so it can search every possible substrings
          ? {
                name:{
                    $regex:this.queryStr.keyword, 
                    $options: "i",           //for case insensitiveness
                },
            } 
          : {};

          this.query = this.query.find({...keyword});
          return this;
    }

    filter(){
        // const queryCopy = this.queryStr; We cant write it directly bcz queryStr is an object and they passed by reference. So this is to avoid changes in original queryStr
        const queryCopy = {...this.queryStr};
        
        //removing some fields for filter by category
        const removeFields = ["keyword", "page", "limit", "sort"];
        removeFields.forEach(key=>delete queryCopy[key]);

        // Filter for price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);     //in mongodb we have $ sign before gt,gte,lt,lte. So here we adding $ sign

        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    sort() {
        let sortBy = "-createdAt"; // default: newest

        if (this.queryStr.sort) {
            sortBy = this.queryStr.sort.split(",").join(" ");
        }

        this.query = this.query.sort(sortBy);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
    
};

module.exports = ApiFeatures;