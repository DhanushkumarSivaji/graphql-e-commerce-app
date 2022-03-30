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
    products: (parent,{filter}, {products,reviews}) => {
        let filteredProducts = products;

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
                    reviews.forEach((review) => {
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
    product: (parent,args, {products}) => {
        const { id } = args;
        return products.find(product => product.id === id);
    },
    categories: (parent,args, {categories}) => categories,
    category: (parent,args,{categories}) => {
        const { id } = args;
        return categories.find(category => category.id === id);
    }
}