import React, { FC } from 'react'
import { Badge, Card, Col } from 'react-bootstrap';
import StartRatingComponent from 'react-star-rating-component';

interface Props {
    product: Record<string, any>;
    userType: string;
}

const ProductItem: FC<Props> = ({ product, userType }) => {

    return (
        <Col>
            <Card className='productCard'>
                <Card.Img variant='top' src={product.image} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <StartRatingComponent name='rate1' starCount={5} value={product.avgRating || 0} />
                    <Card.Text>
                        <span className='priceText'>
                            {product.skuDetails 
                                ? product.skuDetails.length > 1 
                                    ? `$${Math.min.apply(
                                        Math, 
                                        product.skuDetails.map((o: any) => o.price)
                                    )} - $${Math.max.apply(
                                        Math, 
                                        product.skuDetails.map((o: any) => o.price)
                                    )}`
                                : `${product.skuDetails[0].price}` 
                            : '$000'}
                         $
                        </span>
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>
    )
};

export default ProductItem