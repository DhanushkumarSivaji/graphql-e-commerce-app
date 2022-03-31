exports.Query = {
    name: () => {
        return "World!"
    },
    age: () => {
        return 24
    },
    isVaccinated: () => {
        return true
    },
    weight: () => {
        return 80.6
    },
    education: () => {
        return ['sslc','hsc','btech']
    },
    products: (parent,{filter}, {db}) => {
        let filteredProducts = db.products;

        if(filter){
            const {onSale,avgRating } = filter
            if(onSale){
                filteredProducts = filteredProducts.filter(product => product.onSale)
                return filteredProducts
            }
            if([1,2,3,4,5].includes(avgRating)){
                filteredProducts = filteredProducts.filter((product) => {
                    let sumRating = 0;
                    let numberOfReviews= 0;
                    db.reviews.forEach((review) => {
                        if(review.productId === product.id) {
                            sumRating += review.rating
                            numberOfReviews++
                        }
                    })
                    const avgProductRating = sumRating/numberOfReviews;

                    return avgProductRating >= avgRating
                })
            }
        }
        return filteredProducts
    },
    product: (parent,args, {db}) => {
        const { id } = args;
        return db.products.find(product => product.id === id);
    },
    categories: (parent,args, {db}) => db.categories,
    category: (parent,args,{db}) => {
        const { id } = args;
        return db.categories.find(category => category.id === id);
    }
}