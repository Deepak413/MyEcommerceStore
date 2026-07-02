exports.buildMongoQuery = (filters) => {

    const query = {};

    if(filters.category){

        query.category = {

            $regex: filters.category,

            $options:"i"

        };

    }

    if(filters.brand){

        query.name = {

            $regex: filters.brand,

            $options:"i"

        };

    }

    if(filters.priceMin || filters.priceMax){

        query.price = {};

        if(filters.priceMin){

            query.price.$gte = filters.priceMin;

        }

        if(filters.priceMax){

            query.price.$lte = filters.priceMax;

        }

    }

    if(filters.color){

        query.description = {

            $regex: filters.color,

            $options:"i"

        };

    }

    return query;

};